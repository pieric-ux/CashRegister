<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Customer;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $existingCustomer = Customer::first();

        if ($existingCustomer) {
            \App\Models\CR_App::factory()->create([
                'fk_customer_id' => $existingCustomer->id,
            ]);
        }

        $customers = \App\Models\Customer::factory(9)->create();

        foreach ($customers as $customer) {
            \App\Models\CR_App::factory()->create([
                'fk_customer_id' => $customer->id,
            ]);
        }
    }
}
