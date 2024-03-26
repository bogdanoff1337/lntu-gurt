<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
//use Illuminate\Notifications\Notifiable;
class Student extends Model
{
    use HasApiTokens, HasFactory;

    use HasFactory;

    protected $fillable = [
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
//        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}
