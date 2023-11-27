<?php
namespace App\Services;

use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Models\Invitation;
use App\Http\Requests\InvitationRequest;
use App\Http\Resources\InvitationResource;
use App\Repositories\EmployeeRepository;
use App\Repositories\RecruiterRepository;
use App\Repositories\InvitationRepository;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

class InvitationService
{
    protected $invitationRepository;
    protected $employeeRepository;
    protected $recruiterRepository;

    public function __construct(InvitationRepository $invitationRepository, EmployeeRepository $employeeRepository, RecruiterRepository $recruiterRepository)
    {
        $this->invitationRepository = $invitationRepository;
        $this->employeeRepository = $employeeRepository;
        $this->recruiterRepository = $recruiterRepository;
    }

    public function createMeetingInvitation(InvitationRequest $request, int $recruiter_user_id)
    {
        if ($request['employee_id'] === null) {
            throw new BadRequestException();
        }

        if ($request['message'] === null) {
            throw new BadRequestException();
        }

        $employee = $this->employeeRepository->getEmployeeById($request['employee_id']);

        if (!isset($employee)) {
            throw new NotFoundException();
        }

        $recruiter = $this->recruiterRepository->getRecruiterByUserId($recruiter_user_id);

        if (!isset($recruiter)) {
            throw new NotFoundException();
        }

        $meetingInvitation = $this->invitationRepository->createMeetingInvitation($request, $employee['id'], $recruiter['id']);

        return new InvitationResource($meetingInvitation);
    }

    public function updateMeetingInvitation(InvitationRequest $request, int $invitationId, int $recruiter_user_id)
    {
        $recruiter = $this->recruiterRepository->getRecruiterByUserId($recruiter_user_id);

        $meetingInvitation = $this->invitationRepository->getMeetingInvitationById($invitationId);

        if (!isset($meetingInvitation)) {
            throw new NotFoundException();
        }

        if ($meetingInvitation->recruiter_id !== $recruiter['id']) {
            throw new ForbiddenException();
        }

        $updatedMeetingInvitation = $this->invitationRepository->updateMeetingInvitation($request, $invitationId);

        return new InvitationResource($updatedMeetingInvitation);
    }

    public function deleteMeetingInvitation(int $invitationId, int $recruiter_user_id)
    {
        $recruiter = $this->recruiterRepository->getRecruiterByUserId($recruiter_user_id);
        $meetingInvitation = $this->invitationRepository->getMeetingInvitationById($invitationId);

        if (!isset($meetingInvitation)) {
            throw new NotFoundException();
        }

        if ($meetingInvitation->recruiter_id !== $recruiter['id']) {
            throw new ForbiddenException();
        }

        $this->invitationRepository->deleteMeetingInvitation($invitationId);
    }

    public function getMeetingInvitationByIdAndEmployeeId(int $invitationId, int $employee_user_id)
    {
        $employee = $this->employeeRepository->getEmployeeByUserId($employee_user_id);
        $meetingInvitation = $this->invitationRepository->getMeetingInvitationById($invitationId);

        if (!isset($meetingInvitation)) {
            throw new NotFoundException();
        }

        if ($meetingInvitation->employee_id !== $employee['id']) {
            throw new ForbiddenException();
        }

        return new InvitationResource($meetingInvitation);
    }

    public function getMeetingInvitationByIdAndRecruiterId(int $invitationId, int $recruiter_user_id)
    {
        $recruiter = $this->recruiterRepository->getRecruiterByUserId($recruiter_user_id);
        $meetingInvitation = $this->invitationRepository->getMeetingInvitationById($invitationId);

        if (!isset($meetingInvitation)) {
            throw new NotFoundException();
        }

        if ($meetingInvitation->recruiter_id !== $recruiter['id']) {
            throw new ForbiddenException();
        }

        return new InvitationResource($meetingInvitation);
    }

    public function getMeetingInvitationsByEmployeeUserId(int $employee_user_id)
    {
        $employee = $this->employeeRepository->getEmployeeByUserId($employee_user_id);
        return $this->invitationRepository->getMeetingInvitationsByEmployeeId($employee['id']);
    }

    public function getMeetingInvitationsByRecruiterUserId(int $recruiter_user_id)
    {
        $recruiter = $this->recruiterRepository->getRecruiterByUserId($recruiter_user_id);
        return $this->invitationRepository->getMeetingInvitationsByRecruiterId($recruiter['id']);
    }
}
