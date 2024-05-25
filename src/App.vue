<!--
 * @Author: w444555888 w444555888@yahoo.com.tw
 * @Date: 2024-05-22 19:00:28
 * @LastEditors: w444555888 w444555888@yahoo.com.tw
 * @LastEditTime: 2024-05-25 08:55:22
 * @FilePath: \vue3\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- App.vue -->
<template>
    <SiderBar>
    </SiderBar>
</template>


<script setup>
import { ref, onBeforeMount } from 'vue'
import { usePiniaStore } from './store/pinia.js'
import SiderBar from './components/SiderBar.vue'
import { ElLoading } from 'element-plus'
const store = usePiniaStore()
const isLoading = ref(true)


onBeforeMount(async () => {
  try {
    isLoading.value = true
    isLoading.value = ElLoading.service({
      lock: true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)',
    })
    await store.fetchCommentsApi()
    await store.fetchUsersApi()
    setTimeout(() => {
      isLoading.value.close()
      isLoading.value = false
    }, 1000)
  } catch (error) {
    console.error(error)
    isLoading.value.close()
    isLoading.value = false
  }
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
