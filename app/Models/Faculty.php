<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{
    use HasFactory;

    protected $fillable = ['slug', 'image', 'slug_short'];

    public function rooms()
    {
        return $this->hasMany(Room::class, 'faculty_id');
    }
}
