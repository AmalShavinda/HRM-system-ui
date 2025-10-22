import { useEmployees } from '../../hooks/useEmployees';
import { useAttendance } from '../../hooks/useAttendance';
import { Users, Briefcase, TrendingUp, Calendar } from 'lucide-react';
import EmployeeRoleChart from '../../components/charts/EmployeeRoleChart';
import DepartmentChart from '../../components/charts/DepartmentChart';
import AttendanceChart from '../../components/charts/AttendanceChart';

const Dashboard = () => {
  const { employees, employeesByRole, employeesByDepartment } = useEmployees();
  const { attendanceData, attendanceSummary } = useAttendance();

  const activeEmployees = employees.filter(emp => emp.status === 'Active').length;
  const onLeaveEmployees = employees.filter(emp => emp.status === 'On Leave').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's your HRM overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{employees.length}</p>
              <p className="text-sm text-green-600 mt-1">+2 this month</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Employees</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{activeEmployees}</p>
              <p className="text-sm text-gray-500 mt-1">{((activeEmployees / employees.length) * 100).toFixed(0)}% of total</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <Briefcase className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">On Leave</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{onLeaveEmployees}</p>
              <p className="text-sm text-orange-600 mt-1">Currently away</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Attendance</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{attendanceSummary.avgPresent}</p>
              <p className="text-sm text-blue-600 mt-1">Last 22 days</p>
            </div>
            <div className="bg-cyan-50 p-4 rounded-lg">
              <TrendingUp className="w-8 h-8 text-cyan-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EmployeeRoleChart data={employeesByRole} />
        <DepartmentChart data={employeesByDepartment} />
      </div>

      <AttendanceChart data={attendanceData} />
    </div>
  );
};

export default Dashboard;
