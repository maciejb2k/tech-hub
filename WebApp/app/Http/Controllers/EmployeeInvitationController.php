<?php

namespace App\Http\Controllers;

use App\Services\InvitationService;
use App\Http\Requests\InvitationRequest;
use Illuminate\Http\Request;
use App\Http\Resources\InvitationResource;

class EmployeeInvitationController extends Controller
{
    protected $invitationService;

    public function __construct(InvitationService $invitationService)
    {
        $this->invitationService = $invitationService;
    }

    public function index(Request $request)
    {
        $employeeId = $request->user()->id;
        $invitations = $this->invitationService->getMeetingInvitationsByEmployeeUserId($employeeId);

        return InvitationResource::collection($invitations);
    }

    public function show($invitationId, Request $request)
    {
        $userId = $request->user()->id;
        $invitation = $this->invitationService->getMeetingInvitationByIdAndEmployeeId($invitationId, $userId);

        return new InvitationResource($invitation);
    }

    public function store(InvitationRequest $request)
    {
    }

    public function update(InvitationRequest $request, $invitationId)
    {
    }

    public function destroy($invitationId, Request $request)
    {
    }
}
