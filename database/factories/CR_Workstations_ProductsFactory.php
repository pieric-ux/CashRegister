<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CR_Workstations_Products>
 */
class CR_Workstations_ProductsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'fk_workstations_id' => function () {
                return \App\Models\CR_Workstations::factory()->create()->id;
            },
            'fk_products_id' => function () {
                return \App\Models\CR_Products::factory()->create()->id;
            },
        ];
    }

    /**
     * Indicates if the model's default state should include timestamps.
     *
     * @var bool
     */
    protected $timestamps = false;
}
