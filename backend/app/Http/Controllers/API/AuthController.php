<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function registerFarmer(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'mobile_number' => 'required|string|unique:users,mobile_number',
            'registration_number' => 'required|string|unique:users,registration_number',
            'location' => 'required|string',
        ]);

        $user = User::create([
            'user_type' => 'farmer',
            'full_name' => $request->full_name,
            'mobile_number' => $request->mobile_number,
            'registration_number' => $request->registration_number,
            'location' => $request->location,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function registerFarmerAdmin(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email|max:255|unique:users',
            'card_id_no' => 'required|string|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'user_type' => 'farmer_admin',
            'email' => $request->email,
            'card_id_no' => $request->card_id_no,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function registerAdmin(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email|max:255|unique:users',
            'card_id_no' => 'required|string|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'user_type' => 'admin',
            'email' => $request->email,
            'card_id_no' => $request->card_id_no,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function registerDistributor(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'card_id_no' => 'required|string|unique:users',
        ]);

        $user = User::create([
            'user_type' => 'distributor',
            'email' => $request->email,
            'card_id_no' => $request->card_id_no,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function login(Request $request)
    {
        // For farmer login
        if ($request->has('mobile_number') && $request->has('registration_number')) {
            $user = User::where('mobile_number', $request->mobile_number)
                        ->where('registration_number', $request->registration_number)
                        ->first();
                        
            if (!$user || $user->user_type !== 'farmer') {
                throw ValidationException::withMessages([
                    'mobile_number' => ['The provided credentials are incorrect.'],
                ]);
            }
        } 
        // For admin, farmer-admin, distributor login
        else if ($request->has('card_id_no') && $request->has('password')) {
            $user = User::where('card_id_no', $request->card_id_no)->first();
            
            if (!$user || !Hash::check($request->password, $user->password)) {
                throw ValidationException::withMessages([
                    'card_id_no' => ['The provided credentials are incorrect.'],
                ]);
            }
        } 
        // For email-based login
        else if ($request->has('email') && $request->has('password')) {
            $user = User::where('email', $request->email)->first();
            
            if (!$user || !Hash::check($request->password, $user->password)) {
                throw ValidationException::withMessages([
                    'email' => ['The provided credentials are incorrect.'],
                ]);
            }
        }
        else {
            throw ValidationException::withMessages([
                'error' => ['Invalid login credentials provided.'],
            ]);
        }

        // Create token for authenticated user
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }
}