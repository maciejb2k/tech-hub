<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'views' => $this->views,
            'location' => $this->location,
            'bio' => $this->bio,
            'expected_salary' => $this->expected_salary,
            'portfolio' => $this->portfolio,
            'user' => new UserResource(User::findOrFail($this->user_id)),
        ];
    }
}
