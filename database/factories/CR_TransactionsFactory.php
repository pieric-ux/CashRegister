<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CR_Transactions>
 */
class CR_TransactionsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'or_number' => $this->faker->ean8(),
            'employee' => '',
            'workstation' => '',
            'total' => $this->faker->randomFloat(2, 0, 100),
            'fk_paymentMethods_id' => $this->faker->randomElement([1, 2, 3]),
        ];
    }
}
