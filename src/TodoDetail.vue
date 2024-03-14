<!-- TodoDetail.vue -->
<template>
  <div>
    <div class="container">
      <div v-if="currentPercentage < 100" class="demo-progress">
        <el-progress :text-inside="true" :stroke-width="25" :percentage="currentPercentage"
          status="success"></el-progress>
      </div>
      <div v-else class="common-layout">
        <el-container>
          <el-aside width="300px">
            <el-scrollbar>
              <el-menu :default-openeds="['1','2','3']">
                <el-sub-menu index="1">
                  <template #title>
                    <el-icon>
                      <message />
                    </el-icon>Navigator One
                  </template>
                  <el-menu-item-group>
                    <template #title>Group 1</template>
                    <el-menu-item index="1-1">Option 1</el-menu-item>
                    <el-menu-item index="1-2">Option 2</el-menu-item>
                  </el-menu-item-group>
                  <el-menu-item-group title="Group 2">
                    <el-menu-item index="1-3">Option 3</el-menu-item>
                  </el-menu-item-group>
                  <el-sub-menu index="1-4">
                    <template #title>Option4</template>
                    <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
                  </el-sub-menu>
                </el-sub-menu>
                <el-sub-menu index="2">
                  <template #title>
                    <el-icon><icon-menu /></el-icon>Navigator Two
                  </template>
                  <el-menu-item-group>
                    <template #title>Group 1</template>
                    <el-menu-item index="2-1">Option 1</el-menu-item>
                    <el-menu-item index="2-2">Option 2</el-menu-item>
                  </el-menu-item-group>
                  <el-menu-item-group title="Group 2">
                    <el-menu-item index="2-3">Option 3</el-menu-item>
                  </el-menu-item-group>
                  <el-sub-menu index="2-4">
                    <template #title>Option 4</template>
                    <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
                  </el-sub-menu>
                </el-sub-menu>
                <el-sub-menu index="3">
                  <template #title>
                    <el-icon>
                      <setting />
                    </el-icon>Navigator Three
                  </template>
                  <el-menu-item-group>
                    <template #title>Group 1</template>
                    <el-menu-item index="3-1">Option 1</el-menu-item>
                    <el-menu-item index="3-2">Option 2</el-menu-item>
                  </el-menu-item-group>
                  <el-menu-item-group title="Group 2">
                    <el-menu-item index="3-3">Option 3</el-menu-item>
                  </el-menu-item-group>
                  <el-sub-menu index="3-4">
                    <template #title>Option 4</template>
                    <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
                  </el-sub-menu>
                </el-sub-menu>
              </el-menu>
            </el-scrollbar>
          </el-aside>
          <el-container class="centered-container">
            <el-header class="table-header">
              <el-button class="purple" @click="navigateToHome">首頁</el-button>
              <h2>TodoDetail.vue 路由{{ routeindex }}</h2>
            </el-header>
            <el-main>
              <div class="demo-collapse">
                <el-collapse v-model="activeNames" @change="handleChange">
                  <el-collapse-item title="Consistency" name="1" v-if="currentPage === 1">
                    <div>
                      Consistent with real life: in line with the process and logic of real
                      life, and comply with languages and habits that the users are used to;
                      Consistent with real life: in line with the process and logic of real
                      life, and comply with languages and habits that the users are used to;
                      Consistent with real life: in line with the process and logic of real
                      life, and comply with languages and habits that the users are used to;
                      Consistent with real life: in line with the process and logic of real
                      life, and comply with languages and habits that the users are used to;
                    </div>
                    <div>
                      Consistent within interface: all elements should be consistent, such
                      as: design style, icons and texts, position of elements, etc.
                      Consistent with real life: in line with the process and logic of real
                      life, and comply with languages and habits that the users are used to;
                      Consistent with real life: in line with the process and logic of real
                      life, and comply with languages and habits that the users are used to;
                      Consistent with real life: in line with the process and logic of real
                      life, and comply with languages and habits that the users are used to;
                    </div>
                  </el-collapse-item>
                  <el-collapse-item title="Feedback" name="2" v-if="currentPage === 2">
                    <div>
                      Operation feedback: enable the users to clearly perceive their
                      operations by style updates and interactive effects;
                      Operation feedback: enable the users to clearly perceive their
                      operations by style updates and interactive effects;
                      Operation feedback: enable the users to clearly perceive their
                      operations by style updates and interactive effects;
                    </div>
                    <div>
                      Visual feedback: reflect current state by updating or rearranging
                      elements of the page.
                      Visual feedback: reflect current state by updating or rearranging
                      elements of the page.
                      Visual feedback: reflect current state by updating or rearranging
                      elements of the page.
                      Visual feedback: reflect current state by updating or rearranging
                      elements of the page.
                    </div>
                  </el-collapse-item>
                  <el-collapse-item title="Efficiency" name="3" v-if="currentPage === 3">
                    <div>
                      Simplify the process: keep operating process simple and intuitive;
                      Simplify the process: keep operating process simple and intuitive;
                      Simplify the process: keep operating process simple and intuitive;
                      Simplify the process: keep operating process simple and intuitive;
                    </div>
                    <div>
                      Definite and clear: enunciate your intentions clearly so that the
                      users can quickly understand and make decisions;
                      Definite and clear: enunciate your intentions clearly so that the
                      users can quickly understand and make decisions;
                      Definite and clear: enunciate your intentions clearly so that the
                      users can quickly understand and make decisions;
                      Definite and clear: enunciate your intentions clearly so that the
                      users can quickly understand and make decisions;
                    </div>
                    <div>
                      Easy to identify: the interface should be straightforward, which helps
                      the users to identify and frees them from memorizing and recalling.
                      Easy to identify: the interface should be straightforward, which helps
                      the users to identify and frees them from memorizing and recalling.
                      Easy to identify: the interface should be straightforward, which helps
                      the users to identify and frees them from memorizing and recalling.
                      Easy to identify: the interface should be straightforward, which helps
                      the users to identify and frees them from memorizing and recalling.
                    </div>
                  </el-collapse-item>
                  <el-collapse-item title="Controllability" name="4" v-if="currentPage === 4">
                    <div>
                      Decision making: giving advices about operations is acceptable, but do
                      not make decisions for the users;
                      Decision making: giving advices about operations is acceptable, but do
                      not make decisions for the users;
                      Decision making: giving advices about operations is acceptable, but do
                      not make decisions for the users;
                      Decision making: giving advices about operations is acceptable, but do
                      not make decisions for the users;
                    </div>
                    <div>
                      Controlled consequences: users should be granted the freedom to
                      operate, including canceling, aborting or terminating current
                      operation.
                      Controlled consequences: users should be granted the freedom to
                      operate, including canceling, aborting or terminating current
                      operation.
                      Controlled consequences: users should be granted the freedom to
                      operate, including canceling, aborting or terminating current
                      operation.
                    </div>
                  </el-collapse-item>
                  <el-collapse-item title="Ukrainian" name="5" v-if="currentPage === 5">
                    <div>
                      Volodymyr Zelensky says 31,000 Ukrainian soldiers have been killed during Russia's full-scale
                      invasion.
                      Volodymyr Zelensky says 31,000 Ukrainian soldiers have been killed during Russia's full-scale
                      invasion.
                      Volodymyr Zelensky says 31,000 Ukrainian soldiers have been killed during Russia's full-scale
                      invasion.
                    </div>
                    <div>
                      Speaking about the wider losses in the war, Mr Zelensky said tens of thousands of civilians had
                      died
                      in the areas of Ukraine occupied by Russia but the true number was unknown.
                      Speaking about the wider losses in the war, Mr Zelensky said tens of thousands of civilians had
                      died
                      in the areas of Ukraine occupied by Russia but the true number was unknown.
                      Speaking about the wider losses in the war, Mr Zelensky said tens of thousands of civilians had
                      died
                      in the areas of Ukraine occupied by Russia but the true number was unknown.
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
              <el-button plain @click="dialogTableVisible = true">
                賽事記錄
              </el-button>
              <el-dialog v-model="dialogTableVisible" title="賽事記錄" width="800">
                <el-table :data="apiComments" ref="tableRef" highlight-current-row>
                  <el-table-column property="id" label="ID" width="150" />
                  <el-table-column property="body" label="車型" width="200" />
                  <el-table-column property="kind" label="賽事種類" />
                  <el-table-column label="刪除">
                    <template v-slot="scope">
                      <el-button type="info" @click="deleteNewData(scope.row.id)">刪除</el-button>
                    </template>
                  </el-table-column>
                </el-table>

                <span>
                  <label class="inputone">車型:</label>
                  <el-input v-model="carModel" placeholder="carModel" class="inputone w-10 m-2" size="small"
                    style="width: 100px;" />
                </span>
                <span>
                  <label class="inputone">賽事種類:</label>
                  <el-input v-model="raceType" placeholder="raceType" class="inputone w-10 m-2" size="small"
                    style="width: 100px;" />
                </span>


                <div style="margin-top: 20px">
                  <el-button type="success" id="btnClick" @click="addNewData">新增資料</el-button>
                  <el-button @click="setCurrent(apiComments[0])">選取第幾列</el-button>
                  <el-button @click="setCurrent()">清除標記</el-button>
                </div>
              </el-dialog>

            </el-main>
            <el-footer>
              <el-pagination small background layout="prev, pager, next ,jumper" :total="50" class="mt-4"
                @current-change="handlePageChange" />
            </el-footer>
          </el-container>
        </el-container>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, defineProps, computed, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { piniaStore } from './pinia'
import axios from 'axios';


// modal 新增數據
const carModel = ref('')
const raceType = ref('')

// pinia
const store = piniaStore();
// 因pinia解構後會有響應式跑掉的問題，須加上toRefs
const { apiComments } = toRefs(store)
const activeNames = ref([])
const handleChange = (val) => {
  console.log(val)
}


// 使用路由router
const route = useRoute();
const routeindex = ref(route.params.index);


// 處理分頁currentPage
const currentPage = ref(1);
const handlePageChange = (newPage) => {
  currentPage.value = newPage;
};


// 滾動條
const currentPercentage = ref(0);


// 滾動條到100展開摺疊面板
function hundredPercentage() {
  if (currentPercentage.value == 100) {
    activeNames.value = ['1', '2', '3', '4', '5']
  }
}


// modal
const dialogTableVisible = ref(false);
const tableRef = ref(null);
const setCurrent = (row) => {
  tableRef.value.setCurrentRow(row)
}


//router到首頁
const appRouter = useRouter();
function navigateToHome() {
  appRouter.push({
    name: 'TodoList'
  });
}

function addNewData() {
  if (carModel.value.trim() === '' || raceType.value.trim() === '') {
    return
  };

  const newData = {
    id: String(store.apiComments.length + 1),
    body: carModel.value,
    kind: raceType.value
  };

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
  try {
    await axios.delete(`http://localhost:3000/comments/${id}`);
    store.apiComments = store.apiComments.filter((e) => e.id !== id);
  } catch (error) {
    console.error('error', error);
  }
}



onMounted(() => {
  const interval = setInterval(() => {
    if (currentPercentage.value < 100) {
      currentPercentage.value += 50;
    } else {
      clearInterval(interval);
      hundredPercentage();
    }
  }, 1000);
})



onBeforeMount(() => {
  store.fetchCommentsApi();
});
</script>

<style scoped>
span {
  margin-right: 10px;
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

.purple {
  margin-right: 20px;
  color: rgb(255, 255, 255);
  background-color: rgb(111, 111, 252);
  text-decoration: none;
  cursor: pointer;
}
</style>
