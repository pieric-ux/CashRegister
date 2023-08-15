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
        Schema::create('cr_categories_products', function (Blueprint $table) {
            $table->id();
            $table->string('name', 45);
            $table->unsignedInteger('order');
            $table->unsignedBigInteger('fk_apps_id');
            $table->foreign('fk_apps_id')->references('id')->on('cr_apps')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cr_categories_products');
    }
};
