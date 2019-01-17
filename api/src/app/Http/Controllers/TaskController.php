<?php

namespace App\Http\Controllers;

use App\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        return Task::all();
    }

    public function show(Task $Task)
    {
        return $Task;
    }

    public function store(Request $request)
    {
        $Task = Task::create($request->all());

        return response()->json($Task);
    }

    public function update(Request $request, Task $Task)
    {
        $Task->update($request->all());

        return response()->json($Task);
    }

    public function delete(Task $Task)
    {
        $Task->delete();

        return response()->json(null, 204);
    }
}
