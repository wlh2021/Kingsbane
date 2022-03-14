import request from "@/utils/request";

export function upload(formdata){
    return request({
        
        headers: { 'Content-Type': 'multipart/form-data' },
        url:'/files/editor/upload',
        method:'post',
        data:formdata
    })
}

