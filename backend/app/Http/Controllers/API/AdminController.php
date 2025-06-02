<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\InputAllocation;
use App\Models\Input;

class AdminController extends Controller
{
    // List all farmers registered at a particular station (location)
    public function listFarmers(Request $request)
    {
        $station = $request->query('station');
        $farmers = User::where('user_type', 'farmer')
            ->when($station, function ($query, $station) {
                return $query->where('location', $station);
            })
            ->get();

        return response()->json($farmers);
    }

    // Remove a farmer by ID
    public function removeFarmer($id)
    {
        $farmer = User::where('user_type', 'farmer')->findOrFail($id);
        $farmer->delete();

        return response()->json(['message' => 'Farmer removed successfully']);
    }

    // Update farmer details
    public function updateFarmer(Request $request, $id)
    {
        $farmer = User::where('user_type', 'farmer')->findOrFail($id);

        $request->validate([
            'full_name' => 'sometimes|string|max:255',
            'mobile_number' => 'sometimes|string|unique:users,mobile_number,' . $farmer->id,
            'location' => 'sometimes|string',
            'registration_number' => 'sometimes|string|unique:users,registration_number,' . $farmer->id,
            'email' => 'sometimes|email|unique:users,email,' . $farmer->id,
        ]);

        $farmer->update($request->only([
            'full_name',
            'mobile_number',
            'location',
            'registration_number',
            'email',
        ]));

        return response()->json(['message' => 'Farmer updated successfully', 'farmer' => $farmer]);
    }

    // View farmer inputs (allocations)
    public function viewFarmerInputs($farmerId)
    {
        $inputs = InputAllocation::with('input')
            ->where('farmer_id', $farmerId)
            ->get();

        return response()->json($inputs);
    }

    // Delete a farmer input allocation
    public function deleteFarmerInput($id)
    {
        $allocation = InputAllocation::findOrFail($id);
        $allocation->delete();

        return response()->json(['message' => 'Input allocation deleted successfully']);
    }

    // Update a farmer input allocation
    public function updateFarmerInput(Request $request, $id)
    {
        $allocation = InputAllocation::findOrFail($id);

        $request->validate([
            'quantity' => 'sometimes|integer|min:1',
            'cost' => 'sometimes|numeric|min:0',
        ]);

        $allocation->update($request->only(['quantity', 'cost']));

        return response()->json(['message' => 'Input allocation updated successfully', 'allocation' => $allocation]);
    }

    // Allocate input to farmer
    public function allocateInput(Request $request)
    {
        $request->validate([
            'input_id' => 'required|exists:inputs,id',
            'farmer_registration_number' => 'required|exists:users,registration_number',
            'quantity' => 'required|integer|min:1',
            'cost' => 'required|numeric|min:0',
        ]);

        $farmer = User::where('registration_number', $request->farmer_registration_number)
            ->where('user_type', 'farmer')
            ->firstOrFail();

        $allocation = InputAllocation::create([
            'input_id' => $request->input_id,
            'farmer_registration_number' => $request->farmer_registration_number,
            'quantity' => $request->quantity,
            'cost' => $request->cost,
        ]);

        return response()->json(['message' => 'Input allocated successfully', 'allocation' => $allocation]);
    }
}
