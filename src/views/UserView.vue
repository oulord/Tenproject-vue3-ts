<template>
    <div>
        用户列表
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { getUserList, getRoleList } from '@/request/api'

export default defineComponent({
    name: "UserView",
    setup() {
        onMounted(() => {
            getUser()
            getRole()
        })

        const getUser=()=>{
            getUserList().then(res=>{
                console.log(res);
            })
        }

        const getRole=()=>{
            getRoleList().then(res=>{
                console.log(res);
                
            })
        }

        return {}
    }
})
</script>

<style scoped></style>