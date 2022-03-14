import request from "@/utils/request";

//模糊查询评论
export function getComments(num,size,search){
    return request({
        url:'/comments',
        method:'get',
        params:{
            pageNum: num,
            pageSize: size,
            search: search
        }
    })
}

//获取指定文章的评论信息
export function getBlogComments(id){
    return request({
        url:`/comments/${id}`,
        method:'get'
    })
}

//创建评论
export function createdComment(form){
    return request({
        url:'/comment/add',
        method:'post',
        data:form
    })
}