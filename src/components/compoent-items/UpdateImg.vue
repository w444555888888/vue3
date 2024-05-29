<!--
 * @Author: w444555888 w444555888@yahoo.com.tw
 * @Date: 2024-05-18 14:07:52
 * @LastEditors: w444555888 w444555888@yahoo.com.tw
 * @LastEditTime: 2024-05-22 23:46:37
 * @FilePath: \vue3\src\components\compoent-items\UpdateImg.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- UpdateImg.vue -->
<template>
  <div v-if="fileList == null"></div>
  <div v-else>
    <el-upload list-type="picture-card" :auto-upload="false" :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove" :file-list="fileList" @change="handleChange">
      <!-- 上傳icon -->
      <el-icon>
        <Plus />
      </el-icon>
    </el-upload>

    <el-dialog v-model="dialogVisible">
      <img :src="dialogImageUrl" alt="Preview Image" style="width:100%" />
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps, onMounted, watch, onBeforeMount } from 'vue'
import axios from 'axios'
import { usePiniaStore } from '../../store/pinia'
import { Plus } from '@element-plus/icons-vue'

// pinia
const store = usePiniaStore()

// 接收 props
const props = defineProps({
  param: {
    type: [Number, String],
    required: true
  }
})


// 圖片列表
const fileList = ref([])
// src容器
const dialogImageUrl = ref('')
// 預覽
const dialogVisible = ref(false)

// 初始化圖片列表
// 帶入id
const loadInitialImages = async (param) => {
  await store.axiosUsersApi()
  const initialFiles = store.todos.find(e => e.id == param)?.pic || []
  fileList.value = initialFiles.map((base64, index) => ({
    name: `image_${index}`,
    url: base64,
    status: 'success',
    uid: `initial_${index}`
  }))


}



onMounted(() => {
  loadInitialImages(props.param)
})

// 監聽props.param
watch(props.param, (newParam) => {
  loadInitialImages(newParam)
})


// emit
const emit = defineEmits(['image-selected'])

let uidCounter = 0
// @change 事件
const handleChange = async (file, newFileList) => {
  // 拿到raw文件
  const filesWithRaw = newFileList.filter(f => f.raw)
  // 轉換base64
  const base64Promises = filesWithRaw.map(file => getBase64(file.raw))
  const imagesBase64 = await Promise.all(base64Promises)
  // 新增圖片加上uid唯一值
  const newFiles = imagesBase64.map((base64, index) => ({
    name: `new_image_${uidCounter + index}`,
    url: base64,
    status: 'success',
    uid: `new_${uidCounter + index}` 
  }))
  uidCounter += newFiles.length
  // 目的: (資料庫base64) + (當前新增base64)
  fileList.value = [...fileList.value, ...newFiles] 
  // 更新 fileList提出url+emit給父組件
  const existingUrls = fileList.value.map(f => f.url)
  emit('image-selected', [...existingUrls])
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

const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}

// 刪除圖片uid唯一值
const handleRemove = (file) => {
  fileList.value = fileList.value.filter(item => item.uid !== file.uid)
  const updatedUrls = fileList.value.map(f => f.url)
  emit('image-selected', updatedUrls)
}


const uploadImage = (file) => {

}
</script>

<style scoped></style>
