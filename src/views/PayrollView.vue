<template>
  <div class="page-container">
    <Sidebar />
    <div class="content">
      <Topbar />

      <!--Header-->

      <div class="mt-4 mb-4">
        <h2 class="fw-bold">Payroll Management</h2>
        <p class="text-muted">Manage salaries and generate employee payslips</p>
      </div>

      <!--Summary Cards-->
      <div class="row mb-4">
        <div class="col-md-4 mb-3">
          <div class="glass-card">
            <h6>Total Employees</h6>
            <h2>{{ employees.length }}</h2>
          </div>
        </div>

        <div class="col-md-4 mb-3">
          <div class="glass-card">
            <h6>Monthly Payroll</h6>
            <h2>R{{ totalMonthlyPayroll.toLocaleString() }}</h2>
          </div>
        </div>

        <div class="col-md-4 mb3">
          <div class="glass-card">
            <h6>Annual Payroll</h6>
            <h2>R{{ totalAnnualPayroll.toLocaleString() }}</h2>
          </div>
        </div>
      </div>

      <!--Payroll tables-->
      <div class="glass-card">
        <div class="table-responsive">
          <table class="table align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Monthly Salary</th>
                <th>Annual Salary</th>
                <th>Tax (18%)</th>
                <th>Net Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="employee in employees" :key="employee.id">
                <td>{{ employee.name }}</td>
                <td>
                  <span class="badge bg-primary">
                    {{ employee.department }}
                  </span>
                </td>

                <td>R{{ employee.monthlySalary.toLocaleString() }}</td>

                <td>R{{ annualSalary(employee).toLocaleString() }}</td>

                <td>R{{ calculateTax(employee).toLocaleString() }}</td>

                <td>R{{ netSalary(employee).toLocaleString() }}</td>

                <td>
                  <button
                    class="btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#payslipModal"
                    @click="generatePayslip(employee)"
                  >
                    Payslip
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!--Payslip modal-->
    <div class="modal fade" id="payslipModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Digital Payslip</h5>

            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body" id="payslip">
            <h4 class="text-center mb-4">ModernTech Solutions</h4>

            <hr />

            <p>
              <strong>Name: </strong>
              {{ selectedEmployee.name }}
            </p>

            <p>
              <strong>Department: </strong>
              {{ selectedEmployee.department }}
            </p>

            <p>
              <strong>Position: </strong>
              {{ selectedEmployee.position }}
            </p>

            <hr />

            <p>
              <strong>Monthly Salary: </strong>
              R{{ selectedEmployee.monthlySalary?.toLocaleString() }}
            </p>

            <p>
              <strong>Tax Deduction: </strong>
              R{{ calculateTax(selectedEmployee).toLocaleString() }}
            </p>

            <p>
              <strong>Net Salary: </strong>
              R{{ netSalary(selectedEmployee).toLocaleString() }}
            </p>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>

            <button class="btn btn-sucess" @click="printPayslip">
              Print Payslip
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
import { getEmployees } from "../services/storage";

const employees = ref(getEmployees());
const selectedEmployee = ref({});

function calculateTax(employee) {
  return Math.round(employee.monthlySalary * 0.18);
}

function netSalary(employee) {
  return employee.monthlySalary - calculateTax(employee);
}

function generatePayslip(employee) {
  selectedEmployee.value = employee;
}

const totalMonthlyPayroll = computed(() => {
  return employees.value.reduce(
    (total, employee) => total + employee.monthlySalary,
    0,
  );
});

const totalAnnualPayroll = computed(() => {
  return totalMonthlyPayroll.value * 12;
});

function printPayslip() {
  window.print();
}

function annualSalary(employee) {
  return employee.monthlySalary * 12;
}
</script>
