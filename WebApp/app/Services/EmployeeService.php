<?php

namespace App\Services;

use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Http\Requests\EmployeeRequest;
use App\Http\Requests\SearchEmployeeRequest;
use App\Http\Resources\EducationCollection;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\LanguageCollection;
use App\Http\Resources\SkillCollection;
use App\Http\Resources\WorkExperienceCollection;
use App\Models\Employee;
use App\Repositories\EducationRepository;
use App\Repositories\EmployeeRepository;
use App\Repositories\LanguageRepository;
use App\Repositories\SkillRepository;
use App\Repositories\UserRepository;
use App\Repositories\WorkExperienceRepository;
use App\Traits\HandlesPreferences;
use App\Utils\PaginateTransformation;
use App\Utils\ResourceTransformation;
use Illuminate\Support\Facades\Auth;

class EmployeeService {

    protected $languageRepository;
    protected $educationRepository;
    protected $skillRepository;
    protected $workExperienceRepository;

    protected $employeeRepository;
    protected $userRepository;

    use HandlesPreferences;

    public function __construct(LanguageRepository $languageRepository, EducationRepository $educationRepository, SkillRepository $skillRepository, WorkExperienceRepository $workExperienceRepository, EmployeeRepository $employeeRepository, UserRepository $userRepository)
    {
        $this->languageRepository = $languageRepository;
        $this->educationRepository = $educationRepository;
        $this->skillRepository = $skillRepository;
        $this->workExperienceRepository = $workExperienceRepository;

        $this->employeeRepository = $employeeRepository;
        $this->userRepository = $userRepository;
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

        $preferences = $this->getPreferences($user_id);
        $visitor = ResourceTransformation::GetVisitorType($request->user(), $user_id);

        $this->employeeRepository->addEmployeeView($employee['id']);

        return [
            "employee" => new EmployeeResource(
                $employee,
                $this->getTablePreferences($preferences, 'employee'),
                $visitor
            ),
            "languages" => new LanguageCollection(
                $this->languageRepository->getLanguagesByEmployeeId($employee['id']),
                $this->getTablePreferences($preferences, 'languages'),
                $visitor
            ),
            "educations" => new EducationCollection(
                $this->educationRepository->getEducationsByEmployeeId($employee['id']),
                $this->getTablePreferences($preferences, 'educations'),
                $visitor
            ),
            "skills" => new SkillCollection(
                $this->skillRepository->getSkillsByEmployeeId($employee['id']),
                $this->getTablePreferences($preferences, 'skills'),
                $visitor
            ),
            "work_experiences" => new WorkExperienceCollection(
                $this->workExperienceRepository->getWorkExperiencesByEmployeeId($employee['id']),
                $this->getTablePreferences($preferences, 'work_experiences'),
                $visitor
            )
        ];
    }

    public function updateEmployee(EmployeeRequest $request, int $employeeId, int $userId)
    {
        $employee = $this->employeeRepository->getEmployeeByid($employeeId);

        if(!isset($employee)) throw new NotFoundException();

        if($userId !== $employee['user_id']) throw new ForbiddenException();

        $updatedEmployee = $this->employeeRepository->updateEmployee($request, $employeeId);

        return new EmployeeResource($updatedEmployee, [], "owner");
    }

    public function searchEmployee(SearchEmployeeRequest $request)
    {
        $token = $request->bearerToken();

        if ($token) {
            $user = Auth::guard('sanctum')->user();
        } else {
            $user = null;
        }

        $userSearchIds = $this->userRepository->searchUserIds($request);
        $employeeSearchResult = $this->employeeRepository->searchEmployee($request, $userSearchIds->toArray());

        $visitors = [];
        $preferences = [];
        foreach($employeeSearchResult as $employee)
        {
            $user_id = $employee['user_id'];
            array_push($preferences, $this->getPreferences($user_id));
            array_push($visitors, ResourceTransformation::GetVisitorType($user, $user_id));
        }

        $employeeResponse = [];
        for($i = 0; $i < count($employeeSearchResult); $i++)
        {
            $employee = ResourceTransformation::TransformResource($employeeSearchResult[$i], ["id", "expected_salary", 'location', "user_id"], $this->getTablePreferences($preferences[$i], 'employee'), $visitors[$i]);
            
            if(isset($request['salary_min']) || isset($request['salary_max']) || $request['sort_by'] === 'expected_salary')
            {
                if(array_key_exists('expected_salary', $employee)) 
                {   
                    $employee['user'] = $this->userRepository->getUserById($employee['user_id']);
                    unset($employee['user_id']);
                    array_push($employeeResponse, $employee);
                }
            }
            else 
            {
                $employee['user'] = $this->userRepository->getUserById($employee['user_id']);
                unset($employee['user_id']);
                array_push($employeeResponse, $employee);
            }
        }

        $perPage = $request['per_page'];
        if(!isset($request['per_page'])) $perPage = 10;

        return PaginateTransformation::getPaginateFromArray($employeeResponse, $perPage);
    }
}
