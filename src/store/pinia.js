// pinia.js
import { defineStore } from 'pinia'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

export const usePiniaStore = defineStore({
    id: 'pinia',
    state: () => ({
        todos: [],
        apiComments: [],
        users:[],
    }),
    actions: {
        setTodos(todos) {
            this.todos = todos
        },
        addTodo(newTodo) {
            this.todos.push(newTodo)
        },
        removeTodo(todoId) {
            this.todos = this.todos.filter(todo => todo.id !== todoId)
        },
        editUpdateTodo(todoId, updatedTodo) {
            const editedIndex = this.todos.findIndex(todo => todo.id === todoId)
            if (editedIndex !== -1) {
                this.todos.splice(editedIndex, 1, updatedTodo)
                return updatedTodo
            }

            //  this.todos = [
            //     ...this.todos.slice(0, editedIndex),
            //     updatedTodo,
            //     ...this.todos.slice(editedIndex + 1)
            // ];
        },
        editTodo(todoId) {
            return this.todos.find(todo => todo.id === todoId)
        },
        async fetchCommentsApi() {
            try {
                const commentsResponse = await axios.get('http://localhost:3000/comments')
                this.apiComments = commentsResponse.data
            } catch (error) {
                console.error('Error axios apiComments data from API', error)
            }
        },
        async fetchUsersApi() {
            try {
                const userResponse = await axios.get('http://localhost:3000/users')
                this.users = userResponse.data
            } catch (error) {
                console.error('Error axios data from user API', error)
            }
        },
    },
})
