<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $customer = \App\Models\Customer::factory()->create();

        $module = \App\Models\CR_Module::factory()->create([
            'fk_customer_id' => $customer->id,
        ]);

        $dishes = \App\Models\CR_Dishes::factory()->create([
            'fk_cr_modules_id' => $module->id,
        ]);

        $categoriesProducts = \App\Models\CR_Categories_Products::factory()->create([
            'fk_cr_modules_id' => $module->id,
        ]);
        
        $workstation = \App\Models\CR_Workstations::factory()->create([
            'fk_cr_modules_id' => $module->id,
        ]);

        $employee = \App\Models\CR_Employees::factory()->create([
            'fk_workstations_id' => $workstation->id,
        ]);

        $product = \App\Models\CR_Products::factory()->create([
            'fk_categories_products_id' => $categoriesProducts->id,
            'fk_dishes_id' => $dishes->id,
        ]);

        $workstations_products = \App\Models\CR_Workstations_Products::factory()->create([
            'fk_workstations_id' => $workstation->id,
            'fk_products_id' => $product->id,
        ]);
    }
}
