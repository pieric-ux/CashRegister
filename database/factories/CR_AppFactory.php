<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CR_App>
 */
class CR_AppFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->name();

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'desciption' => fake()->text(100),
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
