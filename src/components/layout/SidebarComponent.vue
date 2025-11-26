<script lang="ts" setup>
import { onMounted, ref } from 'vue'

defineEmits<{
  close: []
}>()

const currentHour = new Date().getHours()
const greeting = ref('')
const greetingUpdation = () => {
  if (currentHour >= 5 && currentHour < 12) {
    greeting.value = 'Good Morning' // Morning: 5 AM to 11:59 AM
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting.value = 'Good Afternoon' // Afternoon: 12 PM to 5:59 PM
  } else {
    greeting.value = 'Good Evening' // Evening: 6 PM onwards
  }
}

onMounted(() => {
  greetingUpdation()
})
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <p style="margin-top: 12px">{{ greeting }}</p>
      <button class="close-btn" @click="$emit('close')">
        <i class="pi pi-times"></i>
      </button>
    </div>
    <div class="sidebar-content">
      <BLink to="dashboard" class="me-2 text-decoration-none"> Dashboard </BLink>
      <BLink to="profile" class="me-2 text-decoration-none"> Profile </BLink>
      <BLink to="user-management" class="me-2 text-decoration-none"> User Management </BLink>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 250px;
  background-color: #fff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow-y: auto;
  transition: transform 0.3s ease;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
  padding: 5px 10px;
  color: #333;
}

.close-btn:hover {
  color: #000;
}

.sidebar-content {
  padding: 20px;
  display: grid;
  margin: 10px;
  gap: 30px;
}
@media (max-width: 500px) {
  .sidebar {
    overlay: auto;
  }
}
</style>
