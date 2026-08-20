import { TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP, TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constants';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ task }) {
  // console.log(task);
  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            {`Task "${task.name}"`}
          </h2>
          <Link href={route("task.edit", task.id)} className="bg-emerald-500 py-2 px-3 text-white rounded shadow transition-all">
            Edit Task
          </Link>
        </div>
      }
    >
      <Head title={`Task "${task.name}"`} />

      <div className="pt-12 pb-3">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div>
              <img
                src={task.image_path}
                alt={task.name}
                className='w-full h-64 object-cover'
              />
            </div>
            <div className="p-6 text-gray-900 dark:text-gray-100">

              {/* task */}
              <div className='grid gap-1 grid-cols-2 mt-2 '>
                {/* Column 1 */}
                <div>
                  <div>
                    <label className='font-bold text-lg'>Task ID</label>
                    <p className='mt-1 text-gray-700 dark:text-gray-300'>{task.id}</p>
                  </div>
                  <div className='mt-4'>
                    <label className='font-bold text-lg'>Task Name</label>
                    <p className='mt-1 text-gray-700 dark:text-gray-300'>{task.name}</p>
                  </div>
                  <div className='mt-4'>
                    <label className='font-bold text-lg'>Task Status</label>
                    <p className='mt-1'>
                      <span
                        className={"px-2 py-1 rounded text-white " + TASK_STATUS_CLASS_MAP[task.status]}
                      >
                        {TASK_STATUS_TEXT_MAP[task.status]}
                      </span>
                    </p>
                  </div>
                  <div className='mt-4'>
                    <label className='font-bold text-lg'>Task Priority</label>
                    <p className='mt-1'>
                      <span
                        className={"px-2 py-1 rounded text-white " + TASK_PRIORITY_CLASS_MAP[task.priority]}
                      >
                        {TASK_PRIORITY_TEXT_MAP[task.priority]}
                      </span>
                    </p>
                  </div>
                  <div className='mt-4'>
                    <label className='font-bold text-lg'>Created By</label>
                    <p className='mt-1 text-gray-700 dark:text-gray-300'>{task.createdBy.name}</p>
                  </div>
                </div>
                {/* Column 2  */}
                <div>
                  <div className='mt-4'>
                    <label className='font-bold text-lg'>Due Date</label>
                    <p className='mt-1 text-gray-700 dark:text-gray-300'>{task.due_date}</p>
                  </div>
                  <div className='mt-4'>
                    <label className='font-bold text-lg'>Create Date</label>
                    <p className='mt-1 text-gray-700 dark:text-gray-300'>{task.created_at}</p>
                  </div>
                  <div className='mt-4'>
                    <label className='font-bold text-lg'>Updated By</label>
                    <p className='mt-1 text-gray-700 dark:text-gray-300'>{task.updatedBy.name}</p>
                  </div>
                  <div className='mt-4'>
                    <label className='font-bold text-lg'>Created By</label>
                    <p className='mt-1 text-gray-700 dark:text-gray-300'>{task.createdBy.name}</p>
                  </div>
                  <div className='mt-4'>
                    <label className='font-bold text-lg'>Task Assigned To</label>
                    <p className='mt-1 text-gray-700 dark:text-gray-300'>{task.assignedUser.name}</p>
                  </div>
                  <div className='mt-4'>
                    <label className='font-bold text-lg'>Project Name</label>
                    <p className='mt-1 text-gray-700 dark:text-gray-300'>
                      <Link
                        href={route('project.show', task.project.id)}
                        title={task.project.name}
                        className="block max-w-64 truncate hover:underline hover:text-black dark:hover:text-white"
                      >
                        {task.project.name}
                      </Link>
                    </p>
                  </div>
                </div>

              </div>

              {/* task descreption */}
              <div className='mt-6'>
                <label className='font-bold text-lg'>Task Description</label>
                <p className='mt-1 text-gray-700 dark:text-gray-300'>{task.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>


    </AuthenticatedLayout>
  );
}
