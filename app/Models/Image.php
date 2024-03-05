<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $fillable = ['url', 'room_id'];


    public function rooms()
    {
    return $this->belongsTo(Room::class, 'room_id');
    }
}
