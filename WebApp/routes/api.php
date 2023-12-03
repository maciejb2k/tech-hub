<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RecruiterController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WorkExperienceController;
use App\Http\Controllers\EmployeeInvitationController;
use App\Http\Controllers\RecruiterInvitationController;
use App\Http\Controllers\WaitListResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PreferenceController;
use App\Http\Controllers\WaitListController;

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
    Route::resource('skills', SkillController::class);
    Route::resource('educations', EducationController::class);
    Route::resource('work-experiences', WorkExperienceController::class);
    Route::resource('languages', LanguageController::class);
    Route::get('/preferences/fields', [PreferenceController::class, 'fields']);
    Route::resource('preferences', PreferenceController::class);

    Route::put('/employees/{id}', [EmployeeController::class, 'update']);
    Route::resource('invitations', EmployeeInvitationController::class);
});

Route::middleware(['auth:sanctum', 'ability:recruiter'])->group(function () {
    Route::resource('wait-lists', WaitListController::class);
    Route::resource('recruiter/invitations', RecruiterInvitationController::class);
    Route::resource('recruiter', RecruiterController::class);
});

Route::middleware(['auth:sanctum', 'ability:employee,recruiter'])->group(function () {
    Route::resource('profile', ProfileController::class);
    Route::resource('user', UserController::class);
});

Route::get('/employees/{id}', [EmployeeController::class, 'show']);
Route::get('/employees', [EmployeeController::class, 'index']);
