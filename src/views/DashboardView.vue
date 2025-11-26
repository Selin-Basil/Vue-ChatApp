<script lang="ts" setup>
import { BCard, BCardBody, BCardTitle } from 'bootstrap-vue-next'
import { onMounted, ref } from 'vue'

interface DashboardData {
  active_user_count: number
  user_count: number
}

const countDetails = ref({
  activeUsers: 0,
  totalUsers: 0,
})

const getCountDetails = async () => {
  const response = await fetch('/dashboardData.json')
  const data: DashboardData = await response.json()

  countDetails.value.activeUsers = data?.active_user_count ?? 0
  countDetails.value.totalUsers  = data?.user_count ?? 0}

onMounted(() => {
  getCountDetails()
})
</script>


<template>
  <div class="d-flex justify-content-center align-items-center gap-4 p-4">
    <BCard
      text-variant="white"
      class="text-center"
      style="min-width: 20vw; height: 150px; background-color: white"
    >
      <BCardTitle style="color: black">{{ countDetails.activeUsers }}</BCardTitle>
      <BCardBody style="color: black">Active Users</BCardBody>
    </BCard>
    <BCard
      text-variant="white"
      class="text-center"
      style="min-width: 20vw; height: 150px; background-color: white"
    >
      <BCardTitle style="color: black">{{ countDetails.totalUsers }}</BCardTitle>
      <BCardBody style="color: black">Total Users</BCardBody>
    </BCard>
  </div>
</template>
