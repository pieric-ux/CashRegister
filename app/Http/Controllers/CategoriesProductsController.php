<?php

namespace App\Http\Controllers;

use App\Http\Requests\Categories_Products\DeleteCategorieProductRequest;
use App\Http\Requests\Categories_Products\IndexCategoriesProductsRequest;
use App\Http\Requests\Categories_Products\StoreCategorieProductRequest;
use App\Http\Requests\Categories_Products\UpdateCategorieProductRequest;
use App\Http\Requests\Categories_Products\UpdateDragAndDropCategorieProductRequest;
use App\Models\CR_Module;
use App\Models\CR_Categories_Products;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class CategoriesProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(IndexCategoriesProductsRequest $request, CR_Module $module): Response
    {
        $module->cr_categories_products;

        return Inertia::render('Customers/Modules/CashRegisterModule/Configurations/Categories_Products/Index', [
            'cashRegisterModule' => $module,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategorieProductRequest $request, CR_Module $module): RedirectResponse
    {
        $module->cr_categories_products()->create([
            'name' => ucfirst($request->input('name')),
            'order' => $module->cr_categories_products()->count(),
        ]);

        return Redirect::route('categories.index', $module);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategorieProductRequest $request, CR_Categories_Products $category): RedirectResponse
    {
        $category->name = ucfirst($request->input('name'));
        $category->save();

        return Redirect::route('categories.index', $category->cr_modules);
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateDragAndDrop(UpdateDragAndDropCategorieProductRequest $request)
    {
        $categories = $request->input('categories');

        foreach ($categories as $categoryData) {
            $category = CR_Categories_Products::find($categoryData['id']);
            $category->order = $categoryData['order'];
            $category->save();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteCategorieProductRequest $request, CR_Categories_Products $category): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $defaultCategory = $category->where('fk_cr_modules_id', $category->fk_cr_modules_id)->where('name', 'No category')->first();
        $products = $category->cr_products;

        if ($products) {
            foreach ($products as $product) {
                $product->fk_categories_products_id = $defaultCategory->id;
                $product->save();
            }
        }

        $category->delete();

        return Redirect::route('categories.index', $category->cr_modules);
    }
}
