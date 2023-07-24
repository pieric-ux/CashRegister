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
use Illuminate\Http\Request;
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
        $categories = $app->cr_categories_products;

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
        $app->cr_categories_products()->create([
            'name' => ucfirst($request->input('name')),
            'order' => $app->cr_categories_products()->count(),
        ]);

        return Redirect::route('categories.index', $app);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategorieProductRequest $request, CR_Categories_Products $category): RedirectResponse
    {
        $category->name = ucfirst($request->input('name'));
        $category->save();

        return Redirect::route('categories.index', $category->cr_apps->slug);
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

        return response()->json([
            'categories' => $categories,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteCategorieProductRequest $request, CR_Categories_Products $category): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $category->delete();

        return Redirect::route('categories.index', $category->cr_apps->slug);
    }
}
