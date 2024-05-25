//UpdateUserImage.js
import { ref } from 'vue'
import { usePiniaStore } from '../../store/pinia'

const imgValue = ref('')


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

export const getImageValue = () => imgValue
