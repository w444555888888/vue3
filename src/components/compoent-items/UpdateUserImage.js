//UpdateUserImage.js
import { ref } from 'vue'
import { usePiniaStore } from '../../store/pinia'

// 全局ref
export const imgValue = ref('')

// 帳戶圖片對應本地存儲，輸出圖片
export const updateUserImage = () => {
  const store = usePiniaStore()
  
  let tokenString = localStorage.getItem('token')
  let token = tokenString ? JSON.parse(tokenString) : null
  
  if (token) {
    let usersValue = store.users.find(e => e.username == token)
    if (usersValue && usersValue.img) {
      imgValue.value = usersValue.img
    }
  }
  return imgValue.value;
}


