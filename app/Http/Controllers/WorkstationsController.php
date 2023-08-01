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

        return Redirect::route('workstations.index', $workstation->cr_apps);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteWorkstationRequest $request, CR_Workstations $workstation): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $defaultWorkstation = CR_Workstations::where('fk_apps_id', $workstation->fk_apps_id)->where('name', 'Pending assignements')->first();
        $employees = $workstation->cr_employees;

        if ($employees) {
            foreach ($employees as $employee) {
                $employee->fk_workstations_id = $defaultWorkstation->id;
                $employee->save();
            }
        }

        $workstation->delete();

        return Redirect::route('workstations.index', $workstation->cr_apps);
    }
}
