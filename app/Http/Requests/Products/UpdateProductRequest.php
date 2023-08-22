<?php

namespace App\Http\Requests\Products;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $product = $this->route('product');
        $app = $product->cr_categories_products->cr_apps;

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
            'name' => ['required', 'string', 'max:45'],
            'unit' => ['required', 'string', 'max:45'],
            'client_price' => ['required', 'numeric', 'between:0,9999.99'],
            'cost_price' => ['required', 'numeric', 'between:0,9999.99'],
            'category' => [
                'required',
                'integer',
                Rule::exists('cr_categories_products', 'id')->where(function ($query) {
                    $query->where('fk_apps_id', $this->product->cr_categories_products->fk_apps_id);
                })
            ],
            'dish' => [
                'required',
                'integer',
                Rule::exists('cr_dishes', 'id')->where(function ($query) {
                    $query->where('fk_apps_id', $this->product->cr_dishes->fk_apps_id);
                })
            ],
        ];
    }
}
