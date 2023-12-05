<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SkillCollection extends JsonResource
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
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        return $this->resource->map(function ($skill) {
            return new SkillResource($skill, $this->preferences, $this->visitor);
        });
    }
}
