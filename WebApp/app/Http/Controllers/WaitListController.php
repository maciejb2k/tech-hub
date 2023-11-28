<?php

namespace App\Http\Controllers;

use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use Illuminate\Http\Request;
use App\Http\Requests\WaitListRequest;
use App\Services\WaitListService;
use Exception;

class WaitListController extends Controller
{
    protected $waitListService;

    public function __construct(WaitListService $waitListService)
    {
        $this->waitListService = $waitListService;
    }

    public function index(Request $request)
    {
        $waitLists = $this->waitListService->getWaitListsByRecruiterUserId($request->user()->id);
        return response()->json($waitLists);
    }

    public function store(WaitListRequest $request)
    {
        try
        {
            $recruiterUserId = $request->user()->id;
            $waitList = $this->waitListService->createWaitList($request, $recruiterUserId);
            return response()->json($waitList, 201);
        }
        catch(Exception $e)
        {
            if($e instanceof ForbiddenException)
                return response(['message' => 'No access to the resource!'], 403);
            if($e instanceof NotFoundException)
                return response(['message' => 'The resource does not exist!'], 404);
        }
    }

    public function show(int $waitListId, Request $request)
    {
        try
        {
            $recruiterUserId = $request->user()->id;
            $waitList = $this->waitListService->getWaitListById($waitListId, $recruiterUserId);
            return response()->json($waitList);
        }
        catch(Exception $e)
        {
            if($e instanceof ForbiddenException)
                return response(['message' => 'No access to the resource!'], 403);
            if($e instanceof NotFoundException)
                return response(['message' => 'The resource does not exist!'], 404);
        }
    }

    public function update(WaitListRequest $request, int $waitListId, int $recruiterUserId)
    {
        try
        {
            $updatedWaitList = $this->waitListService->updateWaitList($request, $waitListId, $recruiterUserId);
            return response()->json($updatedWaitList);
        }
        catch(Exception $e)
        {
            if($e instanceof ForbiddenException)
                return response(['message' => 'No access to the resource!'], 403);
            if($e instanceof NotFoundException)
                return response(['message' => 'The resource does not exist!'], 404);
        }
    }

    public function destroy(int $waitListId, Request $request)
    {
        try
        {
            $recruiterUserId = $request->user()->id;
            $this->waitListService->deleteWaitList($waitListId, $recruiterUserId);
            return response()->json(['message' => 'WaitList deleted successfully'], 204);
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
