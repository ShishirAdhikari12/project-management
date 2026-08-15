import React from 'react'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid'

const TableHeading = ({
  name,
  sortable = true,
  sort_field = null,
  sort_direction = null,
  sortChanged = () => { },
  children,
}) => {
  return (
    <th
      onClick={(e) => sortChanged(name)}
    ><div className="px-3 py-3 flex items-center gap-1 cursor-pointer">
        {children}
        {sortable && (
          <div>
            <ChevronUpIcon
              className={"w-4 " + (sort_field === name && sort_direction === 'asc' ? "text-black dark:text-white" : "text-gray-300 dark:text-gray-500")} />
            <ChevronDownIcon
              className={"w-4 -mt-2 " + (sort_field === name && sort_direction === "desc" ? "text-black dark:text-white" : "text-gray-300 dark:text-gray-500")} />
          </div>
        )}
      </div>
    </th>
  )
}

export default TableHeading
