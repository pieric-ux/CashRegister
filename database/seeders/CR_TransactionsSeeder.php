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
        $workstations = \App\Models\CR_Workstations::whereNotIn('id', [1])->inRandomOrder()->get();
        
        $randomWorkstation = $workstations->random();

        \App\Models\CR_Transactions::factory()->count(500)->create([
            'employee' => $employee->first_name . ' ' . $employee->last_name,
            'workstation' => $randomWorkstation->name,
        ]);
    }
}
