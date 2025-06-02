<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFarmerItemsTable extends Migration
{
    public function up()
    {
        Schema::create('farmer_items', function (Blueprint $table) {
            $table->id();
            $table->string('farmer_registration_number');
            $table->string('item_name');
            $table->integer('quantity');
            $table->decimal('cost_per_item', 10, 2);
            $table->timestamps();

            $table->foreign('farmer_registration_number')->references('registration_number')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('farmer_items');
    }
}
