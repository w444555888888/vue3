<!--
 * @Author: w444555888 w444555888@yahoo.com.tw
 * @Date: 2024-04-02 12:13:18
 * @LastEditors: w444555888 w444555888@yahoo.com.tw
 * @LastEditTime: 2024-04-07 14:32:09
 * @FilePath: \vue3\src\components\TodoList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
            <input
              type="radio"
              :checked="!todo.done"
              :id="`pending${index}`"
              :name="`done${index}`"
            />
            <label :for="`pending${index}`">{{ t("undone") }}</label>
            <input
              type="radio"
              :checked="todo.done"
              :id="`done${index}`"
              :name="`done${index}`"
            />
            <label :for="`done${index}`">{{ t("done") }}</label>
          </span>

          <div
            class="li-data"
            v-if="!todo.editing"
            @dblclick="dispatchStartEditing(todo.id)"
          >
            {{ todo.content }}
          </div>
          <input
            v-else
            type="text"
            v-model="store.editedContent"
            @blur="dispatchStopEditing(todo.id)"
            @keyup.enter="dispatchStopEditing(index)"
          />
        </span>
        <div class="li-btn">
          <button @click="dispatchRemoveTodo(todo.id)">
            {{ t("delete") }}
          </button>
          <button @click="navigateToDetail(index)">{{ t("detail") }}</button>
        </div>
      </li>
    </ul>
    <h4 v-if="store.todos.length === 0">No data</h4>

    <br />
    <div>
      <input type="text" v-model="message" />
      <button type="button" @click="sendMessage">{{ t("postBoard") }}</button>
    </div>

    <br />
    <!-- cropper -->
    <div>
      <div class="live-demo">
        <section class="section">
          <button class="select-picture">
            <span>選擇圖片</span>
            <input
              ref="uploadInput"
              type="file"
              accept="image/jpg, image/jpeg, image/png, image/gif"
              @change="selectFile"
            />
          </button>
        </section>

        <!-- Crop result preview -->
        <section class="section" v-if="result.blobURL">
          <div class="preview">
            <p>預覽圖片blob</p>
            <img :src="result.blobURL" />
          </div>
        </section>

        <!-- Modal -->
        <div class="modal-wrap" v-if="isShowModal">
          <div class="modal-mask"></div>
          <div class="modal-scroll-view">
            <div class="modal">
              <div class="modal-title">
                <span class="title">Cropper</span>
                <div class="tools">
                  <button class="btn" @click="closeModal">Cancel</button>
                  <button class="btn" @click="clear">Clear</button>
                  <button class="btn" @click="reset">Reset</button>
                  <button class="btn primary" @click="getResult">Crop</button>
                </div>
              </div>

              <div class="modal-content">
                <VuePictureCropper
                  :boxStyle="{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#f8f8f8',
                    margin: 'auto',
                  }"
                  :img="pic"
                  :options="{
                    viewMode: 1,
                    dragMode: 'crop',
                    aspectRatio: 16 / 9,
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <br />
    <!-- pages -->
    <div class="pagination-container">
      <el-pagination
        v-model:currentPage="currentPage"
        :total="totalItems"
        :page-size="pageSize"
        @current-change="handlePageChange"
        background
        small
      />
    </div>
  </div>
</template>


<script setup>
import { onBeforeMount, onMounted, computed, ref, reactive, toRefs, watch, onUnmounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { usePiniaStore } from '../store/pinia'
import i18n from '../i18n.js'
import { ElNotification } from 'element-plus'
import VuePictureCropper, { cropper } from 'vue-picture-cropper'

// cropper
const isShowModal = ref(false)
const uploadInput = ref(null)
const pic = ref('')
const result = reactive({
  blobURL: '',
})


function closeModal () {
  isShowModal.value = false
}

// 選擇檔案
function selectFile (e) {
  pic.value = ''
  result.blobURL = ''
  const { files } = e.target
  if (!files || !files.length) return

  const file = files[0]
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    pic.value = reader.result
    isShowModal.value = true
  }
}

async function getResult () {
  if (!cropper) return

  const blob = await cropper.getBlob()
  if (!blob) return

  result.blobURL = URL.createObjectURL(blob)
  isShowModal.value = false
}

function clear () {
  if (!cropper) return
  cropper.clear()
}

function reset () {
  if (!cropper) return
  cropper.reset()
}




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
}

// pinia
const store = usePiniaStore()
const currentPage = ref(1)
const pageSize = 5
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
const locale18n = ref(i18n.global.locale)
const changeLocale = () => {
  store.locale = i18n.global.locale.value
}


function dispatchAddTodo () {
  store.addTodo()
}

function dispatchRemoveTodo (todoId) {
  store.removeTodo(todoId)
}

function dispatchStartEditing (todoId) {
  store.startEditing(todoId)
}

function dispatchStopEditing (todoId) {
  store.stopEditing(todoId)
}

// 把父組件ref開放傳遞到子組件
// 使用路由useRouter
const appRouter = useRouter()

function navigateToDetail (index) {
  appRouter.push({
    name: 'TodoDetail',
    params: { index: index },
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

#indexPage {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
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