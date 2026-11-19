<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="w page narrow">
    <h1>Looking for a volunteer</h1>
    <p>You are in the queue. This can take a few minutes.</p>
    <div class="stack">
      <div class="note">
        <strong>Need help right now?</strong>
        <p style="margin: 6px 0 12px">Open the immediate help page. It works without logging in.</p>
        <RouterLink class="ur" to="/help">Urgent help</RouterLink>
      </div>
      <p><RouterLink class="btn o" to="/">Cancel request</RouterLink></p>
      <p><RouterLink to="/providers"><b>Browse therapists while you wait</b></RouterLink></p>
    </div>
  </div>
</template>
