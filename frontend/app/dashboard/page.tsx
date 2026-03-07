'use client'

import { useEffect, useState } from 'react'
import useSWR from 'swr'
import StatCard from '@/components/StatCard'
import { fetchEmployees, fetchProjects, fetchDepartments } from '@/lib/api'

interface Employee {
  employee_id: number
  name: string
  hire_date: string
}

interface Project {
  project_id: number
  project_name: string
  start_date: string
  end_date: string
  department: number
}

interface Department {
  department_id: number
  department_name: string
}

export default function DashboardPage() {
  const { data: employees } = useSWR('employees', () =>
    fetchEmployees().then((res) => res.data)
  )
  const { data: projects } = useSWR('projects', () =>
    fetchProjects().then((res) => res.data)
  )
  const { data: departments } = useSWR('departments', () =>
    fetchDepartments().then((res) => res.data)
  )

  const recentEmployees = Array.isArray(employees) ? employees.slice(0, 3) : []
  const projectsData = Array.isArray(projects) ? projects.slice(0, 3) : []

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-2">Overview of your organization</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <StatCard
          icon="👤"
          label="Total Employees"
          value={Array.isArray(employees) ? employees.length : 0}
          bgColor="bg-gradient-to-br from-purple-400 to-purple-600"
        />
        <StatCard
          icon="📁"
          label="Total Projects"
          value={Array.isArray(projects) ? projects.length : 0}
          bgColor="bg-gradient-to-br from-purple-400 to-purple-600"
        />
        <StatCard
          icon="🏢"
          label="Departments"
          value={Array.isArray(departments) ? departments.length : 0}
          bgColor="bg-gradient-to-br from-blue-400 to-blue-600"
        />
      </div>

      {/* Recent Data Sections */}
      <div className="grid grid-cols-2 gap-6">
        {/* Recent Employees */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">
            Recent Employees
          </h2>
          <div className="space-y-3">
            {recentEmployees.length > 0 ? (
              recentEmployees.map((emp: Employee) => (
                <div
                  key={emp.employee_id}
                  className="flex justify-between items-center pb-3 border-b border-gray-200 last:border-b-0"
                >
                  <span className="text-gray-900 font-medium">{emp.name}</span>
                  <span className="text-gray-400 text-sm">{emp.hire_date}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No employees found</p>
            )}
          </div>
        </div>

        {/* Project Status */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">
            Project Status
          </h2>
          <div className="space-y-3">
            {projectsData.length > 0 ? (
              projectsData.map((proj: Project) => (
                <div
                  key={proj.project_id}
                  className="flex justify-between items-center pb-3 border-b border-gray-200 last:border-b-0"
                >
                  <span className="text-gray-900 font-medium">{proj.project_name}</span>
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded text-xs font-medium">
                    Completed
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No projects found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
