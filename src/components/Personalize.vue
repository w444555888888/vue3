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
                <button class="select-picture" @click="selectPicture" v-if="!result.dataURL">
                  <span>選擇圖片</span>
                  <input ref="uploadInput" type="file" accept="image/jpg, image/jpeg, image/png, image/gif"
                    @change="selectFile" />
                </button>
              
                <div class="file-info" v-else>
                  <button @click="removeFile">刪除</button>
                 
                  <button @click="edit">編輯</button>
               
                </div>
                
              </section>
            </div>
          </div>
          <div class="input-row">
            <label for="password">cropper:</label>
            <div>
              <img :src="result.dataURL"  v-if="result.dataURL">
            </div>
          </div>
        </div>
        <div class="button-container">
          <button type="submit" @click="personalize">修改個人資料</button>
        </div>
      </form>
    </div>


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
            <VuePictureCropper  ref="cropperRef" :boxStyle="{
width: '100%',
height: '100%',
backgroundColor: '#f8f8f8',
margin: 'auto',
}" :img="picBase64" :options="{
viewMode: 1,
dragMode: 'crop',
aspectRatio: 9 / 9,
}"  />
          </div>
        </div>
      </div>
    </div>
  </div>





</template>

<script setup>
import { ref, reactive ,onMounted,computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
import { usePiniaStore } from '../store/pinia'
import { getImageValue } from './compoent-items/UpdateUserImage.js'
// pinia
const store = usePiniaStore()

// 帳戶圖片
const accountImage = computed(() => getImageValue())

// Vue-Picture-Cropper
const isShowModal = ref(false);
const cropperRef = ref(null);
const uploadInput = ref(null);
const picBase64 = ref('');
const result = reactive({
  dataURL: '',
});


// 選取照片
function selectPicture() {
  uploadInput.value.click();
}

// 編輯
function edit(){
  isShowModal.value = true
}

// 關閉modal
function closeModal() {
  isShowModal.value = false
}

// 移除上傳圖片
const removeFile = () => {
  result.dataURL = '';
  uploadInput.value = '';
};

// 選取圖片
function selectFile(e) {
  // 清空圖片數據和 dataURL
  picBase64.value = '';
  result.dataURL = '';

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

      // 所放圖片後轉換成base64格式顯示在cropper畫布上
      const scaledImageData = canvas.toDataURL('image/jpeg');
      picBase64.value = scaledImageData;
      isShowModal.value = true;
    };
  };
}

// 剪裁後base64
async function getResult() {
  console.log(cropper,'cropper');

  if (!cropper) return
  // base64
  const base64 = cropper.getDataURL()
  result.dataURL = base64

  // blob
  // const blob = await cropper.getBlob()
  // if (!blob) return
  // result.blobURL = URL.createObjectURL(blob)
  result.dataURL=base64
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


/* ------------------------------------ */


const username = ref("");
const password = ref("");

// 當前登入帳密
const localStorageToken = () => {
  let tokenString = localStorage.getItem('token')
  let token = tokenString ? JSON.parse(tokenString) : null
  let account = store.users.find((e)=>e.username == token)
  if(account){
    username.value = account.username
    password.value = account.password
  }
}




onMounted(() => {
  localStorageToken();
})



// 修改個人資料
const personalize = () => {
  if (!username.value || !password.value || !result.dataURL) {
    ElNotification({
      title: 'Error',
      message: 'Please enter username & password & img',
      type: 'error',
    })
    return
  }

  // 先檢查username是否存在
  axios.get('http://localhost:3000/users')
    .then(response => {
      const data = response.data
      const usernameExist = data.find(e => e.username === username.value)
      if (usernameExist) {
        const updatedUser = {
          username: username.value,
          password: password.value,
          img: result.dataURL,
        };
     
        axios.put(`http://localhost:3000/users/${usernameExist.id}`,updatedUser)
        .then(response => {
          // 更新個人資料pinia
          store.updateUser(updatedUser);
            ElNotification({
              title: 'Success',
              message: 'Update Success account',
              type: 'success',
            })
          })
          .catch(error => {
            ElNotification({
              title: 'Error',
              message: 'Update Fail account',
              type: 'error',
            })
          })
      }
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

.file-info button {
  padding: 5px 10px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.file-info button:hover {
  background-color: #fd3e51;
}
</style>
