'use client'

import useSWR from 'swr'
import { fetchEmployees } from '@/lib/api'

interface Employee {
  employee_id: number
  name: string
  hire_date: string
}

export default function EmployeesPage() {
  const { data: employees } = useSWR('employees', () =>
    fetchEmployees().then((res) => res.data)
  )

  const employeesList = Array.isArray(employees) ? employees : []

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Employees</h1>
      <p className="text-gray-500 mb-8">Manage your organization's employees</p>

      <div className="bg-white rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Hire Date
              </th>
            </tr>
          </thead>
          <tbody>
            {employeesList.length > 0 ? (
              employeesList.map((emp: Employee) => (
                <tr key={emp.employee_id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{emp.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{emp.hire_date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="px-6 py-4 text-center text-gray-500">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
