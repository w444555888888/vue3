<!-- TodoDetail.vue -->
<template>
  <div>
    <div class="container">
      <div v-if="currentPercentage < 100" class="demo-progress">
        <el-progress :text-inside="true" :stroke-width="25" :percentage="currentPercentage" color="gray"></el-progress>
      </div>
      <div v-else class="common-layout">
        <el-container>
          <el-container class="centered-container">
            <el-header class="table-header">

              <el-button class="gray" @click="navigateToHome"> <el-icon>
                  <HomeFilled />
                </el-icon> 回首頁</el-button>
            </el-header>
            <el-main>
              <div class="demo-collapse">
                <el-collapse v-model="activeNames" @change="handleChange">
                  <el-collapse-item title="工作事項" name="1" v-if="currentPage === 1">
                    <el-radio-group v-model="workRadio" size="small" class="workRadio" text-color="white" fill="black">
                      <el-radio-button label="優先度高" value="優先度高" />
                      <el-radio-button label="優先度中" value="優先度中" />
                      <el-radio-button label="優先度低" value="優先度低" />
                    </el-radio-group>
                    <input type="text" v-model="inputText" />
                    <div>
                      <span class="text">待辦事項:{{ workRadio }}</span>
                      <div class="detailOne">
                        {{ storeTheTodoListArray }}
                      </div>
                      <button @click="storeTheTodoList">儲存待辦事項</button>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
              <el-button plain @click="dialogTableVisible = true">
                歷程記錄
              </el-button>
              <el-dialog v-model="dialogTableVisible" title="歷程記錄" width="800">
                <el-table :data="apiComments" ref="tableRef" highlight-current-row>
                  <el-table-column property="id" label="ID" width="150" />
                  <el-table-column property="body" label="事件" width="200" />
                  <el-table-column property="kind" label="種類" />
                  <el-table-column label="刪除">
                    <template v-slot="scope">
                      <el-button type="info" @click="deleteNewData(scope.row.id)">刪除</el-button>
                    </template>
                  </el-table-column>
                </el-table>

                <span>
                  <label class="inputone">事件:</label>
                  <el-input v-model="carModel" placeholder="carModel" class="inputone w-10 m-2" size="small"
                    style="width: 100px" />
                </span>
                <span>
                  <label class="inputone">種類:</label>
                  <el-input v-model="raceType" placeholder="raceType" class="inputone w-10 m-2" size="small"
                    style="width: 100px" />
                </span>

                <div style="margin-top: 20px">
                  <el-button type="success" id="btnClick" @click="addNewData">新增資料</el-button>
                  <el-button @click="setCurrent(apiComments[0])">選取第一列</el-button>
                  <el-button @click="setCurrent()">清除標記</el-button>
                </div>
              </el-dialog>
            </el-main>
            <el-footer>
              <br>
              <h1>台幣美金轉換</h1>
              <div>
                <label for="twdInput">台幣：</label>
                <input id="twdInput" type="number" v-model="twd">
              </div>
              <div>
                <label for="usdInput">$美金：</label>
                <input id="usdInput" type="number" v-model="usd">
              </div>
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
// 雙向監聽案例
const twd = ref(0);
const usd = ref(0);
watch(twd, (newValue) => {
  usd.value = newValue / 30;
});
watch(usd, (newValue) => {
  twd.value = newValue * 30;
});



const workRadio = ref('優先度高')
const inputText = ref('')
const storeTheTodoListArray = ref("")

// modal 新增數據
const carModel = ref('')
const raceType = ref('')

// pinia
const store = usePiniaStore()
// 因pinia解構後會有響應式跑掉的問題，須加上toRefs
const { apiComments } = store

const activeNames = ref([])
const handleChange = (val) => {
  console.log(val)
}


// 使用路由router
const route = useRoute()
const routeindex = ref(route.params.index)


// 處理分頁currentPage
const currentPage = ref(1)
const handlePageChange = (newPage) => {
  currentPage.value = newPage
}


// 滾動條
const currentPercentage = ref(0)


// 滾動條到100展開摺疊面板
function hundredPercentage() {
  if (currentPercentage.value == 100) {
    activeNames.value = ['1']
  }
}

// 儲存待辦事項
function storeTheTodoList() {
  storeTheTodoListArray.value += inputText.value;
  inputText.value = '';
}


// modal
const dialogTableVisible = ref(false)
const tableRef = ref(null)
const setCurrent = (row) => {
  tableRef.value.setCurrentRow(row)
}


//router到首頁
const appRouter = useRouter()
function navigateToHome() {
  appRouter.push({
    name: 'TodoList'
  })
}

function addNewData() {
  if (carModel.value.trim() === '' || raceType.value.trim() === '') {
    return
  };

  const newData = {
    id: uuidv4(),
    body: carModel.value,
    kind: raceType.value
  }

  axios.post('http://localhost:3000/comments', newData)
    .then((res) => {
      store.apiComments = [...store.apiComments, res.data]
    })
    .catch((error) => {
      console.log(error)
    })

  carModel.value = ''
  raceType.value = ''

}


async function deleteNewData(id) {
  console.log(id, 'iddddd')
  try {
    await axios.delete(`http://localhost:3000/comments/${id}`)
    store.apiComments = store.apiComments.filter((e) => e.id !== id)
  } catch (error) {
    console.error('error', error)
  }
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
</style>
