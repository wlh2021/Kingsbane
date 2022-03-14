import request from "@/utils/request";

//模糊查询评论
export function list(num,size,search,id){
    return request({
        url:'/comments',
        method:'get',
        params:{
            pageNum: num,
            pageSize: size,
            search: search,
            id:id   //用户id
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

//根据ID删除评论
export function deleteById(id){
    return request({
        url:`/comment/${id}`,
        method:'delete'
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