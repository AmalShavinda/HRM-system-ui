import React from "react";
import { Menu, X, Zap } from "lucide-react";
import useSidebar from "../hooks/useSidebar";
import { dummyEmployees } from "../data/dummy.data";

interface SidebarProps {
  isSidebarOpen: boolean;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  closeSidebar: () => void;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setActiveTab,
  closeSidebar,
  toggleSidebar,
}) => {
  const { navigation, handleMenuClick, location } = useSidebar();
  const employee = dummyEmployees[3];

  return (
    <div>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">ABC HRM</h1>
              <p className="text-xs text-gray-600">Employee Management</p>
            </div>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white border-r border-gray-200 z-40 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ABC HRM</h1>
              <p className="text-sm text-gray-600">Employee Management</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.path);

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  closeSidebar();
                  handleMenuClick(item);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer / Employee Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-4 bg-blue-50/50 backdrop-blur-sm rounded-xl py-2 px-4 border border-blue-100 shadow-sm">
            {/* Employee Avatar */}
            <img
              src={employee?.avatar || "/default-avatar.png"}
              alt={employee?.name || "Employee"}
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
            />

            {/* Employee Info */}
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900">
                {employee?.name || "Employee Name"}
              </span>
              <span className="text-xs text-gray-500">Logged in</span>
            </div>

            {/* Optional action button */}
            <button className="ml-auto bg-cyan-100 hover:bg-cyan-200 text-cyan-900 font-medium text-sm px-3 py-1 rounded-lg transition-all">
              Profile
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
