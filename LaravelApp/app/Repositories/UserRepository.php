<?php

namespace App\Repositories;

use App\Http\Requests\RegisterEmployeeRequest;
use App\Http\Requests\RegisterRecruiterRequest;
use App\Http\Requests\SearchEmployeeRequest;
use App\Http\Requests\UserRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use PhpParser\Node\Stmt\Continue_;

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

    public function getUserById($userId)
    {
        return $this->user::where('id', $userId)->first();
    }

    public function updateUser(UserRequest $request, int $userId)
    {
        $user = $this->user::where('id', $userId)->first();
        if ($request['first_name'] !== null) $user['first_name'] = $request['first_name'];
        if ($request['last_name'] !== null) $user['last_name'] = $request['last_name'];
        if ($request['email'] !== null) $user['email'] = $request['email'];

        if ($request->has('avatar')) {
            if($request['avatar'] === null)
            {
                if(Storage::exists('public/avatars/'.$user->avatar))
                    Storage::delete('public/avatars/'.$user->avatar);

                $user->avatar = null;
            }
            else {
                $image = $request['avatar'];
                $path2 = $image->store('public/avatars');
                $filename_image = $image->hashName();
    
                $user->avatar = $filename_image;
            }
        }

        $user->save();
        
        return $user;
    }

    public function searchUserIds(SearchEmployeeRequest $request)
    {
        $query = $this->user::query();

        $query->where('role_id', '=', 1);

        if (isset($request['name'])) {
            $name = $request['name'];

            $query->where(function ($query) use ($name) {
                $nameParts = explode(' ', $name);
            
                if (count($nameParts) === 2) {
                    $query->where(function ($query) use ($nameParts) {
                        $query->where('first_name', 'LIKE', "%$nameParts[0]%")
                              ->where('last_name', 'LIKE', "%$nameParts[1]%");
                    });
                } else {
                    $query->where('first_name', 'LIKE', "%$name%")
                          ->orWhere('last_name', 'LIKE', "%$name%");
                }
            });
        }

        if (isset($request['sort_by']) && $request['sort_by'] !== 'expected_salary') {
            $sortDirection = $request['sort_direction'];
            if($sortDirection === null) $sortDirection = "asc";

            $query->orderBy($request['sort_by'], $sortDirection);
        }

        return $query->pluck('id');
    }
}