<?php

namespace App\Services;

use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Http\Requests\LanguageRequest;
use App\Http\Resources\EducationCollection;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\LanguageCollection;
use App\Http\Resources\LanguageResource;
use App\Http\Resources\RecruiterResource;
use App\Http\Resources\SkillCollection;
use App\Http\Resources\WorkExperienceCollection;
use App\Models\Employee;
use App\Repositories\EducationRepository;
use App\Repositories\EmployeeRepository;
use App\Repositories\LanguageRepository;
use App\Repositories\RecruiterRepository;
use App\Repositories\SkillRepository;
use App\Repositories\UserRepository;
use App\Repositories\WorkExperienceRepository;
use App\Traits\HandlesPreferences;
use App\Utils\ResourceTransformation;
use Illuminate\Http\Request;

class EmployeeService {

    protected $languageRepository;
    protected $educationRepository;
    protected $skillRepository;
    protected $workExperienceRepository;

    protected $employeeRepository;

    use HandlesPreferences;

    public function __construct(LanguageRepository $languageRepository, EducationRepository $educationRepository, SkillRepository $skillRepository, WorkExperienceRepository $workExperienceRepository, EmployeeRepository $employeeRepository)
    {
        $this->languageRepository = $languageRepository;
        $this->educationRepository = $educationRepository;
        $this->skillRepository = $skillRepository;
        $this->workExperienceRepository = $workExperienceRepository;

        $this->employeeRepository = $employeeRepository;
    }

    public function getEmployeeById(int $employeeId, $request)
    {
        $employee = $this->employeeRepository->getEmployeeById($employeeId);
        return $this->getEmployee($employee, $request);
    }

    public function getEmployeeByUserId(int $user_id, $request){
        $employee = $this->employeeRepository->getEmployeeByUserId($user_id);
        return $this->getEmployee($employee, $request);
    }

    private function getEmployee(Employee $employee, $request)
    {
        $user_id = $employee['user_id'];

        $preferences = $this->getPreferences(['employee','languages', 'educations', 'skills', 'work_experiences'], $user_id);

        $visitor = ResourceTransformation::GetVisitorType($request->user(), $user_id);

        return [
            "employee" => new EmployeeResource($employee, $preferences, $visitor),
            "languages" => new LanguageCollection($this->languageRepository->getLanguagesByEmployeeId($employee['id']), $preferences, $visitor),
            "educations" => new EducationCollection($this->educationRepository->getEducationsByEmployeeId($employee['id']), $preferences, $visitor),
            "skills" => new SkillCollection($this->skillRepository->getSkillsByEmployeeId($employee['id']), $preferences, $visitor),
            "work_experiences" => new WorkExperienceCollection($this->workExperienceRepository->getWorkExperiencesByEmployeeId($employee['id']), $preferences, $visitor)
        ];
    }
}
