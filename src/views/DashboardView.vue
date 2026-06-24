<template>
  <div class="page-container">
    <Sidebar />
    <div class="content">
      <Topbar />

      <div class="glass-card hero-banner mb-4">
        <div>
          <h2>Welcome Back!</h2>
          <p>Here's what's happening across ModernTech Solutions today.</p>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-3">
          <StatsCard title="Employees" :value="employeeCount" />
        </div>

        <div class="col-md-3">
          <StatsCard title="Leave Requests" :value="pendingLeave" />
        </div>
        <div class="col-md-3">
          <StatsCard title="Attendance" :value="attendanceRate + '%'" />
        </div>

        <div class="col-md-3">
          <StatsCard
            title="Annual Payroll"
            :value="'R' + (payroll || 0).toLocaleString()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "../components/Sidebar.vue";
import Topbar from "../components/Topbar.vue";
import StatsCard from "../components/StatsCard.vue";
import { getEmployees } from "../services/storage";
import { computed } from "vue";

const employees = getEmployees();

const attendance =
  JSON.parse(localStorage.getItem("moderntech_attendance")) || [];

const leaveRequests =
  JSON.parse(localStorage.getItem("moderntech_leave")) || [];

const employeeCount = computed(() => employees.length);

const pendingLeave = computed(() => {
  return leaveRequests.filter((request) => request.status === "Pending").length;
});

const attendanceRate = computed(() => {
  if (attendance.length === 0) return 0;

  const present = attendance.filter(
    (employee) => employee.status === "Present",
  ).length;

  return Math.round((present / attendance.length) * 100);
});

const payroll = computed(() => {
  return employees.reduce(
    (total, employee) => total + (employee.monthlySalary || 0),
    0,
  );
});
</script>

<style scoped>
.hero-banner {
  background: linear-gradient(135deg, #2563eb, #38bdf8);

  color: white;
  border-radius: 20px;
  padding: 24px;
}
</style>
