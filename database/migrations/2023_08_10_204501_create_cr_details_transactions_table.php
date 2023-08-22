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
        Schema::create('cr_details_transactions', function (Blueprint $table) {
            $table->id();
            $table->integer('quantity');
            $table->string('item_name', 45);
            $table->string('unit', 45);
            $table->decimal('client_price', 6, 2);
            $table->unsignedBigInteger('fk_transactions_id');
            $table->foreign('fk_transactions_id')->references('id')->on('cr_transactions')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cr_details_transactions');
    }
};
