<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateUsersTableAddMissingColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'user_type')) {
                $table->string('user_type')->after('id');
            }
            if (!Schema::hasColumn('users', 'full_name')) {
                $table->string('full_name')->nullable()->after('user_type');
            }
            if (!Schema::hasColumn('users', 'mobile_number')) {
                $table->string('mobile_number')->unique()->nullable()->after('full_name');
            }
            if (!Schema::hasColumn('users', 'registration_number')) {
                $table->string('registration_number')->unique()->nullable()->after('mobile_number');
            }
            if (!Schema::hasColumn('users', 'location')) {
                $table->string('location')->nullable()->after('registration_number');
            }
            if (!Schema::hasColumn('users', 'email')) {
                $table->string('email')->unique()->nullable()->after('location');
            }
            if (!Schema::hasColumn('users', 'card_id_no')) {
                $table->string('card_id_no')->unique()->nullable()->after('email');
            }
            if (!Schema::hasColumn('users', 'password')) {
                $table->string('password')->after('card_id_no');
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'user_type')) {
                $table->dropColumn('user_type');
            }
            if (Schema::hasColumn('users', 'full_name')) {
                $table->dropColumn('full_name');
            }
            if (Schema::hasColumn('users', 'mobile_number')) {
                $table->dropColumn('mobile_number');
            }
            if (Schema::hasColumn('users', 'registration_number')) {
                $table->dropColumn('registration_number');
            }
            if (Schema::hasColumn('users', 'location')) {
                $table->dropColumn('location');
            }
            if (Schema::hasColumn('users', 'email')) {
                $table->dropColumn('email');
            }
            if (Schema::hasColumn('users', 'card_id_no')) {
                $table->dropColumn('card_id_no');
            }
            if (Schema::hasColumn('users', 'password')) {
                $table->dropColumn('password');
            }
        });
    }
}