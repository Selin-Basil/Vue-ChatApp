<script lang="ts" setup>
defineEmits<{
  close: []
}>()
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <button class="close-btn" @click="$emit('close')">
        <i class="pi pi-times"></i>
      </button>
    </div>
    <div class="sidebar-content">
      <p>Sidebar content here</p>
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
}

.sidebar-header {
  display: flex;
  justify-content: flex-end;
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
}
</style>
