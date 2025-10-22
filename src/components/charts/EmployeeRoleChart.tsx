interface EmployeeRoleChartProps {
  data: { role: string; count: number }[];
}

const EmployeeRoleChart = ({ data }: EmployeeRoleChartProps) => {
  const maxCount = Math.max(...data.map(d => d.count));
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-orange-500',
    'bg-cyan-500',
    'bg-pink-500',
    'bg-yellow-500',
    'bg-red-500'
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Employee Distribution by Role</h2>
        <p className="text-sm text-gray-600 mt-1">Overview of team composition</p>
      </div>

      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={item.role}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{item.role}</span>
              <span className="text-sm font-semibold text-gray-900">{item.count}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full ${colors[index % colors.length]} transition-all duration-500 rounded-full`}
                style={{ width: `${(item.count / maxCount) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Total Roles</span>
          <span className="font-semibold text-gray-900">{data.length}</span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRoleChart;
