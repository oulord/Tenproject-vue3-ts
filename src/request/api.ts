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

// 商品列表接口
export function getGoodsList(){
    return service({
        url:"/getGoodsList",
        method:"get"
    })
}

