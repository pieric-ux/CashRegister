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
        Schema::create('cr_transactions', function (Blueprint $table) {
            $table->id();
            $table->string('or_number', 45);
            $table->string('employee', 100);
            $table->string('workstation', 45);
            $table->decimal('total', 6, 2);
            $table->unsignedBigInteger('fk_paymentMethods_id');
            $table->foreign('fk_paymentMethods_id')->references('id')->on('cr_payment_methods')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cr_transactions');
    }
};
