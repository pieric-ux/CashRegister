<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'company_name' => '',
            'first_name' => 'Roux',
            'last_name' => 'Jean',
            'address' => fake()->address(),
            'npa' => fake()->postcode(),
            'city' => fake()->city(),
            'phone' => fake()->phoneNumber(),
            'email' => 'test@test.ch',
            'email_verified_at' => now(),
            'password' => '$2y$12$vt7GKEEiRjlZRRVaa1NNoOqryOgtRYcPbNB5OxGzWzvaGuHKM0e86',
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
