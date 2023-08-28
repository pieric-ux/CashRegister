<?php

namespace App\Http\Controllers;

use App\Http\Requests\Transactions\DeleteTransactionRequest;
use App\Http\Requests\Transactions\IndexTransactionsRequest;
use App\Models\CR_App;
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
    public function index(IndexTransactionsRequest $request, CR_App $app): Response
    {
        // Load payment methods with their associated transactions and details
        $paymentMethods = $app->cr_payment_methods()
            ->with('cr_transactions', 'cr_transactions.cr_payment_methods', 'cr_transactions.cr_details_transactions')
            ->get();

        // Combine all transactions from different payment methods into a single collection
        $transactions = $paymentMethods->flatMap(function ($paymentMethod) {
            return $paymentMethod->cr_transactions;
        });

        // Render the Inertia view with application and transaction data
        return Inertia::render('Customers/Application/Transactions/Index', [
            'application' => $app,
            'transactions' => $transactions,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteTransactionRequest $request, CR_Transactions $transaction): RedirectResponse
    {
        // Validate the current user's password before proceeding
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        // Delete the specified transaction
        $transaction->delete();

        // Redirect back to the transactions index page
        return Redirect::route('transactions.index', $transaction->cr_payment_methods->cr_apps);
    }
}
