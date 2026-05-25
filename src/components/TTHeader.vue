<template>
  <v-app-bar height="88" flat color="#0C1A3E" elevation="0">
    <v-container class="d-flex align-center" style="max-width:1280px; position:relative">

      <v-btn icon class="mr-2 d-md-none" @click="drawer = !drawer" variant="text" color="white">
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <!-- LOGO ESQUERDA - GRANDE -->
      <router-link to="/" style="text-decoration:none; display:flex; align-items:center">
        <img :src="require('@/assets/tt-logo-header.png')" class="logo-main" />
      </router-link>

      <v-spacer />

      <!-- NAV DIREITA -->
      <nav class="d-none d-md-flex align-center" style="gap:4px">
        <router-link to="/sobre" class="nav-link">Sobre</router-link>
        <router-link to="/como-funciona" class="nav-link">Como funciona</router-link>
        <router-link to="/parceiro" class="nav-link">Seja parceiro</router-link>
        <div class="nav-divider"></div>
        <router-link to="/solicitar" class="nav-cta">
          Cotar frete
          <v-icon size="14" class="ml-1">mdi-arrow-right</v-icon>
        </router-link>
      </nav>

    </v-container>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary location="left" color="#0C1A3E">
    <div class="pa-5" style="border-bottom: 1px solid rgba(255,255,255,0.08)">
      <img :src="require('@/assets/tt-logo-header.png')" style="height:56px; width:auto" />
    </div>
    <v-list class="mt-2 pa-2">
      <v-list-item to="/" title="Início" prepend-icon="mdi-home-outline" base-color="white" />
      <v-list-item to="/sobre" title="Sobre" prepend-icon="mdi-information-outline" base-color="white" />
      <v-list-item to="/como-funciona" title="Como funciona" prepend-icon="mdi-help-circle-outline" base-color="white" />
      <v-list-item to="/parceiro" title="Seja parceiro" prepend-icon="mdi-handshake-outline" base-color="white" />
      <v-divider class="my-3" style="border-color:rgba(255,255,255,0.1)" />
      <v-list-item to="/solicitar" title="Cotar frete" prepend-icon="mdi-truck-outline" base-color="#E8821A" />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'
const drawer = ref(false)
</script>

<style scoped>
.logo-main { height: 76px; width: auto; display: block; }

.nav-link { text-decoration:none; color:rgba(255,255,255,0.65); font-size:13px; font-weight:500; padding:8px 14px; border-radius:4px; transition:all 0.2s; }
.nav-link:hover { color:#fff; background:rgba(255,255,255,0.06); }
.nav-divider { width:1px; height:20px; background:rgba(255,255,255,0.15); margin:0 8px; }
.nav-cta { text-decoration:none; display:inline-flex; align-items:center; background:#E8821A; color:#fff; font-size:13px; font-weight:700; padding:9px 18px; border-radius:4px; transition:all 0.2s; }
.nav-cta:hover { background:#CF7015; transform:translateY(-1px); }
</style>
