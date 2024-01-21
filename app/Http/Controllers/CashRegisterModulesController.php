<?php

namespace App\Http\Controllers;

use App\Http\Requests\CashRegisterModules\DeleteCashRegisterModulesRequest;
use App\Http\Requests\CashRegisterModules\ShowCashRegisterModulesRequest;
use App\Http\Requests\CashRegisterModules\StoreCashRegisterModulesRequest;
use App\Http\Requests\CashRegisterModules\UpdateCashRegisterModulesRequest;
use App\Models\CR_Module;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CashRegisterModulesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $customer = Auth::user();

        $modules = $customer->cr_modules->map(function ($module) {
            $module->posterPath = $module->getPosterUrl();
            return $module;
        });

        return Inertia::render('Customers/Modules/CashRegisterModule/Index', [
            'applications' => $modules,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCashRegisterModulesRequest $request): RedirectResponse
    {
        $customer = Auth::user();

        $customer->cr_modules()->create([
            'name' => ucfirst($request->input('name')),
            'slug' => Str::slug($request->input('name')),
            'description' => $request->input('description'),
            'start_date' => $request->input('start_date'),
            'end_date' => $request->input('end_date'),
            'location' => ucfirst($request->input('location')),
            'website' => $request->input('website'),
        ]);

        return Redirect::route('cashregisters.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(ShowCashRegisterModulesRequest $request, CR_Module $module): Response
    {
        return Inertia::render('Customers/Modules/CashRegisterModule/Configurations/Dashboard', [
            'application' => $module,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCashRegisterModulesRequest $request, CR_Module $module): RedirectResponse
    {
        $module->name = ucfirst($request->input('name'));
        $module->slug = Str::slug($request->input('name'));
        $module->description = $request->input('description');
        $module->start_date = $request->input('start_date');
        $module->end_date = $request->input('end_date');
        $module->location = ucfirst($request->input('location'));
        $module->website = $request->input('website');
        $module->save();

        return Redirect::route('cashregisters.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteCashRegisterModulesRequest $request, CR_Module $module): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $module->delete();

        return Redirect::route('cashregisters.index');
    }
}
