<script setup lang="ts">
defineProps<{ id: string }>()

const messages = [
  { id: 1, from: 'Volunteer', mine: false, body: 'Hello, I am here to listen.' },
  { id: 2, from: 'You', mine: true, body: 'Message text placeholder.' },
]
</script>

<template>
  <div class="w page narrow">
    <h1>Chat {{ id }}</h1>
    <div class="chat">
      <div v-for="m in messages" :key="m.id" class="msg" :class="{ me: m.mine }">
        <small>{{ m.from }}</small>
        {{ m.body }}
      </div>
    </div>
    <p>New messages will be checked every 5 seconds.</p>
    <div class="composer">
      <label for="msg" style="display: none">Message</label>
      <input id="msg" disabled placeholder="Chat is a static screen in M1" />
      <button type="button" class="btn" disabled>Send</button>
    </div>
  </div>
</template>
