<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FarmerItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'farmer_registration_number',
        'item_name',
        'quantity',
        'cost_per_item',
    ];

    public function farmer()
    {
        return $this->belongsTo(User::class, 'farmer_registration_number', 'registration_number');
    }
}
