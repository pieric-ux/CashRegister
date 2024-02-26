<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\CR_Categories_Products;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CustomerSeeder::class,
            CR_ModuleSeeder::class,
            CR_DishesSeeder::class,
            CR_Categories_ProductsSeeder::class,
            CR_WorkstationsSeeder::class,
            CR_EmployeesSeeder::class,
            CR_ProductsSeeder::class,
            CR_Workstations_ProductsSeeder::class,     
            CR_TransactionsSeeder::class,
        ]);
    }
}
