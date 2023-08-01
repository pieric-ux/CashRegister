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
        $dishes = $app->cr_dishes;

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
        $app->cr_dishes()->create([
            'name' => ucfirst($request->input('name')),
            'unit' => $request->input('unit'),
            'client_price' => $request->input('client_price'),
            'cost_price' => $request->input('cost_price'),
            'is_consigned' => $request->input('is_consigned'),
        ]);

        return Redirect::route('dishes.index', $app);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDishRequest $request, CR_Dishes $dish): RedirectResponse
    {
        $dish->name = ucfirst($request->input('name'));
        $dish->unit = $request->input('unit');
        $dish->client_price = $request->input('client_price');
        $dish->cost_price = $request->input('cost_price');
        $dish->is_consigned = $request->input('is_consigned');
        $dish->save();

        return Redirect::route('dishes.index', $dish->cr_apps);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteDishRequest $request, CR_Dishes $dish): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $dish->delete();

        return Redirect::route('dishes.index', $dish->cr_apps);
    }
}
