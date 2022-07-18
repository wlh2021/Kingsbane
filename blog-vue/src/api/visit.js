import request from "@/utils/request";

//增加网站访问量
export function addVisits(visit){
    return request({
        url:'/visit/add',
        method:'post',
        data:visit
    })
}

//查看网站访问量
export function getVisits(){
    return request({
        url:'/visit/getAll',
        method:'post',
    })
}

//发送访客ip
export function sendIP(ip){
    return request({
        url:'/visit/ip',
        method:'post',
        data:ip
    })
}