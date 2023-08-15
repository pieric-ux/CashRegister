<?php

namespace App\Http\Requests\Applications;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateApplicationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $app = $this->route('app');

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
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        $app = $this->route('app');
        $nameRules = ['required', 'string', 'max:45'];

        if ($app) {
            $nameRules[] = Rule::unique('cr_apps')->ignore($app->id);
        } else {
            $nameRules[] = Rule::unique('cr_apps');
        }

        return [
            'name' => $nameRules,
            'description' => ['nullable', 'string', 'max:45'],
            'start_date' => ['nullable', 'date', 'after:yesterday'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            'location' => ['nullable', 'string', 'max:45'],
            'website' => ['nullable', 'url', 'max:255'],
        ];
    }
}
