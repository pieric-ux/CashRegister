<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCashregisterRequest;
use App\Models\CR_Details_Transactions;
use App\Models\CR_Transactions;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CashregisterController extends Controller
{
    /**
     * Display the resource.
     */
    public function index(Request $request): Response
    {
        $request->user('employee')->load([
            'cr_workstations.cr_products.media',
            'cr_workstations.cr_products.cr_dishes.media',
            'cr_workstations.cr_products.cr_categories_products',
            'cr_workstations.cr_modules.cr_dishes.media',
            'cr_workstations.cr_modules.cr_payment_methods.media',
        ]);

        return Inertia::render('Employees/CashRegister/Index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCashregisterRequest $request)
    {
        $employee = $request->user('employee');
        $workstation = $employee->cr_workstations;

        $cart = $request->input('cart');
        $paymentMethod = $request->input('paymentMethod');

        $processedCart = [];
        $total = 0;

        foreach ($cart as $item) {
            if (empty($item['id'])) {
                continue;
            }

            $client_price = $item['client_price'];
            $with_consigned = false;
            $dish_details = null;

            if (isset($item['cr_dishes'])) {
                $dish = $item['cr_dishes'];

                if ($dish['is_consigned'] == 1) {
                    $client_price -= $dish['client_price'];
                    $with_consigned = true;
                }

                if ($dish['name'] != 'No dish') {
                    $dish_details = [
                        'item_id' => $dish['id'],
                        'item_name' => $dish['name'],
                        'client_price' => $dish['client_price'],
                        'unit' => $dish['unit'],
                        'type' => $item['type'],
                    ];
                }
            }

            $processedCart[] = [
                'item_id' => $item['id'],
                'item_name' => $item['name'],
                'quantity' => $item['quantity'],
                'client_price' => $client_price,
                'unit' => $item['unit'],
                'type' => $item['type'],
                'with_consigned' => $with_consigned,
                'dish_details' => $dish_details
            ];
        }

        $now = now();

        $detailsToInsert = [];

        foreach ($processedCart as $item) {
            $itemTotal = $item['client_price'] * $item['quantity'];
            $total += $itemTotal;

            if ($item['with_consigned'] && $item['dish_details']) {
                $total += $item['dish_details']['client_price'] * $item['quantity'];
            }

            $detailsToInsert[] = [
                'quantity' => $item['quantity'],
                'item_name' => $item['item_name'],
                'unit' => $item['unit'],
                'client_price' => $item['client_price'],
                'fk_transactions_id' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ];

            if ($item['dish_details']) {
                $detailsToInsert[] = [
                    'quantity' => $item['quantity'],
                    'item_name' => $item['dish_details']['item_name'],
                    'unit' => $item['dish_details']['unit'],
                    'client_price' => $item['dish_details']['client_price'],
                    'fk_transactions_id' => null,
                    'created_at' => $now,
                    'updated_at' => $now,
                ];
            }
        }

        $or_number = 'OR-' . now()->format('YmdHis');

        $transaction = CR_Transactions::create([
            'or_number' => $or_number,
            'employee' => $employee->first_name . ' ' . $employee->last_name,
            'workstation' => $workstation->name,
            'total' => $total,
            'fk_paymentMethods_id' => $paymentMethod,
        ]);

        array_walk($detailsToInsert, function (&$detail) use ($transaction) {
            $detail['fk_transactions_id'] = $transaction->id;
        });

        CR_Details_Transactions::insert($detailsToInsert);
    }
}
