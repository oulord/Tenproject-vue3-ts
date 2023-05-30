<template>
    <div>
        <el-tree :data="list" show-checkbox node-key="roleId" :check-strictly="true" :default-checked-keys="authority"
            :props="{
                children: 'roleList',
                label: 'name'
            }" />
        <el-button @click="changeAuthority">确认修改</el-button>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { InitData } from '@/type/authority'
import { getAuthorityList } from '@/request/api'

export default defineComponent({
    name: "AuthorityView",
    setup() {
        const route = useRoute()
        const params: any = route.params
        // console.log(params);

        // 请求接口
        onMounted(() => {
            getAuthorityList().then(res => {
                console.log(res);
                data.list = res.data
            })
        })

        const data = reactive(new InitData(params.id, params.authority))

        return { ...toRefs(data) }
    }
})
</script>

<style scoped></style>