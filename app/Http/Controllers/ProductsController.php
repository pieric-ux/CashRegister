<?php

namespace App\Http\Controllers;

use App\Http\Requests\Products\DeleteProductRequest;
use App\Http\Requests\Products\IndexProductsRequest;
use App\Http\Requests\Products\StoreProductRequeset;
use App\Http\Requests\Products\UpdateProductRequest;
use App\Models\CR_App;
use App\Models\CR_Products;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(IndexProductsRequest $request, CR_App $app): Response
    {
        $products = $app->cr_categories_products->flatMap(function ($category) {
            return $category->cr_products->map(function ($product) {
                $product->picturePath = $product->getPictureUrl();
                return $product;
            });
        });

        return Inertia::render('Customers/Application/Products/Index', [
            'application' => $app,
            'products' => $products,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequeset $request, CR_App $app): RedirectResponse
    {
        $category = $app->cr_categories_products->first();
        $dish = $app->cr_dishes->first();

        $category->cr_products()->create([
            'name' => ucfirst($request->input('name')),
            'description' => $request->input('description'),
            'unit' => $request->input('unit'),
            'client_price' => $request->input('client_price'),
            'cost_price' => $request->input('cost_price'),
            'fk_dishes_id' => $dish->id,
        ]);

        return Redirect::route('products.index', $app);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, CR_Products $product): RedirectResponse
    {
        $product->name = ucfirst($request->input('name'));
        $product->description = $request->input('description');
        $product->unit = $request->input('unit');
        $product->client_price = $request->input('client_price');
        $product->cost_price = $request->input('cost_price');
        $product->save();

        return Redirect::route('products.index', $product->cr_categories_products->cr_apps);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteProductRequest $request, CR_Products $product): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $product->delete();

        return Redirect::route('products.index', $product->cr_categories_products->cr_apps);
    }
}
