<!-- SiderBar -->
<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="300px"> <el-scrollbar>
                    <el-menu :default-openeds="['1']">
                        <el-sub-menu index="1">
                            <template #title>
                                <el-icon>
                                    <Menu />
                                </el-icon> {{ t("menu") }}
                                <el-avatar :size="70" :src="imgValue">
                                </el-avatar>
                            </template>

                            <el-menu-item-group>
                                <el-menu-item index="1-1"><router-link to="/" class="visited">{{
                                    t("home") }}</router-link>
                                </el-menu-item>
                                <el-menu-item index="1-2"><router-link to="/todoList" class="visited">{{
                                    t("titleFirst") }}</router-link>
                                </el-menu-item>
                                <el-menu-item index="1-3"><router-link to="/personalize" class="visited">{{
                                    t("personalize") }}</router-link></el-menu-item>
                                <el-menu-item index="1-4">Option 1-4</el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>
                    </el-menu>
                </el-scrollbar></el-aside>
            <el-main>
                <router-view :key="globalStore.routeKey"></router-view>
            </el-main>
        </el-container>
    </div>
</template>


<script setup>
import { ref, watch, onMounted } from 'vue'
import { usePiniaStore } from '../store/pinia'
import i18n from '../i18n.js'
import { updateUserImage, getImageValue } from './compoent-items/UpdateUserImage.js'
import { useGlobalStore } from '../store/globalStore'

const globalStore = useGlobalStore()

const onClick = () => {
  globalStore.routeKey++
}

const { t } = i18n.global
const store = usePiniaStore()
const imgValue = getImageValue()

onMounted(() => {
    updateUserImage()
})

// 實時更新users帳戶圖片
watch(() => store.users, () => {
    updateUserImage()
}, { immediate: true, deep: true })
</script>

<style scoped lang="scss">
$border: 2px solid rgba(219, 219, 219, 0.4);
$size1: 6px;
$size2: 12px;
$size3: 18px;
$size4: 24px;
$size5: 48px;
$backgroundColor: #27292d;
$textColor: white;
$primaryColor: #a0a4d9;
$secondTextColor: #1f2023;

.common-layout {
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    width: 100%;
    height: 100vh;

    .el-aside {
        height: 100vh;

        .el-scrollbar {
            padding-top: 20px;

            .el-avatar {
                margin-left: 100px;

                .el-menu--inline {

                    .el-sub-menu,
                    .el-menu-item-group {
                        background-color: rgb(245, 245, 245);
                        border-radius: 8px;
                    }
                }
            }
        }
    }

    .el-main {
        width: 100%;
    }
}

:deep(.el-sub-menu__title) {
    height: 100px;
}


// 移除預設超連結樣式
.visited {
    color: inherit;
    text-decoration: none;
}
</style>