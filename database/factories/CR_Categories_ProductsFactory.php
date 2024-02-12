<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CR_Categories_Products>
 */
class CR_Categories_ProductsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => 'Minérale',
            'order' => 1,
            'fk_cr_modules_id' => function () {
                return \App\Models\CR_Module::factory()->create()->id;
            },
        ];
    }
}
