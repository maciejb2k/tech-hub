<?php

namespace App\Http\Controllers;

use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Http\Requests\LanguageRequest;
use App\Services\LanguageService;
use Exception;
use Illuminate\Http\Request;

class LanguageController extends Controller
{
    protected $languageService;

    public function __construct(LanguageService $languageService)
    {
        $this->languageService = $languageService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(LanguageRequest $request)
    {
        $res = $this->languageService->createLanguage($request, $request->user()->id);
        return response($res, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
    public function update(LanguageRequest $request, string $id)
    {
        try 
        {
            $res = $this->languageService->updateLanguage($request, $id, $request->user()->id);
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
    public function destroy(Request $request, string $id)
    {
        try 
        {
            $this->languageService->deleteLanguage($id, $request->user()->id);
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
