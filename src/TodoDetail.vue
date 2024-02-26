<!-- TodoDetail.vue -->
<template>
  <div>
    <div class="container">
      <div v-if="currentPercentage < 100" class="demo-progress">
        <el-progress :text-inside="true" :stroke-width="25" :percentage="currentPercentage"
          status="success"></el-progress>
      </div>
      <div v-else class="common-layout">
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
                  </div>
                  <div>
                    Consistent within interface: all elements should be consistent, such
                    as: design style, icons and texts, position of elements, etc.
                  </div>
                </el-collapse-item>
                <el-collapse-item title="Feedback" name="2" v-if="currentPage === 2">
                  <div>
                    Operation feedback: enable the users to clearly perceive their
                    operations by style updates and interactive effects;
                  </div>
                  <div>
                    Visual feedback: reflect current state by updating or rearranging
                    elements of the page.
                  </div>
                </el-collapse-item>
                <el-collapse-item title="Efficiency" name="3" v-if="currentPage === 3">
                  <div>
                    Simplify the process: keep operating process simple and intuitive;
                  </div>
                  <div>
                    Definite and clear: enunciate your intentions clearly so that the
                    users can quickly understand and make decisions;
                  </div>
                  <div>
                    Easy to identify: the interface should be straightforward, which helps
                    the users to identify and frees them from memorizing and recalling.
                  </div>
                </el-collapse-item>
                <el-collapse-item title="Controllability" name="4" v-if="currentPage === 4">
                  <div>
                    Decision making: giving advices about operations is acceptable, but do
                    not make decisions for the users;
                  </div>
                  <div>
                    Controlled consequences: users should be granted the freedom to
                    operate, including canceling, aborting or terminating current
                    operation.
                  </div>
                </el-collapse-item>
                <el-collapse-item title="Ukrainian" name="5" v-if="currentPage === 5">
                  <div>
                    Volodymyr Zelensky says 31,000 Ukrainian soldiers have been killed during Russia's full-scale
                    invasion.
                  </div>
                  <div>
                    Speaking about the wider losses in the war, Mr Zelensky said tens of thousands of civilians had died
                    in the areas of Ukraine occupied by Russia but the true number was unknown.
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
            <el-button plain @click="dialogTableVisible = true">
              購物紀錄
            </el-button>
            <el-dialog v-model="dialogTableVisible" title="蝦皮購物紀錄" width="800">
              <el-table :data="gridData" ref="tableRef" highlight-current-row>
                <el-table-column property="date" label="Date" width="150" />
                <el-table-column property="name" label="Name" width="200" />
                <el-table-column property="address" label="Address" />
              </el-table>
              <div style="margin-top: 20px">
                <el-button @click="setCurrent(gridData[1])">選取第一列</el-button>
                <el-button @click="setCurrent()">清除標記</el-button>
              </div>
            </el-dialog>
          </el-main>
          <el-footer>
            <el-pagination small background layout="prev, pager, next ,jumper" :total="50" class="mt-4"
              @current-change="handlePageChange" />
          </el-footer>
        </el-container>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, defineProps } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
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
const currentPercentage = ref(0)

// 滾動條到100展開摺疊面板
function hundredPercentage() {
  if (currentPercentage.value == 100) {
    activeNames.value = ['1', '2', '3', '4', '5']
  }
}

// modal
const dialogTableVisible = ref(false)
const tableRef = ref(null)
const setCurrent = (row) => {
  tableRef.value.setCurrentRow(row)
}
const gridData = [
  {
    date: '2016-05-02',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
  {
    date: '2016-05-04',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
  {
    date: '2016-05-01',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
  {
    date: '2016-05-03',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
]


//router到首頁
const appRouter = useRouter();
function navigateToHome() {
  appRouter.push({
    name: 'TodoList'
  });
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
</script>

<style scoped>
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
