<?php

namespace App\Services;

use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Repositories\UserRepository;

class UserService {

    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function updateUser(UserRequest $request, int $userId, int $userIdFromToken)
    {
        if($userId !== $userIdFromToken) throw new ForbiddenException();

        $user = $this->userRepository->getUserById($userId);
        if(!isset($user)) throw new NotFoundException();

        $updatedUser = $this->userRepository->updateUser($request, $userId);

        return new UserResource($updatedUser);
    }
}