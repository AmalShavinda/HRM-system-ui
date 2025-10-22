import { Mail, Phone, Briefcase } from "lucide-react";
import { Employee } from "../../types";
import { useNavigate } from "react-router-dom";

interface EmployeeListProps {
  employees: Employee[];
  selectedEmployee: Employee | null;
  onSelectEmployee: (employee: Employee) => void;
}

const EmployeeList = ({
  employees,
  selectedEmployee,
  onSelectEmployee,
}: EmployeeListProps) => {
  const navigate = useNavigate();
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "On Leave":
        return "bg-orange-100 text-orange-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Employee List</h2>
      </div>

      <div className="divide-y divide-gray-100 max-h-[800px] overflow-y-auto">
        {employees.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">No employees found</p>
          </div>
        ) : (
          employees.map((employee) => (
            <div
              key={employee.id}
              onClick={() => navigate(`/employees/${employee.id}`)}
              className={`p-6 cursor-pointer transition-all hover:bg-gray-50 ${
                selectedEmployee?.id === employee.id
                  ? "bg-blue-50 border-l-4 border-blue-500"
                  : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <img
                  src={employee.avatar}
                  alt={employee.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-base">
                        {employee.name}
                      </h3>
                      <p className="text-sm text-gray-600">{employee.role}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        employee.status
                      )}`}
                    >
                      {employee.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{employee.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{employee.phone}</span>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {employee.department}
                    </span>
                    <span className="text-xs text-gray-500">
                      ID: {employee.id}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
