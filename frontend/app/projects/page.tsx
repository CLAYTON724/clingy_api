'use client'

import useSWR from 'swr'
import { fetchProjects } from '@/lib/api'

interface Project {
  project_id: number
  project_name: string
  start_date: string
  end_date: string
  department: number
}

export default function ProjectsPage() {
  const { data: projects } = useSWR('projects', () =>
    fetchProjects().then((res) => res.data)
  )

  const projectsList = Array.isArray(projects) ? projects : []

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Projects</h1>
      <p className="text-gray-500 mb-8">Manage your organization's projects</p>

      <div className="bg-white rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Project Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Start Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                End Date
              </th>
            </tr>
          </thead>
          <tbody>
            {projectsList.length > 0 ? (
              projectsList.map((proj: Project) => (
                <tr key={proj.project_id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{proj.project_name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{proj.start_date}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{proj.end_date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                  No projects found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
