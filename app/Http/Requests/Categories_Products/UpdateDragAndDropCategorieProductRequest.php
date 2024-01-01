<?php

namespace App\Http\Requests\Categories_Products;

use App\Models\CR_Categories_Products;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateDragAndDropCategorieProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $categories = $this->input('categories');

        $ownedByUser = true;

        foreach ($categories as $categoryData) {
            $category = CR_Categories_Products::find($categoryData['id']);

            $app = $category->cr_apps;

            if (!$app->isOwnedBy(Auth::user())) {
                $ownedByUser = false;
                break;
            }
        }
        return $ownedByUser;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'categories' => 'required|array',
            'categories.*.id' => 'required|exists:cr_categories_products,id',
            'categories.*.name' => 'required|string',
            'categories.*.order' => 'required|integer',
            'categories.*.fk_apps_id' => 'required|exists:cr_apps,id',
        ];
    }
}
