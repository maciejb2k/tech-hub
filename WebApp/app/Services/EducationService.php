<?php

namespace App\Services;

use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Http\Requests\EducationRequest;
use App\Http\Resources\EducationResource;
use App\Repositories\EducationRepository;
use App\Repositories\EmployeeRepository;

class EducationService {

    protected $educationRepository;
    protected $employeeRepository;

    public function __construct(EducationRepository $educationRepository, EmployeeRepository $employeeRepository)
    {
        $this->educationRepository = $educationRepository;
        $this->employeeRepository = $employeeRepository;
    }

    public function createEducation(EducationRequest $request, int $userId)
    {
        $employee = $this->employeeRepository->getEmployeeByUserId($userId);

        $education = $this->educationRepository->createEducation($request, $employee['id']);

        return new EducationResource($education, [], 'owner');
    }

    public function updateEducation(EducationRequest $request, int $educationId, int $userId)
    {
        $employee = $this->employeeRepository->getEmployeeByUserId($userId);
        $education = $this->educationRepository->getEducationById($educationId);

        if(!isset($education)) throw new NotFoundException();
        if($education['employee_id'] !== $employee['id']) throw new ForbiddenException();

        $updatedEducation = $this->educationRepository->updateEducation($request, $educationId);

        return new EducationResource($updatedEducation, [], 'owner');
    }

    public function deleteEducation(int $educationId, int $userId)
    {
        $employee = $this->employeeRepository->getEmployeeByUserId($userId);
        $education = $this->educationRepository->getEducationById($educationId);

        if(!isset($education)) throw new NotFoundException();
        if($education['employee_id'] !== $employee['id']) throw new ForbiddenException();

        $this->educationRepository->deleteEducation($educationId);
    }

    public function getEducationById(int $educationId, int $userId)
    {
        $employee = $this->employeeRepository->getEmployeeByUserId($userId);
        $education = $this->educationRepository->getEducationById($educationId);

        if(!isset($education)) throw new NotFoundException();
        if($education['employee_id'] !== $employee['id']) throw new ForbiddenException();

        return new EducationResource($education, [], "owner");
    }
}
