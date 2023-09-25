<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTodoRequest;
use App\Http\Resources\TodoResource;
use App\Models\Todo;
use App\Http\Requests\UpdateTodoRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class TodosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
      return TodoResource::collection(Todo::where('user_id', $user->id)->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTodoRequest $request)
    {
       $result =  Todo::create($request->validated());
       return new TodoResource($result);
    }

    /**
     * Display the specified resource.
     */
    public function show(Todo $todo, Request $request)
    {
        $user = $request->user();
        if($user->id !== $todo->user_id) {
            return abort(code: 403, message: 'User is not authorized');
        }
        return new TodoResource($todo);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTodoRequest $request, Todo $todo)
    {
        $todo->update($request->validated());
        return new TodoResource($todo);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo, Request $request)
    {
        $user = $request->user();
        if($user->id !== $todo->user_id) {
            return abort(403,'User is not authorized');
        }

        $todo->delete();
        
        return response('', 204);
    }
}
