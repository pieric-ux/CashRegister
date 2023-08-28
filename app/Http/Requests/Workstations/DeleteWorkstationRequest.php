<?php

namespace App\Http\Requests\Workstations;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class DeleteWorkstationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Get the workstation instance from the route parameter
        $workstation = $this->route('workstation');

        // Get the associated app of the workstation
        $app = $workstation->cr_apps;

        // Check if the app is owned by the authenticated user
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
            //
        ];
    }
}
