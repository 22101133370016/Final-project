<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EducationMaterial extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'file_path',
    ];
}