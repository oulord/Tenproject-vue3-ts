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
import { defineComponent, reactive, toRefs, computed, watch } from 'vue'
import { getGoodsList } from '@/request/api'
import { InitData, ListInt } from '@/type/goods'
import { dataType } from 'element-plus/es/components/table-v2/src/common'

export default defineComponent({
    name: "GoodsView",
    setup() {
        const data = reactive(new InitData())
        // console.log(data);

        // 赋值
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

        // 完成查询功能
        const onSubmit = () => {
            // 定义数组，用来接受查询过后要展示的数据
            let arr: ListInt[] = []
            // 判断两个输入框是否有值
            if (data.selectData.title || data.selectData.introduce) {
                if (data.selectData.title) {
                    // 将过滤的数组赋值给arr 
                    arr = data.list.filter((value) => {
                        return value.title.indexOf(data.selectData.title) !== -1
                    })
                }
                if (data.selectData.introduce) {
                    // 将过滤的数组赋值给arr 
                    arr = data.list.filter((value) => {
                        return value.introduce.indexOf(data.selectData.introduce) !== -1
                    })
                }
            } else {
                arr = data.list
            }
            // 改变数组
            data.list = arr
            // 重新渲染数据
            data.selectData.count = arr.length
        }

        // 监听查询框的两个属性
        watch([() => data.selectData.title, () => data.selectData.introduce], () => {
            if (data.selectData.title == '' && data.selectData.introduce == '') {
                getGoodsList().then(res => {
                    // console.log(res);
                    data.list = res.data
                    data.selectData.count = res.data.length
                })
            }
        })

        return { ...toRefs(data), currentChange, sizeChange, dataList, onSubmit }
    }
})
</script>

<style scoped>
.example-pagination-block {
    display: flex;
    justify-content: center;
}
</style>