<?php

namespace App\Http\Controllers;

use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Services\InvitationService;
use App\Http\Requests\InvitationRequest;
use Illuminate\Http\Request;
use App\Http\Resources\InvitationResource;
use Exception;

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
        try
        {
            $user_id = $request->user()->id;
            $invitation = $this->invitationService->getMeetingInvitationByIdAndRecruiterId($invitationId, $user_id);

            return new InvitationResource($invitation);
        }
        catch(Exception $e)
        {
            if($e instanceof ForbiddenException)
                return response(['message' => 'No access to the resource!'], 403);
            if($e instanceof NotFoundException)
                return response(['message' => 'The resource does not exist!'], 404);
        }
    }

    public function store(InvitationRequest $request)
    {
        try
        {
            $user_id = $request->user()->id;

            $invitation = $this->invitationService->createMeetingInvitation($request, $user_id);

            return new InvitationResource($invitation);
        }
        catch(Exception $e)
        {
            if($e instanceof ForbiddenException)
                return response(['message' => 'No access to the resource!'], 403);
            if($e instanceof NotFoundException)
                return response(['message' => 'The resource does not exist!'], 404);
        }
    }

    public function update(InvitationRequest $request, $invitationId)
    {
        try
        {
            $user_id = $request->user()->id;

            $invitation = $this->invitationService->updateMeetingInvitation($request, $invitationId, $user_id);

            return new InvitationResource($invitation);
        }
        catch(Exception $e)
        {
            if($e instanceof ForbiddenException)
                return response(['message' => 'No access to the resource!'], 403);
            if($e instanceof NotFoundException)
                return response(['message' => 'The resource does not exist!'], 404);
        }
    }

    public function destroy($invitationId, Request $request)
    {
        try
        {
            $user_id = $request->user()->id;

            $this->invitationService->deleteMeetingInvitation($invitationId, $user_id);

            return response()->json(null, 204);
        }
        catch(Exception $e)
        {
            if($e instanceof ForbiddenException)
                return response(['message' => 'No access to the resource!'], 403);
            if($e instanceof NotFoundException)
                return response(['message' => 'The resource does not exist!'], 404);
        }
    }
}
