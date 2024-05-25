<!-- Login.vue -->
<template>
  
  <div id="login">
  <!-- 登入 -->
  <div v-if="isLogin">
    <div id="title">TODOLIST LOGIN</div>
    <form @submit.prevent="login">
      <div class="input-group">
        <div class="input-row">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" />
        </div>
        <div class="input-row">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" />
        </div>
      </div>
      <div class="button-container">
        <button type="submit">Login</button>
        <button @click="toggleForm">Register</button>
      </div>
    </form>
  </div>
  <!-- 註冊 -->
  <div v-else>
    <div id="title">REGISTER ACCOUNT</div>
    <form @submit.prevent="register">
      <div class="input-group">
        <div class="input-row">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" />
        </div>
        <div class="input-row">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" />
        </div>
      </div>
      <div class="button-container">
        <button type="submit">Register</button>
        <button @click="toggleForm">Back In Login</button>
      </div>
    </form>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'

const username = ref('')
const password = ref('')
const router = useRouter()
const isLogin = ref(true)

const toggleForm = () => {
  isLogin.value = !isLogin.value
}


const login = () => {
  axios.get('http://localhost:3000/users')
    .then(response => {
      if (response.status === 200) {
        const dataUsers = response.data
        const currentUser = dataUsers.find(user => user.username === username.value && user.password === password.value)
        if (currentUser) {
          ElNotification({
            title: 'Success',
            message: 'successfully',
            type: 'success',
          })
          localStorage.setItem('token', JSON.stringify(currentUser.username))
          router.push('/')
        } else {
          ElNotification({
            title: 'Error',
            message: 'Invalid username or password',
            type: 'error',
          })
        }
      }
    })
    .catch(error => {
      ElNotification({
        title: 'Error',
        message: 'response Failed ',
        type: 'error',
      })
    })
}

const register = () => {
  if (!username.value || !password.value) {
    ElNotification({
      title: 'Error',
      message: 'Please enter both username & password',
      type: 'error',
    })
    return
  }

  // 先檢查username是否存在
  axios.get('http://localhost:3000/users')
    .then(response => {
      const Datauser = response.data
      const userExist = Datauser.some(user => user.username === username.value)
      if (userExist) {
        ElNotification({
          title: 'Error',
          message: 'Username exist',
          type: 'error',
        })
      } else {
        axios.post('http://localhost:3000/users', { username: username.value, password: password.value })
          .then(response => {
            if (response.status === 201) {
              ElNotification({
                title: 'Success',
                message: 'Successfully registered',
                type: 'success',
              })
              username.value = ''
              password.value = ''
              isLogin.value = true
            }
          })
          .catch(error => {
            ElNotification({
              title: 'Error',
              message: 'Failed to register',
              type: 'error',
            })
          })
      }
    })
    .catch(error => {
      ElNotification({
        title: 'Error',
        message: 'Failed to get register',
        type: 'error',
      })
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

#login{
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
</style>