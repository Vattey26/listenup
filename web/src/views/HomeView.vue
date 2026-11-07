<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <h1>You can talk to someone, in writing</h1>
  <p>Chat with a volunteer, or find a therapist or support service you can afford.</p>
  <p><RouterLink to="/chat/waiting">Talk to someone</RouterLink></p>
  <p><RouterLink to="/providers">Find a therapist or service</RouterLink></p>
  <p><strong>Need help right now?</strong> <RouterLink to="/help">Open the immediate help page</RouterLink></p>
</template>
