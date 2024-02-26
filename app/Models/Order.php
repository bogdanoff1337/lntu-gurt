<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_id',
        'firstName',
        'lastName',
        'fatherName',
        'address',
        'gender',
        'phone',
        'benefits',
    ];
}
