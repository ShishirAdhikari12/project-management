import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import TasksTable from "./TasksTable";
import { useEffect, useState } from "react";

export default function Index({ tasks, queryParams = null, success }) {
  const [message, setMessage] = useState(success);
  useEffect(() => {
    setMessage(success);

    if (success) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Tasks
          </h2>
          <Link href={route('task.create')} className="bg-emerald-500 py-2 px-3 text-white rounded shadow transition-all">
            Add new
          </Link>
        </div>
      }
    >
      <Head title="Tasks" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {message && (
            <div className="w-[70vw] fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 py-6 px-4 text-white rounded-lg shadow-lg">
              {message}
            </div>
          )}
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              {/* <pre>{JSON.stringify(tasks, undefined, 2)}</pre> */}
              <TasksTable tasks={tasks} queryParams={queryParams} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
