<?php

namespace App\Http\Resources;

use App\Utils\ResourceTransformation;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WorkExperienceResource extends JsonResource
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
        $fields = ['id', 'company_name', 'position', 'description', 'start_date', 'end_date'];
        $finalResource = ResourceTransformation::TransformResource($this, $fields, $this->preferences, $this->visitor);
        return $finalResource;
    }
}
