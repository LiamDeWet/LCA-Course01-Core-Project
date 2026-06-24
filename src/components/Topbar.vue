<template>
  <div class="glass-card topbar">
    <div>
      <h4 class="mb-0">ModernTech HR Suite</h4>
    </div>

    <div>
      <button class="btn btn-danger btn-sm" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function logout() {
  localStorage.removeItem("loggedIn");

  router.push("/");
}
</script>

<style scoped>
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
