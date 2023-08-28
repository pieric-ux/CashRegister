<?php

namespace App\Http\Requests\Products;

use App\Models\CR_Products;
use App\Models\CR_Workstations;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateDragAndDropProductsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Get the array of workstation data from the request input
        $workstations = $this->input('workstations');

        // Initialize a flag to track ownership by the user
        $ownedByUser = true;

        // Loop through each workstation data
        foreach ($workstations as $workstationData) {
            // Find the workstation instance
            $workstation = CR_Workstations::find($workstationData['id']);

            // Get the associated app of the workstation
            $app = $workstation->cr_apps;

            // Check if the app is owned by the authenticated user
            if (!$app->isOwnedBy(Auth::user())) {
                $ownedByUser = false;
                break;
            }

            // Get the array of product data for the workstation
            $products = $workstationData['cr_products'];

            // Loop through each product data
            foreach ($products as $productData) {
                // Find the product instance
                $product = CR_Products::find($productData['id']);

                // Get the associated app of the product
                $app = $product->cr_categories_products->cr_apps;
                // Check if the app is owned by the authenticated user
                if (!$app->isOwnedBy(Auth::user())) {
                    $ownedByUser = false;
                    break 2; // Break out of both loops
                }
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
            'workstations' => 'required|array',
            'workstations.*.id' => 'required|exists:cr_workstations,id',
            'workstations.*.name' => 'required|string',
            'workstations.*.fk_apps_id' => 'required|exists:cr_apps,id',
            'workstations.*.cr_products' => 'nullable|array',
            'workstations.*.cr_products.*.id' => 'nullable|exists:cr_products,id',
            'workstations.*.cr_products.*.name' => 'nullable|string',
            'workstations.*.cr_products.*.unit' => 'nullable|string',
        ];
    }
}
