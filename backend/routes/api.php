<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\FarmerAdminController;

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\FarmerController;
use App\Http\Controllers\API\AdminController;
use App\Http\Controllers\API\DistributorController;
use App\Http\Controllers\API\InputController;
use App\Http\Controllers\API\EducationMaterialController;
use App\Http\Controllers\API\PriceController;

// Auth Routes
Route::post('/farmer/register', [AuthController::class, 'registerFarmer']);
Route::post('/farmer-admin/register', [AuthController::class, 'registerFarmerAdmin']);
Route::post('/admin/register', [AuthController::class, 'registerAdmin']);
Route::post('/distributor/register', [AuthController::class, 'registerDistributor']);
Route::post('/login', [AuthController::class, 'login']);

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    // Logout Route
    Route::post('/logout', [AuthController::class, 'logout']);

    // Farmer Routes
    Route::get('/farmer/profile', [FarmerController::class, 'getProfile']);
    Route::put('/farmer/profile', [FarmerController::class, 'updateProfile']);
    Route::get('/farmer/dashboard-data', [FarmerController::class, 'getDashboardData']);

    // Admin Routes
    Route::get('/admin/dashboard', [AdminController::class, 'getDashboard']);
    Route::get('/admin/farmers', [AdminController::class, 'getAllFarmers']);

    // Distributor Routes
    Route::get('/distributor/profile', [DistributorController::class, 'getProfile']);

    // Farmer Admin Routes
    Route::prefix('farmer-admin')->group(function () {
        Route::post('/assign-item', [FarmerAdminController::class, 'assignItem']);
        Route::post('/assign-loan', [FarmerAdminController::class, 'assignLoan']);
        Route::get('/farmers', [FarmerAdminController::class, 'listFarmers']);
        Route::put('/farmers/{id}', [FarmerAdminController::class, 'updateFarmer']);
        Route::delete('/farmers/{id}', [FarmerAdminController::class, 'deleteFarmer']);

        // Farmer Admin management routes
        Route::get('/admins', [FarmerAdminController::class, 'listFarmerAdmins']);
        Route::put('/admins/{id}', [FarmerAdminController::class, 'updateFarmerAdmin']);
        Route::delete('/admins/{id}', [FarmerAdminController::class, 'deleteFarmerAdmin']);
    });

    // Resource Routes
    Route::apiResource('inputs', InputController::class);
    Route::apiResource('education', EducationMaterialController::class);
    Route::apiResource('prices', PriceController::class);
});
