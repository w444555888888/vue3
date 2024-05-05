<template>
  <div class="hello">
    <div>
      <button @click="addItems()">Add item</button>
      <button @click="addItems(5)">Add 5 items</button>
      <button @click="addItems(10)">Add 10 items</button>
      <button @click="addItems(50)">Add 50 items</button>
    </div>

    <DynamicScroller
      ref="scroller"
      :items="items"
      :min-item-size="24"
      class="scroller"
      @resize="scrollToBottom()"
    >
      <template #default="{ item, index, active }">
        <DynamicScrollerItem :item="item" :active="active" :data-index="index">
          <div class="message">
            {{ item.text }}
          </div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
  </div>
</template>

<script setup>
import { faker } from '@faker-js/faker'
import { ref } from 'vue'

const items = ref([]);
const scroller=ref(null);

function addItems (count = 1){
  for (let i = 0; i < count; i++) {
    items.value.push({
      text: faker.lorem.lines(),
      id: items.value.length + 1,
    })
  }
  scrollToBottom()
}

function scrollToBottom () {
  scroller.value.scrollToBottom()
}


</script>

<style scoped>
.hello {
  flex: 0 1 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.scroller {
  flex: auto 1 1;
  border: 2px solid #ddd;
}

h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.message {
  padding: 10px 10px 9px;
  border-bottom: solid 1px #eee;
}
</style>
