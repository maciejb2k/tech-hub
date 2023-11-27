<?php

namespace App\Http\Controllers;

use App\Services\InvitationService;
use App\Http\Requests\InvitationRequest;
use Illuminate\Http\Request;
use App\Http\Resources\InvitationResource;

class RecruiterInvitationController extends Controller
{
    protected $invitationService;

    public function __construct(InvitationService $invitationService)
    {
        $this->invitationService = $invitationService;
    }

    public function index(Request $request)
    {
        $user_id = $request->user()->id;
        $invitations = $this->invitationService->getMeetingInvitationsByRecruiterUserId($user_id);

        return InvitationResource::collection($invitations);
    }

    public function show($invitationId, Request $request)
    {
        $user_id = $request->user()->id;
        $invitation = $this->invitationService->getMeetingInvitationByIdAndRecruiterId($invitationId, $user_id);

        return new InvitationResource($invitation);
    }

    public function store(InvitationRequest $request)
    {
        $user_id = $request->user()->id;

        $invitation = $this->invitationService->createMeetingInvitation($request, $user_id);

        return new InvitationResource($invitation);
    }

    public function update(InvitationRequest $request, $invitationId)
    {
        $user_id = $request->user()->id;

        $invitation = $this->invitationService->updateMeetingInvitation($request, $invitationId, $user_id);

        return new InvitationResource($invitation);
    }

    public function destroy($invitationId, Request $request)
    {
        $user_id = $request->user()->id;

        $this->invitationService->deleteMeetingInvitation($invitationId, $user_id);

        return response()->json(null, 204);
    }
}
