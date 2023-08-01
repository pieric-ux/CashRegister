<?php

namespace App\Http\Controllers;

use App\Http\Requests\Employees\DeleteEmployeeRequest;
use App\Http\Requests\Employees\IndexEmployeesRequest;
use App\Http\Requests\Employees\UpdateDragAndDropEmployeesRequest;
use App\Http\Requests\Employees\UpdateEmployeeRequest;
use App\Models\CR_App;
use App\Models\CR_Employees;
use App\Models\CR_Workstations;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class EmployeesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(IndexEmployeesRequest $request, CR_App $app): Response
    {
        $employees = $app->cr_workstations->flatMap(function ($workstation) {
            return $workstation->cr_employees;
        });

        return Inertia::render('Customers/Application/Employees/Index', [
            'application' => $app,
            'employees' => $employees,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeRequest $request, CR_Employees $employee): RedirectResponse
    {
        $employee->first_name = ucfirst($request->input('first_name'));
        $employee->last_name = ucfirst($request->input('last_name'));
        $employee->phone = $request->input('phone');
        $employee->email = $request->input('email');
        $employee->save();

        return Redirect::route('employees.index', $employee->cr_workstations->cr_apps);
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateDragAndDrop(UpdateDragAndDropEmployeesRequest $request)
    {
        $workstations = $request->input('workstations');

        foreach ($workstations as $workstationData) {
            $workstation = CR_Workstations::find($workstationData['id']);
            $employees = $workstationData['cr_employees'];

            foreach ($employees as $employeeData) {
                $employee = CR_Employees::find($employeeData['id']);
                $employee->fk_workstations_id = $workstation->id;
                $employee->save();
            }
        }
        return response()->json([
            'workstations' => $workstations,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteEmployeeRequest $request, CR_Employees $employee): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $employee->delete();

        return Redirect::route('employees.index', $employee->cr_workstations->cr_apps);
    }
}
