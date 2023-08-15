<?php

namespace App\Http\Requests;

use App\Models\Customer;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'company_name' => ['nullable', 'string', 'max:45'],
            'first_name' => ['required', 'string', 'max:45'],
            'last_name' => ['required', 'string', 'max:45'],
            'address' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:45'],
            'npa' => ['required', 'integer'],
            'phone' => ['nullable', 'string', 'max:45'],
            'email' => ['required', 'email', 'max:255', Rule::unique(Customer::class)->ignore($this->user()->id)],
        ];
    }
}
