import employeeData from "../data/employees";

const EMPLOYEE_KEY = "moderntech_employees";

const HISTORY_KEY = "moderntech_history";

export function getEmployees() {
  const employees = localStorage.getItem(EMPLOYEE_KEY);

  if (employees) {
    return JSON.parse(employees);
  }

  localStorage.setItem(EMPLOYEE_KEY, JSON.stringify(employeeData));

  return employeeData;
}

export function saveEmployees(data) {
  localStorage.setItem(EMPLOYEE_KEY, JSON.stringify(data));
}

function addHistory(action) {
  const history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];

  history.unshift({
    id: Date.now(),
    action,
    date: new Date().toLocaleString(),
  });

  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}
