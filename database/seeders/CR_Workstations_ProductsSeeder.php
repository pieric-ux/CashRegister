<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CR_Workstations_ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $workstation = \App\Models\CR_Workstations::first();
        $product = \App\Models\CR_Products::first();

        \App\Models\CR_Workstations_Products::factory()->create([
            'fk_workstations_id' => $workstation->id,
            'fk_products_id' => $product->id,
        ]);
    }
}
