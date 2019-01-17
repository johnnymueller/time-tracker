<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Hack. TODO: set in nginx config or using this: https://github.com/barryvdh/laravel-cors
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Authorization, Content-Type');
header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT,DELETE");

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout');
Route::post('register', 'Auth\RegisterController@register');

// Route::group(['middleware' => 'auth:api'], function() {
    Route::get('articles', 'ArticleController@index');
    Route::get('articles/{article}', 'ArticleController@show');
    Route::post('articles', 'ArticleController@store');
    Route::put('articles/{article}', 'ArticleController@update');
    Route::delete('articles/{article}', 'ArticleController@delete');

    Route::get('tasks', 'TaskController@index');
    Route::post('tasks', 'TaskController@store');

    Route::get('items', 'ItemController@index');
    Route::post('items', 'ItemController@store');
    Route::put('items/{item}', 'ItemController@update');
    Route::delete('items/{item}', 'ItemController@delete');
// });
