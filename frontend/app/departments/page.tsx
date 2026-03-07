'use client'

import useSWR from 'swr'
import { fetchDepartments } from '@/lib/api'

interface Department {
  department_id: number
  department_name: string
}

export default function DepartmentsPage() {
  const { data: departments } = useSWR('departments', () =>
    fetchDepartments().then((res) => res.data)
  )

  const departmentsList = Array.isArray(departments) ? departments : []

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Departments</h1>
      <p className="text-gray-500 mb-8">Manage your organization's departments</p>

      <div className="bg-white rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Department Name
              </th>
            </tr>
          </thead>
          <tbody>
            {departmentsList.length > 0 ? (
              departmentsList.map((dept: Department) => (
                <tr key={dept.department_id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{dept.department_name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={1} className="px-6 py-4 text-center text-gray-500">
                  No departments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
