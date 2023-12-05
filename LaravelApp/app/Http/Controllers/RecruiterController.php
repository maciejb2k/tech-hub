<?php

namespace App\Http\Controllers;

use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Http\Requests\RecruiterRequest;
use App\Services\RecruiterService;
use Exception;
use Illuminate\Http\Request;

class RecruiterController extends Controller
{
    protected $recruiterService;

    public function __construct(RecruiterService $recruiterService)
    {
        $this->recruiterService = $recruiterService;
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
    public function store(Request $request)
    {
        //
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
    public function update(RecruiterRequest $request, string $id)
    {
        try 
        {
            $res = $this->recruiterService->updateRecruiter($request, $id, $request->user()->id);
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
    public function destroy(string $id)
    {
        //
    }
}
