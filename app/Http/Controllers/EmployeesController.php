<?php

namespace App\Http\Controllers;

use App\Http\Requests\Employees\DeleteEmployeeRequest;
use App\Http\Requests\Employees\IndexEmployeesRequest;
use App\Http\Requests\Employees\UpdateDragAndDropEmployeesRequest;
use App\Http\Requests\Employees\UpdateEmployeeRequest;
use App\Models\CR_App;
use App\Models\CR_Employees;
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
        $workstations = $app->cr_workstations()->with('cr_employees')->get();

        $employees = $workstations->flatMap(function ($workstation) {
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

        $updates = [];

        foreach ($workstations as $workstationData) {
            $workstationId = $workstationData['id'];
            foreach ($workstationData['cr_employees'] as $employeeData) {
                $updates[$employeeData['id']] = ['fk_workstations_id' => $workstationId];
            }
        }

        if (!empty($updates)) {
            CR_Employees::whereIn('id', array_keys($updates))
                ->each(function ($employee) use ($updates) {
                    $employee->update($updates[$employee->id]);
                });
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
