interface DepartmentChartProps {
  data: { department: string; count: number }[];
}

const DepartmentChart = ({ data }: DepartmentChartProps) => {
  const total = data.reduce((sum, item) => sum + item.count, 0);
  const colors = [
    { bg: 'bg-blue-500', text: 'text-blue-700', light: 'bg-blue-50' },
    { bg: 'bg-green-500', text: 'text-green-700', light: 'bg-green-50' },
    { bg: 'bg-orange-500', text: 'text-orange-700', light: 'bg-orange-50' },
    { bg: 'bg-cyan-500', text: 'text-cyan-700', light: 'bg-cyan-50' },
    { bg: 'bg-pink-500', text: 'text-pink-700', light: 'bg-pink-50' },
    { bg: 'bg-yellow-500', text: 'text-yellow-700', light: 'bg-yellow-50' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Department-wise Employees</h2>
        <p className="text-sm text-gray-600 mt-1">Distribution across departments</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {data.map((item, index) => {
          const percentage = ((item.count / total) * 100).toFixed(0);
          const colorScheme = colors[index % colors.length];

          return (
            <div
              key={item.department}
              className={`${colorScheme.light} rounded-lg p-4 border border-gray-100 transition-all hover:shadow-md`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`${colorScheme.bg} w-10 h-10 rounded-lg flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg">{item.count}</span>
                </div>
                <span className={`text-sm font-semibold ${colorScheme.text}`}>{percentage}%</span>
              </div>
              <h3 className="font-medium text-gray-900 text-sm">{item.department}</h3>
              <p className="text-xs text-gray-600 mt-1">{item.count} employees</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Total Departments</span>
          <span className="font-semibold text-gray-900">{data.length}</span>
        </div>
      </div>
    </div>
  );
};

export default DepartmentChart;
