<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PageController;
use App\Http\Controllers\Api\PartnerController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', [AuthController::class, 'login']);
Route::post('forget', [AuthController::class, 'forget']);
Route::post('register', [AuthController::class, 'register']);

Route::post('/pages', [PageController::class, 'store']);  // Create Page
Route::get('/pageTitle', [PageController::class, 'pageTitle']);  // Create Page
Route::post('/pagesFields', [PageController::class, 'addField']);  // Add Field to Page


// Routes for Partners
Route::post('/partner/create', [PartnerController::class, 'store']);  // Get partner pages
Route::get('/partners', [PartnerController::class, 'partners']);  // Get partner pages

// Route::get('/partners/{partner_id}/pages', [PartnerController::class, 'getPages']);  // Get partner pages
// Route::put('/partners/{partner_id}/pages/{page_id}', [PartnerController::class, 'updatePartnerPage']);  // Update partner field override
