<!-- Table.vue -->
<template>
    <Tablechild :tableHeads="tableHeads" :tableBody="tableBody">
        <template #ithelpLink="{ index, props, value }">
      <a :href="value" target="_blank">查看 </a>

      <!-- <a :href="props.tableBody[index].ithelpLink" target="_blank"> 查看 </a> -->
    </template>
    </Tablechild>
  </template>



<script setup>
import { ref, onBeforeMount, onMounted, defineProps, computed, toRefs, watch, onUpdated } from 'vue'
import Tablechild from './Tablechild.vue'
const tableHeads = ref(['姓名', '主題', '備註', '查看'])
const tableBody = ref([
  {
    name: 'Angela',
    topic: '真的好想離開 Vue 3 新手村',
    note: 'Composition API',
    ithelpLink: 'https://ithelp.ithome.com.tw/users/20152606/ironman/5782',
  },
  {
    name: '阿傑',
    topic: '咩色用得好，歸剛沒煩惱',
    note: '從 ECMAScript 偷窺 JavaScript Array method',
    ithelpLink: 'https://ithelp.ithome.com.tw/users/20152459/ironman/5744',
  },
  {
    name: 'Jade',
    topic: '前端蛇行撞牆記',
    note: '無',
    ithelpLink: 'https://ithelp.ithome.com.tw/users/20152424/articles',
  },
  {
    name: 'Vic',
    topic: 'JavaScript 之路，往前邁進吧！',
    note: '未來會成為JS大師的人。',
    ithelpLink: 'https://ithelp.ithome.com.tw/users/20151114/ironman/5425',
  },
])
</script>

<style lang="scss" scoped>

table {
  width: 100%;
  border-collapse: collapse;
}


thead {
  background-color: #f2f2f2;
}

th, td {
  padding: 8px;
  border: 1px solid #dddddd;
}


tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}




</style>