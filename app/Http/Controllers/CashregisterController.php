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
        // Load employee data with related relationships
        $employee = $request->user('employee')->load([
            'cr_workstations.cr_products.cr_categories_products',
            'cr_workstations.cr_products.cr_dishes.media',
            'cr_workstations.cr_products.media',
            'cr_workstations.cr_apps.cr_dishes',
            'cr_workstations.cr_apps.cr_payment_methods',
        ]);

        // Get the employee's workstation
        $workstation = $employee->cr_workstations;

        // Process and prepare product data
        $products = $workstation->cr_products->map(function ($product) {
            $product->picture_url = $product->getPictureUrl('thumb');
            return $product;
        });

        // Process and prepare dish data
        $products->pluck('cr_dishes')->unique('id')->map(function ($dish) {
            if ($dish) {
                $dish->picture_url = $dish->getPictureUrl('thumb');
            }
            return $dish;
        });

        // Process and prepare category data
        $categories = $products->pluck('cr_categories_products')->unique('id')->sortBy('order')->values();

        // Process and prepare dish and payment method data
        $dishes = $workstation->cr_apps->cr_dishes->map(function ($dish) {
            $dish->picture_url = $dish->getPictureUrl('thumb');
            return $dish;
        });

        $paymentMethods = $workstation->cr_apps->cr_payment_methods->map(function ($paymentMethod) {
            $paymentMethod->picture_url = $paymentMethod->getPictureUrl('thumb');
            return $paymentMethod;
        });

        // Render the Inertia view with processed data
        return Inertia::render('Employees/CashRegister/Index', [
            'products' => $products,
            'categories' => $categories,
            'dishes' => $dishes,
            'paymentMethods' => $paymentMethods,
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCashregisterRequest $request)
    {
        // Retrieve authenticated employee and related workstation
        $employee = $request->user('employee');
        $workstation = $employee->cr_workstations;

        // Get cart items and selected payment method from the request
        $cart = $request->input('cart');
        $paymentMethod = $request->input('paymentMethod');


        // Initialize empty cart and total
        $processedCart = [];
        $total = 0;

        // Process cart items for the transaction
        foreach ($cart as $item) {
            // Check if the item ID is empty (invalid)
            if (empty($item['id'])) {
                continue; // Move to the next iteration of the loop
            }

            // Initialize variables for client price, consignment status, and dish details
            $client_price = $item['client_price'];
            $with_consigned = false;
            $dish_details = null;

            // Check if the item has associated dish details
            if (isset($item['cr_dishes'])) {
                $dish = $item['cr_dishes'];

                // Check if the dish is consigned
                if ($dish['is_consigned'] == 1) {
                    // Decrease the client price by subtracting the dish's consignment price
                    $client_price -= $dish['client_price'];
                    $with_consigned = true; // Indicate that the item has consignment
                }

                // Check if the dish name is not "No dish"
                if ($dish['name'] != 'No dish') {
                    // Prepare dish details to be added to the transaction details
                    $dish_details = [
                        'item_id' => $dish['id'],
                        'item_name' => $dish['name'],
                        'client_price' => $dish['client_price'],
                        'unit' => $dish['unit'],
                        'type' => $item['type'],
                    ];
                }
            }


            // Prepare processed cart item
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

        // Get the current date and time
        $now = now();

        // Initialize an array to store details that will be inserted into the database
        $detailsToInsert = [];

        // Loop through each processed cart item to prepare details for insertion
        foreach ($processedCart as $item) {
            // Calculate the total cost for the current item
            $itemTotal = $item['client_price'] * $item['quantity'];
            $total += $itemTotal;

            // If the item is with consigned and has dish details, add the consigned dish cost to the total
            if ($item['with_consigned'] && $item['dish_details']) {
                $total += $item['dish_details']['client_price'] * $item['quantity'];
            }

            // Prepare details for the main item to be inserted
            $detailsToInsert[] = [
                'quantity' => $item['quantity'],
                'item_name' => $item['item_name'],
                'unit' => $item['unit'],
                'client_price' => $item['client_price'],
                'fk_transactions_id' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ];

            // If the item has dish details, prepare details for the associated dish to be inserted
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


        // Generate an order number
        $or_number = 'OR-' . now()->format('YmdHis');

        // Create a new transaction record
        $transaction = CR_Transactions::create([
            'or_number' => $or_number,
            'employee' => $employee->first_name . ' ' . $employee->last_name,
            'workstation' => $workstation->name,
            'total' => $total,
            'fk_paymentMethods_id' => $paymentMethod,
        ]);

        // Assign the transaction ID to the transaction details and insert them
        array_walk($detailsToInsert, function (&$detail) use ($transaction) {
            $detail['fk_transactions_id'] = $transaction->id;
        });

        // Insert the prepared transaction details into the database
        CR_Details_Transactions::insert($detailsToInsert);
    }
}
