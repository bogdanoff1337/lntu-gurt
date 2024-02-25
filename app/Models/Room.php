<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'photos',
        'dormitory_id',
        'places',
        'number',
        'floor',
        'block',
        'gender',
        'section',
    ];
}
