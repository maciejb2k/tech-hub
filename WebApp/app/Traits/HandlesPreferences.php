<?php

// app/Traits/HandlesPreferences.php

namespace App\Traits;

use App\Models\Preference;

trait HandlesPreferences
{
    protected function getPreferences($userId)
    {
        $preferences = Preference::where('user_id', $userId)->get();
        return $preferences;
    }

    protected function getTablePreferences($preferences, $tableName)
    {
        $tablePreferences = [];

        foreach ($preferences as $preference) {
            $fieldNameParts = explode('.', $preference['field_name']);

            if ($fieldNameParts[0] === $tableName) {
                $key = $fieldNameParts[1];
                $tablePreferences[$key] = $preference->toArray();
            }
        }

        return ($tablePreferences);
    }
}
