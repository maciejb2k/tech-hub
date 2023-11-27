<?php

namespace App\Repositories;

use App\Models\Invitation;
use App\Http\Requests\InvitationRequest;

class InvitationRepository
{
    protected $invitation;

    public function __construct(Invitation $invitation)
    {
        $this->invitation = $invitation;
    }

    public function createMeetingInvitation(InvitationRequest $request, int $employeeId, int $recruiterId)
    {
        $meetingInvitation = $this->invitation::create([
            'message' => $request['message'],
            'employee_id' => $employeeId,
            'recruiter_id' => $recruiterId,
            'status' => 'Pending',
        ]);

        return $meetingInvitation;
    }

    public function getMeetingInvitationById(int $invitationId)
    {
        return $this->invitation::where('id', $invitationId)->first();
    }

    public function updateMeetingInvitation(InvitationRequest $request, int $invitationId)
    {
        $meetingInvitation = $this->invitation::where("id", $invitationId)->first();

        if ($request['message'] !== null) $meetingInvitation['message'] = $request['message'];
        if ($request['status'] !== null)  $meetingInvitation->status = $request['status'];

        $meetingInvitation->save();

        return $meetingInvitation;
    }

    public function deleteMeetingInvitation(int $invitationId)
    {
        $this->invitation::where("id", $invitationId)->delete();
    }

    public function getMeetingInvitationsByEmployeeId(int $employeeId)
    {
        return $this->invitation::where("employee_id", $employeeId)->get();
    }

    public function getMeetingInvitationsByRecruiterId(int $recruiterId)
    {
        return $this->invitation::where("recruiter_id", $recruiterId)->get();
    }
}
