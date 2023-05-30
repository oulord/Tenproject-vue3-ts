<template>
    <div>
        <el-form :inline="true" class="search-form">
            <el-form-item>
                <el-button type="primary" @click="addRole">添加角色</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="list" border style="width: 100%">
            <el-table-column prop="roleId" label="编号" width="180" />
            <el-table-column prop="roleName" label="角色名称" width="180" />
            <el-table-column prop="authority" label="操作">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="ChangeRole(scope.row)">
                        修改权限
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { ElMessage, ElMessageBox } from "element-plus";
import { getRoleList, } from '@/request/api';
import { InitData, ListInt } from '@/type/role';
import { useRouter } from 'vue-router'

export default defineComponent({
    name: "RoleView",
    setup() {
        const data = reactive(new InitData())
        const router = useRouter()

        onMounted(() => {
            getRoleList().then(res => {
                // console.log(res);
                data.list = res.data
            })
        })

        // 添加角色
        const addRole = () => {
            ElMessageBox.prompt('请输入角色名称', '添加角色', {
                confirmButtonText: '添加',
                cancelButtonText: '取消',
            })
                .then(({ value }) => {   //value表示你在输入中填写的值
                    if (value) {
                        // 有值就添加
                        data.list.push({
                            roleId: data.list.length + 1,
                            authority: [],
                            roleName: value
                        })
                    }
                    ElMessage({
                        type: 'success',
                        message: `${value}角色添加成功`,
                    })
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '取消操作',
                    })
                })
        }

        // 修改权限
        const ChangeRole = (row: ListInt) => {
            router.push({
                name: 'authority',
                params: {
                    id: row.roleId,
                    authority: row.authority
                }
            })
        }

        return { ...toRefs(data), addRole, ChangeRole }
    }
})
</script>

<style scoped></style>