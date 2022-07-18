<template>
    <div style="margin-top: 30px" v-show="commentInfo.flag">
            <h2 style="margin-bottom: 25px">
              回复给 {{ commentInfo.username }}
            </h2>

            <el-form
              :inline="true"
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item style="width: 30%" prop="username">
                <el-input
                  v-model="ruleForm.username"
                  placeholder="名称*"
                ></el-input>
              </el-form-item>
              <el-form-item style="width: 30%" prop="email">
                <el-input
                  v-model="ruleForm.email"
                  placeholder="邮箱*"
                ></el-input>
              </el-form-item>
              <el-form-item style="width: 30%" prop="site">
                <el-input v-model="ruleForm.site" placeholder="站点"></el-input>
              </el-form-item>
              <el-form-item prop="commentMsg" style="width: 100%">
                <el-input
                  type="textarea"
                  :rows="9"
                  v-model="ruleForm.commentMsg"
                  placeholder="添加评论"
                ></el-input>
              </el-form-item>
              <el-checkbox
                v-model="ruleForm.localStorageFlag"
                :label="Label"
              ></el-checkbox>
            </el-form>
            <el-button
              type="primary"
              :loading="loading"
              @click="
                createcomment(
                  faCommentInfo.commentId,
                  commentInfo.username,
                  commentInfo.commentId
                )
              "
              >发表评论</el-button
            >
            <el-button
              type="primary"
              style="margin-left: 76%"
              @click="cancel()"
              >取消评论</el-button
            >
          </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { createdComment } from "../../api/comment";
import { isEmail } from "../../utils/formverification";
import { setCommentInfo, getCommentInfo } from "../../utils/localStorage";

const validateEmail = (rules, value, callback) => {
  if (!isEmail(value)) {
    callback(new Error("邮箱格式错误"));
  } else {
    callback();
  }
};
export default {
  name: "SonCommentForm",
  props: ["faCommentInfo","commentInfo"],
  inject:['getBlogComments'],
   data() {
    return {
      flag: true,
      loading: false,
      Label: "将我的名称,邮箱地址,网站信息保存在此浏览器中,以便下次发表评论。",
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
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: validateEmail, trigger: "blur" },
        ],
      },
    };
  },
   mounted() {
    //  if(getCommentInfo() != null){
    //    this.ruleForm = JSON.parse(getCommentInfo());
    //  }
    
  },
  methods: {
    createcomment(commentId, username, replyCommentId) {
      this.loading = true;
      console.log(username)
      console.log(this.faCommentInfo.commentId)
      this.ruleForm.blogId = this.$parent.blogid;
      this.ruleForm.replyUsername = username;
      this.ruleForm.parentId = this.faCommentInfo.commentId;
      this.ruleForm.replyCommentId = replyCommentId;

      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          createdComment(this.ruleForm).then((res) => {
            if (this.ruleForm.localStorageFlag == true) {
              this.mySetCommentInfo(this.ruleForm);
            }
            ElMessage({
              message: "评论成功",
              type: "success",
            });
            this.getBlogComments();
            ++this.count; //++count并不是多余 只是先加上去1,等到刷新页面又重新调用获取博客信息的方法
          });
        } else {
          ElMessage.error('评论失败')
        }
      });
      this.loading = false;
      this.$parent.flag = true;
    },
    //保存用户信息到cookie
    mySetCommentInfo(form) {
      //先清除原先的cookie
      setCommentInfo({});
      setCommentInfo(form);
    },
     cancel(){
      this.commentInfo.flag = false, 
      this.$parent.flag = true
    }
  },
  computed: {
  },
};
</script>

<style>
.el-checkbox {
  margin-bottom: 10px;
}
</style>