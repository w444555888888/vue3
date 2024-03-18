<!-- TodoList -->
<template>
  <div id="indexPage">
    <nav>
      <select v-model="locale18n" @change="changeLocale">
        <option value="en">en-US</option>
        <option value="zh">zh-TW</option>
      </select>
    </nav>
    <h1>{{ t("titleFirst") }}</h1>
    <form @submit.prevent="dispatchAddTodo">
      <input v-model.trim="store.newTodo" name="newTodo" autocomplete="off" />
      <button>{{ t("searchButton") }}</button>
    </form>

    <h3>{{ t("titleSecond") }}</h3>
    <ul>
      <li v-for="(todo, index) in pagesTodos" :key="index">
        <span :class="{ done: todo.done }">
          <span>
            <input type="radio" :checked="!todo.done" :id="`pending${index}`" :name="`done${index}`" />
            <label :for="`pending${index}`">{{ t("undone") }}</label>
            <input type="radio" :checked="todo.done" :id="`done${index}`" :name="`done${index}`" />
            <label :for="`done${index}`">{{ t("done") }}</label>
          </span>

          <div class="li-data" v-if="!todo.editing" @dblclick="dispatchStartEditing(todo.id)">
            {{ todo.content }}
          </div>
          <input v-else type="text" v-model="store.editedContent" @blur="dispatchStopEditing(todo.id)"
            @keyup.enter="dispatchStopEditing(index)" />
        </span>
        <div class="li-btn">
          <button @click="dispatchRemoveTodo(todo.id)">{{ t("delete") }}</button>
          <button @click="navigateToDetail(todo.id)">{{ t("detail") }}</button>
        </div>
      </li>
    </ul>
    <h4 v-if="store.todos.length === 0">No data</h4>

    <br>
    <div>
      <input type="text" v-model="message" />
      <button type="button" @click="sendMessage">{{ t("postBoard") }}</button>
    </div>

    <br>
    <div class="pagination-container">
      <el-pagination v-model:currentPage="currentPage" :total="totalItems" :page-size="pageSize"
        @current-change="handlePageChange" background small />
    </div>

  </div>


</template>


<script setup>
import { onBeforeMount, onMounted, computed, ref, toRefs, watch, onUnmounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { usePiniaStore } from '../store/pinia'
import i18n from '../i18n.js'
import { ElNotification } from 'element-plus'


//留言板
const message = ref('')
const sendMessage = () => {
  if (message.value.trim() !== '') {
    axios.post('http://localhost:3000/messages', { content: message.value.trim() })
      .then(response => {
        message.value = ''
      }, ElNotification({
        title: 'Success',
        message: 'send message success',
        type: 'success',
      }))
      .catch(error => {
        ElNotification({
          title: 'Error',
          message: 'error message',
          type: 'error',
        })
      })
  } else {
    ElNotification({
      title: 'Warning',
      message: 'Please enter message content',
      type: 'warning',
    })
  }
};

// pinia
const store = usePiniaStore();
const currentPage = ref(1);
const pageSize = 5;
const totalItems = computed(() => store.todos.length);
const pagesTodos = computed(() => {
  const startIndex = (currentPage.value-1) * pageSize;
  const endIndex = startIndex + pageSize;
  return store.todos.slice(startIndex, endIndex);
});

const handlePageChange = (newPage) => {
  currentPage.value = newPage;
};


// i18n語系  
const { t } = i18n.global;
const locale18n = ref(i18n.global.locale);
const changeLocale = () => {
  store.locale = i18n.global.locale.value
}


function dispatchAddTodo() {
  store.addTodo();
}

function dispatchRemoveTodo(todoId) {
  store.removeTodo(todoId);
}

function dispatchStartEditing(todoId) {
  store.startEditing(todoId);
}

function dispatchStopEditing(todoId) {
  store.stopEditing(todoId);
}

// 把父組件ref開放傳遞到子組件
// 使用路由useRouter
const appRouter = useRouter();

function navigateToDetail(index) {
  appRouter.push({
    name: 'TodoDetail',
    params: { index: index },
    query: { index: index }
  });
}



onBeforeMount(() => {
  store.initializeTodos();
  store.fetchCommentsApi();
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

#indexPage {
  background-color: rgb(245, 245, 245);
  padding: 20px;
  border-radius: 8px;

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

}
</style>