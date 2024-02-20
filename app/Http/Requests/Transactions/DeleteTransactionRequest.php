<?php

namespace App\Http\Requests\Transactions;

use App\Models\CR_Transactions;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class DeleteTransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $transaction = $this->route('transaction');
        $transactions = $this->input('multipleDeleteDatas');
        
        if ($transaction !== null) {
            $module = $transaction->cr_payment_methods->cr_modules;
    
            return $module->isOwnedBy(Auth::user());
        }

        if (count($transactions) > 0 ) {
            foreach($transactions as $transactionData ) {
                $transactionId = $transactionData['id'];
                $transaction = CR_Transactions::find($transactionId);

                $module = $transaction->cr_payment_methods->cr_modules;
               
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
