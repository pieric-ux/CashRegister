<?php

namespace App\Http\Requests\Workstations;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateWorkstationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $workstation = $this->route('workstation');

        $app = $workstation->cr_apps;

        return $app->isOwnedBy(Auth::user());
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'name' => ucfirst($this->input('name'))
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $workstation = $this->route('workstation');
        $app = $workstation->cr_apps;

        return [
            'name' => [
                'required',
                'string',
                'max:45',
                Rule::unique('cr_workstations')
                    ->where(function ($query) use ($app) {
                        return $query->where('fk_apps_id', $app->id);
                    })
                    ->ignoreModel($this->route('workstation')),
            ],
        ];
    }
}
