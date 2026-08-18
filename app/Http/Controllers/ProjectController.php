<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

// use Illuminate\Support\Facades\DB;
// use Illuminate\Support\Facades\Log;

use function Termwind\render;

class ProjectController extends Controller
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

        $query = Project::query()->with(['createdBy', 'updatedBy']);

        if (request("name")) {
            $query->where('name', 'like', "%" . request('name') . "%");
        }
        if (request("status")) {
            $query->where('status', request('status'));
        }

        $project = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia("Project/Index", [
            'projects' => ProjectResource::collection($project),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        /** @var UploadedFile|null $image */
        $image = $data['image'] ?? null;

        $data["created_by"] = Auth::id();
        $data["updated_by"] = Auth::id();

        if ($image) {
            $data['image_path'] = $image->store('project/' . Str::random(10), 'public');
        }
        unset($data['image']);
        Project::create($data);

        return to_route('project.index')
            ->with('success', 'Project was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        // DB::listen(function ($query) {
        //     Log::info($query->toRawSql() . " | {$query->time} ms");
        // });

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        $query = $project->tasks()->with([
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

        $tasks = $query->orderBy($sortField, $sortDirection)
            ->paginate(20)
            ->onEachSide(1);

        return inertia("Project/Show", [
            'project' => new ProjectResource($project),
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return inertia('Project/Edit', [
            'project' => new ProjectResource($project),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();
        /** @var UploadedFile|null $image */
        $image = $data['image'] ?? null;

        if ($image instanceof UploadedFile) {
            if ($project->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($project->image_path));
            }
            $data['image_path'] = $image->store('project/' . Str::random(10), 'public');
        }

        unset($data['image']);
        $data['updated_by'] = Auth::id();
        $project->update($data);

        return to_route('project.index')
            ->with('success', 'Project is Updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $name = $project->name;
        // if ($project->image_path) {
        //     Storage::disk('public')->delete(dirname($project->image_path));
        // }

        // temporary delete code to ignore for dummy project
        if ($project->image_path && !filter_var($project->image_path, FILTER_VALIDATE_URL)) {
            Storage::disk('public')->deleteDirectory(dirname($project->image_path));
        }


        $project->delete();
        return to_route('project.index')->with('success', "Project \"$name\" is Deleted");
    }
}
