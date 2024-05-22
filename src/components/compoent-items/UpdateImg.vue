<!--
 * @Author: w444555888 w444555888@yahoo.com.tw
 * @Date: 2024-05-18 14:07:52
 * @LastEditors: w444555888 w444555888@yahoo.com.tw
 * @LastEditTime: 2024-05-19 21:10:22
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
      <el-icon><Plus /></el-icon>
    </el-upload>

    <el-dialog v-model="dialogVisible" >
      <img :src="dialogImageUrl" alt="Preview Image" style="width:100%"/>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps, onMounted, watch } from 'vue'
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
  await store.fetchCommentsApi()
  const initialFiles = store.apiComments.find(e => e.id == param)?.pic || []
  fileList.value = initialFiles.map((base64, index) => ({
    name: `image_${index}`,
    url: base64,
    status: 'success',
    uid: index
  }))

}

onMounted(() => {
  loadInitialImages(props.param)
})

// 監聽props.param
watch(props.param, (newParam) => {
  console.log(newParam,'11111111111111111111111111111');
  loadInitialImages(newParam)
})


// emit
const emit = defineEmits(['image-selected'])

// @change事件
const handleChange = async (file, newFileList) => {
  // 拿到raw
  const filesWithRaw = newFileList.filter(f => f.raw)
  // 轉換base64
  const base64Promises = filesWithRaw.map(file => getBase64(file.raw))
  const imagesBase64 = await Promise.all(base64Promises)
  const existingUrls = fileList.value.map(f => f.url)
  // 目的: (之前預覽的url)+(當前url)=放到emit傳遞給後端
  emit('image-selected', [...existingUrls, ...imagesBase64])
}



// 轉換base64函數
function getBase64 (file) {
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

const handleRemove = (file) => {
  fileList.value = fileList.value.filter(item => item.uid !== file.uid)
}

const uploadImage = (file) => {

}
</script>

<style scoped></style>
