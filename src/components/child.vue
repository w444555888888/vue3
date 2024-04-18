<template>
<h1>child route</h1>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, defineProps, computed, toRefs, watch } from 'vue'

</script>

<style scoped>
span {
  margin-right: 10px;
  font-size: 12px;
  margin-bottom: 20px;
}

.text {
  margin-right: 10px;
  font-size: 12px;
  line-height: 40px;
}

.inputone {
  margin: 4px;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.demo-progress .el-progress--line {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  width: 350px;
}

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.table-header {
  margin-right: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.gray {
  margin-right: 20px;
  color: rgb(255, 255, 255);
  background-color: rgb(161, 161, 161);
  text-decoration: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 17px;
}

.gray:hover {
  color: rgb(255, 255, 255);
  background-color: rgb(67, 67, 67);
}

input,
.detailOne {
  font-size: 1.125rem;
  padding: 1rem 2rem;
  background-color: #fff;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  width: 500px;
  word-wrap: break-word;
  outline: none;
}

input:focus,
input:valid {
  color: black;
  border: 4px solid #9f9f9f;
}

input:not(:focus) {
  border: 4px solid #e3e2e2;
}

.detailOne {
  white-space: pre-wrap;
  border: 4px solid #9f9f9f;
  height: 70px;
}

.el-collapse {
  --el-collapse-border-color: var(--el-border-color-lighter);
  --el-collapse-header-height: 48px;
  --el-collapse-header-bg-color: var(--el-fill-color-blank);
  --el-collapse-header-text-color: #050505;
  --el-collapse-header-font-size: 12px;
  --el-collapse-content-bg-color: var(--el-fill-color-blank);
  --el-collapse-content-font-size: 12px;
  --el-collapse-content-text-color: var(--el-text-color-primary);
  border-top: 1px solid var(--el-collapse-border-color);
  border-bottom: 1px solid var(--el-collapse-border-color);
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

.workRadio {
  margin-bottom: 5px;
}
</style>
