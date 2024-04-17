<!-- Register.vue -->
<template>
  <div>
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
        <router-link to="/login"><button>Back In Login</button></router-link>
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

const register = () => {
  if (!username.value || !password.value) {
    ElNotification({
      title: 'Error',
      message: 'Please enter both username & password',
      type: 'error',
    })
    return; 
  }

  // 先檢查username是否存在
  axios.get('http://localhost:3000/users')
    .then(response => {
      const Datauser = response.data;
      const userExist = Datauser.some(user => user.username === username.value);
      if (userExist) {
        ElNotification({
          title: 'Error',
          message: 'Username exist',
          type: 'error',
        });
      } else {
        axios.post('http://localhost:3000/users', { username: username.value, password: password.value })
          .then(response => {
            if (response.status === 201) {
              ElNotification({
                title: 'Success',
                message: 'Successfully registered',
                type: 'success',
              });
              router.push('/');
            }
          })
          .catch(error => {
            ElNotification({
              title: 'Error',
              message: 'Failed to register',
              type: 'error',
            });
          });
      }
    })
    .catch(error => {
      ElNotification({
        title: 'Error',
        message: 'Failed to get register',
        type: 'error',
      });
    });
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
  width: 120px;
  height: 40px;
  padding: 5px;
  margin: 10px 0px 0px 10px;
}
</style>