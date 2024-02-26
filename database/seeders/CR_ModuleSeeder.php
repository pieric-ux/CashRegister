<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CR_ModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $customer = \App\Models\Customer::first();

        $module = \App\Models\CR_Module::factory()->create([
            'fk_customer_id' => $customer->id,
        ]);
    }
}
