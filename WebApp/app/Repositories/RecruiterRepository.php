<?php

namespace App\Repositories;

use App\Http\Requests\RegisterRecruiterRequest;
use App\Models\Recruiter;

class RecruiterRepository {

    protected $recruiter;

    public function __construct(Recruiter $recruiter)
    {
        $this->recruiter = $recruiter;
    }

    public function getRecruiterByUserId(string $userId)
    {
        return $this->recruiter::where('user_id', $userId)->first();
    }

    public function createRecruiter(RegisterRecruiterRequest $registerRecruiterRequest, string $userId)
    {
        $recruiter = $this->recruiter::create([
            'company_name' => $registerRecruiterRequest['company_name'],
            'company_description' => null,
            'company_url' => $registerRecruiterRequest['company_url'],
            'position' => null,
            'user_id' => $userId,
        ]);

        return $recruiter;
    }

}