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
            'translations' => [
                'noEmployeeFound' => __('No employees found.'),
                'createEmployeeTitle' => __('Create an Employee'),
                'createEmployeeLabel' => __('Don\'t have any employee yet? Looking to add another one? Click the \'Create\' button to begin.'),
                'ariaCreateEmployeeButton' => __('Create your employee'),
                'buttonCreate' => __('Create'),
                'modalCreateEmployeeTitle' => __('Create Employee'),
                'modalCreateEmployeeLabel' => __('Ready to create a new employee? Fill out the form below with the required details and hit the \'Create\' button to get started.'),
                'inputFirstNameLabel' => __('First Name'),
                'inputLastNameLabel' => __('Last Name'),
                'inputPhoneLabel' => __('Phone'),
                'inputEmailLabel' => __('Email'),
                'buttonCancel' => __('Cancel'),
                'ariaRegenerateEmployeeButton' => __('Regenerate code for your employee'),
                'ariaEditEmployeeButton' => __('Edit your employee'),
                'modalEditEmployeeTitle' => __('Edit Employee'),
                'modalEditEmployeeLabel' => __('Ready to update the employee? Fill out the form below with the required details and click the \'Save\' button to apply the changes.'),
                'buttonSave' => __('Save'),
                'deleteEmployeeTitle' => __('Delete Employee'),
                'ariaDeleteEmployeeButton' => __('Delete your employee'),
                'modalConfirmingDeletionTitle' => __('Are you sure you want to delete your employee?'),
                'modalConfirmingDeletionLabel' => __('Once your employee is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your employee.'),
                'inputPasswordLabel' => __('Password'),
                'headerActionsTable' => __('Actions'),
                'inputSearchPlaceholder' => __('Search employees'),
                'paginationItemsName' => __('employees'),
                'pagination' => __('of'),
                'previousButton' => __('Previous'),
                'nextButton' => __('Next'),
            ],
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

        $app = $employee->cr_workstations->cr_apps;

        return Redirect::route('employees.index', $app);
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

        //logout employee

        $app = $employee->cr_workstations->cr_apps;

        return Redirect::route('employees.index', $app);
    }
}
