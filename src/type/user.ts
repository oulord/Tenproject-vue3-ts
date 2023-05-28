export interface ListInt {
    id: number
    nickName: string
    role: RoleInt[],   //应该可以使用联合类型的写法：(number | string )[]
    userName: string
}

interface RoleInt {
    role: number,
    roleName: string
}

export class InitData {
    selectData: selectDataInt = {
        role: 0,
        nickName: ""
    }
    list: ListInt[] = []          //用来接收用户信息的列表
    roleList: RoleListInt[] = []     //用来接收角色信息的列表
}

interface selectDataInt {
    role: number,
    nickName: string
}

interface RoleListInt {
    authority: number[]
    roleId: number
    roleName: string
}

