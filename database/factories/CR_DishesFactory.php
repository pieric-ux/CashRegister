<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CR_Dishes>
 */
class CR_DishesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => 'Verre',
            'unit' => '3dl',
            'client_price' => 2.00,
            'cost_price' => 1.50,
            'is_consigned' => true,
            'is_soldSeparately' => true,
            'fk_cr_modules_id' => function () {
                return \App\Models\CR_Module::factory()->create()->id;
            },
        ];
    }
}
