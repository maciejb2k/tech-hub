<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RecruiterResource extends JsonResource
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
            'company_name' => $this->company_name,
            'company_description' => $this->company_description,
            'company_url' => $this->company_url,
            'position' => $this->position,
            'user' => new UserResource(User::findOrFail($this->user_id)),
        ];
    }
}
