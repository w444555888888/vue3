<!-- TodoDetail.vue -->
<template>
  <div id="TodoDetailPage">
    <div class="container">
      <div class="common-layout">
        <el-container>
          <el-header>
            <el-button type="primary" @click="navigateToHome">
              <el-icon>
                <LocationFilled />
              </el-icon>首頁</el-button>
          </el-header>
          <el-main>
            <div v-if="isLoading" v-loading="isLoading"></div>
            <div v-else>
              <el-descriptions class="DetailDescription" title="TodoDetail" :column="2" :size="size"
                direction="vertical" :style="blockMargin">
                <el-descriptions-item label="todoTitle"><el-tag size="large">{{ apiCommentFilter[0].todoTitle
                    }}</el-tag></el-descriptions-item>
                <el-descriptions-item label="datePicker"><el-tag size="large">{{ apiCommentFilter[0].datePicker
                    }}</el-tag></el-descriptions-item>
                <el-descriptions-item label="todoContent" :span="5">{{ apiCommentFilter[0].todoContent
                  }}</el-descriptions-item>
                <el-descriptions-item label="id">
                  <el-tag size="large">{{ apiCommentFilter[0].id }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="done">
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
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { usePiniaStore } from '../store/pinia.js'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'


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

})

onBeforeMount(async () => {
  try {
    isLoading.value = true
    await store.fetchCommentsApi()
    apiCommentFilter.value = store.apiComments.filter(e => e.id === routeindex.value)
    isLoading.value = false
  } catch (error) {
    console.error(error)
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

.DetailDescription {
  padding: 30px
}
</style>
