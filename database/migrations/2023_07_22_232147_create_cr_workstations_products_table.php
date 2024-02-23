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
        Schema::create('cr_workstations_products', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('order_products');
            $table->unsignedBigInteger('fk_workstations_id');
            $table->foreign('fk_workstations_id')->references('id')->on('cr_workstations')->onDelete('cascade');
            $table->unsignedBigInteger('fk_products_id');
            $table->foreign('fk_products_id')->references('id')->on('cr_products')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cr_workstations_products');
    }
};
