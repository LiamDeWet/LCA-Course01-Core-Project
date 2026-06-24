<template>
  <aside class="sidebar" :class="{ mobileOpen: isOpen }">
    <div class="sidebar-header">
      <div class="logo">
        <div class="logo-circle">M</div>
        <span>ModernTech</span>
      </div>

      <button class="close-btn" @click="isOpen = false">✕</button>
    </div>

    <nav>
      <router-link to="/dashboard"> 📊 Dashboard </router-link>

      <router-link to="/employees"> 👥 Employees </router-link>

      <router-link to="/payroll"> 💰 Payroll </router-link>

      <router-link to="/attendance"> 📅 Attendance </router-link>

      <router-link to="/leave"> 🏖 Leave </router-link>

      <router-link to="/reports"> 📈 Reports </router-link>
    </nav>
  </aside>

  <button class="mobile-menu-btn" @click="isOpen = true">☰</button>
</template>

<script setup>
import { ref } from "vue";

const isOpen = ref(false);
</script>

<style scoped>
.sidebar {
  width: 260px;
  background: #0f172a;
  color: white;
  min-height: 100vh;
  padding: 20px;
  flex-shrink: 0;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-circle {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: #2563eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.sidebar a {
  display: block;
  color: white;
  text-decoration: none;
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 8px;
}

.sidebar a:hover {
  background: #1e293b;
}

.router-link-active {
  background: #2563eb;
}

.mobile-menu-btn,
.close-btn {
  display: none;
}

@media (max-width: 768px) {
  .mobile-menu-btn {
    display: block;
    position: fixed;
    top: 15px;
    left: 15px;
    z-index: 1001;
  }

  .close-btn {
    display: block;
    background: none;
    border: none;
    color: white;
    font-size: 20px;
  }

  .sidebar {
    position: fixed;
    left: -280px;
    top: 0;
    z-index: 1000;
    transition: 0.3s;
    width: 260px;
  }

  .mobileOpen {
    left: 0;
  }
}
</style>
