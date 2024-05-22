<!-- App.vue -->
<template>
  <SiderBar>
  </SiderBar>
</template>


<script setup>
import { ref , onMounted} from 'vue'
import { usePiniaStore } from './store/pinia.js'
import SiderBar from './components/SiderBar.vue'
const store=usePiniaStore()

onMounted(async () => {
  await store.fetchCommentsApi()
})
</script>


<style lang="scss">
$border: 2px solid rgba(219, 219, 219, 0.4);
$size1: 6px;
$size2: 12px;
$size3: 18px;
$size4: 24px;
$size5: 48px;
$backgroundColor: white;
$secondTextColor: #1f2023;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  body {
    margin: 0;
    padding: 0;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: balck;
    background-color: rgb(230, 230, 230);

  }
}
</style>
