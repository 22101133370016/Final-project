<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InputAllocation extends Model
{
    use HasFactory;

    protected $fillable = [
        'input_id',
        'farmer_id',
        'quantity',
        'cost',
    ];

    public function input()
    {
        return $this->belongsTo(Input::class);
    }

    public function farmer()
    {
        return $this->belongsTo(User::class, 'farmer_id');
    }
}
