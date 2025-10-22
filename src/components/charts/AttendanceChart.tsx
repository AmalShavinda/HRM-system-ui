import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { AttendanceData } from "../../hooks/useAttendance";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
);

interface AttendanceChartProps {
  data: AttendanceData[];
}

const AttendanceChart: React.FC<AttendanceChartProps> = ({ data }) => {
  const displayData = data.slice(-14); // Show last 14 days

  const labels = displayData.map((d) =>
    new Date(d.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Present",
        data: displayData.map((d) => d.present),
        backgroundColor: "#22c55e", // Tailwind green-500
        borderRadius: 6,
        barPercentage: 0.7,
      },
      {
        label: "On Leave",
        data: displayData.map((d) => d.onLeave),
        backgroundColor: "#f97316", // Tailwind orange-500
        borderRadius: 6,
        barPercentage: 0.7,
      },
      {
        label: "Absent",
        data: displayData.map((d) => d.absent),
        backgroundColor: "#ef4444", // Tailwind red-500
        borderRadius: 6,
        barPercentage: 0.7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: "Employee Attendance Trend (Last 14 Days)",
        color: "#111827",
        font: { size: 16, weight: 600 },
        padding: { bottom: 20 },
      },
      legend: {
        position: "top" as const,
        labels: {
          color: "#374151",
          usePointStyle: true,
          pointStyle: "circle",
          font: { size: 12 },
        },
      },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#fff",
        bodyColor: "#fff",
        cornerRadius: 8,
        padding: 10,
        displayColors: true,
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          color: "#6b7280",
          font: { size: 11 },
        },
      },
      y: {
        stacked: true,
        grid: {
          color: "#e5e7eb",
        },
        ticks: {
          color: "#6b7280",
          stepSize: 2,
          font: { size: 11 },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Employee Attendance Trend
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Last 14 days attendance overview
        </p>
      </div>

      <div className="h-80">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default AttendanceChart;
