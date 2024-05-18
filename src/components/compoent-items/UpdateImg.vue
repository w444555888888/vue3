<!--
 * @Author: w444555888 w444555888@yahoo.com.tw
 * @Date: 2024-05-18 14:07:52
 * @LastEditors: w444555888 w444555888@yahoo.com.tw
 * @LastEditTime: 2024-05-18 17:03:08
 * @FilePath: \vue3\src\components\compoent-items\UpdateImg.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- UpdateImg.vue -->
<template>
  <el-upload list-type="picture-card" :auto-upload="false" :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove" :http-request="uploadImage" :file-list="fileList" @change="handleChange">
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

const emit = defineEmits(['image-selected'])
const handleChange = (file, fileList) => {
  emit('image-selected', fileList)
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
