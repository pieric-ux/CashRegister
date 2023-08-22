<?php

namespace App\Http\Requests\Employees;

use App\Models\CR_Employees;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $employee = $this->route('employee');
        $app = $employee->cr_workstations->cr_apps;

        return $app->isOwnedBy(Auth::user());
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:45'],
            'last_name' => ['required', 'string', 'max:45'],
            'phone' => ['nullable', 'string', 'max:45'],
            'email' => ['required', 'email', 'max:255', Rule::unique(CR_Employees::class)->ignore($this->route('employee')->id)],
        ];
    }
}
