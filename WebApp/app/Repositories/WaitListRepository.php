<?php

namespace App\Repositories;

use App\Http\Requests\WaitListRequest;
use App\Models\WaitList;

class WaitListRepository {

    protected $waitList;

    public function __construct(WaitList $waitList)
    {
        $this->waitList = $waitList;
    }

    public function createWaitList(WaitListRequest $request, int $employeeId, int $recruiterId)
    {
        $waitList = $this->waitList::create([
            'description' => $request['description'],
            'employee_id' => $employeeId,
            'recruiter_id' => $recruiterId,
        ]);

        return $waitList;
    }

    public function getWaitListById(int $waitListId)
    {
        return $this->waitList::find($waitListId);
    }

    public function updateWaitList(WaitListRequest $request, int $waitListId)
    {
        $waitList = $this->waitList::find($waitListId);

        if ($waitList) {
            $waitList->update([
                'description' => $request['description'],
            ]);
        }

        return $waitList;
    }

    public function deleteWaitList(int $waitListId)
    {
        $this->waitList::destroy($waitListId);
    }

    public function getWaitListsByEmployeeId(int $employeeId)
    {
        return $this->waitList::where("employee_id", $employeeId)->get();
    }

    public function getWaitListsByRecruiterId(int $recruiterId)
    {
        return $this->waitList::where("recruiter_id", $recruiterId)->get();
    }
}
