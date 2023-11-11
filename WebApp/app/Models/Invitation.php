<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invitation extends Model
{
    use HasFactory;

    protected $fillable = [
        'mail_content',
        'employee_id',
        'recruiter_id',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function recruiter()
    {
        return $this->belongsTo(Recruiter::class);
    }
}
