<!-- App.vue -->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>


<script setup>
</script>


<style  scoped lang="scss">
$border: 2px solid rgba(219, 219, 219, 0.4);
$size1: 6px;
$size2: 12px;
$size3: 18px;
$size4: 24px;
$size5: 48px;
$backgroundColor: white;
$textColor: white;
$primaryColor: #a0a4d9;
$secondTextColor: #1f2023;

body {
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $textColor;

  #app {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
  }
}
</style>
