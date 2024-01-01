<?php

namespace App\Http\Requests\Categories_Products;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateCategorieProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $category = $this->route('category');

        $app = $category->cr_apps;

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
        $category = $this->route('category');
        $app = $category->cr_apps;

        return [
            'name' => [
                'required',
                'string',
                'max:45',
                Rule::unique('cr_categories_products')
                    ->where(function ($query) use ($app) {
                        return $query->where('fk_apps_id', $app->id);
                    })
                    ->ignoreModel($this->route('category')),
            ],
        ];
    }
}
