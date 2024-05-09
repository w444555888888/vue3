<!-- App.vue -->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>


<script setup>
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

body {
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: balck;
  background-color: rgb(230, 230, 230);

  #app {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
