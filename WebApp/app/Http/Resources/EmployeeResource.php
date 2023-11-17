<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Utils\ResourceTransformation;

class EmployeeResource extends JsonResource
{
    protected $preferences;
    protected $visitor;

    public function __construct($resource, $preferences, $visitor)
    {
        parent::__construct($resource);
        $this->preferences = $preferences;
        $this->visitor = $visitor;
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $fields = ['id', 'views', 'location', 'bio', 'expected_salary', 'portfolio'];

        $finalResource = ResourceTransformation::TransformResource($this, $fields, $this->preferences, $this->visitor);
        $finalResource['user'] = new UserResource(User::findOrFail($this->user_id));
        // return [
        //     'id' => $this->id,
        //     'views' => $this->views,
        //     'location' => $this->location,
        //     'bio' => $this->bio,
        //     'expected_salary' => $this->expected_salary,
        //     'portfolio' => $this->portfolio,
        //     'user' => new UserResource(User::findOrFail($this->user_id)),
        // ];
        return $finalResource;
    }
}
