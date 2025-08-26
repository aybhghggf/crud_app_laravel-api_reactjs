<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

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
    } else {
        return response()->json(['message' => 'User registered successfully', 'user' => $user], 201);
    }
});

//login route
Route::post('/login', function (Request $request) {
    $credentials = $request->validate([
        'email' => 'required|string|email',
        'password' => 'required|string|min:8',
    ]);

    if (!Auth::attempt($credentials)) {
        return response()->json(false, 401);
    } else {
        $user = Auth::user();
        return response()->json(['message' => 'Login successful', 
        'user' => $user], 200);
    }
});

//get all users route
Route::get('/users', function () {
    $users = User::all();
    return response()->json($users);
});

//delete user route
Route::delete('/users/{id}', function ($id) {
    $user = User::find($id);
    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }else{
        $user->delete();
        return response()->json(['message' => 'User deleted successfully'], 200);   
    }
});