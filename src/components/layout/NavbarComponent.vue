<script lang="ts" setup>
import { ref } from 'vue'
import { BNav, BNavItem } from 'bootstrap-vue-next'
import SidebarComponent from './SidebarComponent.vue';

const isOpen = ref(false);
const handleSidebar = () => {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <div :class="['navbar-layout', { 'navbar-layout--shifted': isOpen }]">
    <BNav :style="{ background: '#80808038' }">
      <div class="menu-icon">
        <i class="pi pi-align-justify" style="font-size: 1em" @click="handleSidebar" v-show="!isOpen"></i>
      </div>
      <BNavItem active href="#nav-small">Active</BNavItem>
      <BNavItem href="#nav-small">Link</BNavItem>
      <BNavItem href="#nav-small">Another Link</BNavItem>
      <BNavItem disabled href="#nav-small">Disabled</BNavItem>
    </BNav>

    <div class="content-wrapper">
      <SidebarComponent v-if="isOpen" @close="handleSidebar" />
      <main class="page-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.menu-icon {
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-around;
  padding: 8px;
  cursor: pointer;
}

.navbar-layout {
  min-height: 100vh;
  background-color: #f5f6fa;
  transition: margin-left 0.4s ease;
  margin-left: 0;
}

.navbar-layout--shifted {
  margin-left: 250px;
}

.content-wrapper {
  display: flex;
  position: relative;
}

.page-content {
  flex: 1;
  padding: 20px;
}
</style>
