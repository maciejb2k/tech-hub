<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmployeeRequest extends FormRequest
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
            'location' => 'nullable|string|max:255',
            'bio' => 'nullable|string|max:500', 
            'expected_salary' => 'nullable|regex:/^\d+(\.\d{1,2})?$/|numeric',
            'portfolio' => 'nullable|string|max:255',
        ];
    }
}
