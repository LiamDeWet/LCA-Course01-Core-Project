<template>
  <div class="page-container">
    <Sidebar />
    <div class="content">
      <Topbar />

      <!--header-->
      <div class="d-flex justify-content-between align-items-center mt-4 mb-4">
        <div>
          <h2 class="fw-bold">Leave Management</h2>
          <p class="text-muted">Manage employee leave requests</p>
        </div>

        <button
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#leaveModal"
        >
          + New Request
        </button>
      </div>

      <!--Summary Cards-->
      <div class="row mb-4">
        <div class="col-md-4 mb-3">
          <div class="glass-card text-center">
            <h6>Pending</h6>
            <h2 class="text-warning">
              {{ pendingRequests }}
            </h2>
          </div>
        </div>

        <div class="col-md-4 mb-3">
          <div class="glass-card text-center">
            <h6>Rejected</h6>
            <h2 clas="text-danger">
              {{ rejectedRequests }}
            </h2>
          </div>
        </div>
      </div>

      <!--requests table-->
      <div class="glass-card">
        <div class="table-responsive">
          <table class="table align-middle">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Type</th>
                <th>Start Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="request in leaveRequests" :key="request.id">
                <td>{{ request.employeeName }}</td>
                <td>{{ request.leaveType }}</td>
                <td>{{ request.startDate }}</td>
                <td>{{ request.endDate }}</td>
                <td>{{ request.reason }}</td>

                <td>
                  <span class="badge" :class="statusBadge(request.status)">
                    {{ request.status }}
                  </span>
                </td>

                <td>
                  <button
                    v-if="request.status === 'Pending'"
                    class="btn btn-success btn-sm me-2"
                    @click="approveRequest(request)"
                  >
                    Approve
                  </button>

                  <button
                    v-if="request.status === 'Pending'"
                    class="btn btn-danger btn-sm"
                    @click="rejectRequest(request)"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!--create Leave request modal-->
    <div class="modal fade" id="leaveModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">New Leave Request</h5>

            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">
            <div class="mb-3">
              <label>Employee</label>
              <select v-model="form.employeeId" class="form-select">
                <option
                  v-for="employee in employees"
                  :key="employee.id"
                  :value="employee.id"
                >
                  {{ employee.name }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label>Leave Type</label>
              <select v-model="form.leaveType" class="form-select">
                <option>Annual Leave</option>
                <option>Sick Leave</option>
                <option>Family Responsibility</option>
              </select>
            </div>

            <div class="mb-3">
              <label>Start Date</label>
              <input
                type="date"
                class="form-control"
                v-model="form.startDate"
              />
            </div>

            <div class="mb-3">
              <label>End Date</label>
              <input type="date" class="form-control" v-model="form.endDate" />
            </div>

            <div class="mb-3">
              <label>Reason</label>
              <textarea
                class="form-control"
                rows="3"
                v-model="form.reason"
              ></textarea>
            </div>

            <div v-if="error" class="alert alert-danger">
              {{ error }}
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">
              Cancel
            </button>

            <button class="btn btn-primary" @click="submitRequests">
              Submit Request
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Sidebar from "../components/Sidebar.vue";
import Topbar from "../components/Topbar.vue";
import { getEmployees } from "../services/storage.js";

const LEAVE_KEY = "moderntech_leave";
const ATTENDANCE_KEY = "moderntech_attendance";
const employees = ref(getEmployees());
const leaveRequests = ref(JSON.parse(localStorage.getItem(LEAVE_KEY)) || []);
const error = ref("");
const form = ref({
  employeeId: null,
  leaveType: "Annual Leave",
  startDate: "",
  endDate: "",
  reason: "",
});

function saveRequests() {
  localStorage.setItem(LEAVE_KEY, JSON.stringify(leaveRequests.value));
}

function submitRequests() {
  if (!form.value.employeeId || !form.value.startDate || !form.value.endDate) {
    error.value = "Please complete all required fields.";
    return;
  }

  const employee = employees.value.find((e) => e.id === form.value.employeeId);

  leaveRequests.value.push({
    id: Date.now(),
    employeeId: employee.id,
    employeeName: employee.name,
    leaveType: form.value.leaveType,
    startDate: form.value.startDate,
    endDate: form.value.endDate,
    reason: form.value.reason,
    status: "Pending",
  });

  saveRequests();
  location.reload();
}

function approveRequest(request) {
  request.status = "Approved";
  updateAttendance(request.employeeId);

  saveRequests();
}

function rejectRequest(request) {
  request.status = "Rejected";
  saveRequests();
}

function updateAttendance(employeeId) {
  const attendance = JSON.parse(localStorage.getItem(ATTENDANCE_KEY)) || [];

  const employee = attendance.find((e) => e.id === employeeId);

  if (employee) {
    employee.status = "Leave";
  }

  localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(attendance));
}

const pendingRequests = computed(
  () => leaveRequests.value.filter((r) => r.status === "Pending").length,
);

const rejectedRequests = computed(
  () => leaveRequests.value.filter((r) => r.status === "Rejected").length,
);

function statusBadge(status) {
  switch (status) {
    case "Approved":
      return "bg-success";

    case "Rejected":
      return "bg-danger";

    case "Pending":
      return "bg-warning";

    default:
      return "bg-secondary";
  }
}
</script>
