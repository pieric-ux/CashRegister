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
        Schema::create('cr_apps', function (Blueprint $table) {
            $table->id();
            $table->string('poster')->nullable();
            $table->string('name')->unique();
            $table->string('slug');
            $table->string('description')->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->string('location')->nullable();
            $table->string('website')->nullable();
            $table->unsignedBigInteger('fk_customer_id');
            $table->foreign('fk_customer_id')->references('id')->on('customers')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cr_apps');
    }
};
