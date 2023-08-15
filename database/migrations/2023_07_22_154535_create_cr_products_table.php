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
        Schema::create('cr_products', function (Blueprint $table) {
            $table->id();
            $table->string('name', 45);
            $table->string('unit', 45);
            $table->decimal('client_price', 6, 2)->default(0.00);
            $table->decimal('cost_price', 6, 2)->default(0.00);
            $table->unsignedBigInteger('fk_categories_products_id');
            $table->foreign('fk_categories_products_id')->references('id')->on('cr_categories_products')->onDelete('cascade');
            $table->unsignedBigInteger('fk_dishes_id');
            $table->foreign('fk_dishes_id')->references('id')->on('cr_dishes')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cr_products');
    }
};
