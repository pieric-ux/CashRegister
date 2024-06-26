<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CR_Workstations>
 */
class CR_WorkstationsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => 'Bar 1',
            'fk_cr_modules_id' => function () {
                return \App\Models\CR_Module::factory()->create()->id;
            },
        ];
    }
}
