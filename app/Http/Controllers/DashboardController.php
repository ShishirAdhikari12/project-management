<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
// use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // DB::listen(function ($query) {
        //     Log::info($query->toRawSql() . " | {$query->time} ms");
        // });

        $user = Auth::id();
        $totalPendingTasks = Task::where('status', 'pending')->count();
        $myPendingTasks = Task::where('assigned_user_id', $user)
            ->where('status', 'pending')
            ->count();

        $totalInProgressTasks = Task::where('status', 'in_progress')->count();
        $myInProgressTasks = Task::where('assigned_user_id', $user)
            ->where('status', 'in_progress')
            ->count();

        $totalCompletedTasks = Task::where('status', 'completed')->count();
        $myCompletedTasks = Task::where('assigned_user_id', $user)
            ->where('status', 'completed')
            ->count();

        $activeTasks = DB::table('tasks as t')
            ->where('t.assigned_user_id', $user)
            ->whereIn('t.status', ['pending', 'in_progress'])
            ->orderBy('t.created_at', 'desc')
            ->limit(10)
            ->leftJoin('projects as p', 't.project_id', '=', 'p.id')
            ->leftJoin('users as u', 't.assigned_user_id', '=', 'u.id')
            ->select([
                't.id',
                't.project_id',
                'p.name as project_name',
                't.name',
                't.status',
                't.priority',
                't.created_at',
                't.due_date',
            ])
            ->get();

        return Inertia('Dashboard', compact(
            'totalPendingTasks',
            'myPendingTasks',
            'totalInProgressTasks',
            'myInProgressTasks',
            'totalCompletedTasks',
            'myCompletedTasks',
            'activeTasks',
        ));
    }
}
