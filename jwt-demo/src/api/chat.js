import request from "@/utils/request";


//根据用户名查找聊天消息
export function getChatByUser(fromUser,toUser){
    return request({
        url:'/chat/getChat',
        method:'post',
        params:{
            fromUser:fromUser,
            toUser:toUser
        }
    })
}

//根据用户名查找好友列表
// export function getChatByUser(fromUser,toUser){
//     return request({
//         url:'/chat/getChat',
//         method:'post',
//         params:{
//             fromUser:fromUser,
//             toUser:toUser
//         }
//     })
// }