<template>
  <div
    class="container vh-100 d-flex justify-contnet-center align-items-center"
  >
    <div class="glass-card p-5" style="width: 400px">
      <h2 class="mb-4 text-center">ModernTech HR</h2>

      <input v-model="email" class="form-control mb-3" placeholder="Email" />

      <input
        v-model="password"
        type="password"
        class="form-control mb-3"
        placeholder="Password"
      />

      <button class="btn btn-primary w-100" @click="login">Login</button>

      <p class="text-danger mt-3">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const router = useRouter();
const email = ref("");
const password = ref("");
const error = ref("");

function login() {
  if (
    email.value === "admin@moderntech.com" &&
    password.value === "Password123"
  ) {
    localStorage.setItem("loggedIn", "true");

    router.push("/dashboard");
  } else {
    error.value = "Invalid credentials";
  }
}

onMounted(() => {
  const loggedIn = localStorage.getItem("loggedIn");

  if (loggedIn) {
    router.push("/dashboard");
  }
});
</script>
