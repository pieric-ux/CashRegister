<?php

namespace App\Http\Controllers;

use App\Http\Requests\Workstations\DeleteWorkstationRequest;
use App\Http\Requests\Workstations\IndexWorkstationsRequest;
use App\Http\Requests\Workstations\StoreWorkstationRequest;
use App\Http\Requests\Workstations\UpdateWorkstationRequest;
use App\Models\CR_App;
use App\Models\CR_Workstations;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class WorkstationsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(IndexWorkstationsRequest $request, CR_App $app): Response
    {
        // Load workstations with their associated employees and products
        $workstations = $app->cr_workstations->load('cr_employees', 'cr_products');

        // Retrieve categories and their associated products for the app
        $categories = $app->cr_categories_products()->with('cr_products')->get();

        // Combine all products from different categories into a single collection
        $generalProducts = $categories->flatMap(function ($category) {
            return $category->cr_products;
        });

        // Assign unassigned products to each workstation
        foreach ($workstations as $workstation) {
            $assignedProductIds = $workstation->cr_products->pluck('id')->toArray();
            $workstation->generalProducts = $generalProducts->filter(function ($product) use ($assignedProductIds) {
                return !in_array($product->id, $assignedProductIds);
            })->values()->toArray();
        }

        // Render the Inertia view with application and workstation data
        return Inertia::render('Customers/Application/Workstations/Index', [
            'application' => $app,
            'workstations' => $workstations,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWorkstationRequest $request, CR_App $app): RedirectResponse
    {
        // Create a new workstation for the application
        $app->cr_workstations()->create([
            'name' => ucfirst($request->input('name')),
        ]);

        // Redirect back to the workstation index page
        return Redirect::route('workstations.index', $app);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWorkstationRequest $request, CR_Workstations $workstation): RedirectResponse
    {
        // Update the name of the specified workstation
        $workstation->name = ucfirst($request->input('name'));
        $workstation->save();

        // Redirect back to the workstation index page
        return Redirect::route('workstations.index', $workstation->cr_apps);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteWorkstationRequest $request, CR_Workstations $workstation): RedirectResponse
    {
        // Validate the current user's password before proceeding
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        // Find the default workstation for reassignment
        $defaultWorkstation = $workstation->where('fk_apps_id', $workstation->fk_apps_id)->where('name', 'Pending assignement')->first();

        // Get employees assigned to the workstation
        $employees = $workstation->cr_employees;

        // Reassign employees to the default workstation
        if ($employees) {
            foreach ($employees as $employee) {
                $employee->fk_workstations_id = $defaultWorkstation->id;
                $employee->save();
            }
        }

        // Delete the specified workstation
        $workstation->delete();

        // Redirect back to the workstation index page
        return Redirect::route('workstations.index', $workstation->cr_apps);
    }
}
