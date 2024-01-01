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
        $workstations = $this->input('workstations');

        $ownedByUser = true;

        foreach ($workstations as $workstationData) {
            $workstation = CR_Workstations::find($workstationData['id']);

            $app = $workstation->cr_apps;

            if (!$app->isOwnedBy(Auth::user())) {
                $ownedByUser = false;
                break;
            }

            $products = $workstationData['cr_products'];

            foreach ($products as $productData) {
                $product = CR_Products::find($productData['id']);

                $app = $product->cr_categories_products->cr_apps;
                if (!$app->isOwnedBy(Auth::user())) {
                    $ownedByUser = false;
                    break 2;
                }
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
