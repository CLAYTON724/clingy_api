interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: number
  bgColor: string
}

export default function StatCard({ icon, label, value, bgColor }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 flex items-center gap-4">
      <div className={`w-16 h-16 ${bgColor} rounded-lg flex items-center justify-center text-2xl`}>
        {icon}
      </div>
      <div>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <p className="text-gray-500 text-sm">{label}</p>
      </div>
    </div>
  )
}
