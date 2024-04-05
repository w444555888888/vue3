<template>
  <div id="container">
    <div id="fileButton">
      <input type="file" @change="handleFileUpload" />
      <button @click="uploadImage">上傳</button>
    </div>
    <div class="photo">
      <img :src="imageUrl" v-if="imageUrl" style="max-width: 300px" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedFile = ref(null)
const imageUrl = ref(null)

const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0]
  imageUrl.value = URL.createObjectURL(selectedFile.value)
}

const uploadImage = async () => {
  if (!selectedFile.value) {
    alert('請選擇文件')
    return
  }

  const formData = new FormData()
  formData.append('image', selectedFile.value)
  // 將 FormData 內容轉換為物件
  const formDataObject = {}
  for (const [key, value] of formData.entries()) {
    formDataObject[key] = value

    console.log("Key:", key) // 輸出鍵
    console.log("Value:", value) // 輸出值
  }



  


  try {
    const response = await fetch('YOUR_UPLOAD_URL', {
      method: 'POST',
      body: formData
    })

    if (response.ok) {
      alert('上傳成功')
      // 清空
      selectedFile.value = null
      imageUrl.value = null
    } else {
      alert('上傳失敗')
    }
  } catch (error) {
    console.error('error', error)
  }
};
</script>

<style scoped >
* {
  margin: 0;
  padding: 0;
}
input {
  background-color: #b5b4b4;
}

#container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

#fileButton {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
}
</style>
