import Sidebar from '@/components/Sidebar'

export default function DepartmentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-56 min-h-screen bg-gray-100">
        {children}
      </main>
    </div>
  )
}
