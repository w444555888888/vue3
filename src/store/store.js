import { createStore } from 'vuex'
import axios from 'axios';

// store.js
const store = createStore({
    state: {
        locale: 'en', //這是i18n
        newTodo: '',  //新的待辦事項輸入欄
        todos: [],    //儲存待辦事項陣列
        editedContent: '',  //正在編輯內容 
        apiComments: [],
    },
    // Mutation用於直接修改狀態
    mutations: {
        // 設置新的待辦事項的Mutation
        SET_NEW_TODO(state, newTodo) {
            state.newTodo = newTodo;
        },
        // 初始todos數據
        SET_TODOS(state, todos) {
            state.todos = todos;
        },
        // 添加待辦事項的Mutation
        ADD_TODO(state, todo) {
            state.todos.push(todo);
        },
        // 移除待辦事項的Mutation
        REMOVE_TODO(state, index) {
            state.todos.splice(index, 1);
        },
        // 開始編輯待辦事項的Mutation
        START_EDITING(state, index) {
            state.todos[index].editing = true;
            state.editedContent = state.todos[index].content;
        },
        // 停止編輯待辦事項的Mutation
        STOP_EDITING(state, index) {
            state.todos[index].editing = false;
            if (state.editedContent !== '') {
                state.todos[index].content = state.editedContent.trim();
            }
        },
        // 拿到API
        SET_API_COMMENTS(state, comments) {
            state.apiComments = comments;
        },
    },
    // action用於執行異步任務並提交Mutations
    actions: {
        addTodo({ commit, state }) {
            if (state.newTodo.trim() !== '') {
                commit('ADD_TODO', {
                    done: false,
                    content: state.newTodo.trim(),
                    editing: false,
                });
                commit('SET_NEW_TODO', '');
                saveData(state.todos);
            }
        },
        removeTodo({ commit, state }, index) {
            commit('REMOVE_TODO', index);
            saveData(state.todos);
        },
        startEditing({ commit, state }, index) {
            commit('START_EDITING', index);
        },
        stopEditing({ commit, state }, index) {
            commit('STOP_EDITING', index);
            saveData(state.todos);
        },
        // 初始todos數據儲存到localStorage
        initializeTodos({ commit }) {
            const todosData = JSON.parse(localStorage.getItem('todos')) || [];
            if (todosData.length === 0) {
                commit('SET_TODOS', getDefaultTodo());
            } else {
                commit('SET_TODOS', todosData);
            }
        },
        async fetchCommentsApi({ commit }) {
            try {
                const commentsResponse = await axios.get('http://localhost:3000/comments');
                commit('SET_API_COMMENTS', commentsResponse.data);
            } catch (error) {
                console.error('Error fetching data from API', error);
            }
        }

    },
});

// todos數據保存到localStorage
function saveData(todos) {
    const storageData = JSON.stringify(todos);
    localStorage.setItem('todos', storageData);
}

function getDefaultTodo() {
    return [
        { done: true, content: 'Lotus Elise' },
        { done: false, content: 'Lotus Exige' },
        { done: false, content: 'Lotus Caterham 620' },
        { done: false, content: 'Lotus Emira' },
    ];
}

export default store;
