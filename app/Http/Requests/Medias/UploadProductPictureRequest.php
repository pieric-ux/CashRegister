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
        // Get the product ID from the request input
        $productId = $this->input('productId');

        // Find the product instance
        $product = CR_Products::find($productId);

        // Get the associated app of the product
        $app = $product->cr_categories_products->cr_apps;

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
            'picture' => ['required', 'image', 'mimes:png,jpg,webp', 'max:2048'],
        ];
    }
}
