<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CspReportController extends Controller
{
    public function receiveReport(Request $request)
    {
        $report = json_decode($request->getContent(), true);

        // Log the report or perform other actions
        Log::channel('csp_reports')->info('CSP Violation Report', $report);

        return response()->json(['message' => 'Report received'], 200);
    }
}
