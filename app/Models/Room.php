<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
class Room extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

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

    public function dormitory()
    {
        return $this->belongsTo(Dormitory::class, 'dormitory_id');
    }

    public function faculty()
    {
        return $this->belongsTo(Faculty::class, 'faculty_id');
    }

    public function order()
    {
        return $this->hasMany(Order::class);
    }

    public function registerMediaConversions(Media $media = null): void
    {
        $this
            ->addMediaConversion('preview')
            ->fit(Fit::Contain, 1280, 1260)
            ->nonQueued();
    }
}
