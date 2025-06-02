<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DistributorController extends Controller
{
    public function dashboard()
    {
        // Placeholder for distributor dashboard logic
        return response()->json(['message' => 'Distributor dashboard']);
    }

    public function getInventory()
    {
        // Placeholder for getting distributor inventory
        return response()->json(['inventory' => []]);
    }

    public function getProfile()
    {
        // Placeholder for getting distributor profile
        // You can fetch the authenticated user's profile here
        return response()->json(['profile' => auth()->user()]);
    }
}
