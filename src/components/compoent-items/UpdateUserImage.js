//UpdateUserImage.js
import { ref } from 'vue'
import { usePiniaStore } from '../../store/pinia'

const imgValue = ref('')

// 帳戶圖片對應本地存儲
export const updateUserImage = () => {
  const store = usePiniaStore()
  let tokenString = localStorage.getItem('token')
  let token = tokenString ? JSON.parse(tokenString) : null
  if (token) {
    let usersValue = store.users.find(e => e.username === token)
    if (usersValue && usersValue.img) {
      imgValue.value = usersValue.img
    }
  }
}

// 輸出帳戶圖片
export const getImageValue = () => imgValue
