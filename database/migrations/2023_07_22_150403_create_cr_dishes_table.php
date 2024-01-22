<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cr_dishes', function (Blueprint $table) {
            $table->id();
            $table->string('name', 45);
            $table->string('unit', 45);
            $table->decimal('client_price', 6, 2)->default(0.00);
            $table->decimal('cost_price', 6, 2)->default(0.00);
            $table->boolean('is_consigned')->nullable()->default(true);
            $table->boolean('is_soldSeparately')->nullable()->default(true);
            $table->unsignedBigInteger('fk_cr_modules_id');
            $table->foreign('fk_cr_modules_id')->references('id')->on('cr_modules')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cr_dishes');
    }
};
