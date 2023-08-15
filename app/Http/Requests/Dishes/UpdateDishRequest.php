<?php

namespace App\Http\Requests\Dishes;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateDishRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $dish = $this->route('dish');
        $app = $dish->cr_apps;

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
        $dish = $this->route('dish');
        $app = $dish->cr_apps;

        return [
            'name' => ['required', 'string', 'max:255'],
            'unit' => ['required', 'string', 'max:255'],
            'client_price' => ['required', 'numeric', 'between:0,9999.99'],
            'cost_price' => ['required', 'numeric', 'between:0,9999.99'],
            'is_consigned' => ['boolean'],
        ];
    }
}
