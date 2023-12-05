<?php

namespace App\Http\Controllers;

use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Http\Requests\PreferenceRequest;
use App\Services\PreferenceService;
use Exception;
use Illuminate\Http\Request;

class PreferenceController extends Controller
{
    protected $preferenceService;

    public function __construct(PreferenceService $preferenceService)
    {
        $this->preferenceService = $preferenceService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return response($this->preferenceService->getUserPreferences($request->user()->id), 200);
    }

    public function fields()
    {
        return response($this->preferenceService->getFields(), 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PreferenceRequest $request)
    {
        $res = $this->preferenceService->setPreference($request, $request->user()->id);
        return response($res, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id, Request $request)
    {
        try
        {
            $res = $this->preferenceService->getPreference($id, $request->user()->id);
            return response($res, 200);
        }
        catch(Exception $e)
        {
            if($e instanceof ForbiddenException)
                return response(['message' => 'No access to the resource!'], 403);
            if($e instanceof NotFoundException)
                return response(['message' => 'The resource does not exist!'], 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PreferenceRequest $request, int $id)
    {
        try
        {
            $res = $this->preferenceService->updatePreference($request, $id, $request->user()->id);
            return response($res, 200);
        }
        catch(Exception $e)
        {
            if($e instanceof ForbiddenException)
                return response(['message' => 'No access to the resource!'], 403);
            if($e instanceof NotFoundException)
                return response(['message' => 'The resource does not exist!'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id, Request $request)
    {
        try
        {
            $this->preferenceService->removePreference($id, $request->user()->id);
            return response("", 204);
        }
        catch(Exception $e)
        {
            if($e instanceof ForbiddenException)
                return response(['message' => 'No access to the resource!'], 403);
            if($e instanceof NotFoundException)
                return response(['message' => 'The resource does not exist!'], 404);
        }
    }
}
