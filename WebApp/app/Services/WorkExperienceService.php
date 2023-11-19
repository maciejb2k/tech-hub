<?php

namespace App\Services;

use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Http\Requests\WorkExperienceRequest;
use App\Http\Resources\WorkExperienceResource;
use App\Repositories\EmployeeRepository;
use App\Repositories\WorkExperienceRepository;

class WorkExperienceService {

    protected $workExperienceRepository;
    protected $employeeRepository;

    public function __construct(WorkExperienceRepository $workExperienceRepository, EmployeeRepository $employeeRepository)
    {
        $this->workExperienceRepository = $workExperienceRepository;
        $this->employeeRepository = $employeeRepository;
    }

    public function createWorkExperience(WorkExperienceRequest $request, int $userId)
    {
        $employee = $this->employeeRepository->getEmployeeByUserId($userId);

        $workExperience = $this->workExperienceRepository->createWorkExperience($request, $employee['id']);

        return new WorkExperienceResource($workExperience, [], 'owner');
    }

    public function updateWorkExperience(WorkExperienceRequest $request, int $workExperienceId, int $userId)
    {
        $employee = $this->employeeRepository->getEmployeeByUserId($userId);
        $workExperience = $this->workExperienceRepository->getWorkExperienceById($workExperienceId);

        if(!isset($workExperience)) throw new NotFoundException();
        if($workExperience['employee_id'] !== $employee['id']) throw new ForbiddenException();

        $updatedWorkExperience = $this->workExperienceRepository->updateWorkExperience($request, $workExperienceId);

        return new WorkExperienceResource($updatedWorkExperience, [], 'owner');
    }

    public function deleteWorkExperience(int $workExperienceId, int $userId)
    {
        $employee = $this->employeeRepository->getEmployeeByUserId($userId);
        $workExperience = $this->workExperienceRepository->getWorkExperienceById($workExperienceId);

        if(!isset($workExperience)) throw new NotFoundException();
        if($workExperience['employee_id'] !== $employee['id']) throw new ForbiddenException();

        $this->workExperienceRepository->deleteWorkExperience($workExperienceId);
    }
}
