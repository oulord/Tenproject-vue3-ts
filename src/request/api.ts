import service from ".";
import {LoginFormInt} from "@/type/login"

// 登录接口
export function login(data:LoginFormInt){
    return service({
        url:"/login",
        method:"post",
        data:data
    })
}

