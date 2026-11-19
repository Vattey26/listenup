<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import appHeader from './components/AppHeader.vue';
</script>

<template>
  <div class="pt">Prototype only. Not a crisis service. Fake data.</div>
  <appHeader />
  <main><RouterView /></main>
  <footer class="fo">
    <div class="w">
      <span>ListenUp. A course prototype. Fake data only.</span>
      <RouterLink to="/help">Immediate help</RouterLink>
    </div>
  </footer>
</template>
