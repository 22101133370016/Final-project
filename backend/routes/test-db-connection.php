<?php

use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\DB;

Route::get('/test-db-connection', function () {
    try {
        DB::connection()->getPdo();
        // Test insert
        $user = User::create([
            'user_type' => 'test',
            'full_name' => 'Test User',
            'mobile_number' => '0000000000',
            'registration_number' => 'TEST123',
            'location' => 'Test Location',
            'email' => 'test@example.com',
            'card_id_no' => 'TESTCARD123',
            'password' => bcrypt('password123'),
        ]);
        return response()->json(['message' => 'Database connection and insert successful', 'user' => $user]);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Database connection or insert failed', 'details' => $e->getMessage()], 500);
    }
});
