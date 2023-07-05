<?php

namespace App\Http\Controllers;

use App\Http\Requests\Workstations\IndexWorkstationsRequest;
use App\Models\CR_App;
use App\Models\CR_Workstations;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkstationsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(IndexWorkstationsRequest $request, CR_App $app)
    {
        return Inertia::render('Application/Workstations/Index', [
            'application' => $app,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(CR_Workstations $cR_Workstations)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CR_Workstations $cR_Workstations)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CR_Workstations $cR_Workstations)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CR_Workstations $cR_Workstations)
    {
        //
    }
}
