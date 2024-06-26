<?php

namespace App\Http\Requests\Medias;

use App\Models\CR_Products;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UploadProductPictureRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $productId = $this->input('itemId');

        $product = CR_Products::find($productId);

        $module = $product->cr_categories_products->cr_modules;

        return $module->isOwnedBy(Auth::user());
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'picture' => ['required', 'image', 'mimes:png,jpg,webp', 'max:2048'],
        ];
    }
}
