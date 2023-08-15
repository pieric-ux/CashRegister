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
        Schema::create('cr_employees', function (Blueprint $table) {
            $table->id();
            $table->string('first_name', 45);
            $table->string('last_name', 45);
            $table->string('phone', 45)->nullable();
            $table->string('email')->unique();
            $table->uuid('passwordless')->unique();
            $table->boolean('logout')->default(false);
            $table->unsignedBigInteger('fk_workstations_id');
            $table->foreign('fk_workstations_id')->references('id')->on('cr_workstations')->onDelete('cascade');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cr_employees');
    }
};
