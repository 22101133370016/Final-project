<?php

// app/Models/User.php
namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'full_name',
        'email',
        'password',
        'phone',
        'mobile_number',
        'registration_number',
        'location',
        'role',
        'company', // for distributors
        'card_id_no',
        'user_type',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // Role constants
    const ROLE_FARMER = 'farmer';
    const ROLE_FARMER_ADMIN = 'farmer_admin';
    const ROLE_DISTRIBUTOR = 'distributor';

    // Role checking methods
    public function isFarmer()
    {
        return $this->role === self::ROLE_FARMER;
    }

    public function isFarmerAdmin()
    {
        return $this->role === self::ROLE_FARMER_ADMIN;
    }

    public function isDistributor()
    {
        return $this->role === self::ROLE_DISTRIBUTOR;
    }
}
