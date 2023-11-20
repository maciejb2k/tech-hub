<?php

namespace App\Services;

use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Http\Requests\RecruiterRequest;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\RecruiterResource;
use App\Repositories\RecruiterRepository;
use App\Traits\HandlesPreferences;

class RecruiterService {

    protected $recruiterReposiotry;

    public function __construct(RecruiterRepository $recruiterReposiotry)
    {
        $this->recruiterReposiotry = $recruiterReposiotry;
    }

    public function updateRecruiter(RecruiterRequest $request, int $recruiterId, int $userId)
    {
        $recruiter = $this->recruiterReposiotry->getRecruiterById($recruiterId);

        if(!isset($recruiter)) throw new NotFoundException();

        if($userId !== $recruiter['user_id']) throw new ForbiddenException();

        $updatedRecruiter = $this->recruiterReposiotry->updateRecruiter($request, $recruiterId);

        return new RecruiterResource($updatedRecruiter);
    }
}
