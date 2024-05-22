<template>
   <nav>
      <select v-model="locale18n">
        <option value="en">en-US</option>
        <option value="zh">zh-TW</option>
      </select>
    </nav>

  <div class="block text-center" style="margin-bottom: 30px;">
    <el-carousel :interval="4000"  height="500px">
      <el-carousel-item v-for="(item, index) in imgList" :key="index">
        <img :src="item" class="carousel-image">
      </el-carousel-item>
    </el-carousel>
  </div>
  <div>
    <el-button @click="handleSearch">{{t('search')}}</el-button>
    <el-select v-model="selectValue" placeholder="Select" style="width: 240px" :value-on-clear="null">
      <el-option :label="'All'" :value="''" />
      <el-option
        v-for="(item,index) in storetodoTitle"
        :key="item.index"
        :label="item"
        :value="item"
      />
    </el-select>
  </div>

  
  <div class="card-container">
  <el-card 
    v-for="(item,index) in responseValue"
    :key="index"
    style="max-width: 480px"
    v-show="item.pic && item.pic.length > 0">
    <template #header>{{ item.todoTitle }}</template>
    <div class="image-container">
      <img
        v-for="(pic, picIndex) in item.pic"
        :key="picIndex"
        :src="pic"
        style="width: 100%; margin-bottom: 10px;"
      />
    </div>
  </el-card>
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
import i18n from '../i18n.js'

// i18n語系  
const locale18n = ref(i18n.global.locale)
const { t } = i18n.global
// pinia
const store = usePiniaStore()
const imgList = ref([carousel, carouse2, carouse3, carouse4, carouse5])
// select
const storetodoTitle = [...store.apiComments.map(e => e.todoTitle)];
const selectValue=ref('')


const responseValue=ref('')

async function handleSearch() {
  try {
    const response = await axios(`http://localhost:3000/comments?todoTitle=${selectValue.value}`)
    responseValue.value= response.data
    console.log( responseValue.value,' responseValue.value');
  } catch (error) {
    console.error('Error', error)
  }
}




onBeforeMount(() => {
})

</script>

<style lang="scss" scoped>

nav {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;


  select,
  option {
    background-color: rgb(0, 0, 0);
    color: white;
    border-radius: 5px;
  }
  
}

.carousel-image {
  max-width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
  margin: auto;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
}

.image-container {
  display: flex;
  overflow-x: auto; 

}

</style>