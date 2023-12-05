<?php

namespace App\Repositories;

use App\Http\Requests\LanguageRequest;
use App\Models\Language;

class LanguageRepository {

    protected $language;

    public function __construct(Language $language)
    {
        $this->language = $language;
    }

    public function createLanguage(LanguageRequest $request, int $employeeId)
    {
        $language = $this->language::create([
            'name' => $request['name'],
            'proficiency' => $request['proficiency'],
            'employee_id' => $employeeId,
        ]);

        return $language;
    }

    public function getLanguageById(int $languageId)
    {
        return $this->language::where('id', $languageId)->first();
    }

    public function updateLanguage(LanguageRequest $request, int $languageId)
    {
        $language = $this->language::where("id", $languageId)->first();
        $language['name'] = $request['name'];
        $language['proficiency'] = $request['proficiency'];
        $language->save();

        return $language;
    }

    public function deleteLanguage(int $languageId)
    {
        $this->language::where("id", $languageId)->delete();
    }

    public function getLanguagesByEmployeeId(int $employeeId)
    {
        return $this->language::where("employee_id", $employeeId)->get();
    }
}