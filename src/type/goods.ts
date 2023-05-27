export interface ListInt {
    userId: number,
    id: number,
    title: string,
    introduce: string
}

interface selectDataInt {
    title: string,
    introduce: string,
    page: number,           //页码
    count: number,          //数据总数
    pagesize: number        //一页显示几条数据
}

export class InitData {
    selectData:selectDataInt={  //针对搜索表单
        title:"",
        introduce:"",
        page:1,
        count:0,
        pagesize:6
    }
    list: ListInt[] = []   //展示的内容的数据，接收从后台返回的数据
}

