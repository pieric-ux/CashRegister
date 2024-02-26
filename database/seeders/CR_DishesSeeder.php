<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CR_DishesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $module = \App\Models\CR_Module::first();

        \App\Models\CR_Dishes::factory()->create([
            'fk_cr_modules_id' => $module->id,
        ]);
    }
}
