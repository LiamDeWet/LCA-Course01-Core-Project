<template>
  <div class="page-container">
    <Sidebar />

    <div class="content">
      <Topbar />

      <div class="d-flex justify-content-between align-items-center mt-4 mb-4">
        <div>
          <h2 class="fw-bold">Employee Management</h2>
          <p class="text-muted">Manage employee records and information</p>
        </div>

        <button
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#employeeModal"
          @click="openModal"
        >
          + Add Employee
        </button>
      </div>

      <!--Search and Filter-->

      <div class="glass-card mb-4">
        <div class="row">
          <div class="col-md-6 mb-3">
            <input
              v-model="search"
              class="form-control"
              placeholder="Search employee..."
            />
          </div>

          <div class="col-md-6 mb-3">
            <select v-model="departmentFilter" class="form-select">
              <option value="">All Departments</option>
              <option>Development</option>
              <option>QA</option>
              <option>HR</option>
              <option>Sales</option>
              <option>Marketing</option>
              <option>Support</option>
            </select>
          </div>
        </div>
      </div>

      <!--Employee Table-->
      <div class="glass-card">
        <div class="table-responsive">
          <table class="table align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Position</th>
                <th>Email</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="employee in filteredEmployees" :key="employee.id">
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <div class="avatar">
                      {{ employee.name.charAt(0) }}
                    </div>
                    {{ employee.name }}
                  </div>
                </td>

                <td>
                  <span class="badge bg-primary">
                    {{ employee.department }}
                  </span>
                </td>

                <td>{{ employee.position }}</td>
                <td>{{ employee.email }}</td>
                <td>R{{ employee.monthlySalary.toLocaleString() }}</td>

                <td>
                  <button
                    class="btn btn-sm btn-warning me-2"
                    @click="editEmployee(employee)"
                    data-bs-toggle="modal"
                    data-bs-target="#employeeModal"
                  >
                    Edit
                  </button>

                  <button
                    class="btn btn-sm btn-danger"
                    @click="deleteEmployee(employee.id)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!--Employee Modal-->
    <div class="modal fade" id="employeeModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ isEditing ? "Edit Employee" : "Add Employee" }}
            </h5>

            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label>Name</label>
                <input v-model="form.name" class="form-control" />
              </div>

              <div class="col-md-6 mb-3">
                <label>Email</label>
                <input v-model="form.email" class="form-control" />
              </div>

              <div class="col-md-6 mb-3">
                <label>Phone</label>
                <input v-model="form.phone" class="form-control" />
              </div>

              <div class="col-md-6 mb-3">
                <label>Department</label>

                <select v-model="form.department" class="form-select">
                  <option>Development</option>
                  <option>QA</option>
                  <option>HR</option>
                  <option>Sales</option>
                  <option>Marketing</option>
                  <option>Support</option>
                </select>
              </div>

              <div class="col-md-6 mb-3">
                <label>Position</label>
                <input v-model="form.position" class="form-control" />
              </div>

              <div class="col-md-6 mb-3">
                <label>Monthly Salary</label>
                <input
                  v-model.number="form.monthlySalary"
                  type="number"
                  class="form-control"
                />
              </div>
            </div>

            <div v-if="error" class="alert alert-danger">
              {{ error }}
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">
              Cancel
            </button>

            <button class="btn btn-primary" @click="saveEmployee">
              Save Employee
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
import { getEmployees, saveEmployees } from "../services/storage";
import { formatNumber } from "chart.js/helpers";

const employees = ref(getEmployees());

const search = ref("");
const departmentFilter = ref("");

const error = ref("");
const isEditing = ref(false);

const form = ref({
  id: null,
  name: "",
  email: "",
  phone: "",
  department: "Development",
  position: "",
  monthlySalary: 0,
});

const filteredEmployees = computed(() => {
  return employees.value.filter((employee) => {
    const matchesSearch = employee.name
      .toLowerCase()
      .includes(search.value.toLowerCase());

    const matchesDepartment =
      !departmentFilter.value || employee.department === departmentFilter.value;

    return matchesSearch && matchesDepartment;
  });
});

function openModal() {
  isEditing.value = false;

  form.value = {
    id: null,
    name: "",
    email: "",
    phone: "",
    department: "Development",
    position: "",
    monthlySalary: 0,
  };
}

function editEmployee(employee) {
  isEditing.value = true;
  form.value = { ...employee };
}

function saveEmployee() {
  if (!form.value.name || !form.value.email || !form.value.position) {
    error.value = "Please complete all required fields.";

    return;
  }
  error.value = "";

  if (isEditing.value) {
    const index = employees.value.findIndex((e) => e.id === form.value.id);

    employees.value[index] = {
      ...form.value,
    };
  } else {
    employees.value.push({
      ...form.value,
      id: Date.now(),
    });
  }

  saveEmployees(employees.value);

  location.reload();
}

function deleteEmployee(id) {
  if (!confirm("Delete this employee?")) return;

  employees.value = employees.value.filter((employee) => employee.id !== id);

  saveEmployees(employees.value);
}
</script>
