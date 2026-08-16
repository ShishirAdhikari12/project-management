<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        DB::listen(function ($query) {
            Log::info($query->toRawSql() . " | {$query->time} ms");
        });

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        $query = Task::query()->with([
            'createdBy',
            'updatedBy',
            'assignedUser',
            'project',
            'project.createdBy',
            "project.updatedBy",
        ]);

        if (request("name")) {
            $query->where('name', 'like', "%" . request('name') . "%");
        }
        if (request("status")) {
            $query->where('status', request('status'));
        }

        $task = $query->orderBy($sortField, $sortDirection)
            ->paginate(30)
            ->onEachSide(1);

        return inertia("Task/Index", [
            'tasks' => TaskResource::collection($task),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}
