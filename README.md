# LCA-Core Project ModernTech HR Suite

## Overview

ModernTech HR Suite is a modern Human Resources Management System built using Vue 3 and Vite. The application provides HR teams with a centralized platform to manage employees, attendance, leave requests, payroll information, and workforce analytics.

The system was designed to provide a clean, responsive, and professional user experience while demonstrating modern frontend development practices.

---

## Features

### Dashboard

- Workforce summary cards
- Employee count overview
- Leave request statistics
- Attendance insights
- Payroll summaries
- Welcome dashboard interface

### Employee Management

- Add new employees
- Edit employee information
- Delete employees
- Department filtering
- Employee search functionality
- Local data persistence

### Attendance Tracking

- Mark employees as:
  - Present
  - Absent
  - Late
  - On Leave

- Attendance statistics
- Automatic synchronization with employee records

### Leave Management

- Create leave requests
- Approve leave requests
- Reject leave requests
- Leave status tracking
- Attendance integration for approved leave

### Payroll Management

- Employee salary management
- Payroll calculations
- Annual payroll totals
- Salary overview

### Reports & Analytics

- Employee department breakdown
- Payroll distribution charts
- Attendance analytics
- Interactive data visualizations using Chart.js

### Responsive Design

- Desktop optimized
- Tablet compatible
- Mobile-friendly layouts
- Professional HR dashboard styling

---

## Technologies Used

### Frontend

- Vue 3
- Vite
- Vue Router

### Styling

- Bootstrap 5
- Custom CSS
- Responsive Design Principles

### Charts

- Chart.js
- Vue-ChartJS

### Data Storage

- LocalStorage API

---

## Project Structure

src/
│
├── components/
│ ├── Sidebar.vue
│ ├── Topbar.vue
│ └── StatsCard.vue
│
├── views/
│ ├── DashboardView.vue
│ ├── EmployeesView.vue
│ ├── AttendanceView.vue
│ ├── LeaveView.vue
│ ├── PayrollView.vue
│ └── ReportsView.vue
│
├── router/
│ └── index.js
│
├── services/
│ └── storage.js
│
├── data/
│ └── employees.js
│
└── assets/

---

## Installation Locally

### Clone Repository

git clone <repository-url>

### Navigate to Project

cd moderntech-hr-suite

### Install Dependencies

npm install

### Start Development Server

npm run dev

### Build Production Version

npm run build

---

## Key Learning Outcomes

This project demonstrates:

- Component-based architecture with Vue 3
- State management using reactive data
- CRUD operations
- Local storage persistence
- Dynamic chart generation
- Responsive UI development
- Routing and navigation
- Data filtering and searching
- Modern frontend development workflows

---

## Future Improvements

- Authentication and authorization
- Employee profile photos
- Backend API integration
- Database connectivity
- Role-based permissions
- PDF report exports
- Email notifications
- Payroll tax calculations
- Employee performance reviews

---

## Author

Developed by:

Liam Jude De Wet

Frontend Web Development Project

ModernTech HR Suite
