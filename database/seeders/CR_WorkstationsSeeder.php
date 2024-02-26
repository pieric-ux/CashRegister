<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CR_WorkstationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $module = \App\Models\CR_Module::first();

        \App\Models\CR_Workstations::factory()->create([
            'fk_cr_modules_id' => $module->id,
        ]);
    }
}
