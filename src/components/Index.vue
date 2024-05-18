<template>
  <div class="block text-center">
    <el-carousel :interval="4000"  height="500px">
      <el-carousel-item v-for="item in imgList">
        <img :src="item" class="carousel-image">
      </el-carousel-item>
    </el-carousel>
  </div>

 
</template>

<script setup>
import { ref } from 'vue'
import carousel from '@/assets/carousel-1.jpeg'
import carouse2 from '@/assets/carousel-2.jpeg'
import carouse3 from '@/assets/carousel-3.jpeg'
import carouse4 from '@/assets/carousel-4.jpeg'
import carouse5 from '@/assets/carousel-5.jpeg'

const imgList = ref([carousel, carouse2, carouse3, carouse4, carouse5])

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