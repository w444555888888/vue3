// pinia.js
import { defineStore } from 'pinia'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

export const usePiniaStore = defineStore({
    id: 'pinia',
    state: () => ({
        locale: 'en',
        todos: [],
        apiComments: [],
    }),
    actions: {
        setTodos(todos) {
            this.todos = todos
        },
        addTodo(newTodo) {
            this.todos.push(newTodo)
            this.saveData(this.todos)
        },
        removeTodo(todoId) {
            this.todos = this.todos.filter(todo => todo.id !== todoId)
            this.saveData(this.todos)
        },
        editUpdateTodo(todoId, updatedTodo) {
            const editedIndex = this.todos.findIndex(todo => todo.id === todoId)
            if (editedIndex !== -1) {
                this.todos.splice(editedIndex, 1, updatedTodo)
                this.saveData(this.todos)
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
        }
        ,
        initializeTodos() {
            // parse解析陣列
            const todosData = JSON.parse(localStorage.getItem('todos')) || []
            if (todosData.length === 0) {
                this.setTodos(this.getDefaultTodo())
            } else {
                this.setTodos(todosData)
            }
        },
        async fetchCommentsApi() {
            try {
                const commentsResponse = await axios.get('http://localhost:3000/comments')
                this.apiComments = commentsResponse.data
            } catch (error) {
                console.error('Error axios data from API', error)
            }
        },
        saveData(todos) {
            // stringify儲存字串
            const storageData = JSON.stringify(todos)
            localStorage.setItem('todos', storageData)
        },
        getDefaultTodo() {
            return [
                { id: 1, done: false, todoTitle: 'Lotus Elise', todoContent: 'Lotus Elise跑車', datePicker: '2024-05-16 00:00:00' },
                { id: 2, done: false, todoTitle: 'Lotus Exige', todoContent: 'Lotus Exige跑車', datePicker: '2024-05-16 00:00:00' },
                { id: 3, done: false, todoTitle: 'Lotus Caterham 620', todoContent: 'Lotus Caterham 620跑車', datePicker: '2024-05-16 00:00:00' },
                { id: 4, done: false, todoTitle: 'Lotus Emira', todoContent: 'Lotus Emira跑車', datePicker: '2024-05-16 00:00:00' },
            ]
        },
    },
    persist: true,
})
