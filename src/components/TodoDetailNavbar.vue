<!-- TodoDetailNavbar.vue -->
<template>
  <div>
    {{ props.receivedMessage }}
    <button @click="sendMessage">eventbus-emit</button>
  </div>
</template>

<script setup>
import {ref , defineProps } from 'vue'
import bus from 'vue3-eventbus'
const props = defineProps({
  receivedMessage: String,
});
const sendMessage = () => {
  bus.emit('message', 'Hello from Component !');
}
</script>

<style lang="scss" scoped>


</style>