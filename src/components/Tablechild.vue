<!-- Tablechild.vue -->
<template>
    <table>
      <thead>
        <th></th>
        <th v-for="tableHead in props.tableHeads" :key="tableHead">
      
          <span v-if="!Object.value(slots).includes(key)">
              {{ tableHead }}
            </span>
            <slot v-else :name="key" :value="value" :index="itemIndex" :props="props"></slot>
        </th>
      </thead>
      <tbody>
        <tr v-for="(item, itemIndex) in props.tableBody" :key="item.name">
          <th>{{ itemIndex + 1 }}</th>
          <td v-for="(value, key, index) in item" :key="value">
            <span v-if="!Object.keys(slots).includes(key)">
              {{ value }}
            </span>
            <slot v-else :name="key" :value="value" :index="itemIndex" :props="props"></slot>
          </td>
        </tr>
      </tbody>
    </table>
  </template>
  



  <script setup>
  import { useSlots } from 'vue'
  const props = defineProps({
    tableHeads: {
      type: Array,
      required: true,
    },
    tableBody: {
      type: Array,
      required: true,
    },
  })
  
  const slots = useSlots()
  console.log(`slots`, slots)
  </script>




<style lang="scss" scoped>
table {
    width: 100%;
    border-collapse: collapse;
}


thead {
    background-color: #f2f2f2;
}

th,
td {
    padding: 8px;
    border: 1px solid #dddddd;
}


tbody tr:nth-child(even) {
    background-color: #f9f9f9;
}
</style>