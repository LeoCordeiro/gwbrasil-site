<template>
  <v-app>
    <TTHeader />
    <v-main>
      <router-view />
    </v-main>
    <TTFooter />
  </v-app>
</template>

<script setup>
import TTHeader from '@/components/TTHeader.vue'
import TTFooter from '@/components/TTFooter.vue'
</script>
