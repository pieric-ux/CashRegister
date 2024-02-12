<?php

namespace App\Http\Controllers;

use App\Http\Requests\Transactions\DeleteTransactionRequest;
use App\Http\Requests\Transactions\IndexTransactionsRequest;
use App\Models\CR_Module;
use App\Models\CR_Transactions;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class TransactionsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(IndexTransactionsRequest $request, CR_Module $module): Response
    {
        $paymentMethods = $module->cr_payment_methods()
            ->with('cr_transactions', 'cr_transactions.cr_payment_methods', 'cr_transactions.cr_details_transactions')
            ->get();

        $transactions = $paymentMethods->flatMap(function ($paymentMethod) {
            return $paymentMethod->cr_transactions;
        });

        $module->cr_transactions = $transactions;

        return Inertia::render('Customers/Modules/CashRegisterModule/Configurations/Transactions/Index', [
            'cashRegisterModule' => $module,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteTransactionRequest $request, CR_Transactions $transaction): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $transaction->delete();

        return Redirect::route('transactions.index', $transaction->cr_payment_methods->cr_modules);
    }
}
