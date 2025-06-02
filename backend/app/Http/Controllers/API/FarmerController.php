<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FarmerController extends Controller
{
    public function getProfile(Request $request)
    {
        return response()->json([
            'user' => $request->user()
        ]);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'full_name' => 'sometimes|string|max:255',
            'mobile_number' => 'sometimes|string|unique:users,mobile_number,' . $user->id,
            'location' => 'sometimes|string',
        ]);

        $user->update($request->only([
            'full_name',
            'mobile_number',
            'location',
        ]));

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user
        ]);
    }

    public function getInputs(Request $request)
    {
        $user = $request->user();

        $inputs = \App\Models\InputAllocation::with('input')
            ->where('farmer_id', $user->id)
            ->get();

        return response()->json($inputs);
    }

    public function getUpdates(Request $request)
    {
        $user = $request->user();

        // For demonstration, assuming a FarmerUpdate model exists with 'message' and 'created_at' fields
        $updates = \App\Models\FarmerUpdate::where('farmer_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($updates);
    }

    public function getDashboardData(Request $request)
    {
        $user = $request->user();
        $registrationNumber = $user->registration_number;

        $updates = \App\Models\FarmerUpdate::where('farmer_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        $items = \App\Models\FarmerItem::where('farmer_registration_number', $registrationNumber)
            ->get();

        $loans = \App\Models\FarmerLoan::where('farmer_registration_number', $registrationNumber)
            ->get();

        return response()->json([
            'updates' => $updates,
            'items' => $items,
            'loans' => $loans,
        ]);
    }
}
