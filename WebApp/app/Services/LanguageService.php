<?php

namespace App\Services;

use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Http\Requests\LanguageRequest;
use App\Http\Resources\LanguageResource;
use App\Repositories\EmployeeRepository;
use App\Repositories\LanguageRepository;

class LanguageService {

    protected $languageRepository;
    protected $employeeRepository;

    public function __construct(LanguageRepository $languageRepository, EmployeeRepository $employeeRepository)
    {
        $this->languageRepository = $languageRepository;
        $this->employeeRepository = $employeeRepository;
    }
    
    public function createLanguage(LanguageRequest $request, int $userId)
    {
        $employee = $this->employeeRepository->getEmployeeByUserId($userId);

        $language = $this->languageRepository->createLanguage($request, $employee['id']);

        return new LanguageResource($language);
    }

    public function updateLanguage(LanguageRequest $request, int $languageId, int $userId)
    {
        $employee = $this->employeeRepository->getEmployeeByUserId($userId);
        $language = $this->languageRepository->getLanguageById($languageId);

        if(!isset($language)) throw new NotFoundException();
        if($language['employee_id'] !== $employee['id']) throw new ForbiddenException();

        $updatedLanguage = $this->languageRepository->updateLanguage($request, $languageId);

        return new LanguageResource($updatedLanguage);
    }

    public function deleteLanguage(int $languageId, int $userId)
    {
        $employee = $this->employeeRepository->getEmployeeByUserId($userId);
        $language = $this->languageRepository->getLanguageById($languageId);

        if(!isset($language)) throw new NotFoundException();
        if($language['employee_id'] !== $employee['id']) throw new ForbiddenException();

        $this->languageRepository->deleteLanguage($languageId);
    }
}