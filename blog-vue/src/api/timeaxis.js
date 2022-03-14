import request from "@/utils/request";

//列出时间轴
export function timeAxis(){
    return request({
        url:'/timeaxis',
        method:'get'
    })
}