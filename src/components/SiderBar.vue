<!-- SiderBar -->
<template>
    <div class="common-layout">

        <el-container>
            <el-aside width="300px">
                <el-scrollbar>
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
                                <el-menu-item index="1-1">
                                    <router-link to="/" class="visited">{{ t("home") }}</router-link>
                                </el-menu-item>
                                <el-menu-item index="1-2">
                                    <router-link to="/todoList" class="visited">{{ t("titleFirst") }}</router-link>
                                </el-menu-item>
                                <el-menu-item index="1-3">
                                    <router-link to="/personalize" class="visited">{{ t("personalize") }}</router-link>
                                </el-menu-item>
                                <el-menu-item index="1-4">Option 1-4</el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>
                    </el-menu>
                </el-scrollbar>
            </el-aside>
            <el-main>
                <template v-if="currentRoute && currentRoute.matched.length > 0 && currentRoute.matched[0].components">

                    <KeepAlive>
                        <Suspense>
                            <!-- 主要内容 -->
                            <component :is="currentRoute.matched[0].components.default"></component>


                            <template #fallback>
                                <div class="loading">
                                    <el-loading :visible="isLoading" :lock="true" text="Loading"
                                        background="rgba(0, 0, 0, 0.7)">
                                       
                                    </el-loading>
                                </div>
                            </template>
                        </Suspense>
                    </KeepAlive>

                </template>
            </el-main>
        </el-container>

    </div>
</template>


<script setup>
import { ref, watch, onMounted ,Suspense,KeepAlive } from 'vue'
import { usePiniaStore } from '../store/pinia'
import i18n from '../i18n.js'
import { updateUserImage } from './compoent-items/UpdateUserImage.js'
import { useRouter } from 'vue-router';
import { ElLoading } from 'element-plus';
const router = useRouter();
const currentRoute = router.currentRoute;
// loading
const isLoading = ref(true);

watch(currentRoute, (to, from) => {
    console.log('Route changed from', from, 'to', to);
    isLoading.value = true;
});

// 在路由导航开始之前设置isLoading为true
router.beforeEach((to, from, next) => {
  isLoading.value = true;
  next();
});

// 在路由导航结束之后设置isLoading为false
router.afterEach((to, from) => {
  isLoading.value = true;
});


const { t } = i18n.global
const store = usePiniaStore()

const imgValue = ref(updateUserImage())
onMounted(() => {
    updateUserImage()
})

// 實時更新users帳戶圖片
watch(() => updateUserImage(), () => {
    imgValue.value = updateUserImage()
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

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px; 
  background-color: blue;
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