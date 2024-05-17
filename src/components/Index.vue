<template>
   <div class="block text-center" >
    <el-carousel height="auto" autoplay>
      <el-carousel-item v-for="item in 4" :key="item" style="height: 500px">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.el-carousel__item:nth-child(2n) {
  background-color: #ffffff;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

</style>