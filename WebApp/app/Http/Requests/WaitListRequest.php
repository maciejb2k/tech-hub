<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class WaitListRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'description' => 'sometimes|string|max:255',
            'employee_id' => 'sometimes|integer|unique:wait_lists',
            'recruiter_id' => 'sometimes|integer',
        ];
    }
}
