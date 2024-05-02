<template>
  <div class="container" ref="container" @scroll="handleScroll">
    <div :style="{ height: totalHeight + 'px' }">
      <div
        v-for="(item, index) in visibleItems"
        :key="index"
        :style="{ transform: 'translateY(' + item.offset + 'px)' }"
        class="item"
      >
        {{ item.data }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, mounted, computed } from 'vue'


const data = ref([])
const visibleItems = ref([])
const totalHeight = ref(0)
const itemsPerPage = ref(10)
const currentPage = ref(1)
const itemHeight = ref(50)



onMounted(() => {
  generateData()
  updateVisibleItems()
})


function generateData () {
  for (let i = 1; i <= 100; i++) {
    data.value.push(`Item ${i}`)
  }
  totalHeight.value = data.value.length * itemHeight.value
}
function updateVisibleItems () {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  const endIndex = startIndex + itemsPerPage.value
  visibleItems.value = data.value
    .slice(startIndex, endIndex)
    .map((data, index) => ({
      data,
      offset: (startIndex + index) * itemHeight.value
    }))
}
function handleScroll () {
  const container = ref.container.value
  const scrollTop = container.scrollTop
  const startIndex = Math.floor(scrollTop / itemHeight.value)
  currentPage.value = Math.ceil((startIndex + 1) / itemsPerPage.value)
  updateVisibleItems()
}


</script>

<style>
.container {
  height: 300px;
  overflow-y: auto;
}

.item {
  height: 50px;
  line-height: 50px;
}
</style>
