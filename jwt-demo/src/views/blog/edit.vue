<template>
  <div>
    <div>
      <el-form>
        <input
          class="sosouk"
          :placeholder="titlePlaceholder"
          v-model="blog.title"
        />
        <el-button type="primary" round @click="preByBlog()"
          >发布文章</el-button
        >

        <mavon-editor
          class="editor"
          ref="md"
          @imgAdd="$imgAdd"
          v-model="blog.content"
        />
      </el-form>
    </div>
    <!-- 弹窗 -->
    <list-edit ref="listEdit" />
  </div>
</template>

<script>
import axios from 'axios'
import * as blog from "../../api/blog";
import ListEdit from "./list-edit.vue";
import { upload } from "../../api/file";
export default {
  name: "blogEdit",
  components: {
    ListEdit,
  },
  data() {
    return {
      titlePlaceholder: "请输入标题",
      blog: {
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
    };
  },
  mounted() {
    this.getBlog();
  },
  methods: {
    getBlog() {
      if (this.$route.query.id) {
        blog.getBlogById(this.$route.query.id,this.$route.query.flag).then((res) => {
          this.blog = res.data;
        });
      }
    },
    preByBlog() {
      if (this.$route.query.id) {
        this.$refs.listEdit.preByBlog(this.blog);
      } else {
        this.$refs.listEdit.preByBlog(this.blog);
      }
    },
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("file", $file);
       axios({
               url: 'http://121.41.8.135:9090/files/editor/upload',
               method: 'post',
               data: formdata,
               headers: { 'Content-Type': 'multipart/form-data' },
           }).then((data) => {
               this.$refs.md.$img2Url(pos, data.data.data[0].url);
           })
        }
  
    },
};
</script>

<style>
.sosouk {
  width: 70%;
  height: 45px;
  background: white;
  outline: none;
  caret-color: black;
  float: left;
  color: black;
  border-radius: 100px;
  margin: 10px 0px;
  padding-left: 10px;
  font-size: 20px;
}
::-webkit-input-placeholder {
  color: black;
  font-size: 20px;
}
.el-button {
  margin: 10px 10px;
}
.editor {
  min-width: 100% !important;
  min-height: calc(100vh - 65px) !important;
}
</style>