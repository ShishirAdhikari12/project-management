import { TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP, TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constants';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({
  totalPendingTasks,
  myPendingTasks,
  totalInProgressTasks,
  myInProgressTasks,
  totalCompletedTasks,
  myCompletedTasks,
  activeTasks,
}) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden mx-2 sm:mx-0 bg-white shadow-sm rounded-md sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className='text-amber-500 text-2xl font-semibold'>Pending Tasks</h3>
              <p className='text-xl mt-4'>
                <span className='mr-2'>{myPendingTasks}</span>/
                <span className='ml-2'>{totalPendingTasks}</span>
              </p>
            </div>
          </div>
          <div className="overflow-hidden mx-2 sm:mx-0 bg-white shadow-sm rounded-md sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className='text-blue-500 text-2xl font-semibold'>In Progress Tasks</h3>
              <p className='text-xl mt-4'>
                <span className='mr-2'>{myInProgressTasks}</span>/
                <span className='ml-2'>{totalInProgressTasks}</span>
              </p>
            </div>
          </div>
          <div className="overflow-hidden mx-2 sm:mx-0 bg-white shadow-sm rounded-md sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className='text-green-500 text-2xl font-semibold'>Completed Tasks</h3>
              <p className='text-xl mt-4'>
                <span className='mr-2'>{myCompletedTasks}</span>/
                <span className='ml-2'>{totalCompletedTasks}</span>
              </p>
            </div>
          </div>

        </div>
        <div className="mx-auto mt-6 gap-2 max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden mx-2 sm:mx-0 bg-white shadow-sm rounded-md sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 overflow-auto text-gray-900 dark:text-gray-100">
              <h3 className='text-2xl font-semibold mb-4'>My Active Tasks</h3>
              <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr className='text-nowrap'>
                    <th className="px-3 py-3">ID</th>
                    <th className="px-3 py-3">Project Name</th>
                    <th className="px-3 py-3">Task Name</th>
                    <th className="px-3 py-3">Status</th>
                    <th className="px-3 py-3">Priority</th>
                    <th className="px-3 py-3">Created AT</th>
                    <th className="px-3 py-3">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activeTasks.map((task) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={task.id}
                    >
                      <td className="px-3 py-2">{task.id}</td>
                      <td className="px-3 py-2">
                        <Link
                          href={route('project.show', task.project_id)}
                          title={task.project_name}
                          className="block max-w-32 truncate hover:underline hover:text-black dark:hover:text-white"
                        >
                          {task.project_name}
                        </Link>
                      </td>
                      <td className="px-3 py-2">
                        <Link
                          href={route("task.show", task.id)}
                          className="hover:underline hover:text-black dark:hover:text-white"
                        >
                          {task.name}
                        </Link>
                      </td>
                      <td className="px-3 py-2 text-nowrap">
                        <span
                          className={
                            "px-2 py-1 rounded text-white " +
                            TASK_STATUS_CLASS_MAP[task.status]
                          }
                        >
                          {TASK_STATUS_TEXT_MAP[task.status]}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-nowrap">
                        <span
                          className={
                            "px-2 py-1 rounded text-white " +
                            TASK_PRIORITY_CLASS_MAP[task.priority]
                          }
                        >
                          {TASK_PRIORITY_TEXT_MAP[task.priority]}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-nowrap">
                        {new Date(task.created_at).toISOString().slice(0, 10)}
                      </td>
                      <td className="px-3 py-2 text-nowrap">
                        {new Date(task.due_date).toISOString().slice(0, 10)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </AuthenticatedLayout >
  );
}
