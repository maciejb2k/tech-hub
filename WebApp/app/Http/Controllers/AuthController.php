<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterEmployeeRequest;
use App\Http\Requests\RegisterRecruiterRequest;
use App\Services\AuthService;
use Exception;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function registerEmployee(RegisterEmployeeRequest $registerEmployeeRequest)
    {
        $res = $this->authService->registerEmployee($registerEmployeeRequest);
        return response($res, 201);
    }

    public function registerRecruiter(RegisterRecruiterRequest $registerRecruiterRequest)
    {
        $res = $this->authService->registerRecruiter($registerRecruiterRequest);
        return response($res, 201);
    }

    public function login(LoginRequest $loginRequest)
    {
        try 
        {
            $res = $this->authService->login($loginRequest);
            return response($res, 200);
        } 
        catch(Exception $e)
        {
            if($e instanceof AuthenticationException)
                return response(['message' => 'Inncorrect e-mail or password!'], 401);
        }
    }

    public function logout(Request $request)
    {   
        try
        {
            $res = $this->authService->logout($request);
            return response(['message' => 'Successfull logout!'], 200);
        }
        catch(Exception $e)
        {
            return response(['message' => 'You are unauthorized to perform this action!'], 401);
        }
    }
}
