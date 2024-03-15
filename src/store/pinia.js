// pinia.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const usePiniaStore  = defineStore({
    id: 'pinia',
    state: () => ({
        locale: 'en',
        newTodo: '',
        todos: [],
        editedContent: '',
        apiComments: [],
    }),
    actions: {
        setNewTodo(newTodo) {
            this.newTodo = newTodo;
        },
        setTodos(todos) {
            this.todos = todos;
        },
        addTodo() {
            if (this.newTodo.trim() !== '') {
                this.todos.push({
                    done: false,
                    content: this.newTodo.trim(),
                    editing: false,
                });
                this.setNewTodo('');
                this.saveData(this.todos);
            }
        },
        removeTodo(index) {
            this.todos.splice(index, 1);
            this.saveData(this.todos);
        },
        startEditing(index) {
            this.todos[index].editing = true;
            this.editedContent = this.todos[index].content;
        },
        stopEditing(index) {
            this.todos[index].editing = false;
            if (this.editedContent !== '') {
                this.todos[index].content = this.editedContent.trim();
            }
            this.saveData(this.todos);
        },
        initializeTodos() {
            const todosData = JSON.parse(localStorage.getItem('todos')) || [];
            if (todosData.length === 0) {
                this.setTodos(this.getDefaultTodo());
            } else {
                this.setTodos(todosData);
            }
        },
        async fetchCommentsApi() {
            try {
                const commentsResponse = await axios.get('http://localhost:3000/comments');
                this.apiComments = commentsResponse.data;
            } catch (error) {
                console.error('Error axios data from API', error);
            }
        },
        saveData(todos) {
            const storageData = JSON.stringify(todos);
            localStorage.setItem('todos', storageData);
        },
        getDefaultTodo() {
            return [
                { done: true, content: 'Lotus Elise' },
                { done: false, content: 'Lotus Exige' },
                { done: false, content: 'Lotus Caterham 620' },
                { done: false, content: 'Lotus Emira' },
            ];
        },
    },
      persist: true,
});
