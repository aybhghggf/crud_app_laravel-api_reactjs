<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//test route
Route::get('/test', function () {
    return response()->json(['message' => 'API is working']);
});

//register route
Route::post('/register', function (Request $request) {
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8|confirmed',

    ]);

    $user = User::create([
        'Nom' => $validated['name'],
        'email' => $validated['email'],
        'password' => bcrypt($validated['password']),
    ]);
    if (!$user) {
        return response()->json(['message' => 'User registration failed'], 500);
    }else {
    return response()->json(['message' => 'User registered successfully', 'user' => $user], 201);
    }
});