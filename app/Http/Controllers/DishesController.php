<?php

namespace App\Http\Controllers;

use App\Http\Requests\Dishes\DeleteDishRequest;
use App\Http\Requests\Dishes\IndexDishesRequest;
use App\Http\Requests\Dishes\StoreDishRequest;
use App\Http\Requests\Dishes\UpdateDishRequest;
use App\Models\CR_App;
use App\Models\CR_Dishes;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class DishesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(IndexDishesRequest $request, CR_App $app): Response
    {
        // Retrieve and map dishes data with thumbnail picture path
        $dishes = $app->cr_dishes->map(function ($dish) {
            $dish->picturePath = $dish->getPictureUrl('thumb');
            return $dish;
        });

        // Render the Inertia view with application and dishes data
        return Inertia::render('Customers/Application/Dishes/Index', [
            'application' => $app,
            'dishes' => $dishes,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDishRequest $request, CR_App $app): RedirectResponse
    {
        // Create a new dish with the provided data
        $app->cr_dishes()->create([
            'name' => ucfirst($request->input('name')),
            'unit' => $request->input('unit'),
            'client_price' => $request->input('is_consigned') ? $request->input('client_price') : 0,
            'cost_price' => $request->input('cost_price'),
            'is_consigned' => $request->input('is_consigned'),
            'is_SoldSeparately' => $request->input('is_SoldSeparately'),
        ]);

        // Redirect to the dishes index page for the current app
        return Redirect::route('dishes.index', $app);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDishRequest $request, CR_Dishes $dish): RedirectResponse
    {
        // Update the dish's properties with the provided data
        $dish->name = ucfirst($request->input('name'));
        $dish->unit = $request->input('unit');
        $dish->client_price = $request->input('is_consigned') ? $request->input('client_price') : 0;
        $dish->cost_price = $request->input('cost_price');
        $dish->is_consigned = $request->input('is_consigned');
        $dish->is_SoldSeparately = $request->input('is_SoldSeparately');
        $dish->save();

        // Redirect to the dishes index page for the current app
        return Redirect::route('dishes.index', $dish->cr_apps);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteDishRequest $request, CR_Dishes $dish): RedirectResponse
    {
        // Validate the current user's password
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        // Retrieve the default dish to be used for reassignment
        $defaultDish = $dish->where('fk_apps_id', $dish->fk_apps_id)->where('name', 'No dish')->first();
        $products = $dish->cr_products;

        // Reassign associated products to the default dish
        if ($products) {
            foreach ($products as $product) {
                $product->fk_dishes_id = $defaultDish->id;
                $product->save();
            }
        }

        // Delete the specified dish
        $dish->delete();

        // Redirect to the dishes index page for the current app
        return Redirect::route('dishes.index', $dish->cr_apps);
    }
}
