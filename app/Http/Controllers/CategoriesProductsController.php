<?php

namespace App\Http\Controllers;

use App\Http\Requests\Categories_Products\DeleteCategorieProductRequest;
use App\Http\Requests\Categories_Products\IndexCategoriesProductsRequest;
use App\Http\Requests\Categories_Products\StoreCategorieProductRequest;
use App\Http\Requests\Categories_Products\UpdateCategorieProductRequest;
use App\Http\Requests\Categories_Products\UpdateDragAndDropCategorieProductRequest;
use App\Models\CR_App;
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
    public function index(IndexCategoriesProductsRequest $request, CR_App $app): Response
    {
        // Retrieve categories associated with the application
        $categories = $app->cr_categories_products;

        // Render the Inertia view with application and categories data
        return Inertia::render('Customers/Application/Categories_Products/Index', [
            'application' => $app,
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategorieProductRequest $request, CR_App $app): RedirectResponse
    {
        // Create a new category with the provided data
        $app->cr_categories_products()->create([
            'name' => ucfirst($request->input('name')),
            'order' => $app->cr_categories_products()->count(),
        ]);

        // Redirect to the categories index page for the current app
        return Redirect::route('categories.index', $app);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategorieProductRequest $request, CR_Categories_Products $category): RedirectResponse
    {
        // Update the category's name with the provided data
        $category->name = ucfirst($request->input('name'));
        $category->save();

        // Redirect to the categories index page for the current app
        return Redirect::route('categories.index', $category->cr_apps);
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateDragAndDrop(UpdateDragAndDropCategorieProductRequest $request)
    {
        // Retrieve category data and update order based on user's drag and drop interaction
        $categories = $request->input('categories');

        foreach ($categories as $categoryData) {
            $category = CR_Categories_Products::find($categoryData['id']);
            $category->order = $categoryData['order'];
            $category->save();
        }

        // Return JSON response with updated categories data
        return response()->json([
            'categories' => $categories,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteCategorieProductRequest $request, CR_Categories_Products $category): RedirectResponse
    {
        // Validate the current user's password
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        // Retrieve the default category to be used for reassignment
        $defaultCategory = $category->where('fk_apps_id', $category->fk_apps_id)->where('name', 'No category')->first();
        $products = $category->cr_products;

        // Reassign associated products to the default category
        if ($products) {
            foreach ($products as $product) {
                $product->fk_categories_products_id = $defaultCategory->id;
                $product->save();
            }
        }

        // Delete the specified category
        $category->delete();

        // Redirect to the categories index page for the current app
        return Redirect::route('categories.index', $category->cr_apps);
    }
}
