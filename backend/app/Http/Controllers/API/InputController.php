<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Input;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class InputController extends Controller
{
    // List all inputs
    public function index()
    {
        $inputs = Input::all();
        return response()->json(['inputs' => $inputs]);
    }

    // Store new input with image upload
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'quantity' => 'required|integer|min:0',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|image|max:2048', // max 2MB
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $input = new Input();
        $input->name = $request->name;
        $input->description = $request->description;
        $input->quantity = $request->quantity;
        $input->price = $request->price;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('inputs', 'public');
            $input->image = $path;
        }

        $input->save();

        return response()->json(['message' => 'Input created successfully', 'input' => $input]);
    }

    // Show input details
    public function show($id)
    {
        $input = Input::find($id);
        if (!$input) {
            return response()->json(['error' => 'Input not found'], 404);
        }
        return response()->json(['input' => $input]);
    }

    // Update input details
    public function update(Request $request, $id)
    {
        $input = Input::find($id);
        if (!$input) {
            return response()->json(['error' => 'Input not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'quantity' => 'sometimes|required|integer|min:0',
            'price' => 'sometimes|required|numeric|min:0',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($request->has('name')) {
            $input->name = $request->name;
        }
        if ($request->has('description')) {
            $input->description = $request->description;
        }
        if ($request->has('quantity')) {
            $input->quantity = $request->quantity;
        }
        if ($request->has('price')) {
            $input->price = $request->price;
        }
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($input->image) {
                Storage::disk('public')->delete($input->image);
            }
            $path = $request->file('image')->store('inputs', 'public');
            $input->image = $path;
        }

        $input->save();

        return response()->json(['message' => 'Input updated successfully', 'input' => $input]);
    }

    // Delete input
    public function destroy($id)
    {
        $input = Input::find($id);
        if (!$input) {
            return response()->json(['error' => 'Input not found'], 404);
        }

        // Delete image if exists
        if ($input->image) {
            Storage::disk('public')->delete($input->image);
        }

        $input->delete();

        return response()->json(['message' => 'Input deleted successfully']);
    }
}
