<script setup lang="ts">
defineProps<{ id: string }>()

const message = [
  { id: 1, from: 'Volunteer', body: 'Hello, I am here to listen.' },
  { id: 2, from: 'You', body:'Message text placeholder.' }
]
</script>

<template>
  <h1>Chat {{ id }}</h1>
  <ul>
    <li v-for="m in message" :key="m.id"><strong>{{ m.from }}</strong>{{ m.body }}</li>
  </ul>
  <p>New messages will be checked every 5 seconds.</p>
  <label for="msg">Message</label>
  <input
    id="msg"
    disabled placeholder="Chat is a static sceen in M1"
  />
  <button type="button" disabled>Send</button>
</template>
