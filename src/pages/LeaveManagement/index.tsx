import { useState } from 'react';
import { LeaveRequest, useLeaves } from '../../hooks/useLeaves';
import { Filter, Search } from 'lucide-react';
import LeaveRequestList from '../../components/leave/LeaveRequestList';
import LeaveApprovalPanel from '../../components/leave/LeaveApprovalPanel';


const LeaveManagement = () => {
  const {
    filteredLeaves,
    pendingLeaves,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    approveLeave,
    rejectLeave
  } = useLeaves();

  const [selectedLeave, setSelectedLeave] = useState<LeaveRequest | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'pending'>('all');

  const displayLeaves = activeTab === 'all' ? filteredLeaves : pendingLeaves;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Leave Management</h1>
        <p className="text-gray-600 mt-1">Manage employee leave requests and approvals</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by employee name, ID, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer transition-all min-w-[160px]"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Requests ({filteredLeaves.length})
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'pending'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pending Approval ({pendingLeaves.length})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LeaveRequestList
            leaves={displayLeaves}
            selectedLeave={selectedLeave}
            onSelectLeave={setSelectedLeave}
          />
        </div>

        <div className="lg:col-span-1">
          <LeaveApprovalPanel
            leave={selectedLeave}
            onApprove={approveLeave}
            onReject={rejectLeave}
            onRequestInfo={() => {
              alert('Request info functionality would be implemented here');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;
