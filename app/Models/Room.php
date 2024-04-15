<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'dormitory_id',
        'faculty_id',
        'places',
        'number',
        'images',
        'floor',
        'block',
        'gender',
        'section',
    ];
    protected $casts = ['images' => 'array'];
    public function images()
    {
        return $this->hasMany(Image::class);
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
