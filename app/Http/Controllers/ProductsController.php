<?php

namespace App\Http\Controllers;

use App\Http\Requests\Products\DeleteProductRequest;
use App\Http\Requests\Products\IndexProductsRequest;
use App\Http\Requests\Products\StoreProductRequeset;
use App\Http\Requests\Products\UpdateDragAndDropProductsRequest;
use App\Http\Requests\Products\UpdateProductRequest;
use App\Models\CR_Categories_Products;
use App\Models\CR_Dishes;
use App\Models\CR_Module;
use App\Models\CR_Products;
use App\Models\CR_Workstations;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(IndexProductsRequest $request, CR_Module $module): Response
    {
        $categories = $module->cr_categories_products()->with('cr_products.cr_categories_products', 'cr_products.cr_dishes')->get();

        $products = $categories->flatMap(function ($category) {
            return $category->cr_products->map(function ($product) {
                $product->picturePath = $product->getPictureUrl('thumb');
                return $product;
            });
        });

        $module->cr_categories_products = $categories;
        $module->cr_products = $products;
        $module->cr_dishes;

        return Inertia::render('Customers/Modules/CashRegisterModule/Configurations/Products/Index', [
            'cashRegisterModule' => fn () => $module,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequeset $request, CR_Module $module): RedirectResponse
    {
        $category = $module->cr_categories_products->first();
        $dish = $module->cr_dishes->first();

        $category->cr_products()->create([
            'name' => ucfirst($request->input('name')),
            'unit' => $request->input('unit'),
            'client_price' => $request->input('client_price'),
            'cost_price' => $request->input('cost_price'),
            'fk_dishes_id' => $dish->id,
        ]);

        return Redirect::route('products.index', $module);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, CR_Products $product): RedirectResponse
    {
        $categoryId = CR_Categories_Products::where('name', $request->input('category'))
        ->where('fk_cr_modules_id', $product->cr_categories_products->fk_cr_modules_id)
        ->value('id');

        $dishId = CR_Dishes::where('name', $request->input('dish'))
        ->where('fk_cr_modules_id', $product->cr_dishes->fk_cr_modules_id)
        ->value('id');

        $product->name = ucfirst($request->input('name'));
        $product->unit = $request->input('unit');
        $product->client_price = $request->input('client_price');
        $product->cost_price = $request->input('cost_price');
        $product->fk_categories_products_id = $categoryId;
        $product->fk_dishes_id = $dishId;
        $product->save();

        return Redirect::route('products.index', $product->cr_categories_products->cr_modules);
    }

    /**
     * Update the specified resource in storage using drag and drop.
     */
    public function updateDragAndDrop(UpdateDragAndDropProductsRequest $request)
    {
        $workstations = $request->input('workstations');

        foreach ($workstations as $workstationData) {
            $workstation = CR_Workstations::find($workstationData['id']);

            $productsWithOrder = $workstationData['cr_products'];

            $syncData = [];
            foreach ($productsWithOrder as $index => $product) {
                $syncData[$product['id']] = ['order_products' => $index];
            }

            $workstation->cr_products()->sync($syncData);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteProductRequest $request, CR_Products $product = null): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        if($product !== null) {
            $product->delete();
            
            $module = $product->cr_categories_products->cr_modules;
            
        } else {
            $datas = $request->input('multipleDeleteDatas');

            if(is_array($datas) && count($datas) > 0) {
                $ids = array_column($datas, 'id');
                $product = CR_Products::find($ids[0]);

                $module = $product->cr_categories_products->cr_modules;
                
                CR_Products::whereIn('id', $ids)->delete();

            }
        }
        return Redirect::route('products.index', $module);
    }
}
