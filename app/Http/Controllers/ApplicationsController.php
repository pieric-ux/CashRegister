<?php

namespace App\Http\Controllers;

use App\Http\Requests\Applications\StoreApplicationRequest;
use App\Http\Requests\Applications\ShowApplicationsRequest;
use App\Http\Requests\Applications\UpdateApplicationRequest;
use App\Http\Requests\Applications\DeleteApplicationRequest;
use App\Models\CR_App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ApplicationsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customerId = Auth::id();
        $applications = CR_App::where('fk_customer_id', $customerId)->get();

        return Inertia::render('Applications/Index', [
            'applications' => $applications,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreApplicationRequest $request)
    {
        $customerId = Auth::id();

        CR_App::create([
            'name' => $request->input('name'),
            'slug' => Str::slug($request->input('name')),
            'fk_customer_id' => $customerId,
        ]);

        return Redirect::route('applications.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(ShowApplicationsRequest $request, CR_App $app)
    {
        return Inertia::render('Applications/Show', [
            'application' => $app,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateApplicationRequest $request, CR_App $app)
    {

        $app->name = $request->input('name');
        $app->slug = Str::slug($request->input('name'));
        $app->save();

        return Redirect::route('applications.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteApplicationRequest $request, CR_App $app)
    {
        $app->delete();

        return Redirect::route('applications.index');
    }
}
