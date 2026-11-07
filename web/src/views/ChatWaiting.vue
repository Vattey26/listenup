<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <h1>Looking for a volunteer</h1>
  <p>You are in the queue. This can take a few minutes.</p>
  <RouterLink to="/">Cancel request</RouterLink>
  <p>
    <strong>Need help right now?</strong>
    <RouterLink to="/help">Open the immediate help page</RouterLink>
  </p>
  <RouterLink to="/providers">Browse therapists while you wait</RouterLink>
</template>
