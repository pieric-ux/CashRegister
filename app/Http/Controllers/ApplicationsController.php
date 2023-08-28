<?php

namespace App\Http\Controllers;

use App\Http\Requests\Applications\StoreApplicationRequest;
use App\Http\Requests\Applications\ShowApplicationRequest;
use App\Http\Requests\Applications\UpdateApplicationRequest;
use App\Http\Requests\Applications\DeleteApplicationRequest;
use App\Models\CR_App;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ApplicationsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        // Get the currently authenticated customer
        $customer = Auth::user();

        // Retrieve the customer's applications and map them with additional posterPath attribute
        $applications = $customer->cr_apps->map(function ($app) {
            $app->posterPath = $app->getPosterUrl();
            return $app;
        });

        // Render the 'Customers/Applications/Index' Inertia view with applications data
        return Inertia::render('Customers/Applications/Index', [
            'applications' => $applications,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreApplicationRequest $request): RedirectResponse
    {
        // Get the currently authenticated customer
        $customer = Auth::user();

        // Create a new application for the customer
        $customer->cr_apps()->create([
            'name' => ucfirst($request->input('name')),
            'slug' => Str::slug($request->input('name')),
            'description' => $request->input('description'),
            'start_date' => $request->input('start_date'),
            'end_date' => $request->input('end_date'),
            'location' => ucfirst($request->input('location')),
            'website' => $request->input('website'),
        ]);

        // Redirect to the applications index page
        return Redirect::route('applications.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(ShowApplicationRequest $request, CR_App $app): Response
    {
        // Render the 'Customers/Application/Dashboard' Inertia view with the specific application data
        return Inertia::render('Customers/Application/Dashboard', [
            'application' => $app,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateApplicationRequest $request, CR_App $app): RedirectResponse
    {
        // Update the application's attributes with new data
        $app->name = ucfirst($request->input('name'));
        $app->slug = Str::slug($request->input('name'));
        $app->description = $request->input('description');
        $app->start_date = $request->input('start_date');
        $app->end_date = $request->input('end_date');
        $app->location = ucfirst($request->input('location'));
        $app->website = $request->input('website');
        $app->save();

        // Redirect to the applications index page
        return Redirect::route('applications.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteApplicationRequest $request, CR_App $app): RedirectResponse
    {
        // Validate the password provided in the request
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        // Delete the application
        $app->delete();

        // Redirect to the applications index page
        return Redirect::route('applications.index');
    }
}
