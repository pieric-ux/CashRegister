<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CR_Employees>
 */
class CR_EmployeesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => 'Dupont',
            'last_name' => 'Charles',
            'phone' => fake()->phoneNumber(),
            'email' => '123@123.ch',
            'passwordless' => 'eac4a89f-7707-4027-a581-47fa35c7a153',
            'logout' => false,
            'fk_workstations_id' => function () {
                return \App\Models\CR_Workstations::factory()->create()->id;
            },
        ];
    }
}
