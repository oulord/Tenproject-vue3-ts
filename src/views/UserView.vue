<template>
    <div>
        <div class="select-box">
            <el-form :inline="true" :model="selectData" class="demo-form-inline">
                <el-form-item label="姓名">
                    <el-input v-model="selectData.nickName" placeholder="请输入姓名" />
                </el-form-item>

                <el-form-item label="用户角色">
                    <el-select v-model="selectData.role" class="m-2" placeholder="请选择" size="large">
                        <el-option label="全部" :value="0" />
                        <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName"
                            :value="item.roleId" />
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!-- 展示数据 -->
        <el-table :data="list" border style="width: 100%">
            <el-table-column prop="id" label="编号" width="180" />
            <el-table-column prop="nickName" label="姓名" width="180" />
            <el-table-column prop="role" label="角色">
                <!-- 使用插槽 -->
                <template #default="scope">
                    <el-button link type="primary" size="small" v-for="item in scope.row.role" :key="item.role">
                        {{ item.roleName }}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column prop="role" label="操作">
                <!-- 使用插槽 -->
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="changeUser(scope.row)">
                        编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

    <!-- 编辑用户的弹出窗-->
    <el-dialog v-model="isShow" title="编辑用户信息">
        <el-form :model="active">
            <el-form-item label="姓名" label-width="120px">
                <el-input v-model="active.nickName" autocomplete="off" />
            </el-form-item>

            <el-form-item label="角色" label-width="120px">
                <el-select multiple v-model="active.role" class="m-2" size="large" placeholder="请选择角色">
                    <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
                </el-select>
            </el-form-item>

        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="isShow = false">取消</el-button>
                <el-button type="primary" @click="updateUser">修改</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import { getUserList, getRoleList } from '@/request/api'
import { ListInt, InitData } from '@/type/user'

export default defineComponent({
    name: "UserView",
    setup() {
        const data = reactive(new InitData())

        onMounted(() => {
            getUser()
            getRole()
        })

        const getUser = () => {
            getUserList().then(res => {
                console.log(res);
                data.list = res.data
            })
        }

        const getRole = () => {
            getRoleList().then(res => {
                console.log(res);
                data.roleList = res.data
            })
        }

        // 完成查询功能
        const onSubmit = () => {
            // 定义数组，用来接受查询过后要展示的数据
            let arr: ListInt[] = []
            // 判断两个输入框是否有值
            if (data.selectData.nickName || data.selectData.role) {
                if (data.selectData.nickName) {
                    // 将过滤的数组赋值给arr 
                    arr = data.list.filter((value) => {
                        return value.nickName.indexOf(data.selectData.nickName) !== -1
                    })
                }
                if (data.selectData.role) {
                    // 将过滤的数组赋值给arr 
                    arr = (data.selectData.nickName ? arr : data.list).filter((value) => {
                        return value.role.find((item) => {
                            item.role === data.selectData.role
                        })
                    })
                }
            } else {
                arr = data.list
            }
            // 改变数组
            data.list = arr
        }

        // 监听查询框的两个属性
        watch([() => data.selectData.nickName, () => data.selectData.role], () => {
            if (data.selectData.nickName == '' || data.selectData.role == 0) {
                getUser()
            }
        })

        // 完成编辑功能
        const changeUser = (row: ListInt) => {
            data.active = {
                id: row.id,
                nickName: row.nickName,
                userName: row.userName,
                role: row.role.map((value: any) => value.role || value.roleId),
            }
            data.isShow = true
        }

        // 更改数据
        const updateUser = () => {
            let obj: any = data.list.find((value) => value.id == data.active.id)
            obj.nickName = data.active.nickName
            obj.role = data.roleList.filter(value => data.active.role.indexOf(value.roleId) !== -1)
            data.list.forEach((item, i) => {
                if (item.id == obj.id) {
                    data.list[i] = obj
                }
            })
            data.isShow = false
        }

        return { ...toRefs(data), onSubmit, changeUser, updateUser }
    }
})
</script>

<style scoped></style>