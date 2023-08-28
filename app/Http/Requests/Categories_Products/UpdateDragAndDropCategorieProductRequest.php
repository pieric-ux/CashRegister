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
        // Get the array of category data from the request input
        $categories = $this->input('categories');

        // Initialize a flag to track ownership by the user
        $ownedByUser = true;

        // Loop through each category data
        foreach ($categories as $categoryData) {
            // Find the category instance
            $category = CR_Categories_Products::find($categoryData['id']);

            // Get the associated app of the category
            $app = $category->cr_apps;

            // Check if the app is owned by the authenticated user
            if (!$app->isOwnedBy(Auth::user())) {
                $ownedByUser = false;
                break;
            }
        }
        // Return the ownership status
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
