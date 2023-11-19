<?php

namespace App\Services;

use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Http\Requests\SkillRequest;
use App\Http\Resources\SkillResource;
use App\Repositories\EmployeeRepository;
use App\Repositories\SkillRepository;

class SkillService {

    protected $skillRepository;
    protected $employeeRepository;

    public function __construct(SkillRepository $skillRepository, EmployeeRepository $employeeRepository)
    {
        $this->skillRepository = $skillRepository;
        $this->employeeRepository = $employeeRepository;
    }

    public function createSkill(SkillRequest $request, int $userId)
    {
        $employee = $this->employeeRepository->getEmployeeByUserId($userId);

        $skill = $this->skillRepository->createSkill($request, $employee['id']);

        return new SkillResource($skill, [], 'owner');
    }

    public function updateSkill(SkillRequest $request, int $skillId, int $userId)
    {
        $employee = $this->employeeRepository->getEmployeeByUserId($userId);
        $skill = $this->skillRepository->getSkillById($skillId);

        if(!isset($skill)) throw new NotFoundException();
        if($skill['employee_id'] !== $employee['id']) throw new ForbiddenException();

        $updatedSkill = $this->skillRepository->updateSkill($request, $skillId);

        return new SkillResource($updatedSkill, [], 'owner');
    }

    public function deleteSkill(int $skillId, int $userId)
    {
        $employee = $this->employeeRepository->getEmployeeByUserId($userId);
        $skill = $this->skillRepository->getSkillById($skillId);

        if(!isset($skill)) throw new NotFoundException();
        if($skill['employee_id'] !== $employee['id']) throw new ForbiddenException();

        $this->skillRepository->deleteSkill($skillId);
    }
}
