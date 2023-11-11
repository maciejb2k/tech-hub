<?php

namespace App\Services;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterEmployeeRequest;
use App\Http\Requests\RegisterRecruiterRequest;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\RecruiterResource;
use App\Repositories\EmployeeRepository;
use App\Repositories\RecruiterRepository;
use App\Repositories\RoleRepository;
use App\Repositories\UserRepository;
use Exception;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;

class AuthService {

    protected $employeeRepository;
    protected $recruiterRepository;
    protected $userRepository;
    protected $roleRepository;

    public function __construct(EmployeeRepository $employeeRepository, RecruiterRepository $recruiterRepository, UserRepository $userRepository, RoleRepository $roleRepository)
    {
        $this->employeeRepository = $employeeRepository;
        $this->recruiterRepository = $recruiterRepository;
        $this->userRepository = $userRepository;
        $this->roleRepository = $roleRepository;
    }

    public function registerEmployee(RegisterEmployeeRequest $registerEmployeeRequest)
    {
        $this->comparePasswordsFromRequest($registerEmployeeRequest['password'], $registerEmployeeRequest['repeat_password']);
        $user = $this->userRepository->createEmployee($registerEmployeeRequest);
        $employee = $this->employeeRepository->createEmployee($registerEmployeeRequest, $user['id']);

        $token = $this->createToken($user);

        return $this->returnEmployeeWithToken($user, $token);
    }

    public function registerRecruiter(RegisterRecruiterRequest $registerRecruiterRequest)
    {
        $this->comparePasswordsFromRequest($registerRecruiterRequest['password'], $registerRecruiterRequest['repeat_password']);
        $user = $this->userRepository->createRecruiter($registerRecruiterRequest);
        $recruiter = $this->recruiterRepository->createRecruiter($registerRecruiterRequest, $user['id']);

        $token = $this->createToken($user);

        return $this->returnRecruiterWithToken($user, $token);
    }

    public function login(LoginRequest $loginRequest)
    {
        $user = $this->userRepository->findUserByEmail($loginRequest['email']);
        
        if(!$user) $this->validateUser($user, "");
        
        $isCorrectPassword = $this->userRepository->comparePassword($loginRequest['password'], $user);
        
        $this->validateUser($user, $isCorrectPassword);
        
        $token = $this->createToken($user);
        
        if($user['role_id'] === 1) 
            return $this->returnEmployeeWithToken($user, $token);
        return $this->returnRecruiterWithToken($user, $token);
    }

    public function logout(Request $request)
    {
        $this->userRepository->deleteToken($request);
    }

    public function createToken($user)
    {
        $role = $this->roleRepository->getRoleById($user['role_id']);
        return $this->userRepository->createToken($user, $role);
    }

    public function returnEmployeeWithToken($user, $token)
    {
        $res = [
            'token' => $token,
            'user_details' => new EmployeeResource($this->employeeRepository->getEmployeeByUserId($user['id'])),
        ];

        return $res;
    }

    public function comparePasswordsFromRequest($passsword, $repeatPassword)
    {
        if($passsword !== $repeatPassword) throw new AuthenticationException();
    }

    public function validateUser($user, $isCorrectPassword)
    {
        if (!$user || !$isCorrectPassword) throw new AuthenticationException();
    }

    public function returnRecruiterWithToken($user, $token)
    {
        $res = [
            'token' => $token,
            'user_details' => new RecruiterResource($this->recruiterRepository->getRecruiterByUserId($user['id'])),
        ];

        return $res;
    }
    
}