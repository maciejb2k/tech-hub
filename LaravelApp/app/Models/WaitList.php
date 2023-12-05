<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WaitList extends Model
{
    use HasFactory;

    protected $fillable = [
        'description',
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
