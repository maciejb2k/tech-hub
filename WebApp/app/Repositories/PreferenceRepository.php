<?php

namespace App\Repositories;

use App\Http\Requests\PreferenceRequest;
use App\Models\Preference;

class PreferenceRepository
{
    protected $preference;

    public function __construct(Preference $preference)
    {
        $this->preference = $preference;
    }

    /**
     * Get all preferences for user.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllByUser($userId)
    {
        return Preference::where('user_id', $userId)->get();
    }

    /**
     * Get a preference by ID.
     *
     * @param  int  $id
     * @return \App\Models\Preference|null
     */
    public function getById($id)
    {
        return Preference::find($id);
    }

    /**
     * Create a new preference.
     *
     * @param  array  $data
     * @return \App\Models\Preference
     */
    public function create(PreferenceRequest $request, int $userId)
    {
        $preference = $this->preference::create(
            [
                'field_name' => $request['field_name'],
                'visibility' => $request['visibility'],
                'user_id' => $userId,
            ]
        );

        return $preference;
    }

    /**
     * Update a preference.
     *
     * @param  int  $id
     * @param  array  $data
     * @return \App\Models\Preference|null
     */
    public function update(PreferenceRequest $request, int $id)
    {
        $preference =  $this->preference::where('id', $id)->first();

        if ($preference) {
            $preference['field_name'] = $request['field_name'];
            $preference['visibility'] = $request['visibility'];
            $preference->save();

            return $preference;
        }
    }

    /**
     * Delete a preference.
     *
     * @param  int  $id
     * @return bool
     */
    public function delete($id)
    {
        $preference = Preference::find($id);

        if ($preference) {
            return $preference->delete();
        }

        return false;
    }
}
