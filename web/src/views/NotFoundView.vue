<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="w page narrow">
    <h1>Page not found</h1>
    <p>The page does not exist.</p>
    <RouterLink class="btn" to="/">Go to home page</RouterLink>
  </div>
</template>
