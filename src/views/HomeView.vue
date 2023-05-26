<template>
    <div class="home">
        <el-container>
            <!-- 头部 -->
            <el-header><el-row :gutter="20">
                    <el-col :span="4">
                        <img src="@/assets/logo.jpg" class="logo" alt="">
                    </el-col>
                    <el-col :span="16">
                        <h2>后台管理系统</h2>
                    </el-col>
                    <el-col :span="4">
                        <span class="quit-login">退出登录</span>
                    </el-col>
                </el-row></el-header>

            <!-- 侧边栏 -->
            <el-container>
                <el-aside width="200px">
                    <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
                        default-active="2" text-color="#fff" router>

                        <el-menu-item :index="item.path" v-for="item in list" :key="item.path">
                            <el-icon></el-icon>
                            <span>{{ item.meta.title }}</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>

                <!-- 左边路由视图 -->
                <el-main><router-view></router-view></el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    name: "HomeView",
    setup() {
        const router = useRouter()
        // console.log(router.getRoutes());
        const list = router.getRoutes().filter(v => v.meta.isShow)
        // console.log(list);

        return { list }
    }
})
</script>

<style lang="scss" scoped>
.el-header {
    height: 80px;
    background-color: #545c64;

    .logo {
        height: 80px;
    }

    h2,
    .quit-login {
        text-align: center;
        height: 80px;
        line-height: 80px;
    }
}

.el-aside {
    .el-menu {
        height: calc(100vh - 80px)
    }
}
</style>