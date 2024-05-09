<template>
    <div class="virtual-container">
        <h2>虛擬列表</h2>
        <button @click="renderVirtualList">渲染虛擬列表</button>
        <div class="virtual-list">
            <DynamicScroller v-if="rendered" ref="scroller" :items="virtualItems" :min-item-size="30" :buffer="50"
                class="scroller">
                <template #default="{ item, index, active }">
                    <DynamicScrollerItem :item="item" :active="active" :data-index="index" :data-active="active">
                        <div class="virtual-list">
                            {{ item }}
                        </div>
                    </DynamicScrollerItem>
                </template>
            </DynamicScroller>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
// 虛擬列表數據
const virtualItems = ref([])

// 虛擬列表渲染?
const rendered = ref(false)

// 開啟虛擬列表 && 渲染虛擬列表
function renderVirtualList() {
    virtualItems.value = Array(1000).fill().map((_, index) => `vue-virtual-scroller-DynamicScroller-代辦事項${index + 1}`)
    rendered.value = true
}
</script>

<style lang="scss" scoped>
.virtual-container {
    flex: auto 1 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .virtual-list {
        flex: auto 1 1;
        overflow: hidden;
        height: 400px;
        width: 500px;
        display: flex;
        flex-direction: column;
    }
}
</style>