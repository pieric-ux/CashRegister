<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CR_Products>
 */
class CR_ProductsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => 'Coca',
            'unit' => '3dl',
            'client_price' => 4.00,
            'cost_price' => 1.20,
            'fk_categories_products_id' => function () {
                return \App\Models\CR_Categories_Products::factory()->create()->id;
            },
            'fk_dishes_id' => function () {
                return \App\Models\CR_Dishes::factory()->create()->id;
            },
        ];
    }
}
