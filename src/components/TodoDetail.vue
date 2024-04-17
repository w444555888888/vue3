<!-- TodoDetail.vue -->
<template>
  <div>
    <div class="container">
      <div v-if="currentPercentage < 100" class="demo-progress">
        <el-progress
          :text-inside="true"
          :stroke-width="25"
          :percentage="currentPercentage"
          color="gray"
        ></el-progress>
      </div>
      <div v-else class="common-layout">
        <el-container>
          <el-container class="centered-container">
            <el-header class="table-header">
              <button @click="navigateToHome">回首頁</button>
            </el-header>
            <el-main>
              <div class="demo-collapse">
                <el-collapse>
                  <el-radio-group
                    v-model="workRadio"
                    size="small"
                    class="workRadio"
                    text-color="white"
                    fill="black"
                  >
                    <el-radio-button label="優先度高" value="優先度高" />
                    <el-radio-button label="優先度中" value="優先度中" />
                    <el-radio-button label="優先度低" value="優先度低" />
                  </el-radio-group>
                  <div>
                    <span class="text">待辦事項:{{ workRadio }}</span>
                    <input class="detailOne" @change="storeTheTodoList" />
                    {{ storeTheTodoListArray }}
                  </div>
                </el-collapse>
              </div>
            </el-main>
            <router-link :to="`/todo/${routeindex}/children`"
              ><button>美金台幣轉換路由</button></router-link
            >
            <el-footer>
              <router-view name="A"></router-view>
            </el-footer>
          </el-container>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, defineProps, computed, toRefs, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { usePiniaStore } from '../store/pinia.js'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'


const workRadio = ref('優先度高')
const inputText = ref('')
const storeTheTodoListArray = ref("")
// modal 新增數據
const carModel = ref('')
const raceType = ref('')
// 處理分頁currentPage
const currentPage = ref(1)
// 滾動條
const currentPercentage = ref(0)
// 使用路由router
const route = useRoute()
// 拿到params
const routeindex = ref(route.params.index)


// pinia
const store = usePiniaStore()
// 因pinia解構後會有響應式跑掉的問題，須加上toRefs
const { apiComments } = store


// 儲存待辦事項
function storeTheTodoList () {
  storeTheTodoListArray.value 
}



//router到首頁
const appRouter = useRouter()
function navigateToHome () {
  appRouter.push({
    name: 'TodoList'
  })
}





onMounted(() => {
  const interval = setInterval(() => {
    if (currentPercentage.value < 100) {
      currentPercentage.value += 50
    } else {
      clearInterval(interval)
      hundredPercentage()
    }
  }, 1000)
})



onBeforeMount(() => {
  store.fetchCommentsApi()
});
</script>

<style scoped>
span {
  margin-right: 10px;
  font-size: 12px;
  margin-bottom: 20px;
}

.text {
  margin-right: 10px;
  font-size: 12px;
  line-height: 40px;
}

.inputone {
  margin: 4px;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.demo-progress .el-progress--line {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  width: 350px;
}

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.table-header {
  margin-right: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.gray {
  margin-right: 20px;
  color: rgb(255, 255, 255);
  background-color: rgb(161, 161, 161);
  text-decoration: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 17px;
}

.gray:hover {
  color: rgb(255, 255, 255);
  background-color: rgb(67, 67, 67);
}

input,
.detailOne {
  font-size: 1.125rem;
  padding: 1rem 2rem;
  background-color: #fff;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  width: 500px;
  word-wrap: break-word;
  outline: none;
}

input:focus,
input:valid {
  color: black;
  border: 4px solid #9f9f9f;
}

input:not(:focus) {
  border: 4px solid #e3e2e2;
}

.detailOne {
  white-space: pre-wrap;
  border: 4px solid #9f9f9f;
  height: 70px;
}

.el-collapse {
  --el-collapse-border-color: var(--el-border-color-lighter);
  --el-collapse-header-height: 48px;
  --el-collapse-header-bg-color: var(--el-fill-color-blank);
  --el-collapse-header-text-color: #050505;
  --el-collapse-header-font-size: 12px;
  --el-collapse-content-bg-color: var(--el-fill-color-blank);
  --el-collapse-content-font-size: 12px;
  --el-collapse-content-text-color: var(--el-text-color-primary);
  border-top: 1px solid var(--el-collapse-border-color);
  border-bottom: 1px solid var(--el-collapse-border-color);
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

.workRadio {
  margin-bottom: 5px;
}

button {
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

button:hover {
  background-color: rgb(172, 171, 171);
}
</style>
