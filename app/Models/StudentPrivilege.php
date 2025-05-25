<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudentPrivilege extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'privilege_id',
    ];

    protected $casts = [
        'student_id' => 'integer',
        'privilege_id' => 'integer',
    ];

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function privilege(): BelongsTo
    {
        return $this->belongsTo(Privilege::class);
    }
}
