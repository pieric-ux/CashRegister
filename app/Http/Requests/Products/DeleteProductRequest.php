<?php

namespace App\Http\Requests\Products;

use App\Models\CR_Products;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class DeleteProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $product = $this->route('product');
        $products = $this->input('multipleDeleteDatas');

        if ($product !== null) {
            $module = $product->cr_categories_products->cr_modules;
    
            return $module->isOwnedBy(Auth::user());
        }

        if (count($products) > 0) {
            foreach($products as $productData) {
                $productId = $productData['id'];
                $product = CR_Products::find($productId);

                $module = $product->cr_categories_products->cr_modules;
                
                if (!$module->isOwnedBy(Auth::user())) {
                    return false;
                }
            }
            return true;
        }
        return false;
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
