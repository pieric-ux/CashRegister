<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\Customer::factory(100)->create();

        \App\Models\Customer::factory()->create([
            'company_name' => fake()->name(),
            'first_name' => fake()->name(),
            'last_name' => fake()->name(),
            'address' => fake()->address(),
            'npa' => fake()->postcode(),
            'city' => fake()->city(),
            'phone' => fake()->phoneNumber(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
            'remember_token' => Str::random(10),
        ]);
    }
}
