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
use Illuminate\Http\Request;

class ProfileService {

    protected $languageRepository;
    protected $educationRepository;
    protected $skillRepository;
    protected $workExperienceRepository;

    protected $employeeRepository;
    protected $recruiterRepository;

    protected $employeeService;

    public function __construct(LanguageRepository $languageRepository, EducationRepository $educationRepository, SkillRepository $skillRepository, WorkExperienceRepository $workExperienceRepository, EmployeeRepository $employeeRepository, RecruiterRepository $recruiterRepository, EmployeeService $employeeService)
    {
        $this->languageRepository = $languageRepository;
        $this->educationRepository = $educationRepository;
        $this->skillRepository = $skillRepository;
        $this->workExperienceRepository = $workExperienceRepository;

        $this->employeeRepository = $employeeRepository;
        $this->recruiterRepository = $recruiterRepository;

        $this->employeeService = $employeeService;
    }

    public function getProfile(Request $request)
    {
        if($request->user()->role->id === 1)
        {
            $employee = $this->employeeService->getEmployeeByUserId($request->user()->id, $request);

            return $employee;
        }
        else
        {
            $recruiter = $this->recruiterRepository->getRecruiterByUserId($request->user()->id);

            return [
                "recruiter" => new RecruiterResource($recruiter),
            ];
        }
    }
}
