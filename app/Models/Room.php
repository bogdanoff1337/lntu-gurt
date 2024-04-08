<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'dormitory_id',
        'faculty_id',
        'places',
        'number',
        'floor',
        'block',
        'gender',
        'section',
    ];

    public function images()
    {
        return $this->hasMany(Image::class, 'room_id');
    }

    public function dormitory()
    {
        return $this->belongsTo(Dormitory::class, 'dormitory_id');
    }

    public function faculty()
    {
        return $this->belongsTo(Faculty::class, 'faculty_id');
    }
}
