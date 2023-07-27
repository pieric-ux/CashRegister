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
        $customer = Auth::user();
        $applications = $customer->cr_apps->map(function ($app) {
            $app->posterPath = $app->getPosterUrl();
            return $app;
        });

        return Inertia::render('Customers/Applications/Index', [
            'applications' => $applications,
            'translations' => [
                'noApplicationFound' => __('No application found.'),
                'createApplicationTitle' => __('Create an Application'),
                'createApplicationLabel' => __('Don\'t have any applications yet? Looking to add another one? Click the \'Create\' button to begin.'),
                'ariaCreateApplicationButton' => __('Create your app'),
                'buttonCreate' => __('Create'),
                'modalCreateAppTitle' => __('Create App'),
                'modalCreateAppLabel' => __('Ready to create a new application? Fill out the form below with the required details and hit the \'Create\' button to get started.'),
                'inputNameLabel' => __('Name'),
                'inputDescriptionLabel' => __('Description'),
                'inputStartDateLabel' => __('Start Date'),
                'inputEndDateLabel' => __('End Date'),
                'inputLocationLabel' => __('Location'),
                'inputWebsiteLabel' => __('Website'),
                'buttonCancel' => __('Cancel'),
                'ariaConfigureApplicationButton' => __('Configure your app'),
                'ariaEditApplicationButton' => __('Edit your app'),
                'editApplicationTitle' => __('Edit App'),
                'editApplicationLabel' => __('Ready to update the application? Fill out the form below with the required details and click the \'Save\' button to apply the changes.'),
                'buttonSave' => __('Save'),
                'deleteAppTitle' => __('Delete App'),
                'ariaDeleteAppButton' => __('Delete your app'),
                'modalConfirmingDeletionTitle' => __('Are you sure you want to delete your app?'),
                'modalConfirmingDeletionLabel' => __('Once your app is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your app.'),
                'inputPasswordLabel' => __('Password'),
                'ariaAppPosterUpdate' => __('Upload your app\'s image')
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreApplicationRequest $request): RedirectResponse
    {
        $customer = Auth::user();

        $customer->cr_apps()->create([
            'name' => ucfirst($request->input('name')),
            'slug' => Str::slug($request->input('name')),
            'description' => $request->input('description'),
            'start_date' => $request->input('start_date'),
            'end_date' => $request->input('end_date'),
            'location' => ucfirst($request->input('location')),
            'website' => $request->input('website'),
        ]);

        return Redirect::route('applications.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(ShowApplicationRequest $request, CR_App $app): Response
    {
        return Inertia::render('Customers/Application/Dashboard', [
            'application' => $app,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateApplicationRequest $request, CR_App $app): RedirectResponse
    {
        $app->name = ucfirst($request->input('name'));
        $app->slug = Str::slug($request->input('name'));
        $app->description = $request->input('description');
        $app->start_date = $request->input('start_date');
        $app->end_date = $request->input('end_date');
        $app->location = ucfirst($request->input('location'));
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
