<!-- TodoList -->
<template>
    <div>
        <nav>
            <select v-model="state.locale">
                <option value="en">en-US</option>
                <option value="zh">zh-TW</option>
            </select>
        </nav>
        <h1>{{ t('title') }}</h1>
        <div id="realDomDiv" ref="refFromDom">調用真實dom</div>
        <button @click="handleClick()">click me toggle color</button>

        <form @submit.prevent="dispatchAddTodo">
            <label>New ToDo </label>
            <input v-model.trim="state.newTodo" name="newTodo" autocomplete="off">
            <button>Add ToDo</button>
        </form>

        <h2>ToDo List</h2>
        <ul>
            <li v-for="(todo, index) in state.todos" :key="index">
                <span :class="{ done: todo.done }">
                    <span>
                        <input type="radio" :checked="!todo.done" :id="`pending${index}`" :name="`done${index}`">
                        <label :for="`pending${index}`">待辦</label>
                        <input type="radio" :checked="todo.done" :id="`done${index}`" :name="`done${index}`">
                        <label :for="`done${index}`">完成</label>
                    </span>

                    <div class="li-data" v-if="!todo.editing" @dblclick="dispatchStartEditing(index)">
                        {{ todo.content }}
                    </div>
                    <input v-else type="text" v-model="state.editedContent" @blur="dispatchStopEditing(index)"
                        @keyup.enter="dispatchStopEditing(index)">
                </span>
                <div class="li-btn">
                    <button @click="dispatchRemoveTodo(index)">刪除項目</button>
                    <button @click="navigateToDetail(index)">詳情</button>
                </div>
            </li>
        </ul>
        <ul>
            <li v-for="(apiComment, index) in apiComments" :key="index">
                {{ apiComment.id }} {{ apiComment.body }} {{ apiComment.kind }}
            </li>
        </ul>
        <h4 v-if="state.todos.length === 0">No data</h4>
    </div>
</template>

 
<script setup>
import { onBeforeMount, onMounted, computed, ref, defineExpose, toRefs } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import i18n from './i18n';


// 去解構store裡面的api
const store = useStore();
const { state, dispatch } = store;
// 因store解構後會有響應式跑掉的問題，須加上toRefs
const { apiPosts, apiComments } = toRefs(state);


// i18n
const { t } = i18n.global;
store.watch(
    (state) => state.locale,
    (newLocale) => {
        i18n.global.locale.value = newLocale
    }
);





function dispatchAddTodo() {
    dispatch('addTodo');
}

function dispatchRemoveTodo(index) {
    dispatch('removeTodo', index);
}

function dispatchStartEditing(index) {
    dispatch('startEditing', index);
}

function dispatchStopEditing(index) {
    dispatch('stopEditing', index);
}


// 把父組件ref開放傳遞到子組件
// 使用路由useRouter
const appRouter = useRouter();

function navigateToDetail(index) {
    const todo = state.todos[index];
    console.log(todo, 'todo');
    appRouter.push({
        name: 'TodoDetail',
        params: { index: index, someRouter: 'someRouter' },
        query: { index: index }
    });
}

console.log(appRouter, 'appRouter');

// 調用真實dom練習
const refFromDom = ref(null);
// 布林值
const isHighlighted = ref(true);

// 點擊事件 : 根據isHighlighted決定真實dom(refFromDom)要不要添加class : highlighted
const handleClick = () => {
    isHighlighted.value = !isHighlighted.value;
    console.log(isHighlighted.value);
    isHighlighted.value ? refFromDom.value.classList.add('highlighted') : refFromDom.value.classList.remove('highlighted');
};

onBeforeMount(() => {
    dispatch('initializeTodos');
    dispatch('fetchPostsApi');
    dispatch('fetchCommentsApi');
});

onMounted(() => {

})

</script>
 
 
<style lang="scss">
$border: 2px solid rgba($color: white,
        $alpha: 0.35,
    );
$size1: 6px;
$size2: 12px;
$size3: 18px;
$size4: 24px;
$size5: 48px;
$backgroundColor: #27292d;
$textColor: white;
$primaryColor: #a0a4d9;
$secondTextColor: #1f2023;

body {
    margin: 0;
    padding: 0;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: $backgroundColor;
    color: $textColor;

    #app {
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
        padding: 20px;

        select,
        option {
            background-color: rgb(22, 22, 22);
            color: white;
            border-radius: 5px;
        }

        h1 {
            font-weight: bold;
            font-size: 28px;
            text-align: center;
        }

        .highlighted {
            color: aqua;
        }

        #realDomDiv {
            margin: 5px;
        }

        form {
            display: flex;
            flex-direction: column;
            width: 100%;
            margin: 5px;

            label {
                font-size: 14px;
                font-weight: bold;
            }

            input,
            button {
                height: $size5;
                box-shadow: none;
                outline: none;
                padding-left: $size2;
                padding-right: $size2;
                border-radius: $size1;
                font-size: 18px;
                margin-top: $size1;
                margin-bottom: $size2;
            }

            input {
                background-color: transparent;
                border: $border;
                color: inherit;
            }
        }

        button {
            cursor: pointer;
            background-color: $primaryColor;
            border: 1px solid $primaryColor;
            color: $secondTextColor;
            font-weight: bold;
            outline: none;
            border-radius: $size1;
        }

        h2 {
            font-size: 22px;
            border-bottom: $border;
            padding-bottom: $size1;
        }

        ul {
            padding: 10px;

            li {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border: $border;
                padding: $size2 22px;
                border-radius: $size1;
                margin-bottom: $size2;

                span {
                    cursor: pointer;
                    display: flex;
                }

                .li-data {
                    margin: 2px 10px;
                    flex-shrink: 0;
                }

                input {
                    margin: 2px 2px;
                    flex-shrink: 0;
                }


                .li-btn {
                    margin: 0 1px;
                    flex-shrink: 0;
                }

                button {
                    font-size: $size2;
                    padding: $size1;
                    margin: 0 6px;
                }
            }
        }

        h4 {
            text-align: center;
            opacity: 0.5;
            margin: 0;
        }
    }
}
</style>