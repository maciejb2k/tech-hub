<?php

namespace App\Repositories;

use App\Http\Requests\RegisterEmployeeRequest;
use App\Http\Requests\RegisterRecruiterRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserRepository {

    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function findUserByEmail(string $email)
    {
        return User::where('email', $email)->first();
    }

    public function comparePassword(string $password, User $user)
    {
        return Hash::check($password, $user->password);
    }

    public function createToken(User $user, Role $role)
    {
        return $user->createToken('token', [$role['name']])->plainTextToken;
    }

    public function deleteToken(Request $request)
    {
        $request->user()->tokens()->delete();
    }

    public function createEmployee(RegisterEmployeeRequest $registerEmployeeRequest)
    {
        $user = $this->user::create([
            'first_name' => $registerEmployeeRequest['first_name'],
            'last_name' => $registerEmployeeRequest['last_name'],
            'email' => $registerEmployeeRequest['email'],
            'password' => bcrypt($registerEmployeeRequest['password']),
            'role_id' => 1
        ]);

        return $user;
    }

    public function createRecruiter(RegisterRecruiterRequest $registerRecruiterRequest)
    {
        $user = $this->user::create([
            'first_name' => $registerRecruiterRequest['first_name'],
            'last_name' => $registerRecruiterRequest['last_name'],
            'email' => $registerRecruiterRequest['email'],
            'password' => bcrypt($registerRecruiterRequest['password']),
            'role_id' => 2
        ]);

        return $user;
    }

}