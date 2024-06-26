<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CR_Module>
 */
class CR_ModuleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = 'Trilogie';

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => fake()->text(100),
            'start_date' => fake()->date(),
            'end_date' => fake()->dateTimeInInterval('+1 week', '+3 week'),
            'location' => fake()->city(),
            'website' => fake()->url(),
            'fk_customer_id' => function () {
                return \App\Models\Customer::factory()->create()->id;
            },
        ];
    }
}
