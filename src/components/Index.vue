<template>
  <div class="block text-center" style="margin-bottom: 30px;">
    <el-carousel :interval="4000"  height="500px">
      <el-carousel-item v-for="(item, index) in imgList" :key="index">
        <img :src="item" class="carousel-image">
      </el-carousel-item>
    </el-carousel>
  </div>
  <div>
    <el-input
      v-model="inputValue"
      style="max-width: 300px"
      placeholder="Search"
      @blur="handleEvent"
     @keyup.enter="handleEvent"
    >
      <template #prepend>搜尋清單</template>
    </el-input>
  </div>
 
</template>

<script setup>
import { ref ,watch,onBeforeMount} from 'vue'
import { usePiniaStore } from '../store/pinia.js'
import axios from 'axios'
import carousel from '@/assets/carousel-1.jpeg'
import carouse2 from '@/assets/carousel-2.jpeg'
import carouse3 from '@/assets/carousel-3.jpeg'
import carouse4 from '@/assets/carousel-4.jpeg'
import carouse5 from '@/assets/carousel-5.jpeg'

// pinia
const store = usePiniaStore()
const imgList = ref([carousel, carouse2, carouse3, carouse4, carouse5])
const inputValue=ref('')

async function handleEvent() {
  try {
   
    const response = await axios(`http://localhost:3000/comments?todoTitle=${inputValue.value}`)
    console.log(response.data, 'response')
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}


onBeforeMount(() => {
})

</script>

<style lang="scss" scoped>
.carousel-image {
  max-width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
  margin: auto;
}
</style>