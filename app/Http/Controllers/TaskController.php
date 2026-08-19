<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

use function Laravel\Prompts\table;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // DB::listen(function ($query) {
        //     Log::info($query->toRawSql() . " | {$query->time} ms");
        // });

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
        if (request("priority")) {
            $query->where('priority', request('priority'));
        }

        $task = $query->orderBy($sortField, $sortDirection)
            ->paginate(20)
            ->onEachSide(1);

        return inertia("Task/Index", [
            'tasks' => TaskResource::collection($task),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = DB::table('users')
            ->select('users.id', 'users.name')
            ->get();
        $projects = DB::table('projects as p')
            ->select('p.id', 'p.name')
            ->orderBy('created_at', 'desc')
            ->get();

        return inertia('Task/Create', [
            'users' => $users,
            'projects' => $projects,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        /** @var UploadedFile|null $image */
        $image = $data['image'] ?? null;

        $data["created_by"] = Auth::id();
        $data["updated_by"] = Auth::id();

        if ($image) {
            $data['image_path'] = $image->store('task/' . Str::random(10), 'public');
        }
        unset($data['image']);
        Task::create($data);

        return to_route('task.index')
            ->with('success', 'Task was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        // DB::listen(function ($query) {
        //     Log::info($query->toRawSql() . " | {$query->time} ms");
        // });

        $task->with([
            'createdBy',
            'updatedBy',
            'assignedUser',
            'project',
            'project.createdBy',
            "project.updatedBy",
        ]);

        return inertia("Task/Show", [
            'task' => new TaskResource($task),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $users = DB::table('users')
            ->select('users.id', 'users.name')
            ->get();

        $projects = DB::table('projects as p')
            ->select('p.id', 'p.name')
            ->orderBy('created_at', 'desc')
            ->get();

        return inertia('Task/Edit', [
            'users' => $users,
            'projects' => $projects,
            'task' => new TaskResource($task),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        /** @var UploadedFile|null $image */
        $image = $data['image'] ?? null;

        if ($image instanceof UploadedFile) {
            if ($task->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($task->image_path));
            }
            $data['image_path'] = $image->store('task/' . Str::random(10), 'public');
        }

        unset($data['image']);
        $data['updated_by'] = Auth::id();
        $task->update($data);

        return to_route('task.index')
            ->with('success', 'Task is Updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;
        // if ($task->image_path) {
        //     Storage::disk('public')->delete(dirname($task->image_path));
        // }

        // temporary delete code to ignore for dummy task
        if ($task->image_path && !filter_var($task->image_path, FILTER_VALIDATE_URL)) {
            Storage::disk('public')->deleteDirectory(dirname($task->image_path));
        }


        $task->delete();
        return to_route('task.index')->with('success', "Task \"$name\" is Deleted");
    }
}
