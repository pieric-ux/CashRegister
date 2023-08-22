<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmployeeProfilController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $request->user('employee')->cr_workstations;

        return Inertia::render('Employees/Profile/Index');
    }
}
