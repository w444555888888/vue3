// pinia.js
import { defineStore } from 'pinia'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

export const usePiniaStore = defineStore({
    id: 'pinia',
    state: () => ({
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
                { id: 1, done: false, todoTitle: 'Lotus Elise', todoContent: 'Elise Cup 250搭載一具1.8L機械增壓四缸引擎，最大馬力雖然僅246hp、扭力也不過25.5kgm，但歸功於鋰電池取代鉛蓄電池、PC材質後窗、超輕量鍛造鋁圈等偷輕措施，Elise Cup 250僅884kg的車重比起2016年式要輕了14kg，0-100km/h加速需時3.9秒、極速則來到247km/h。為了達成極致輕量化', datePicker: '2024-05-16 00:00:00', pic: null },
                { id: 2, done: false, todoTitle: 'Lotus Exige', todoContent: 'Exige Cup 430 乃是目前 Exige 道路版車型中、動力輸出最強悍的一款。雖然沿用了既有的 3.5 升 V6 機械增壓引配置，不過其採用與 Evora GT 430 相同的動力調校方式，使其可在引擎轉速 7,000 轉時輸出 430 匹最大馬力，440Nm 的最大扭力則可在 4.00 轉時提供，搭配將離合器片直徑更大、效率更高的 6 速手排變速箱。讓 Exige Cup 430 最高時速可達 290 公里 ，時速 0 至 100 公里加速僅需 3.3 秒 ', datePicker: '2024-05-16 00:00:00', pic: null },
                { id: 3, done: false, todoTitle: 'Lotus Caterham 620', todoContent: 'Caterham 7 620R 採用一具與 Caterham 7 Superlight R500 相同的 Caterham Motorsport Duratec 2.0 升直列四缸引擎，但藉由機械增壓系統的輔助下，將其最大馬力輸出由原本的 263 匹表現，一舉提升至 311 匹最大馬力，且最大馬力湧現的時機亦由原本的 8,500rpm 提早至 7,700rpm，賦予其更為線性的動力輸出表現，而最大扭力更是一舉由 24.4 公斤米推進至 30.7 公斤米，在搭配序列式 6 速手排變速箱的設定下，使其僅需 2.79 秒就可由靜止加速至時速每小時 96 公里，較 Caterham 7 Superlight R500 的 2.88 秒縮短了 0.09 秒，極速更可達到每小時 269 公里，具有極為驚人的加速表現', datePicker: '2024-05-16 00:00:00', pic: null },
                { id: 4, done: false, todoTitle: 'Lotus Emira', todoContent: '國內導入的 Emira First Edition 則搭載 3.5 升 V6 機械增壓汽油引擎，可輸出 400 匹最大馬力與 42.8 公斤米最大扭力，並搭配 6 速手排變速箱，根據原廠測試數據顯示，其可在 4.3 秒由靜止加速至時速 100 公里，原廠極速亦可來到時速 290 公里的水準', datePicker: '2024-05-16 00:00:00', pic: null },
                {
                id: "76e67f23-4c0d-4549-bcbc-33ff9237e106",todoTitle: "Porsche 911 GT3",done: false,todoContent: "<p><span style=\"color: rgb(51, 51, 51);\">911 GT3之所以如此與眾不同，在於它集結所有優勢特性於一身：比前代911 GT3 RS更快的320km/h極速表現（搭配PDK雙離合器自手排變速系統極速則為318km/h）；此外，僅需3.4秒完成0-100km/h加速。911 GT3源自賽道的優異空氣動力設計，可產生更大的下壓力卻不影響風阻係數。賽道專用的固定式擾流尾翼 Fixed rear wing與分流器元件，更在車輛高速過彎時顯著提升其空氣動力的下壓力，讓911 GT3在賽道上毫無保留地盡情展現</span></p>",datePicker: "2024-05-22T03:41:33.000Z", pic: null,
                }
            ]
        },
    },
    persist: true,
})
