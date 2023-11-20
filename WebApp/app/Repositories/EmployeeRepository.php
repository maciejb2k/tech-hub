<?php

namespace App\Repositories;

use App\Http\Requests\EmployeeRequest;
use App\Http\Requests\RegisterEmployeeRequest;
use App\Models\Employee;

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
}
