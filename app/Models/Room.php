<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
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

    public function media(): MorphMany
    {
        return $this->morphMany(Media::class, 'model');
    }

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
            ->fit(Fit::Contain, 1920, 1080)
            ->nonQueued();
    }

    public function scopeFilters($query, array $filters)
    {
        return $query->when($filters['id'] ?? null, function ($query, $id) {
            return $query->where('id', $id);
        })
            ->when($filters['faculty_id'] ?? null, function ($query, $faculty_id) {
                return $query->where('faculty_id', $faculty_id);
            })
            ->when($filters['dormitory_id'] ?? null, function ($query, $dormitory_id) {
                return $query->where('dormitory_id', $dormitory_id);
            })
            ->when($filters['gender'] ?? null, function ($query, $gender) {
                return $query->where('gender', $gender);
            });
    }
}
