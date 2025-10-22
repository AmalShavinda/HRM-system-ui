import { useState } from "react";
import { FileText, Download, Calendar } from "lucide-react";
import EmployeeSummaryReport from "../../components/reports/EmployeeSummaryReport";
import LeaveBalanceReport from "../../components/reports/LeaveBalanceReport";
import { Employee } from "../../types";
import { dummyEmployees } from "../../data/dummy.data";
import { pdf } from "@react-pdf/renderer";
import EmployeeReportPDF from "../../components/PDFs/EmployeeSummeryReportPDF";
import { generateEmployeeCSV } from "../../components/CSVs/EmployeeSummeryCSV";

const Reports = () => {
  const [activeReport, setActiveReport] = useState<"employee" | "leave">(
    "employee"
  );

  const downloadEmployeeSummeryReport = async (employees: Employee[]) => {
    const blob = await pdf(
      <EmployeeReportPDF employees={employees} />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Employee-summery-report.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-1">View and export employee reports</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => downloadEmployeeSummeryReport(dummyEmployees)}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            PDF
          </button>
          <button
            onClick={() => generateEmployeeCSV(dummyEmployees)}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setActiveReport("employee")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeReport === "employee"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <FileText className="w-5 h-5" />
            Employee Summary Report
          </button>

          <button
            onClick={() => setActiveReport("leave")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeReport === "leave"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Calendar className="w-5 h-5" />
            Leave Balance Report
          </button>
        </div>

        <div className="text-sm text-gray-500 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Generated on{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      {activeReport === "employee" ? (
        <EmployeeSummaryReport />
      ) : (
        <LeaveBalanceReport />
      )}
    </div>
  );
};

export default Reports;
