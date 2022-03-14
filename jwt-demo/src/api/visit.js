import request from "@/utils/request";

//增加网站访问量
export function addVisits(){
    return request({
        url:'/visit/add',
        method:'post',
    })
}

//查看网站访问量
export function getVisits(){
    return request({
        url:'/visit/get',
        method:'post',
    })
}