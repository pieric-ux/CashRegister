<?php

namespace Database\Seeders;

use App\Models\CR_Categories_Products;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CR_ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categoriesProducts = \App\Models\CR_Categories_Products::first();
        $dish = \App\Models\CR_Dishes::first();
        
        \App\Models\CR_Products::factory()->create([
            'fk_categories_products_id' => $categoriesProducts->id,
            'fk_dishes_id' => $dish->id,
        ]);
    }
}
