<!--
 * @Author: w444555888 w444555888@yahoo.com.tw
 * @Date: 2024-04-02 12:13:18
 * @LastEditors: w444555888 w444555888@yahoo.com.tw
 * @LastEditTime: 2024-05-12 22:05:22
 * @FilePath: \vue3\src\components\TodoList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- TodoList -->
<template>
  <div id="TodoListPage">
    <nav>
      <select v-model="locale18n" @change="changeLocale">
        <option value="en">en-US</option>
        <option value="zh">zh-TW</option>
      </select>
    </nav>

    <h1>{{ t("titleFirst") }}</h1>
    <form @click="editToForm">
      <button>{{ t("searchButton") }}</button>
    </form>

    <ul>
      <li v-for="(todo, index) in pagesTodos" :key="todo.id">
        <span :class="todo.done ? 'done' : 'pending'">
          <div class="li-data" v-if="!todo.editing">
            {{ todo.todoTitle }}
          </div>
        </span>
        <div class="li-btn">
          <button @click="dispatchRemoveTodo(todo.id)">
            {{ t("delete") }}
          </button>
          <button @click="navigateToDetail(todo.id)">{{ t("detail") }}</button>
          <button @click="editToForm(todo.id)">{{ t("edit") }}</button>
        </div>
      </li>
    </ul>
    <h4 v-if="store.todos.length === 0">No data</h4>

    <br />
    <!-- pages -->
    <div class="pagination-container">
      <el-pagination v-model:currentPage="currentPage" :total="totalItems" :page-size="pageSize"
        @current-change="handlePageChange" background small />
    </div>
  </div>

  <div>
    <el-drawer v-model="drawer" title="新增 Todo" :with-header="false" size="50%">
      <el-form ref="todoFormRef" :model="form" label-width="80px" style="justify-content: flex-start">
        <el-form-item label="日期" required>
          <el-date-picker v-model="form.datePicker" type="datetime" placeholder="Select date and time" />
        </el-form-item>
        <el-form-item label="標題" required>
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="完成狀態" required>
          <el-radio v-model="form.done" :label="false">未完成</el-radio>
          <el-radio v-model="form.done" :label="true">完成</el-radio>
        </el-form-item>
        <el-form-item label="內容" required>
          <el-input v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitTodo">提交</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>


<script setup>
import { onBeforeMount, onMounted, computed, ref, reactive, toRefs, watch, onUnmounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { usePiniaStore } from '../store/pinia'
import i18n from '../i18n.js'
import { v4 as uuidv4 } from 'uuid'
import { ElNotification } from 'element-plus'

// pinia
const store = usePiniaStore()

const todoFormRef = ref('')
const drawer = ref(false)
const form = ref({
  id: '',
  title: '',
  content: '',
  done: false,
  datePicker: '',
})


function submitTodo() {
  const { id, title, content, done, datePicker } = form.value
  if (title.trim() !== '' && content.trim() !== '' && done !== '') {
    // 有id代表是編輯
    if (id) {
      store.editUpdateTodo(id, { id, todoTitle: title.trim(), todoContent: content.trim(), done: done, datePicker: datePicker })
    } else {
      store.addTodo({
        id: uuidv4(),
        done: done,
        todoTitle: title.trim(),
        todoContent: content.trim(),
        datePicker: datePicker
      })
    }

    form.value.id = ''
    form.value.done = false
    form.value.title = ''
    form.value.content = ''
    form.value.datePicker = ''
    drawer.value = false
  }
}


function editToForm(id) {
  // id判斷是新增還是編輯
  drawer.value = true
  if(id){
  const todo = store.editTodo(id)
  form.value.id = id
  form.value.done = todo.done
  form.value.title = todo.todoTitle
  form.value.content = todo.todoContent
  form.value.datePicker = todo.datePicker
  }
}



const currentPage = ref(1)
const locale18n = ref(i18n.global.locale)


const pageSize = 10
const totalItems = computed(() => store.todos.length)
const pagesTodos = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize
  const endIndex = startIndex + pageSize
  return store.todos.slice(startIndex, endIndex)
})

const handlePageChange = (newPage) => {
  currentPage.value = newPage
}


// i18n語系  
const { t } = i18n.global
const changeLocale = () => {
  store.locale = i18n.global.locale.value
}


function dispatchAddTodo() {
  store.addTodo()
}

function dispatchRemoveTodo(todoId) {
  store.removeTodo(todoId)
}

function dispatchStartEditing(todoId) {
  store.startEditing(todoId)
}

function dispatchStopEditing(todoId) {
  store.stopEditing(todoId)
}

function dispatchtodoStatus(todoId, boolen) {
  store.todoStatus(todoId, boolen)
}




// 使用路由useRouter
const appRouter = useRouter()
function navigateToDetail(id) {
  appRouter.push({
    name: 'TodoDetail',
    params: { index: id },
  })
}



onBeforeMount(() => {
  store.initializeTodos()
  store.fetchCommentsApi()
})


onMounted(() => {

})

onUnmounted(() => {

});

</script>


<style scoped lang="scss">
$border: 2px solid rgba(219, 219, 219, 0.4);
$size1: 6px;
$size2: 12px;
$size3: 18px;
$size4: 24px;
$size5: 48px;
$backgroundColor: #27292d;
$textColor: white;
$primaryColor: #a0a4d9;
$secondTextColor: #1f2023;

#TodoListPage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  background-color: rgb(245, 245, 245);
  padding: 30px;
  border-radius: 8px;

  nav {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
  }

  select,
  option {
    background-color: rgb(22, 22, 22);
    color: white;
    border-radius: 5px;
  }

  h1 {
    font-weight: bold;
    font-size: 28px;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 5px 0px;

    input {
      font-size: 1.125rem;
      padding: 1rem 1.5rem;
      background-color: #fff;
      border-radius: 0.5rem;
      margin-bottom: 1.5rem;
    }

    button {
      height: $size5;
      box-shadow: none;
      outline: none;
      padding-left: $size2;
      padding-right: $size2;
      border-radius: $size1;
      font-size: 18px;
      margin-top: $size1;
      margin-bottom: $size2;
    }
  }

  button {
    cursor: pointer;
    border: 1px solid $primaryColor;
    color: $secondTextColor;
    font-weight: bold;
    outline: none;
    border-radius: $size1;
    background-color: #7e7e7e;
  }

  button:hover {
    background-color: rgb(172, 171, 171);
  }

  h2 {
    font-size: 22px;
    border-bottom: $border;
    padding-bottom: $size1;
  }

  ul {
    padding: 10px;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: $border;
      padding: $size2 22px;
      border-radius: $size1;
      margin-bottom: $size2;

      span {
        cursor: pointer;
        display: flex;
      }

      .li-data {
        margin: 2px 15px;
        flex-shrink: 0;
      }

      input {
        margin: 2px 2px;
        flex-shrink: 0;
      }

      .li-btn {
        margin: 0 1px;
        flex-shrink: 0;
      }

      button {
        font-size: $size2;
        padding: $size1;
        margin: 0 6px;
      }
    }
  }

  h4 {
    text-align: center;
    opacity: 0.5;
    margin: 0;
  }

  input[type="text"] {
    display: block;
    width: 95%;
    margin-bottom: 10px;
    border-radius: $size1;
    padding: 10px;
  }

  .pagination-container {
    display: flex;
    justify-content: center;
  }

  .modal-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .modal-scroll-view {
    overflow-y: auto;
  }

  .modal {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
  }

  .modal-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
}
</style>