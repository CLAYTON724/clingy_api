import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_URL,
})

export const fetchEmployees = () => api.get('/employees/')
export const fetchProjects = () => api.get('/projects/')
export const fetchDepartments = () => api.get('/departments/')

export default api
