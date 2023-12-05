<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recruiter extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_name',
        'company_description',
        'company_url',
        'position',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
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
