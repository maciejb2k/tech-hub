<?php

namespace App\Http\Resources;
use App\Models\User;
use App\Models\Employee;
use App\Models\Recruiter;
use Illuminate\Http\Resources\Json\JsonResource;

class WaitListResource extends JsonResource
{
    public function toArray($request)
    {
        $employee = Employee::findOrFail($this->employee_id);
        return [
            'id' => $this->id,
            'description' => $this->description,
            'employee_id' => $this->employee_id,
            'recruiter_id' => $this->recruiter_id,
            'employee' => new UserResource(User::findOrFail($employee->user_id)),
            'recruiter' => new RecruiterResource(Recruiter::findOrFail($this->recruiter_id)),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
