<?php

namespace App\Repositories;

use App\Http\Requests\EducationRequest;
use App\Http\Requests\WorkExperienceRequest;
use App\Models\Education;
use App\Models\WorkExperience;

class WorkExperienceRepository {

    protected $workExperience;

    public function __construct(WorkExperience $workExperience)
    {
        $this->workExperience = $workExperience;
    }

    public function createWorkExperience(WorkExperienceRequest $request, int $employeeId)
    {
        $workExperience = $this->workExperience::create([
            'company_name' => $request['company_name'],
            'position' => $request['position'],
            'description' => $request['description'],
            'start_date' => $request['start_date'],
            'end_date' => $request['end_date'],
            'employee_id' => $employeeId,
        ]);

        return $workExperience;
    }

    public function getWorkExperienceById(int $workExperienceId)
    {
        return $this->workExperience::where('id', $workExperienceId)->first();
    }

    public function updateWorkExperience(WorkExperienceRequest $request, int $workExperienceId)
    {
        $workExperience = $this->workExperience::where("id", $workExperienceId)->first();
        $workExperience['company_name'] = $request['company_name'];
        $workExperience['position'] = $request['position'];
        $workExperience['description'] = $request['description'];
        $workExperience['start_date'] = $request['start_date'];
        $workExperience['end_date'] = $request['end_date'];
        $workExperience->save();

        return $workExperience;
    }

    public function deleteWorkExperience(int $workExperienceId)
    {
        $this->workExperience::where("id", $workExperienceId)->delete();
    }

    public function getWorkExperiencesByEmployeeId(int $employeeId)
    {
        return $this->workExperience::where("employee_id", $employeeId)->orderby("start_date", "desc")->get();
    }
}