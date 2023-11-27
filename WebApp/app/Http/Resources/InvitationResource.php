<?php

namespace App\Http\Resources;

use App\Models\Employee;
use App\Models\Recruiter;
use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class InvitationResource extends JsonResource
{
    public function toArray($request)
    {
        $employee = Employee::findOrFail($this->employee_id);

        return [
            'id' => $this->id,
            'message' => $this->message,
            'employee' => new UserResource(User::findOrFail($employee->user_id)),
            'recruiter' => new RecruiterResource(Recruiter::findOrFail($this->recruiter_id)),
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
