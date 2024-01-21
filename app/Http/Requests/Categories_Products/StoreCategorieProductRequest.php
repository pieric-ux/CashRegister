<?php

namespace App\Http\Requests\Categories_Products;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StoreCategorieProductRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $module = $this->route('module');

        return [
            'name' => [
                'required',
                'string',
                'max:45',
                Rule::unique('cr_categories_products')->where(function ($query) use ($module) {
                    return $query->where('fk_cr_modules_id', $module->id);
                }),
            ],
        ];
    }
}
