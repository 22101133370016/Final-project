<?php

// routes/web.php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\FarmerController;
use App\Http\Controllers\API\AdminController;
use App\Http\Controllers\API\DistributorController;

// Include test route for DB connection
require __DIR__ . '/test-db-connection.php';

// API status route for frontend
Route::get('/', function () {
    return response()->json([
        'message' => 'Tobacco Management System API',
        'status' => 'active',
        'version' => '1.0.0'
    ]);
});

// Health check route
Route::get('/health', function () {
    return response()->json(['status' => 'OK']);
});

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Farmer routes
    Route::prefix('farmer')->group(function () {
        Route::get('/dashboard', [FarmerController::class, 'dashboard']);
        Route::get('/profile', [FarmerController::class, 'profile']);
        Route::put('/profile', [FarmerController::class, 'updateProfile']);
    });

    // Admin routes
    Route::prefix('admin')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard']);
        Route::get('/farmers', [AdminController::class, 'getFarmers']);
        Route::post('/farmers', [AdminController::class, 'createFarmer']);
    });

    // Distributor routes
    Route::prefix('distributor')->group(function () {
        Route::get('/dashboard', [DistributorController::class, 'dashboard']);
        Route::get('/inventory', [DistributorController::class, 'getInventory']);
    });
});

// routes/api.php
use Illuminate\Http\Request;

// API Routes (prefixed with /api automatically)
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Public API routes
Route::get('/season-prices', function () {
    return response()->json([
        'prices' => [
            ['grade' => 'A', 'price' => 2.50],
            ['grade' => 'B', 'price' => 2.00],
            ['grade' => 'C', 'price' => 1.50]
        ]
    ]);
});

Route::get('/inputs', function () {
    return response()->json([
        'inputs' => [
            ['name' => 'Seeds', 'available' => true],
            ['name' => 'Fertilizer', 'available' => true],
            ['name' => 'Pesticides', 'available' => false]
        ]
    ]);
});
