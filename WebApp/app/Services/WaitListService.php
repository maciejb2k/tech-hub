<?php

namespace App\Services;

use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Http\Requests\WaitListRequest;
use App\Http\Resources\WaitListResource;
use App\Repositories\EmployeeRepository;
use App\Repositories\RecruiterRepository;
use App\Repositories\WaitListRepository;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

class WaitListService
{
    protected $waitListRepository;
    protected $employeeRepository;
    protected $recruiterRepository;

    public function __construct(WaitListRepository $waitListRepository, EmployeeRepository $employeeRepository, RecruiterRepository $recruiterRepository)
    {
        $this->waitListRepository = $waitListRepository;
        $this->employeeRepository = $employeeRepository;
        $this->recruiterRepository = $recruiterRepository;
    }

    public function createWaitList(WaitListRequest $request, int $recruiter_user_id)
    {
        if ($request['employee_id'] === null) {
            throw new BadRequestException();
        }

        if ($request['description'] === null) {
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

        $waitList = $this->waitListRepository->createWaitList($request, $employee['id'], $recruiter['id']);

        return new WaitListResource($waitList);
    }

    public function getWaitListById(int $waitListId, int $recruiter_user_id)
    {
        $recruiter = $this->recruiterRepository->getRecruiterByUserId($recruiter_user_id);

        $waitList = $this->waitListRepository->getWaitListById($waitListId);

        if (!isset($waitList)) {
            throw new NotFoundException();
        }

        if ($waitList->recruiter_id !== $recruiter['id']) {
            throw new ForbiddenException();
        }

        return new WaitListResource($waitList);
    }

    public function updateWaitList(WaitListRequest $request, int $waitListId, int $recruiter_user_id)
    {
        $recruiter = $this->recruiterRepository->getRecruiterByUserId($recruiter_user_id);

        $waitList = $this->waitListRepository->getWaitListById($waitListId);

        if (!isset($waitList)) {
            throw new NotFoundException();
        }

        if ($waitList->recruiter_id !== $recruiter['id']) {
            throw new ForbiddenException();
        }

        $updatedWaitList = $this->waitListRepository->updateWaitList($request, $waitListId);

        return new WaitListResource($updatedWaitList);
    }

    public function deleteWaitList(int $waitListId, int $recruiter_user_id)
    {
        $recruiter = $this->recruiterRepository->getRecruiterByUserId($recruiter_user_id);
        $waitList = $this->waitListRepository->getWaitListById($waitListId);

        if (!isset($waitList)) {
            throw new NotFoundException();
        }

        if ($waitList->recruiter_id !== $recruiter['id']) {
            throw new ForbiddenException();
        }

        $this->waitListRepository->deleteWaitList($waitListId);
    }

    public function getWaitListsByRecruiterUserId(int $recruiter_user_id)
    {
        $recruiter = $this->recruiterRepository->getRecruiterByUserId($recruiter_user_id);
        $waitLists = $this->waitListRepository->getWaitListsByRecruiterId($recruiter['id']);

        return WaitListResource::collection($waitLists);
    }
}
