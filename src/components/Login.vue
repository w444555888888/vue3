<!-- Login.vue -->
<template>
  <div>
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
        <router-link to="/register"><button>Register</button></router-link>
      </div>
    </form>
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
          localStorage.setItem('token', JSON.stringify(currentUser))
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
};


</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
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
  width: 100px;
  height: 40px;
  padding: 5px;
  margin: 10px 0px 0px 10px;
}
</style>