<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Settings extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'key',
        'value',
        'type',
    ];

    public static function get($key): mixed
    {
        return self::where('key', $key)->first()->value;
    }

    public static function getMediaSettings($key)
    {
        return self::where('key', $key)->with('media')->first();
    }

    public function media(): MorphMany
    {
        return $this->morphMany(Media::class, 'model');
    }

    public function registerMediaConversions(Media $media = null): void
    {
        $this
            ->addMediaConversion('settings')
            ->nonQueued();
    }
}
