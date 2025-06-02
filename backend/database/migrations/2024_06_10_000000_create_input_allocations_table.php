<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInputAllocationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('input_allocations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('input_id');
            $table->unsignedBigInteger('farmer_id');
            $table->integer('quantity');
            $table->decimal('cost', 10, 2);
            $table->timestamps();

            $table->foreign('input_id')->references('id')->on('inputs')->onDelete('cascade');
            $table->foreign('farmer_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('input_allocations');
    }
}
