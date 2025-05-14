<?php

namespace App\Models;

use App\Notifications\VerifyEmailNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * @property int $id
 * @property string $email
 * @property string $password
 * @property string $first_name
 * @property string $last_name
 * @property string $middle_name
 * @property string $gender
 * @property string $phone
 * @property int $city_id
 * @property int $faculty_id
 * @property int $course
 * @property bool $is_edit
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 */
class Student extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $table = 'students';

    protected $fillable = [
        'email',
        'password',
        'first_name',
        'last_name',
        'middle_name',
        'gender',
        'phone',
        'city_id',
        'benefits',
        'email_verified_at',
        'faculty_id',
        'course',
        'is_edit'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function getJWTIdentifier(): mixed
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims(): array
    {
        return [];
    }

    public function sendEmailVerificationNotification(): void
    {
        $this->notify(new VerifyEmailNotification);
    }

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    public function faculty(): BelongsTo
    {
        return $this->belongsTo(Faculty::class);
    }
}
