<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FarmerLoan extends Model
{
    use HasFactory;

    protected $fillable = [
        'farmer_registration_number',
        'loan_item_name',
        'amount_received',
        'purpose',
    ];

    public function farmer()
    {
        return $this->belongsTo(User::class, 'farmer_registration_number', 'registration_number');
    }
}
