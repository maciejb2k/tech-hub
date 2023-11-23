<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SearchEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'sort_by' => 'string|in:first_name,last_name,expected_salary',
            'sort_direction' => 'string|in:asc,desc',
            'name' => 'string|max:255',
            'salary_min' => 'integer|min:1',
            'salary_max' => "integer|gt:salary_min",
            'per_page' => "integer|in:10,20,30",
        ];
    }
}
