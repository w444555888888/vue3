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
            <el-radio-group v-model="RadioLevel" size="medium" class="RadioLevel" text-color="white" fill="black"
              type="info">
              <el-radio-button label="優先度高" value="優先度高" />
              <el-radio-button label="優先度中" value="優先度中" />
              <el-radio-button label="優先度低" value="優先度低" />
            </el-radio-group>
            <div>
              <el-input v-model="TodoDetailText" style="width: 500px" :rows="20" type="textarea" class="custom-textarea"
                input-style="color:black"></el-input>
            </div>
          </el-main>
          <el-footer>
            <el-button @click="storeTheTodoList">儲存</el-button>
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

// textarea
const RadioLevel = ref('優先度高')
const TodoDetailText = ref('')

// 使用路由router 路由params
const route = useRoute()
const routeindex = ref(route.params.index)

const store = usePiniaStore()
let existId = store.todos.find(todo => todo.id === id)


// 儲存待辦事項
function storeTheTodoList() {
  axios.get('http://localhost:3000/comments')
    .then(response => {
      const data = response.data
      const ExistId = data.some(item => item.id === routeindex.value)
      if (ExistId) {
        axios.put(`http://localhost:3000/comments/${routeindex.value}`, { text: TodoDetailText.value })
          .then(response => {
            ElNotification({
              title: 'Success',
              message: 'Update Success',
              type: 'success',
            })
          })
          .catch(error => {
            ElNotification({
              title: 'Error',
              message: 'Update Fail',
              type: 'error',
            })
          })
      } else {
        axios.post('http://localhost:3000/comments', { id: routeindex.value, text: TodoDetailText.value })
          .then(response => {
            if (response.status === 201) {
              ElNotification({
                title: 'Success',
                message: 'Store Success',
                type: 'success',
              })
            }
          })
          .catch(error => {
            ElNotification({
              title: 'Error',
              message: 'Store Fail',
              type: 'error',
            })
          })
      }
    })
    .catch(error => {
      console.error('Error', error)
    })
}

//router到首頁
const appRouter = useRouter()
function navigateToHome() {
  appRouter.push({
    name: 'TodoList'
  })
}



onMounted(async () => {
  await store.fetchCommentsApi()
  let apiCommentFilter = store.apiComments.filter(e => e.id === routeindex.value)
  TodoDetailText.value = apiCommentFilter[0].text
})

onBeforeMount(() => {

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

.custom-textarea {
  --el-input-focus-border-color: rgb(161, 161, 161);
  border: 2px solid #e3e2e2;
  border-radius: 5px;
  font-size: 15px;
}



::v-deep .el-radio-button__inner:hover {
  color: rgb(161, 161, 161);
}
</style>
