<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CR_TransactionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employee = \App\Models\CR_Employees::first();
        $workstation = \App\Models\CR_Workstations::first();
        
        \App\Models\CR_Transactions::factory()->count(20)->create([
            'employee' => $employee->first_name . ' ' . $employee->last_name,
            'workstation' => $workstation->name,
        ]);
    }
}
