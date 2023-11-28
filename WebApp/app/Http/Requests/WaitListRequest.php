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
            'employee_id' => 'sometimes|integer',
            'recruiter_id' => 'sometimes|integer',
        ];
    }
}
