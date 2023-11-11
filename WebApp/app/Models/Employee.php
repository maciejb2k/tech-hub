<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'views',
        'location',
        'bio',
        'expected_salary',
        'portfolio',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function workExperience()
    {
        return $this->hasMany(WorkExperience::class);
    }

    public function education()
    {
        return $this->hasMany(Education::class);
    }

    public function skill()
    {
        return $this->hasMany(Skill::class);
    }

    public function language()
    {
        return $this->hasMany(Language::class);
    }

    public function waitList()
    {
        return $this->hasMany(WaitList::class);
    }

    public function invitation()
    {
        return $this->hasMany(Invitation::class);
    }
}
