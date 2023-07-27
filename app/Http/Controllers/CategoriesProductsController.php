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
        $categories = $app->cr_categories_products;

        return Inertia::render('Customers/Application/Categories_Products/Index', [
            'application' => $app,
            'categories' => $categories,
            'translations' => [
                'noCategoryFound' => __('No categories of products found.'),
                'createCategoryTitle' => __('Create a Category of Product'),
                'createCategoryLabel' => __('Don\'t have any category of product yet? Looking to add another one? Click the \'Create\' button to begin.'),
                'ariaCreateCategoryButton' => __('Create your category of product'),
                'buttonCreate' => __('Create'),
                'modalCreateCategoryTitle' => __('Create Category of Product'),
                'modalCreateCategoryLabel' => __('Ready to create a new category of product? Fill out the form below with the required details and hit the \'Create\' button to get started.'),
                'inputNameLabel' => __('Name'),
                'buttonCancel' => __('Cancel'),
                'ariaEditCategoryButton' => __('Edit the category of product'),
                'modalEditCategoryTitle' => __('Edit Category of product'),
                'modalEditCategoryLabel' => __('Ready to update the category of product? Fill out the form below with the required details and click the \'Save\' button to apply the changes.'),
                'buttonSave' => __('Save'),
                'deleteCategorieTitle' => __('Delete Category'),
                'ariaDeleteCategoryButton' => __('Delete the category of product'),
                'modalConfirmingDeletionTitle' => __('Are you sure you want to delete your category of product?'),
                'modalConfirmingDeletionLabel' => __('Once your category of product is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your category of product.'),
                'inputPasswordLabel' => __('Password'),
            ],
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
