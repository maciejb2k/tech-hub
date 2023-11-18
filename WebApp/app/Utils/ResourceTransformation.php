<?php
// app/Utils/ResourceTransformation.php

namespace App\Utils;

class ResourceTransformation
{
    public static function TransformResource($resource, $fields, $preferences, $visitor)
    {
        $result = [];

        foreach($fields as $field){
            if (array_key_exists($field, $preferences)) {
                $preference = $preferences[$field];
                if ($visitor == 'owner'){
                    $result[$field] = $resource->$field;
                }
                else if ($preference['visibility'] == 'public') {
                    $result[$field] = $resource->$field;
                } else if ($preference['visibility'] == 'recruter-only' && $visitor == 'recruter') {
                    $result[$field] = $resource->$field;
                }
                else {
                    //$result[$field] = null;
                }
            } else {
                $result[$field] = $resource->$field;
            }
        }

        return $result;
    }

    public static function GetVisitorType($currentUser, $target){
        if ($currentUser == null)
            return 'public';
        else if ($currentUser->id == $target)
            return 'owner';
        else if ($currentUser->role->name == 'recruiter')
            return 'recruter';
        else
            return 'public';
    }
}
