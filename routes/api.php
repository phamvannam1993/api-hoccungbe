<?php

use App\Http\Controllers\Api\AudioController;
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

Route::prefix('audios')->group(function () {
    // List all audios
    Route::get('/', [AudioController::class, 'index'])->name('audios.index');

    // Search audios by title
    Route::get('/search', [AudioController::class, 'search'])->name('audios.search');

    // Get audio statistics
    Route::get('/statistics', [AudioController::class, 'statistics'])->name('audios.statistics');

    // Upload new audio
    Route::post('/', [AudioController::class, 'store'])->name('audios.store');

    // Get audio details
    Route::get('/{audio}', [AudioController::class, 'show'])->name('audios.show');

    // Update audio metadata
    Route::put('/{audio}', [AudioController::class, 'update'])->name('audios.update');

    // Delete audio
    Route::delete('/{audio}', [AudioController::class, 'destroy'])->name('audios.destroy');
});
