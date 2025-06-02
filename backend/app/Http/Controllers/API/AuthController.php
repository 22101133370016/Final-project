<?php

namespace App\Http\Controllers\API;

/**
 * @noinspection PhpUndefinedClassInspection
 * @noinspection PhpUndefinedNamespaceInspection
 */

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function registerFarmer(Request $request)
    {
        try {
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
                'password' => Hash::make('defaultpassword123'), // default password
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token
            ], 201);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Error in registerFarmer: ' . $e->getMessage());
            \Illuminate\Support\Facades\Log::error('Stack trace: ' . $e->getTraceAsString());
            // Return actual error message for debugging
            return response()->json(['error' => $e->getMessage()], 500);
        }
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
        try {
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
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Error in registerAdmin: ' . $e->getMessage());
            \Illuminate\Support\Facades\Log::error('Stack trace: ' . $e->getTraceAsString());
            return response()->json(['error' => $e->getMessage()], 500);
        }
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
        // For admin and farmer login
        if (($request->has('card_id_no') || $request->has('email')) && $request->has('password')) {
            $userQuery = User::query();

            if ($request->has('card_id_no')) {
                $userQuery->where('card_id_no', $request->card_id_no);
            } elseif ($request->has('email')) {
                $userQuery->where('email', $request->email);
            }

            $user = $userQuery->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                throw ValidationException::withMessages([
                    'login' => ['The provided credentials are incorrect.'],
                ]);
            }

            if ($user->user_type !== 'admin' && $user->user_type !== 'farmer_admin') {
                throw ValidationException::withMessages([
                    'login' => ['Invalid user type for this portal.'],
                ]);
            }

            // Create token for authenticated user
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token,
            ]);
        }
            $user = User::where('registration_number', $request->registration_number)
                ->where('mobile_number', $request->mobile_number)
                ->first();

            if (!$user) {
                throw ValidationException::withMessages([
                    'registration_number' => ['The provided credentials are incorrect.'],
                ]);
            }

            if ($user->user_type !== 'farmer') {
                throw ValidationException::withMessages([
                    'registration_number' => ['Invalid user type for this portal.'],
                ]);
            }

            // Create token for authenticated user
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token,
            ]);
        }

        throw ValidationException::withMessages([
            'error' => ['Invalid login credentials provided.'],
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
