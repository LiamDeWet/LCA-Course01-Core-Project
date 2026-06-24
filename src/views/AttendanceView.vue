<template>
  <div class="page-container">
    <Sidebar />

    <div class="content">
      <Topbar />

      <!--page header-->
      <div class="mt-4 mb-4">
        <h2 class="fw-bold">Attendance Tracking</h2>

        <p class="text-muted">Monitor daily employee attendance</p>
      </div>

      <!--statistics cards-->

      <div class="row mb-4">
        <div class="col-md-3 mb-3">
          <div class="glass-card text-center">
            <h6>Present</h6>
            <h2 class="text-success">
              {{ presentCount }}
            </h2>
          </div>
        </div>

        <div class="col-md-3 mb-3">
          <div class="glass-card text-center">
            <h6>Absent</h6>
            <h2 class="text-danger">
              {{ absentCount }}
            </h2>
          </div>
        </div>

        <div class="col-md-3 mb-3">
          <div class="glass-card text-center">
            <h6>Late</h6>
            <h2 class="text-warning">
              {{ lateCount }}
            </h2>
          </div>
        </div>

        <div class="col-md-3 mb-3">
          <div class="glass-card text-center">
            <h6>Leave</h6>
            <h2 class="text-primary">
              {{ leaveCount }}
            </h2>
          </div>
        </div>
      </div>

      <!--Attendance table-->
      <div class="glass-card">
        <div class="table-responsive">
          <table class="table align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Status</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="employee in attendance" :key="employee.id">
                <td>
                  {{ employee.name }}
                </td>

                <td>
                  <span class="badge bg-secondary">
                    {{ employee.department }}
                  </span>
                </td>

                <td>
                  <span class="badge" :class="statusClass(employee.status)">
                    {{ employee.status }}
                  </span>
                </td>

                <td>
                  <select
                    class="form-select"
                    v-model="employee.status"
                    @change="saveAttendance"
                  >
                    <option>Present</option>
                    <option>Absent</option>
                    <option>Late</option>
                    <option>Leave</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Sidebar from "../components/Sidebar.vue";
import Topbar from "../components/Topbar.vue";
import { getEmployees } from "../services/storage";

const ATTENDANCE_KEY = "moderntech_attendance";

function generateAttendance() {
  const employees = getEmployees();

  let attendance = JSON.parse(localStorage.getItem(ATTENDANCE_KEY)) || [];

  employees.forEach((employee) => {
    const existing = attendance.find((record) => record.id === employee.id);

    if (existing) {
      existing.name = employee.name;
      existing.department = employee.department;
    } else {
      attendance.push({
        id: employee.id,
        name: employee.name,
        department: employee.department,
        status: "Present",
      });
    }
  });

  attendance = attendance.filter((record) =>
    employees.some((employee) => employee.id === record.id),
  );
  localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(attendance));
  return attendance;
}

const attendance = ref(generateAttendance());

function saveAttendance() {
  localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(attendance.value));
}

const presentCount = computed(
  () =>
    attendance.value.filter((employee) => employee.status === "Present").length,
);

const absentCount = computed(
  () =>
    attendance.value.filter((employee) => employee.status === "Absent").length,
);

const lateCount = computed(
  () =>
    attendance.value.filter((employee) => employee.status === "Late").length,
);

const leaveCount = computed(
  () =>
    attendance.value.filter((employee) => employee.status === "Leave").length,
);

function statusClass(status) {
  switch (status) {
    case "Present":
      return "bg-success";

    case "Absent":
      return "bg-danger";

    case "Late":
      return "bg-warning";

    case "Leave":
      return "bg-primary";

    default:
      return "bg-secondary";
  }
}
</script>
