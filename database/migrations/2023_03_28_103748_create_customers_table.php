<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('company_name')->nullable();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('address');
            $table->string('npa');
            $table->string('city');
            $table->string('phone')->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

        DB::table('customers')->insert([
            ['company_name' => '', 'first_name' => 'Pieric', 'last_name' => 'Demont', 'address' => 'Av. Maurice-Troillet 63', 'npa' => '1950', 'city' => 'Sion', 'email' => '123@123.ch', 'password' => '$2y$10$Z7YOgW.eMXRI7ggTUaxp3.Tm4L3Z87MwrK.nghP3WGVsuG772.Yzu'],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
