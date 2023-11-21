<?php

namespace App\Services;

use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Http\Requests\PreferenceRequest;
use App\Http\Resources\PreferenceResource;
use App\Repositories\PreferenceRepository;

class PreferenceService
{
    protected $preferenceRepository;

    public function __construct(PreferenceRepository $preferenceRepository)
    {
        $this->preferenceRepository = $preferenceRepository;
    }

    /**
     * Get all possible preferences.
     *
     * @return array
     */
    public function getFields(){
        return [
            "employee" => ['views', 'location', 'bio', 'expected_salary', 'portfolio'],
            "languages" => ['name', 'proficiency'],
            "educations" => ['university_name', 'field_of_study', 'description', 'start_date', 'end_date'],
            "skills" => ['name', 'level'],
            "work_experiences" => ['company_name', 'position', 'description', 'start_date', 'end_date'],
        ];
    }

    /**
     * Get the preference value for the given key.
     *
     * @param string $key
     * @return mixed
     */
    public function getUserPreferences($userId)
    {
        $preferences = $this->preferenceRepository->getAllByUser($userId);

        return PreferenceResource::collection($preferences);
    }

    /**
     * Set the preference for user.
     *
     * @param PreferenceRequest $request
     * @param int $userId
     * @return void
     */
    public function setPreference(PreferenceRequest $request, int $userId)
    {
        $preference = $this->preferenceRepository->create($request, $userId);

        return new PreferenceResource($preference);
    }

    /**
     * Update the preference for user.
     *
     * @param PreferenceRequest $request
     * @param int $userId
     * @return void
     */

    public function updatePreference(PreferenceRequest $request, int $id, int $userId)
    {
        $preference = $this->preferenceRepository->getById($id);

        if (!isset($preference)) throw new NotFoundException();

        if ($preference['user_id'] !== $userId) throw new ForbiddenException();

        $preference = $this->preferenceRepository->update($request, $id);

        return new PreferenceResource($preference);
    }

    /**
     * Get the preference for the given key.
     *
     * @param int $id
     * @param int $userId
     * @return mixed
     */
    public function getPreference(int $id, int $userId)
    {
        $preference = $this->preferenceRepository->getById($id);

        if (!isset($preference)) throw new NotFoundException();

        if ($preference['user_id'] !== $userId) throw new ForbiddenException();

        return new PreferenceResource($preference);
    }

    /**
     * Remove the preference for the given key.
     *
     * @param string $key
     * @return void
     */
    public function removePreference(int $id, int $userId)
    {
        $preference = $this->preferenceRepository->getById($id);

        if (!isset($preference)) throw new NotFoundException();

        if ($preference['user_id'] !== $userId) throw new ForbiddenException();

        $this->preferenceRepository->delete($id);
    }
}
