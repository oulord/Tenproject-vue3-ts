<template>
    <div class="home">
        <el-container>
            <el-header><el-row :gutter="20">
                    <el-col :span="4">
                        <img src="@/assets/logo.jpg" class="logo" alt="">
                    </el-col>
                    <el-col :span="16">
                        <h2>后天管理系统</h2>
                    </el-col>
                    <el-col :span="4">
                        <span class="quit-login">退出登录</span>
                    </el-col>
                </el-row></el-header>
            <el-container>
                <el-aside width="200px">Aside</el-aside>
                <el-main>Main</el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {


        return {}
    }
})
</script>

<style lang="scss" scoped>
.el-header {
    height: 80px;
    background-color:#545c64;
    .logo {
        height: 80px;
    }
    h2,.quit-login {
        text-align: center;
        height: 80px;
        line-height: 80px;
    }
}</style>