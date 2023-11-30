<?php

namespace App\Http\Controllers;

use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Services\InvitationService;
use App\Http\Requests\InvitationRequest;
use Illuminate\Http\Request;
use App\Http\Resources\InvitationResource;
use Exception;

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
        try
        {
            $userId = $request->user()->id;
            $invitation = $this->invitationService->getMeetingInvitationByIdAndEmployeeId($invitationId, $userId);

            return new InvitationResource($invitation);
        }
        catch(Exception $e)
        {
            if($e instanceof ForbiddenException)
                return response(['message' => 'No access to the resource!'], 403);
            if($e instanceof NotFoundException)
                return response(['message' => 'Invitation does not exist!'], 404);
        }
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
