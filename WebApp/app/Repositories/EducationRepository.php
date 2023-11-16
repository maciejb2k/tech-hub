<?php

namespace App\Repositories;

use App\Http\Requests\EducationRequest;
use App\Models\Education;

class EducationRepository {

    protected $education;

    public function __construct(Education $education)
    {
        $this->education = $education;
    }

    public function createEducation(EducationRequest $request, int $employeeId)
    {
        $education = $this->education::create([
            'university_name' => $request['university_name'],
            'field_of_study' => $request['field_of_study'],
            'description' => $request['description'],
            'start_date' => $request['start_date'],
            'end_date' => $request['end_date'],
            'employee_id' => $employeeId,
        ]);

        return $education;
    }

    public function getEducationById(int $educationId)
    {
        return $this->education::where('id', $educationId)->first();
    }

    public function updateEducation(EducationRequest $request, int $educationId)
    {
        $education = $this->education::where("id", $educationId)->first();
        $education['university_name'] = $request['university_name'];
        $education['field_of_study'] = $request['field_of_study'];
        $education['description'] = $request['description'];
        $education['start_date'] = $request['start_date'];
        $education['end_date'] = $request['end_date'];
        $education->save();

        return $education;
    }

    public function deleteEducation(int $educationId)
    {
        $this->education::where("id", $educationId)->delete();
    }
}