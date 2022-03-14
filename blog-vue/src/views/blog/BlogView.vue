<template>
    <div id="index" style="width:90%; margin:10px auto">
        <div style="min-height:100vh">
            <h1 style="text-align: center; margin:10px auto 0px auto">{{ blogdetail.title }}</h1>
            <v-md-preview style="margin:20px auto;" :text="blogdetail.content"></v-md-preview>
        </div>
        <div>
            <comment-item
                :commentdetail="commentdetail"
                :commentCounts="count"
                :blogid="blogdetail.id"
            ></comment-item>
        </div>
    </div>
</template>

<script>
import CommentItem from "@/components/comment/CommentItem.vue"
import { getBlogById } from '../../api/blog';
import { getBlogComments } from '../../api/comment';
export default {
    name: "BlogView",
    components: {
        CommentItem
    },
    data() {
        return {
            count: '',
            blogdetail: {},
            commentdetail: [],
        }
    },
    created() {
        this.getBlog()
        this.getBlogComments()

    },
    methods: {
        //获取文章信息
        getBlog() {
            //文章id
            const id = this.$route.params.id
            getBlogById(id).then(res => {
                this.blogdetail = res.data
                document.title = this.blogdetail.title + " - Kingsbane弑君"
            })
        },
        //获取文章的评论信息
        getBlogComments() {
            //文章id
            const id = this.$route.params.id
            getBlogComments(id).then(res => {
                this.count = 0
                this.commentdetail = res.data
                this.count += this.commentdetail.length
                this.commentdetail.forEach(facomment => {  //靠计算传过来的消息计算评论数 效率低
                    this.count += facomment.replyVO.length
                })
            })
        }
    },
    provide(){
    return {
      getBlogComments:this.getBlogComments
    }
  },
    watch: {
        $route() {


        }
    }
}
</script>

<style>
</style>