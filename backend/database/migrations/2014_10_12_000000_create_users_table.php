<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('user_type'); // farmer, farmer_admin, admin, distributor
            $table->string('email')->nullable(); // for admin, farmer_admin, distributor
            $table->string('full_name')->nullable(); // for farmers
            $table->string('mobile_number')->nullable()->unique(); // for farmers
            $table->string('registration_number')->nullable()->unique(); // for farmers
            $table->string('card_id_no')->nullable()->unique(); // for admin, farmer_admin, distributor
            $table->string('password')->nullable(); // for admin, farmer_admin, distributor
            $table->string('location')->nullable(); // for farmers
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};