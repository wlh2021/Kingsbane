import request from "@/utils/request";

//获取联想词
export function getWords(keyword){
    return request({
        url:'/word/search',
        method:'post',
        params:{
            keyword:keyword
        }
    })
}