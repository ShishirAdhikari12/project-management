import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/constants';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import TasksTable from '../Task/TasksTable';

export default function Show({ project, tasks, queryParams }) {
  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-xl flex justify-between font-semibold leading-tight text-gray-800 dark:text-gray-200">
            {`Project "${project.name}"`}
          </h2>
          <Link href={route("project.edit", project.id)} className="text-nowrap bg-emerald-500 py-2 px-3 text-white rounded shadow transition-all">
            Edit Project
          </Link>
        </div>
      }
    >
      <Head title={`Project "${project.name}"`} />

      <div className="pt-12 pb-3">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div>
              <img
                src={project.image_path}
                alt={project.name}
                className='w-full h-64 object-cover'
              />
            </div>
            <div className="p-6 text-gray-900 dark:text-gray-100">

              {/* project */}
              <div className='grid gap-1 grid-cols-2 mt-2 '>
                {/* Column 1 */}
                <div>
                  <div>
                    <label className='font-bold text-lg'>Project ID</label>
                    <p className='mt-1 text-gray-700 dark:text-gray-300'>{project.id}</p>
                  </div>
                  <div className='mt-4'>
                    <label className='font-bold text-lg'>Project Name</label>
                    <p className='mt-1 text-gray-700 dark:text-gray-300'>{project.name}</p>
                  </div>
                  <div className='mt-4'>
                    <label className='font-bold text-lg'>Project Status</label>
                    <p className='mt-1'>
                      <span
                        className={"px-2 py-1 rounded text-white " + PROJECT_STATUS_CLASS_MAP[project.status]}
                      >
                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                      </span>
                    </p>
                  </div>
                  <div className='mt-4'>
                    <label className='font-bold text-lg'>Created By</label>
                    <p className='mt-1 text-gray-700 dark:text-gray-300'>{project.createdBy.name}</p>
                  </div>
                </div>
                {/* Column 2  */}
                <div>
                  <div className='mt-4'>
                    <label className='font-bold text-lg'>Due Date</label>
                    <p className='mt-1 text-gray-700 dark:text-gray-300'>{project.due_date}</p>
                  </div>
                  <div className='mt-4'>
                    <label className='font-bold text-lg'>Create Date</label>
                    <p className='mt-1 text-gray-700 dark:text-gray-300'>{project.created_at}</p>
                  </div>
                  <div className='mt-4'>
                    <label className='font-bold text-lg'>Updated By</label>
                    <p className='mt-1 text-gray-700 dark:text-gray-300'>{project.updatedBy.name}</p>
                  </div>
                </div>

              </div>

              {/* project descreption */}
              <div className='mt-4'>
                <label className='font-bold text-lg'>Project Description</label>
                <p className='mt-1 text-gray-700 dark:text-gray-300'>{project.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* task tables */}
      <div className="pb-12 pt-3">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h2 className="mb-4 text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                Tasks:
              </h2>
              <TasksTable tasks={tasks} queryParams={queryParams} hideProjectColumn={true} />

            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
