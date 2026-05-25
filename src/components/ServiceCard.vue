<template>
  <v-card class="pa-5 pa-md-6 text-center service-card" color="surface" rounded="xl" elevation="2">
    <div class="mb-4 mx-auto d-flex align-center justify-center" style="width:56px;height:56px;background:linear-gradient(135deg,#0D2B45,#FF5500);border-radius:16px">
      <v-icon size="28" color="white">{{ icon }}</v-icon>
    </div>
    <div class="text-subtitle-1 text-md-h6 font-weight-medium mb-2" style="color:#0D2B45">{{ title }}</div>
    <div class="text-body-2 text-grey">{{ description }}</div>
  </v-card>
</template>

<script setup>
defineProps({ title: String, description: String, icon: String })
</script>

<style scoped>
.service-card { transition: all 0.25s ease; border-top: 3px solid transparent; }
.service-card:hover { transform: translateY(-6px); box-shadow: 0 12px 30px rgba(13,43,69,0.15) !important; border-top: 3px solid #FF5500; }
</style>
