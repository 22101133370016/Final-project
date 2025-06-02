<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFarmerLoansTable extends Migration
{
    public function up()
    {
        Schema::create('farmer_loans', function (Blueprint $table) {
            $table->id();
            $table->string('farmer_registration_number');
            $table->string('loan_item_name');
            $table->decimal('amount_received', 15, 2);
            $table->string('purpose');
            $table->timestamps();

            $table->foreign('farmer_registration_number')->references('registration_number')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('farmer_loans');
    }
}
