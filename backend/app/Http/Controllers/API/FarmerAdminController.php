<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\FarmerItem;
use App\Models\FarmerLoan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FarmerAdminController extends Controller
{
    // List all farmers
    public function listFarmers()
    {
        $farmers = User::where('user_type', 'farmer')->get();
        return response()->json(['farmers' => $farmers]);
    }

    // Assign item to farmer
    public function assignItem(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'farmer_registration_number' => 'required|string|exists:users,registration_number',
            'item_name' => 'required|string',
            'quantity' => 'required|integer|min:1',
            'cost_per_item' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $farmer = User::where('registration_number', $request->farmer_registration_number)->first();

        $item = new FarmerItem();
        $item->farmer_registration_number = $farmer->registration_number;
        $item->item_name = $request->item_name;
        $item->quantity = $request->quantity;
        $item->cost_per_item = $request->cost_per_item;
        $item->save();

        return response()->json(['message' => 'Item assigned successfully']);
    }

    // Assign loan to farmer
    public function assignLoan(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'farmer_registration_number' => 'required|string|exists:users,registration_number',
            'loan_item_name' => 'required|string',
            'amount_received' => 'required|numeric|min:0',
            'purpose' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $farmer = User::where('registration_number', $request->farmer_registration_number)->first();

        $loan = new FarmerLoan();
        $loan->farmer_registration_number = $farmer->registration_number;
        $loan->loan_item_name = $request->loan_item_name;
        $loan->amount_received = $request->amount_received;
        $loan->purpose = $request->purpose;
        $loan->save();

        return response()->json(['message' => 'Loan assigned successfully']);
    }

    // Update farmer details
    public function updateFarmer(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'full_name' => 'required|string|max:255',
            'mobile_number' => 'required|string|max:255',
            'registration_number' => 'required|string|max:255',
            'location' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $farmer = User::find($id);
        if (!$farmer || $farmer->user_type !== 'farmer') {
            return response()->json(['error' => 'Farmer not found'], 404);
        }

        $farmer->full_name = $request->full_name;
        $farmer->mobile_number = $request->mobile_number;
        $farmer->registration_number = $request->registration_number;
        $farmer->location = $request->location;
        $farmer->save();

        return response()->json(['message' => 'Farmer updated successfully']);
    }

    // Delete farmer
    public function deleteFarmer($id)
    {
        $farmer = User::find($id);
        if (!$farmer || $farmer->user_type !== 'farmer') {
            return response()->json(['error' => 'Farmer not found'], 404);
        }

        $farmer->delete();

        return response()->json(['message' => 'Farmer deleted successfully']);
    }

    // List all farmer admins
    public function listFarmerAdmins()
    {
        $farmerAdmins = User::where('user_type', 'farmer_admin')->get();
        return response()->json(['farmerAdmins' => $farmerAdmins]);
    }

    // Update farmer admin details
    public function updateFarmerAdmin(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'card_id_no' => 'required|string',
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $farmerAdmin = User::find($id);
        if (!$farmerAdmin || $farmerAdmin->user_type !== 'farmer_admin') {
            return response()->json(['error' => 'Farmer Admin not found'], 404);
        }

        $farmerAdmin->email = $request->email;
        $farmerAdmin->card_id_no = $request->card_id_no;
        if ($request->filled('password')) {
            $farmerAdmin->password = bcrypt($request->password);
        }
        $farmerAdmin->save();

        return response()->json(['message' => 'Farmer Admin updated successfully']);
    }

    // Delete farmer admin
    public function deleteFarmerAdmin($id)
    {
        $farmerAdmin = User::find($id);
        if (!$farmerAdmin || $farmerAdmin->user_type !== 'farmer_admin') {
            return response()->json(['error' => 'Farmer Admin not found'], 404);
        }

        $farmerAdmin->delete();

        return response()->json(['message' => 'Farmer Admin deleted successfully']);
    }
}
