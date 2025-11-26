<script lang="ts" setup>
import { ref } from 'vue'
import { BNav, BNavText } from 'bootstrap-vue-next'
import SidebarComponent from './SidebarComponent.vue'

const isOpen = ref(false)
const handleSidebar = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div :class="['navbar-layout', { 'navbar-layout--shifted': isOpen }]">
    <BNav class="sticky-navbar" :style="{ background: '#80808038' }">
      <div class="menu-icon">
        <i
          class="pi pi-align-justify"
          style="font-size: 1em"
          @click="handleSidebar"
          v-show="!isOpen"
        ></i>
      </div>
      <BNavText class="ms-4 mt-2 h4"> Document Generator </BNavText>
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
  justify-content: space-between;
  align-items: center;
  padding: 18px;
  cursor: pointer;
  font-size: 23px;
}

.navbar-layout {
  height: 100vh;
  background-color: #f5f6fa;
  transition: margin-left 0.4s ease;
  margin-left: 0;
  min-width: calc(100% - 250px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.navbar-layout--shifted {
  margin-left: 250px;
}

.content-wrapper {
  display: flex;
  position: relative;
  flex: 1;
  overflow: hidden;
}

.page-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  overflow-x: hidden;
}

.sticky-navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  min-height: 6vh;
  flex-shrink: 0;
}
@media (max-width: 500px) {
  .navbar-layout--shifted {
    margin-left: 0;
  }
}
</style>
