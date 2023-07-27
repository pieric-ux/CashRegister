<?php

namespace App\Http\Controllers;

use App\Http\Requests\Workstations\DeleteWorkstationRequest;
use App\Http\Requests\Workstations\IndexWorkstationsRequest;
use App\Http\Requests\Workstations\StoreWorkstationRequest;
use App\Http\Requests\Workstations\UpdateWorkstationRequest;
use App\Models\CR_App;
use App\Models\CR_Workstations;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class WorkstationsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(IndexWorkstationsRequest $request, CR_App $app): Response
    {
        $workstations = $app->cr_workstations->map(function ($workstation) {

            $workstation->cr_employees;

            return $workstation;
        });

        return Inertia::render('Customers/Application/Workstations/Index', [
            'application' => $app,
            'workstations' => $workstations,
            'translations' => [
                'noWorkstationFound' => __('No workstation found.'),
                'listEmployeeTitle' => __('Employee'),
                'listEmployeeFreeTitle' => __('Employee Free'),
                'createWorkstationTitle' => __('Create a Workstation'),
                'createWorkstationLabel' => __('Don\'t have any workstations yet? Looking to add another one? Click the \'Create\' button to begin.'),
                'ariaCreateWorkstationButton' => __('Create a workstation'),
                'buttonCreate' => __('Create'),
                'modalCreateWorkstationTitle' => __('Create Workstation'),
                'modalCreateWorkstationLabel' => __('Ready to create a new workstation? Fill out the form below with the required details and hit the \'Create\' button to get started.'),
                'inputNameLabel' => __('Name'),
                'buttonCancel' => __('Cancel'),
                'buttonCreate' => __('Create'),
                'ariaEditWorkstationButton' => __('Edit the workstation'),
                'modalEditWorkstationTitle' => __('Edit Workstation'),
                'modalEditWorkstationLabel' => __('Ready to update the workstation? Fill out the form below with the required details and click the \'Save\' button to apply the changes.'),
                'buttonSave' => __('Save'),
                'deleteWorkstationTitle' => __('Delete Workstation'),
                'ariaDeleteWorkstationButton' => __('Delete the workstation'),
                'modalConfirmingDeletionTitle' => __('Are you sure you want to delete your workstation?'),
                'modalConfirmingDeletionLabel' => __('Once your workstation is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your workstation.'),
                'inputPasswordLabel' => __('Password'),


            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWorkstationRequest $request, CR_App $app): RedirectResponse
    {
        $app->cr_workstations()->create([
            'name' => ucfirst($request->input('name')),
        ]);

        return Redirect::route('workstations.index', $app);
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWorkstationRequest $request, CR_Workstations $workstation): RedirectResponse
    {
        $workstation->name = ucfirst($request->input('name'));
        $workstation->save();

        return Redirect::route('workstations.index', $workstation->cr_apps->slug);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteWorkstationRequest $request, CR_Workstations $workstation): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $workstation->delete();

        return Redirect::route('workstations.index', $workstation->cr_apps->slug);
    }
}
