<template>
  <div>
    <!-- 弹出框 -->
    <el-dialog
      title="发布文章"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="50%"
    >
      <el-form
        v-model="blogForm"
        ref="blogForm"
        :rules="blogFormRules"
        label-width="120px"
      >
        <el-form-item label="分类" prop="category">
          <el-radio v-model="blogForm.category" label="学习">学习</el-radio>
          <el-radio v-model="blogForm.category" label="休闲">休闲</el-radio>
        </el-form-item>

        <el-form-item label="标签">
          <el-checkbox-group v-model="blogForm.tags" :min="1" :max="2">
            
            <el-checkbox v-for="tag in tags" :label="tag" :key="tag">{{
              tag
            }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="封面" style="width: 80%">
          <el-upload
            action="http://121.41.8.135:9090/files/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
            ref="upload"
            v-model="blogForm.cover"
            :on-success="getBack"
          >
            <template #trigger>
              <el-button size="small" type="primary">选取文件并上传</el-button>
            </template>
            <template #tip>
              <div class="el-upload__tip">
                只能上传 jpg/png 文件，且不超过 500kb
              </div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm(), (dialogVisible = false)"
            >发布文章</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import * as blog from "@/api/blog";

export default {
  data() {
    return {
      // 提交按钮加载
      submitLoading: false,
      // 弹出框是否显示
      dialogVisible: false,
      //标签列表
      tags: ["开发", "算法与数据结构", "安全","Java","linux","操作系统","前端","vue","spring","springboot","mysql","redis","生活", "游戏",],
      // 表单新增编辑属性
      blogForm: {
        id: "",
        userId: "",
        username: "",
        title: "",
        description: "",
        category: "",
        tags: [],
        cover: "",
        content: "",
      },
      //封面的文件列表
      fileList: [
        {
          name: "",
          url: "",
        },
      ],
      // 表单检验规则
      blogFormRules: {
        category: [
          { required: true, message: "请选择分类", trigger: "change" },
        ],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
    };
  },
  // 启动时就执行
  mounted() {
  },
  methods: {
    // 提交新增或更新
    submitForm() {
      this.submitLoading = true;
      //this.$refs.blogForm.validate((valid) => {
        //if (valid) {
          if (!this.blogForm.id) {
            // userId为空新增
            this.blogForm.userId = this.$store.state.user.id; //获得用户ID
            this.blogForm.username = this.$store.state.user.name; //获得用户昵称
          } 
            blog
              .saveOrUpdateBlog(this.blogForm)
              .then((response) => {
                // 执行成功重置表单且弹出提示信息
                this.resetForm();
                this.$message({
                  type: "success",
                  message: response.msg,
                });
              })
              .catch((error) => {
                console.log(error);
              })
              .then(() => {
                // always executed 类似finally
                this.submitLoading = false;
              });
          
        //} else {
          this.submitLoading = false;
          return false;
        //}
      //});
    },
    // 重置
    resetForm() {
      // 清空表单
      this.$refs.blogForm = {}
      // 关闭弹窗
      this.dialogVisible = false;
      this.submitLoading = false;
    },
    // 准备新增或更新
    preByBlog(blog) {

      if (blog != null) {
        this.submitLoading = true;
        this.blogForm = JSON.parse(JSON.stringify(blog));
      } 
      // else {
      //   this.blogForm.tags = ['开发']
      // }
      // 显示弹出框
      this.dialogVisible = true;
    },
    //上传封面图片
    submitUpload() {
      this.$refs.upload.submit();
    },
    //获取后端返回的数据
    getBack(res) {
      //console.log(res)
      this.blogForm.cover = res.data;
      this;
      this.$message({
        type: "success",
        message: "上传成功",
      });
    },
    //文件上传
    filesUploadSuccess(res) {
      console.log(res);
      this.blogForm.cover = res.data;
    },
    handlePreview() {},
    handleRemove() {},

    // 弹窗关闭事件方法
    handleClose(done) {
      // 重置表单
      this.resetForm();
      done();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
