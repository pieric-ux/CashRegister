<?php

namespace App\Http\Requests;

use App\Models\CR_Dishes;
use App\Models\CR_PaymentMethods;
use App\Models\CR_Products;
use Illuminate\Foundation\Http\FormRequest;

class StoreCashregisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Get the authenticated employee
        $employee = $this->user('employee');

        // Get the associated workstation of the employee
        $workstation = $employee->cr_workstations;

        // Get the selected payment method
        $paymentMethod = CR_PaymentMethods::find($this->input('paymentMethod'));

        // If the workstation is not associated with the employee, return false
        if (!$workstation) {
            return false;
        }

        // Iterate through the items in the cart
        foreach ($this->input('cart') as $item) {
            if ($item['type'] === 'product') {
                // Check if the product in the cart exists and is associated with the workstation
                $product = CR_Products::find($item['id']);
                if (!$product || !$product->cr_workstations->contains($workstation->id)) {
                    return false;
                }

                // Check if the associated dish (if any) belongs to the same app as the workstation
                if (isset($item['cr_dishes'])) {
                    $dish = CR_Dishes::find($item['cr_dishes']['id']);
                    if (!$dish || $dish->cr_apps->id != $workstation->cr_apps->id) {
                        return false;
                    }
                }
            } elseif (in_array($item['type'], ['return', 'dishes'])) {
                // Check if the dish in the cart belongs to the same app as the workstation
                $dish = CR_Dishes::find($item['id']);
                if (!$dish || $dish->cr_apps->id != $workstation->cr_apps->id) {
                    return false;
                }
            }
        }

        // Check if the selected payment method belongs to the same app as the workstation
        if ($paymentMethod && $paymentMethod->cr_apps->id == $workstation->cr_apps->id) {
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
            'cart' => ['required', 'array'],
            'cart.*.id' => ['required', 'integer'],
            'cart.*.name' => ['required', 'string'],
            'cart.*.quantity' => ['required', 'integer', 'min:1'],
            'cart.*.client_price' => ['required', 'numeric', 'between:-9999.99,9999.99'],
            'paymentMethod' => ['required', 'integer'],
        ];
    }
}
