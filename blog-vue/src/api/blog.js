import request from "@/utils/request";

//根据标题模糊查询博客
export function getBlogs(num,size,search){
    return request({
        url:'/blogs',
        method:'get',
        params:{
            pageNum: num,
            pageSize: size,
            search: search
        }
    })
}

//根据所有关键字模糊查询博客
export function getBlogsByAllKey(num,size,search){
    return request({
        url:'/blogsByAllKey',
        method:'get',
        params:{
            pageNum: num,
            pageSize: size,
            search: search
        }
    })
}


//根据ID查询文章
export function getBlogById(id){
    return request({
        url:`/blog/${id}`,
        method:'get'
    })
}

//根据文章ID增加阅读量
export function addBlogViewCountById(id){
    return request({
        url:`/blog/${id}`,
        method:'put'
    })
}

//最新文章
export function getNewBlogs(type){
    return request({
        url:'/new',
        method:'get',
        params:{
            type: type
        }
    })
}

//最热文章
export function getHotBlogs(type){
    return request({
        url:'/hot',
        method:'get',
        params:{
            type: type
        }
    })
}


//更新文章或新增文章
export function saveOrUpdateBlog(form){
    return request({
        url:'/blog/edit',
        method:'post',
        data:form
    })
}

//删除文章
export function deleteBlogById(id){
    return request({
        url:`/blog/${id}`,
        method:'delete',
    })
}