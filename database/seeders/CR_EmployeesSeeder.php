<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CR_EmployeesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $workstation = \App\Models\CR_Workstations::first();

        \App\Models\CR_Employees::factory()->create([
            'fk_workstations_id' => $workstation->id,
        ]);
    }
}
