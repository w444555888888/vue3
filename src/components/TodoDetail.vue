<!-- TodoDetail.vue -->
<template>
  <div v-if="isLoading"></div>
  <div v-else id="TodoDetailPage">
    <div class="container">
      <div class="common-layout">
        <el-container>
          <el-header>
            <el-button type="primary" @click="navigateToHome">
              <el-icon>
                <LocationFilled />
              </el-icon>{{ t("home") }}</el-button>
          </el-header>
          <el-main>
            <div v-if="apiCommentFilter[0] && apiCommentFilter[0].pic == null"></div>
            <el-carousel v-else :interval="4000" type="card" height="300px">
              <el-carousel-item v-for="item in apiCommentFilter[0].pic" :key="item.id">
                <img :src="item" class="carousel-image">
              </el-carousel-item>
            </el-carousel>
            <div>
              <el-descriptions title="" :column="2" direction="vertical" border>
                <el-descriptions-item label="todoTitle" min-width="400px"><el-tag size="large">{{
                  apiCommentFilter[0].todoTitle
                }}</el-tag></el-descriptions-item>
                <el-descriptions-item label="datePicker" min-width="400px"><el-tag size="large">{{
                  apiCommentFilter[0].datePicker
                }}</el-tag></el-descriptions-item>
                <el-descriptions-item label="todoContent" :span="5" min-width="400px">
                  <div v-html="apiCommentFilter[0].todoContent"></div>
                </el-descriptions-item>
                <el-descriptions-item label="id" min-width="400px">
                  <el-tag size="large">{{ apiCommentFilter[0].id }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="done" min-width="400px">
                  <el-tag size="large">{{ apiCommentFilter[0].done }}</el-tag>
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </el-main>
          <el-footer>
          </el-footer>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, defineProps, computed, toRefs, watch, onUpdated } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { usePiniaStore } from '../store/pinia.js'
import axios from 'axios'
import { ElLoading } from 'element-plus'
import i18n from '../i18n.js'
import carousel from '@/assets/carousel-1.jpeg'
import carouse2 from '@/assets/carousel-2.jpeg'
import carouse3 from '@/assets/carousel-3.jpeg'
import carouse4 from '@/assets/carousel-4.jpeg'
import carouse5 from '@/assets/carousel-5.jpeg'

const imgList = ref([carousel, carouse2, carouse3, carouse4, carouse5])
// i18n
const { t } = i18n.global
// fetchCommentsApi數據容器
const apiCommentFilter = ref('')
const isLoading = ref(true)

// 使用路由router 路由params
const route = useRoute()
const routeindex = ref(route.params.index)

// pinia
const store = usePiniaStore()


//router到首頁
const appRouter = useRouter()
function navigateToHome () {
  appRouter.push({
    name: 'TodoList'
  })
}






onMounted(() => {
  store.fetchCommentsApi()

})

onBeforeMount(async () => {
  try {
    isLoading.value = true
    isLoading.value = ElLoading.service({
      lock: true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)',
    })
    // 拿後端fetchCommentsApi數據
    await store.fetchCommentsApi()
    apiCommentFilter.value = store.apiComments.filter(e => e.id == routeindex.value)
    console.log(apiCommentFilter.value,'apiCommentFilter.value');
    setTimeout(() => {
      isLoading.value.close()
      isLoading.value = false
    }, 1000)
  } catch (error) {
    console.error(error)
    isLoading.value.close()
    isLoading.value = false
  }
});

</script>

<style scoped lang="scss">
#TodoDetailPage {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  background-color: rgb(245, 245, 245);
  padding: 30px;
  border-radius: 8px;
  width: 100%;
}


.el-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.el-main {
  overflow: hidden;
}

.el-button {
  padding: 10px;
  cursor: pointer;
  border: 1px solid #a0a4d9;
  color: #1f2023;
  font-weight: bold;
  outline: none;
  border-radius: 0.25rem;
  background-color: #7e7e7e;
  min-width: 60px;
  min-height: 25px;
}

.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.el-header {
  margin-right: 5px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.carousel-image {
  max-width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
  margin: auto;
}


::v-deep .el-descriptions {
  padding: 20px;
  width: 100%;
}
</style>
