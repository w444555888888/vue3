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
            <div>
              <el-descriptions title="" :column="2"  direction="vertical" border>
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
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { usePiniaStore } from '../store/pinia.js'
import axios from 'axios'
import { ElLoading } from 'element-plus'
import i18n from '../i18n.js'
// i18n
const { t } = i18n.global

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
    isLoading.value = ElLoading.service({
      lock: true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)',
    })
    await store.fetchCommentsApi()
    apiCommentFilter.value = store.apiComments.filter(e => e.id === routeindex.value)
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


::v-deep .el-descriptions {
  padding: 20px;
  width: 100%;
}
</style>
