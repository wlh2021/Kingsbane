<template>
  <div style="left: 50%; width: 60%; margin: 0px 20%">

    <!-- 创建评论部分 -->
    <comment-form v-show="flag"></comment-form>
    <!-- 评论列表部分 -->
    <div>
      <h1 style="margin: 100px 0px">{{ count }} 评论</h1>
      <!-- 父评论 -->
      <div
        v-for="(fathercomment, faindex) in commentdetail"
        :key="fathercomment.commentId"
      >
        <el-divider></el-divider>
        <h5 style="text-align: right">{{ fathercomment.created }}</h5>
        <h5 style="margin: 20px 0px">{{ fathercomment.username }}</h5>
        <h5 class="message">{{ fathercomment.commentMsg }}</h5>
        <div>
          <el-button
            type="text"
            class="button"
            @click="exclusive(faindex, -1), (fathercomment.flag = true)"
            >回复</el-button
          >
          <!-- 父评论回复部分 -->
          <father-comment-form :commentInfo="fathercomment"></father-comment-form>
        </div>

        <!-- 子评论-->
        <div
          v-for="(soncomment, sonindex) in fathercomment.replyVO"
          :key="soncomment.commentId"
          style="margin: 15px 10%; width: 90%"
        >
          <el-divider></el-divider>
          <h5 style="text-align: right">{{ soncomment.created }}</h5>
          <h5 style="margin: 20px 0px">
            {{ soncomment.username + " 回复 " + soncomment.replyUsername }}
          </h5>
          <h5 class="message">{{ soncomment.commentMsg }}</h5>
          <el-button
            type="text"
            class="button"
            @click="exclusive(faindex, sonindex), (soncomment.flag = true)"
            >回复</el-button
          >

          <!-- 子评论回复部分 -->
         <son-comment-form :faCommentInfo="fathercomment" :commentInfo="soncomment"></son-comment-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommentForm from './CommentForm.vue';
import FatherCommentForm from './FatherCommentForm.vue';
import SonCommentForm from './SonCommentForm.vue';
export default {
  components: { CommentForm, FatherCommentForm,SonCommentForm },
  name: "CommentItem",
  props: ["commentdetail", "commentCounts", "blogid"],
  data() {
    return {
      flag: true,
      count: this.commentCounts,
      ruleForm: {
        username: "",
        email: "",
        site: "",
        commentMsg: "",
        blogId: "",
        replyUsername: "",
        parentId: "",
        replyCommentId: "",
        localStorageFlag: false,
      },
    };
  },
  methods: {
    //保留一个评论表单
    exclusive(faindex, sonindex) {
      this.flag = false;
      var facnt = 0,soncnt = 0;
      try {
        //如果子评论的位置为-1,则为父评论
        this.commentdetail.forEach((facomment) => {
          soncnt = 0;
          //评论表单在父评论
          if (facomment.flag == true) {
            facomment.flag = false;
            throw new Error("false");
          } else {
            facomment.replyVO.forEach((soncomment) => {
              if (
                soncomment.flag == true &&
                (faindex != facnt || sonindex != soncnt)
              ) {

                soncomment.flag = false;
                throw new Error("false");
              }
              soncnt++;
            });
          }
          facnt++;
        });
      } catch (e) {
        undefined;
        if (e.message == "false") {
          undefined;
          return;
        }
      }
    },
  },
  watch: {
    commentCounts: function (counts) {
      this.count = counts;
    },
  },
};
</script>

<style scoped>
.message {
  font-weight: normal;
  font-size: medium;
  margin-left: 2%;
  width: 85%;
}
.button {
  margin-left: 96%;
  color: darkgray;
  font-weight: bolder;
}
.button:hover {
  color: black;
}

</style>