<template>
  <div class="glass-card">
    <h6>{{ title }}</h6>
    <h2>{{ value }}</h2>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
});
</script>

<style scoped>
.glass-card {
  background: white;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

h6 {
  color: #64748b;
  margin-bottom: 8px;
}

h2 {
  margin: 0;
  font-weight: 700;
}
</style>
