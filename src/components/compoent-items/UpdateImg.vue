<!--
 * @Author: w444555888 w444555888@yahoo.com.tw
 * @Date: 2024-05-18 14:07:52
 * @LastEditors: w444555888 w444555888@yahoo.com.tw
 * @LastEditTime: 2024-05-18 18:33:15
 * @FilePath: \vue3\src\components\compoent-items\UpdateImg.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- UpdateImg.vue -->
<template>
  <el-upload list-type="picture-card" :auto-upload="false" :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove" :file-list="fileList" @change="handleChange">
    <!-- 这里放置上传图片的按钮 -->
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { Delete, Plus, ZoomIn } from '@element-plus/icons-vue'
import axios from 'axios'

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
const fileList = ref([]) // 圖片列表

// emit
const emit = defineEmits(['image-selected'])
const handleChange = (file, fileList) => {
  const imagesBase64 = fileList.map(file => getBase64(file.raw));
  
  Promise.all(imagesBase64)
    .then(imagesBase64 => {
      emit('image-selected', imagesBase64);
    })
    .catch(error => {
      console.error('获取 Base64 编码字符串时发生错误:', error);
    });
}

function getBase64(file) {
  return new Promise(function (resolve, reject) {
    let reader = new FileReader();
    let imgResult = "";
    reader.readAsDataURL(file);
    reader.onload = function () {
      imgResult = reader.result;
    };
    reader.onerror = function (error) {
      reject(error);
    };
    reader.onloadend = function () {
      resolve(imgResult);
    };
  });
}



const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}

const handleRemove = (file) => {

}

const uploadImage = (file) => {

}
</script>
