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
use App\Repositories\EducationRepository;
use App\Repositories\EmployeeRepository;
use App\Repositories\LanguageRepository;
use App\Repositories\RecruiterRepository;
use App\Repositories\SkillRepository;
use App\Repositories\UserRepository;
use App\Repositories\WorkExperienceRepository;

class ProfileService {

    protected $languageRepository;
    protected $educationRepository;
    protected $skillRepository;
    protected $workExperienceRepository;

    protected $employeeRepository;
    protected $recruiterRepository;

    public function __construct(LanguageRepository $languageRepository, EducationRepository $educationRepository, SkillRepository $skillRepository, WorkExperienceRepository $workExperienceRepository, EmployeeRepository $employeeRepository, RecruiterRepository $recruiterRepository)
    {
        $this->languageRepository = $languageRepository;
        $this->educationRepository = $educationRepository;
        $this->skillRepository = $skillRepository;
        $this->workExperienceRepository = $workExperienceRepository;

        $this->employeeRepository = $employeeRepository;
        $this->recruiterRepository = $recruiterRepository;
    }
    
    public function getProfile(int $userId, int $roleId)
    {
        if($roleId === 1)
        {
            $employee = $this->employeeRepository->getEmployeeByUserId($userId);

            return [
                "employee" => new EmployeeResource($employee),
                "languages" => new LanguageCollection($this->languageRepository->getLanguagesByEmployeeId($employee['id'])),
                "educations" => new EducationCollection($this->educationRepository->getEducationsByEmployeeId($employee['id'])),
                "skills" => new SkillCollection($this->skillRepository->getSkillsByEmployeeId($employee['id'])),
                "work_experiences" => new WorkExperienceCollection($this->workExperienceRepository->getWorkExperiencesByEmployeeId($employee['id'])),
            ];
        }
        else
        {
            $recruiter = $this->recruiterRepository->getRecruiterByUserId($userId);

            return [
                "recruiter" => new RecruiterResource($recruiter),
            ];
        }
    }
}