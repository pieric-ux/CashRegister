<?php

namespace App\Http\Requests\Employees;

use App\Models\CR_Employees;
use App\Models\CR_Workstations;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateDragAndDropEmployeesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Get the array of workstation data from the request input
        $workstations = $this->input('workstations');

        // Initialize a flag to track ownership by the user
        $ownedByUser = true;

        // Loop through each workstation data
        foreach ($workstations as $workstationData) {
            // Find the workstation instance
            $workstation = CR_Workstations::find($workstationData['id']);

            // Get the associated app of the workstation
            $app = $workstation->cr_apps;

            // Check if the app is owned by the authenticated user
            if (!$app->isOwnedBy(Auth::user())) {
                $ownedByUser = false;
                break;
            }

            // Get the array of employee data for the workstation
            $employees = $workstationData['cr_employees'];

            // Loop through each employee data
            foreach ($employees as $employeeData) {
                // Find the employee instance
                $employee = CR_Employees::find($employeeData['id']);

                // Get the associated app of the employee
                $app = $employee->cr_workstations->cr_apps;
                // Check if the app is owned by the authenticated user
                if (!$app->isOwnedBy(Auth::user())) {
                    $ownedByUser = false;
                    break 2; // Break out of both loops
                }
            }
        }
        // Return the ownership status
        return $ownedByUser;
    }



    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'workstations' => 'required|array',
            'workstations.*.id' => 'required|exists:cr_workstations,id',
            'workstations.*.name' => 'required|string',
            'workstations.*.fk_apps_id' => 'required|exists:cr_apps,id',
            'workstations.*.cr_employees' => 'nullable|array',
            'workstations.*.cr_employees.*.id' => 'nullable|exists:cr_employees,id',
            'workstations.*.cr_employees.*.first_name' => 'nullable|string',
            'workstations.*.cr_employees.*.last_name' => 'nullable|string',
        ];
    }
}
