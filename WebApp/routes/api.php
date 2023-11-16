<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\WorkExperienceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/auth/register-employee', [AuthController::class, 'registerEmployee']);
Route::post('/auth/register-recruiter', [AuthController::class, 'registerRecruiter']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


Route::middleware(['auth:sanctum', 'ability:employee'])->group(function () {
    Route::resource('skill', SkillController::class); 
    Route::resource('education', EducationController::class); 
    Route::resource('work-experience', WorkExperienceController::class); 
});

Route::middleware(['auth:sanctum', 'ability:employee,recruiter'])->group(function () {
    //
});