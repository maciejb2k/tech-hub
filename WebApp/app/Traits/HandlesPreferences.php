<?php

// app/Traits/HandlesPreferences.php

namespace App\Traits;

use App\Models\Preference;

trait HandlesPreferences
{
    protected function getPreferences(array $views, $userId)
{
    $preferences = [];

    foreach ($views as $view) {
        $viewPreferences = Preference::where('field_name', 'like', $view . '.%')
            ->where('user_id', $userId)
            ->get()
            ->mapWithKeys(function ($item) {
                $fieldNameParts = explode('.', $item['field_name']);
                $key = end($fieldNameParts);
                return [$key => $item->toArray()];
            })
            ->toArray();

        $preferences = array_merge($preferences, $viewPreferences);
    }

    return $preferences;
}
}
