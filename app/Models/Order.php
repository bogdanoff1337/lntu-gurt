<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_id',
        'first_name',
        'last_name',
        'father_name',
        'address',
        'gender',
        'phone',
        'benefits',
    ];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
