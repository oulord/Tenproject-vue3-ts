<template>
    <div>
        <div class="select-box">
            <el-form :inline="true" :model="selectData" class="demo-form-inline">
                <el-form-item label="标题">
                    <el-input v-model="selectData.title" placeholder="请输入关键字" />
                </el-form-item>

                <el-form-item label="详情">
                    <el-input v-model="selectData.introduce" placeholder="请输入关键字" />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!-- 展示数据 -->
        <el-table :data="dataList.comList" border style="width: 100%">
            <el-table-column prop="id" label="编号" width="180" />
            <el-table-column prop="title" label="商品名称" width="180" />
            <el-table-column prop="introduce" label="商品详情" />
        </el-table>

        <!-- 分页器 -->
        <div class="example-pagination-block">
            <el-pagination @size-change="sizeChange" @current-change="currentChange" layout="prev, pager, next"
                :total="selectData.count" :page-size="selectData.pagesize" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue'
import { getGoodsList } from '@/request/api'
import { InitData } from '@/type/goods'

export default defineComponent({
    name: "GoodsView",
    setup() {
        const data = reactive(new InitData())
        // console.log(data);

        getGoodsList().then(res => {
            // console.log(res);
            data.list = res.data
            data.selectData.count = res.data.length
        })

        // 对数据进行分割
        const dataList = reactive({
            comList: computed(() => {
                return data.list.slice( //slice函数包头不包尾
                    (data.selectData.page - 1) * data.selectData.pagesize,
                    data.selectData.page * data.selectData.pagesize)
            })
        })

        // 分页器事件
        const currentChange = (page: number) => {
            data.selectData.page = page
        }
        const sizeChange = (pagesize: number) => {
            data.selectData.pagesize = pagesize
        }

        return { ...toRefs(data), currentChange, sizeChange, dataList }
    }
})
</script>

<style scoped>
.example-pagination-block {
    display: flex;
    justify-content: center;
}
</style>