<?php

namespace App\Http\Requests\Employees;

use App\Models\CR_Employees;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class DeleteEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $employee = $this->route('employee');
        $employees = $this->input('multipleDeleteDatas');

        if($employee !== null) {
            $module = $employee->cr_workstations->cr_modules;

            return $module->isOwnedBy(Auth::user());
        }

        if(count($employees) > 0) {
            foreach($employees as $employeeData) {
                $employeeId = $employeeData['id'];
                $employee = CR_Employees::find($employeeId);

                $module = $employee->cr_workstations->cr_modules;

                if(!$module->isOwnedBy(Auth::user())) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            //
        ];
    }
}
