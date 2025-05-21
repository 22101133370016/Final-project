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
}