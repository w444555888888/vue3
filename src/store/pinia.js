/*
 * @Author: w444555888 w444555888@yahoo.com.tw
 * @Date: 2024-06-02 18:17:49
 * @LastEditors: w444555888 w444555888@yahoo.com.tw
 * @LastEditTime: 2024-07-19 09:00:22
 * @FilePath: \vue3\src\store\pinia.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// pinia.js
import { defineStore } from 'pinia'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

export const usePiniaStore = defineStore({
    id: 'pinia',
    state: () => ({
        todos: [],
        users: [],
    }),
    actions: {
        setTodos (todos) {
            this.todos = todos
        },
        async addTodo (newTodo) {
            try {
                const response = await axios.post('http://localhost:3003/todos', newTodo)
                if (response.status === 201) {
                    this.todos.push(response.data)
                    return response.data
                } else {
                    console.error('Failed to add todo: Unexpected response status', response.status)
                }
            } catch (error) {
                console.error('Failed to add todo:', error)
            }
        },
        async removeTodo (todoId) {
            try {
                const response = await axios.delete(`http://localhost:3003/todos/${todoId}`)
                if (response.status === 200) {
                    this.todos = this.todos.filter(todo => todo.id !== todoId)
                } else {
                    console.error('Failed to remove todo: Unexpected response status', response.status)
                }
            } catch (error) {
                console.error('Failed to remove todo:', error)
            }
        },
        async editUpdateTodo (todoId, updatedTodo) {
            try {
                const response = await axios.put(`http://localhost:30003/todos/${todoId}`, updatedTodo)
                if (response.status === 200) {
                    const editedIndex = this.todos.findIndex(todo => todo.id === todoId)
                    if (editedIndex !== -1) {
                        this.todos.splice(editedIndex, 1, response.data)
                        return response.data
                    }
                } else {
                    console.error('Failed to update todo: Unexpected response status', response.status)
                }
            } catch (error) {
                console.error('Failed to update todo:', error)
            }
        },
        editTodo (todoId) {
            return this.todos.find(todo => todo.id === todoId)
        },
        async axiosTodosApi () {
            try {
                const todosResponse = await axios.get('http://localhost:3003/todos')
                this.setTodos(todosResponse.data)
            } catch (error) {
                console.error('Error fetching todos from API', error)
            }
        },
        async axiosUsersApi () {
            try {
                const userResponse = await axios.get('http://localhost:3003/users')
                this.users = userResponse.data
            } catch (error) {
                console.error('Error fetching users from API', error)
            }
        },
        async updateUserProfile ({ username, password, img }) {
            try {
                const user = this.users.find(user => user.username === username)
                if (user) {
                    const updatedUser = { username, password, img }
                    await axios.put(`http://localhost:3003/users/${user.id}`, updatedUser)
                    await this.axiosUsersApi()
                    return true
                }
            } catch (error) {
                console.error('Failed to update user profile:', error)
                return false
            }

        },
    },
    persist: {
        key: 'user',
        storage: sessionStorage,
        paths: ['users']
    }
})
