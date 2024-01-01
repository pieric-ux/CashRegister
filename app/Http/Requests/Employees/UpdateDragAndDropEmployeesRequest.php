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
        $workstations = $this->input('workstations');

        $ownedByUser = true;

        foreach ($workstations as $workstationData) {
            $workstation = CR_Workstations::find($workstationData['id']);

            $app = $workstation->cr_apps;

            if (!$app->isOwnedBy(Auth::user())) {
                $ownedByUser = false;
                break;
            }

            $employees = $workstationData['cr_employees'];

            foreach ($employees as $employeeData) {
                $employee = CR_Employees::find($employeeData['id']);

                $app = $employee->cr_workstations->cr_apps;
                if (!$app->isOwnedBy(Auth::user())) {
                    $ownedByUser = false;
                    break 2;
                }
            }
        }
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
