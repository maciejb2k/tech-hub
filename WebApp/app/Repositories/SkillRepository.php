<?php

namespace App\Repositories;

use App\Http\Requests\SkillRequest;
use App\Models\Skill;

class SkillRepository {

    protected $skill;

    public function __construct(Skill $skill)
    {
        $this->skill = $skill;
    }

    public function createSkill(SkillRequest $request, int $employeeId)
    {
        $skill = $this->skill::create([
            'name' => $request['name'],
            'level' => $request['level'],
            'employee_id' => $employeeId,
        ]);

        return $skill;
    }

    public function getSkillById(int $skillId)
    {
        return $this->skill::where('id', $skillId)->first();
    }

    public function updateSkill(SkillRequest $request, int $skillId)
    {
        $skill = $this->skill::where("id", $skillId)->first();
        $skill['name'] = $request['name'];
        $skill['level'] = $request['level'];
        $skill->save();

        return $skill;
    }

    public function deleteSkill(int $skillId)
    {
        $this->skill::where("id", $skillId)->delete();
    }

    public function getSkillsByEmployeeId(int $employeeId)
    {
        return $this->skill::where("employee_id", $employeeId)->get();
    }
}