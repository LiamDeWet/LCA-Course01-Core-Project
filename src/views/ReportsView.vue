<template>
  <div class="page-container">
    <Sidebar />

    <div class="content">
      <Topbar />

      <!--Header-->
      <div class="mt-4 mb-4">
        <h2 class="fw-bold">Reports and Analytics</h2>

        <p class="text-muted">HR insights and workforce analytics</p>
      </div>

      <!--Summary cards-->

      <div class="row mb-4">
        <div class="col-md-4 mb-3">
          <div class="glass-card text-center">
            <h6>Total Employees</h6>
            <h2>{{ employees.length }}</h2>
          </div>
        </div>

        <div class="col-md-4 mb-3">
          <div class="glass-card text-center">
            <h6>Monthly Payroll</h6>

            <h2>R{{ totalPayroll.toLocaleString() }}</h2>
          </div>
        </div>

        <div class="col-md-4 mb-3">
          <div class="glass-card text-center">
            <h6>Attendance Rate</h6>
            <h2>{{ attendanceRate }}%</h2>
          </div>
        </div>
      </div>

      <!--Charts-->
      <div class="row">
        <!--Department breakdown-->

        <div class="col-lg-6 mb-4">
          <div class="glass-card">
            <h5 class="mb-3">Employees By Department</h5>

            <div class="chart-container">
              <Pie :data="departmentChartData" :options="chartOptions" />
            </div>
          </div>
        </div>

        <!--Payroll distribution-->
        <div class="col-lg-6 mb-4">
          <div class="glass-card">
            <h5 class="mb-3">Payroll Distribution</h5>
            <div class="chart-container">
              <Bar :data="salaryChartData" :options="chartOptions" />
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <!--Attendance-->
        <div class="col-lg-8 mx-auto">
          <div class="glass-card">
            <h5 class="mb-4">Attendance Overview</h5>
            <div class="attendance-chart-container">
              <Doughnut :data="attendanceChartData" :options="chartOptions" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "../components/Sidebar.vue";
import { Pie, Bar, Doughnut } from "vue-chartjs";
import Topbar from "../components/Topbar.vue";
import { computed } from "vue";
import { getEmployees } from "../services/storage";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  DoughnutController,
  PieController,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  DoughnutController,
  PieController,
);

const employees = getEmployees();
const attendance =
  JSON.parse(localStorage.getItem("moderntech_attendance")) || [];
const totalPayroll = computed(() => {
  return employees.reduce(
    (total, employee) => total + (employee.monthlySalary || 0),
    0,
  );
});
const attendanceRate = computed(() => {
  const present = attendance.filter(
    (employee) => employee.status === "Present",
  ).length;

  if (attendance.length === 0) return 0;

  return Math.round((present / attendance.length) * 100);
});

const departments = {};
employees.forEach((employee) => {
  if (!departments[employee.department]) {
    departments[employee.department] = 0;
  }

  departments[employee.department]++;
});

const departmentChartData = {
  labels: Object.keys(departments),
  datasets: [
    {
      data: Object.values(departments),
      backgroundColor: [
        "#2563eb", // Blue
        "#22c55e", // Green
        "#f59e0b", // Orange
        "#ef4444", // Red
        "#8b5cf6", // Purple
        "#06b6d4", // Cyan
      ],
      borderWidth: 2,
    },
  ],
};

const salaryChartData = {
  labels: employees.map((employee) => employee.name),
  datasets: [
    {
      label: "Monthly Salary (R)",
      data: employees.map((employee) => employee.monthlySalary),
      backgroundColor: "#2563eb",
      borderRadius: 8,
    },
  ],
};

const attendanceChartData = {
  labels: ["Present", "Absent", "Late", "Leave"],
  datasets: [
    {
      data: [
        attendance.filter((employee) => employee.status === "Present").length,

        attendance.filter((employee) => employee.status === "Absent").length,

        attendance.filter((employee) => employee.status === "Late").length,

        attendance.filter((employee) => employee.status === "Leave").length,
      ],

      backgroundColor: [
        "#22c55e", // Present
        "#ef4444", // Absent
        "#f59e0b", // Late
        "#3b82f6", // Leave
      ],
      borderWidth: 2,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRation: false,

  plugins: {
    legend: {
      position: "bottom",
    },
  },

  scales: {
    x: {
      ticks: {
        maxRotation: 45,
        minRotation: 45,
      },
    },
  },
  cutout: "65%",
};
</script>

<style scoped>
.chart-container {
  height: 500px;
  position: relative;
}

.attendance-chart-container {
  height: 300px;
  max-width: 500px;
  margin: 0 auto;
  position: relative;
}
</style>
