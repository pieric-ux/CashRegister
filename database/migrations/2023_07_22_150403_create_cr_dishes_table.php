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
            $table->string('name');
            $table->string('unit');
            $table->decimal('client_price', 6, 2)->default(0.00);
            $table->decimal('cost_price', 6, 2)->default(0.00);
            $table->boolean('is_consigned')->nullable()->default(true);
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
        Schema::dropIfExists('cr_dishes');
    }
};
