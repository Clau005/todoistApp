<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function register(Request $reguest)
    {
        $data = $reguest->validate([
            'name' => 'requierd|string',
            'email' => 'required|email|string|unique:users|email',
            'password' =>  [
                'required',
                Password::min(8)->mixedCase()->numbers()->symbols()
            ],
        ]);

        /** @var \App\Models\User $user  */

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return $response([
            'user' => $user,
            'token' => $token
        ]);
    }
}