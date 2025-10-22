import { LeaveRequest } from '../../hooks/useLeaves';
import { Calendar, Clock, FileText } from 'lucide-react';

interface LeaveRequestListProps {
  leaves: LeaveRequest[];
  selectedLeave: LeaveRequest | null;
  onSelectLeave: (leave: LeaveRequest) => void;
}

const LeaveRequestList = ({ leaves, selectedLeave, onSelectLeave }: LeaveRequestListProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-orange-100 text-orange-800';
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLeaveTypeColor = (type: string) => {
    switch (type) {
      case 'Annual':
        return 'bg-blue-100 text-blue-800';
      case 'Sick':
        return 'bg-red-100 text-red-800';
      case 'Personal':
        return 'bg-cyan-100 text-cyan-800';
      case 'Maternity':
        return 'bg-pink-100 text-pink-800';
      case 'Unpaid':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Leave Requests</h2>
      </div>

      <div className="divide-y divide-gray-100 max-h-[800px] overflow-y-auto">
        {leaves.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">No leave requests found</p>
          </div>
        ) : (
          leaves.map((leave) => (
            <div
              key={leave.id}
              onClick={() => onSelectLeave(leave)}
              className={`p-6 cursor-pointer transition-all hover:bg-gray-50 ${
                selectedLeave?.id === leave.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <img
                  src={leave.employeeAvatar}
                  alt={leave.employeeName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{leave.employeeName}</h3>
                      <p className="text-sm text-gray-600">{leave.department}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(leave.status)}`}>
                      {leave.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getLeaveTypeColor(leave.leaveType)}`}>
                      {leave.leaveType} Leave
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(leave.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        {' - '}
                        {new Date(leave.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Clock className="w-3 h-3" />
                      <span>{leave.duration} {leave.duration === 1 ? 'day' : 'days'}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2">{leave.reason}</p>

                  <div className="mt-2 text-xs text-gray-500">
                    Applied on {new Date(leave.appliedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
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

export default LeaveRequestList;
