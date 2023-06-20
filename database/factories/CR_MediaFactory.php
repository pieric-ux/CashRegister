<?php

namespace Database\Factories;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CR_Media>
 */
class CR_MediaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $collection = 'avatar';
        $storagePath = 'media/' . $collection;

        $image = fake()->image(null, 50, 50, 'avatar');

        $file = new File($image);
        $filename = $file->getFilename();
        $path = Storage::disk('public')->put($storagePath, $file);

        return [
            'name' => fake()->word(),
            'file_name' => $filename,
            'mime_type' => $file->getMimeType(),
            'path' => $path,
            'disk' => 'public',
            'file_hash' => fake()->unique()->sha256(),
            'collection' => $collection,
            'size' => $file->getSize(),
            'fk_customer_id' => Customer::factory(),
        ];
    }
}
