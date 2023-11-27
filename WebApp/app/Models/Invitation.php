<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invitation extends Model
{
    use HasFactory;

    public $timestamps = true;

    protected $fillable = [
        'message',
        'employee_id',
        'recruiter_id',
        'status'
    ];

    public static $statuses = [
        'Pending',
        'Cancelled',
        'Finished',
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
