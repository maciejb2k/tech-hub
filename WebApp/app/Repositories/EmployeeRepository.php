<?php

namespace App\Repositories;

use App\Http\Requests\EmployeeRequest;
use App\Http\Requests\RegisterEmployeeRequest;
use App\Http\Requests\SearchEmployeeRequest;
use App\Models\Employee;

use function PHPUnit\Framework\isEmpty;

class EmployeeRepository {

    protected $employee;

    public function __construct(Employee $employee)
    {
        $this->employee = $employee;
    }

    public function getEmployeeByUserId(string $userId)
    {
        return $this->employee::where('user_id', $userId)->first();
    }

    public function getEmployeeById(int $employeeId)
    {
        return $this->employee::where('id', $employeeId)->first();
    }

    public function createEmployee(RegisterEmployeeRequest $registerEmployeeRequest, string $userId)
    {
        $employee = $this->employee::create([
            'views' => 0,
            'location' => null,
            'bio' => null,
            'expected_salary' => 0,
            'portfolio' => null,
            'user_id' => $userId
        ]);

        return $employee;
    }

    public function updateEmployee(EmployeeRequest $request, int $employeeId)
    {
        $employee = $this->employee::where('id', $employeeId)->first();

        $employee['location'] = $request['location'];
        $employee['bio'] = $request['bio'];
        $employee['expected_salary'] = $request['expected_salary'];
        $employee['portfolio'] = $request['portfolio'];

        $employee->save();

        return $employee;
    }

    public function searchEmployee(SearchEmployeeRequest $request, array $userSearchIds)
    {
        $query = $this->employee::query();
        
        $query->whereIn('user_id', $userSearchIds);

        if (isset($request['salary_min'])) {
            $query->where('expected_salary', '>=', intval($request['salary_min']));
        }

        if (isset($request['salary_max'])) {
            $query->where('expected_salary', '<=', intval($request['salary_max']));
        }

        if (isset($request['sort_by']) && $request['sort_by'] === 'expected_salary') {
            $sortDirection = $request['sort_direction'];
            if($sortDirection === null) $sortDirection = "asc";

            $query->orderBy('expected_salary', $sortDirection);
        }
        
        if(count($userSearchIds) > 0)
        {
            $userIdsString = implode(',', $userSearchIds);
            $query->orderByRaw("FIELD(user_id, $userIdsString)");
        }
        
        return $query->get();
    }
}
