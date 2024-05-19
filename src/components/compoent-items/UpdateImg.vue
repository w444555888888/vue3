<!--
 * @Author: w444555888 w444555888@yahoo.com.tw
 * @Date: 2024-05-18 14:07:52
 * @LastEditors: w444555888 w444555888@yahoo.com.tw
 * @LastEditTime: 2024-05-19 13:39:32
 * @FilePath: \vue3\src\components\compoent-items\UpdateImg.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- UpdateImg.vue -->
<template>
  <div v-if="fileList == null"></div>
  <div v-else>
    <el-upload list-type="picture-card" :auto-upload="false" :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove" :file-list="fileList" @change="handleChange">

      <!-- 上傳icon-->
      <i class="el-icon-plus"></i>
    </el-upload>

    <el-dialog v-model="dialogVisible">
      <img :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>

</template>

<script setup>
import { ref, defineEmits, defineProps, onMounted } from 'vue'
import axios from 'axios'
import { usePiniaStore } from '../../store/pinia'
// pinia
const store = usePiniaStore()
// 接收 props
const props = defineProps({
  param: Number
})

// 图片列表
const fileList = ref([])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

// 初始化图片列表
onMounted(async () => {
  await store.fetchCommentsApi()
  fileList.value = store.apiComments.filter(e => e.id == props.param)[0]?.pic.map((base64, index) => ({
    name: `image_${index}`,
    url: base64,
    status: 'success',
    uid: index
  }))
})

// emit
const emit = defineEmits(['image-selected'])
const handleChange = (file, fileList) => {
  const imagesBase64 = fileList.map(file => getBase64(file.raw))

  Promise.all(imagesBase64)
    .then(imagesBase64 => {
      emit('image-selected', imagesBase64)
    })
    .catch(error => {
      console.error('Base64编解码错误', error)
    })
}

// 将文件转换为Base64字符串
function getBase64 (file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
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
