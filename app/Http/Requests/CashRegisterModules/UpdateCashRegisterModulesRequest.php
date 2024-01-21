<?php

namespace App\Http\Requests\CashRegisterModules;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateCashRegisterModulesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $module = $this->route('module');

        return $module->isOwnedBy(Auth::user());
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
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        $module = $this->route('module');
        $nameRules = ['required', 'string', 'max:45'];

        if ($module) {
            $nameRules[] = Rule::unique('cr_modules')->ignore($module->id);
        } else {
            $nameRules[] = Rule::unique('cr_modules');
        }

        return [
            'name' => $nameRules,
            'description' => ['nullable', 'string', 'max:255'],
            'start_date' => ['nullable', 'date', 'after:yesterday'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            'location' => ['nullable', 'string', 'max:45'],
            'website' => ['nullable', 'url', 'max:255'],
        ];
    }
}
