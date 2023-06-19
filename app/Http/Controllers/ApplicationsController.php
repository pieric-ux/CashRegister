<?php

namespace App\Http\Controllers;

use App\Http\Requests\Applications\StoreApplicationRequest;
use App\Http\Requests\Applications\ShowApplicationsRequest;
use App\Http\Requests\Applications\UpdateApplicationRequest;
use App\Http\Requests\Applications\DeleteApplicationRequest;
use App\Models\CR_App;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
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
        $customerId = Auth::id();
        $applications = CR_App::where('fk_customer_id', $customerId)->get();

        return Inertia::render('Applications/Index', [
            'applications' => $applications,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreApplicationRequest $request): RedirectResponse
    {
        $customerId = Auth::id();

        CR_App::create([
            'name' => $request->input('name'),
            'slug' => Str::slug($request->input('name')),
            'description' => $request->input('description'),
            'start_date' => $request->input('start_date'),
            'end_date' => $request->input('end_date'),
            'location' => $request->input('location'),
            'website' => $request->input('website'),
            'fk_customer_id' => $customerId,
        ]);

        return Redirect::route('applications.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(ShowApplicationsRequest $request, CR_App $app): Response
    {
        return Inertia::render('Applications/Show', [
            'application' => $app,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateApplicationRequest $request, CR_App $app): RedirectResponse
    {

        $app->name = $request->input('name');
        $app->slug = Str::slug($request->input('name'));
        $app->description = $request->input('description');
        $app->start_date = $request->input('start_date');
        $app->end_date = $request->input('end_date');
        $app->location = $request->input('location');
        $app->website = $request->input('website');
        $app->save();

        return Redirect::route('applications.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteApplicationRequest $request, CR_App $app): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $app->delete();

        return Redirect::route('applications.index');
    }
}
