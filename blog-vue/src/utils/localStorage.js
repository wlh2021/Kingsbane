export function setCommentInfo(form){
    form.commentMsg = ''
    form.localStorageFlag = false
    localStorage.setItem("commentInfo",JSON.stringify(form))

    
}

export function getCommentInfo(){
    var form = (localStorage.getItem('commentInfo'))
    if(form == null) return {}
    return form
   
}
//写上这句页面会白屏
// export default cookie