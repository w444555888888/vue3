<!-- Personalize.vue -->
<template>
  <div id="Personalize">
    <!-- 註冊 -->
    <div>
      <div id="title">Personalize</div>
      <form @submit.prevent="register">
        <div class="input-group">
          <div class="input-row">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" />
          </div>
          <div class="input-row">
            <label for="password">Password:</label>
            <input type="text" id="password" v-model="password" />
          </div>
          <div class="input-row">
            <label for="password">img:</label>

            <!-- copper選取圖片-->
            <div>
              <section class="section">
                <button class="select-picture" @click="selectPicture">
                  <span>選擇圖片</span>
                  <input ref="uploadInput" type="file" accept="image/jpg, image/jpeg, image/png, image/gif"
                    @change="selectFile" />
                </button>
                <div class="file-info" v-if="result.blobURL">
                  <button @click="removeFile">刪除</button>
                </div>
              </section>
              <!-- cropper Modal -->
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
                      <VuePictureCropper :boxStyle="{
        width: '100%',
        height: '100%',
        backgroundColor: '#f8f8f8',
        margin: 'auto',
      }" :img="pic" :options="{
        viewMode: 1,
        dragMode: 'crop',
        aspectRatio: 16 / 9,
      }" />
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
        <div class="button-container">
          <button type="submit" @click="personalize">修改個人資料</button>
        </div>
      </form>
    </div>
  </div>





</template>

<script setup>
import { ref, reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";
import VuePictureCropper, { cropper } from 'vue-picture-cropper'

// 
// cropper
const isShowModal = ref(false);
const uploadInput = ref(null);
const pic = ref('');
const result = reactive({
  blobURL: '',
});

function selectPicture() {
  uploadInput.value.click();
}

function closeModal() {
  isShowModal.value = false
}

const removeFile = () => {
  result.blobURL = '';
  uploadInput.value.value = '';
};

function selectFile(e) {
  // 清空图片数据和 blobURL
  pic.value = '';
  result.blobURL = '';

  const { files } = e.target;
  if (!files || !files.length) return;

  const file = files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const img = new Image();

    img.src = reader.result;
    img.onload = () => {
      const MAX_WIDTH = 400;
      const MAX_HEIGHT = 400;
      let width = img.width;
      let height = img.height;

      // 圖片超過400 等比例縮放
      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        const scale = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
        width *= scale;
        height *= scale;
      }

      // 創建canvas畫布
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      // 所放圖片後轉換成base64格式
      const scaledImageData = canvas.toDataURL('image/jpeg');
      pic.value = scaledImageData;
      isShowModal.value = true;
    };
  };
}

async function getResult() {
  if (!cropper) return

  const blob = await cropper.getBlob()
  if (!blob) return

  result.blobURL = URL.createObjectURL(blob)
  isShowModal.value = false
}

function clear() {
  if (!cropper) return
  cropper.clear()
}

function reset() {
  if (!cropper) return
  cropper.reset()
}
// 
// 
// 
// 











const username = ref("");
const password = ref("");
const personalizeImg = ref([]);

// 當前登入帳密
const localStorageToken = () => {
  const tokenString = localStorage.getItem('token')
  if (tokenString) {
    const token = JSON.parse(tokenString);
    username.value = token.username
    password.value = token.password
  }
}

localStorageToken();



// onchange 
async function handleFileChange(file, fileList) {
  try {
    // 只能放一張圖
    // 圖片儲存成base64
    personalizeImg.value = await getBase64(file.raw);
  } catch (error) {
    console.error('Error', error);
  }
}


// 轉換base64函數
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}


const personalize = () => {
  if (!username.value || !password.value) {
    ElNotification({
      title: 'Error',
      message: 'Please enter both username & password',
      type: 'error',
    })
    return
  }

  // 先檢查username是否存在
  axios.get('http://localhost:3000/users')
    .then(response => {
      const Datauser = response.data
      const userExist = Datauser.some(user => user.username === username.value)
      if (userExist) {

        ElNotification({
          title: 'Error',
          message: 'Username exist',
          type: 'error',
        })
      }
    })
    .catch(error => {
      ElNotification({
        title: 'Error',
        message: 'Failed to get register',
        type: 'error',
      })
    })
};


</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

#Personalize {
  display: flex;
  justify-content: center;
}

#title {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

label {
  width: 110px;
  height: 60px;
  border-radius: 0.2rem;
  background-color: #dddddd;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  line-height: 60px;
}

input {
  font-size: 1.125rem;
  padding: 1rem 2rem;
  background-color: #fff;
  border-radius: 0.2rem;
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

.button-container {
  display: flex;
  justify-content: center;
}

button {
  cursor: pointer;
  border: 1px solid #a0a4d9;
  color: #1f2023;
  font-size: 16px;
  font-weight: bold;
  outline: none;
  border-radius: 0.5rem;
  background-color: #7e7e7e;
  width: 150px;
  height: 40px;
  padding: 5px;
  margin: 10px 0px 0px 10px;
}



/*  */
/*  */
/*  */
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

.select-picture input[type="file"] {
  display: none;
}

.section{
  display: flex;          
}


.file-info span {
  display: inline-block;
  margin-right: 10px;
}

.file-info button {
  padding: 5px 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.file-info button:hover {
  background-color: #c82333;
}
</style>
