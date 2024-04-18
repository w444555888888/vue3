// pinia.js
import { defineStore } from 'pinia'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

export const usePiniaStore = defineStore({
    id: 'pinia',
    state: () => ({
        locale: 'en',
        newTodo: '',
        todos: [],
        editedContent: '',
        apiComments: [],
        editing: false,
    }),
    actions: {
        // 新增輸入框
        setNewTodo (newTodo) {
            this.newTodo = newTodo
        },
        setTodos (todos) {
            this.todos = todos
        },
        todoStatus(todoId, boolen){
            const findtodoId = this.todos.find(todo => todo.id === todoId)
            console.log(findtodoId);
            if (findtodoId) {
                findtodoId.done = boolen;
                this.saveData(this.todos);
              } 
        },
        addTodo () {
            if (this.newTodo.trim() !== '') {
                this.todos.push({
                    id: uuidv4(),
                    done: false,
                    content: this.newTodo.trim(),
                    editing: false,
                })
                this.setNewTodo('')
                this.saveData(this.todos)
            }
        },
        removeTodo (todoId) {
            this.todos = this.todos.filter(todo => todo.id !== todoId);
            this.saveData(this.todos);
          }
          ,
        startEditing (todoId) {
            const todoToEdit = this.todos.find(todo => todo.id === todoId)
            if (todoToEdit) {
                todoToEdit.editing = true
                this.editedContent = todoToEdit.content
                this.saveData(this.todos)
            }
        },

        stopEditing (todoId) {
            const todoToStopEdit = this.todos.find(todo => todo.id === todoId)
            if (todoToStopEdit) {
                todoToStopEdit.editing = false
                if (this.editedContent !== '') {
                    todoToStopEdit.content = this.editedContent.trim()
                }
                this.saveData(this.todos)
            }
        },
        initializeTodos () {
            // parse解析陣列
            const todosData = JSON.parse(localStorage.getItem('todos')) || []
            if (todosData.length === 0) {
                this.setTodos(this.getDefaultTodo())
            } else {
                this.setTodos(todosData)
            }
        },
        async fetchCommentsApi () {
            try {
                const commentsResponse = await axios.get('http://localhost:3000/comments')
                this.apiComments = commentsResponse.data
            } catch (error) {
                console.error('Error axios data from API', error)
            }
        },
        saveData (todos) {
            // stringify儲存字串
            const storageData = JSON.stringify(todos)
            localStorage.setItem('todos', storageData)
        },
        getDefaultTodo () {
            return [
                { id: 1, done: true, content: 'Lotus Elise' },
                { id: 2, done: false, content: 'Lotus Exige' },
                { id: 3, done: false, content: 'Lotus Caterham 620' },
                { id: 4, done: false, content: 'Lotus Emira' },
            ]
        },
    },
    persist: true,
})
