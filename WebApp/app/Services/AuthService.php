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

    public function registerEmployee(RegisterEmployeeRequest $request)
    {
        $this->comparePasswordsFromRequest($request['password'], $request['repeat_password']);
        $user = $this->userRepository->createEmployee($request);
        $employee = $this->employeeRepository->createEmployee($request, $user['id']);

        $token = $this->createToken($user);

        return $this->returnEmployeeWithToken($user, $token);
    }

    public function registerRecruiter(RegisterRecruiterRequest $request)
    {
        $this->comparePasswordsFromRequest($request['password'], $request['repeat_password']);
        $user = $this->userRepository->createRecruiter($request);
        $recruiter = $this->recruiterRepository->createRecruiter($request, $user['id']);

        $token = $this->createToken($user);

        return $this->returnRecruiterWithToken($user, $token);
    }

    public function login(LoginRequest $request)
    {
        $user = $this->userRepository->findUserByEmail($request['email']);

        if(!$user) $this->validateUser($user, "");

        $isCorrectPassword = $this->userRepository->comparePassword($request['password'], $user);

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
        $userDetails = new EmployeeResource(
            $this->employeeRepository->getEmployeeByUserId($user['id']),
            [],
            'owner'
        );

        $res = [
            'token' => $token,
            'user_details' => $userDetails,
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
