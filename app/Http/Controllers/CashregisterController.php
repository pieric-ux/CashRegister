<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CashregisterController extends Controller
{
    /**
     * Display the resource.
     */
    public function show(Request $request): Response
    {
        $employee = $request->user('employee')->load([
            'cr_workstations.cr_products.cr_categories_products',
            'cr_workstations.cr_products.cr_dishes.media',
            'cr_workstations.cr_products.media',
            'cr_workstations.cr_apps.cr_dishes',
        ]);

        $workstation = $employee->cr_workstations;

        $products = $workstation->cr_products->map(function ($product) {
            $product->picture_url = $product->getPictureUrl('thumb');
            return $product;
        });
        $products->pluck('cr_dishes')->unique('id')->map(function ($dish) {
            if ($dish) {
                $dish->picture_url = $dish->getPictureUrl('thumb');
            }
            return $dish;
        });

        $categories = $products->pluck('cr_categories_products')->unique('id')->sortBy('order')->values();

        $dishes = $workstation->cr_apps->cr_dishes->map(function ($dish) {
            $dish->picture_url = $dish->getPictureUrl('thumb');
            return $dish;
        });

        return Inertia::render('Employees/Index', [
            'products' => $products,
            'categories' => $categories,
            'dishes' => $dishes,
        ]);
    }
}
