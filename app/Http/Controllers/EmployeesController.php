<?php

namespace App\Http\Controllers;

use App\Http\Requests\Employees\DeleteEmployeeRequest;
use App\Http\Requests\Employees\IndexEmployeesRequest;
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
        $employee->first_name = $request->input('first_name');
        $employee->last_name = $request->input('last_name');
        $employee->phone = $request->input('phone');
        $employee->email = $request->input('email');
        $employee->save();

        $app = $employee->cr_workstations->cr_apps;

        return Redirect::route('employees.index', $app);
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

        $app = $employee->cr_workstations->cr_apps;

        return Redirect::route('employees.index', $app);
    }
}
