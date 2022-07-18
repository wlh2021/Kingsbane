<template>
  <div style="height: 80vh; width: 60%; margin: 10px 20%">
    <p>一个正在努力的菜鸡,喜爱炉石(盗贼玩家)、二进制安全。</p>
    <br />
    <h1 style="margin-bottom: 10px">阅读</h1>
    <p style="margin-top: 5px" v-for="book in books" :key="book.name">
      {{ book.name }} {{ book.state }}
    </p>
    <h1 style="margin-top: 30px">进程</h1>
    <div v-for="p in processList" :key="p">
      <p style="margin-bottom: 0px">
        {{ p.name }}
      </p>
      <a-progress
        :stroke-color="{
          '0%': '#FFB6C1',
          '100%': '#FFB6C1',
        }"
        :percent="loveDay"
        status="active"
      />
    </div>
  </div>
  <about-comment-item
    :commentdetail="commentdetail"
    :commentCounts="count"
    :blogid="id"
  ></about-comment-item>
</template>

<script>
import aboutCommentItem from "@/components/comment/aboutCommentItem.vue";
import { getBlogComments } from "../api/comment";
export default {
  name: "About",
  components: {
    aboutCommentItem,
  },
  data() {
    return {
      id: -1, //-1默认为关于我的id
      count: 0, //评论的数量
      loveDay: "",
      timer: null,
      commentdetail: {},
      processList: [
        {
          name: "恋爱",
          zero: "#108ee9",
        },
      ],
      books: [
        { name: "《汇编语言》", state: "✔" },
        // {name:'《计算机组成原理》',state:''},
        // {name:'《操作系统导论》',state:''},
        // {name:'《Windows程序设计》',state:''},
        // {name:'《Windows核心编程》',state:''},
        // {name:'《Windows PE权威指南》',state:''},
        // {name:'《c++反汇编与逆向分析技术揭秘》',state:''},
        // {name:'《加密与解密4》',state:''},
        // {name:'《Windows高级调试》',state:''},
        // {name:'《软件调试》',state:''},
        // {name:'《恶意代码分析实战》',state:''},
        // {name:'《0day安全:软件漏洞分析技术》',state:''},
      ],
    };
  },
  created() {
    this.getBlogComments();
  },
  mounted() {
    var marry_time = Math.round(
      new Date(Date.UTC(2024, 4, 5, 0, 0, 0)).getTime() / 1000 / 60 / 60 / 24
    );
    var start_time = Math.round(
      new Date(Date.UTC(2021, 4, 15, 0, 0, 0)).getTime() / 1000 / 60 / 60 / 24
    );
    var now = Math.round(new Date().getTime() / 1000 / 60 / 60 / 24);
    this.loveDay = Math.round(
      ((now - start_time) / (marry_time - start_time)) * 100
    );
  },
  methods: {
    //获取评论信息
    getBlogComments() {
      getBlogComments(this.id).then((res) => {
        this.commentdetail = res.data.commentVOList;
        this.count = res.data.count;
      });
    },
  },
  provide() {
    return {
      getBlogComments: this.getBlogComments,
    };
  },
};
</script>

<style scoped>
h1,
h2,
p {
  cursor: default;
}
/deep/.ant-progress-inner {
  position: relative;
  display: inline-block;
  width: 100%;
  overflow: hidden;
  vertical-align: middle;
  background-color: #f5f5f5;
  border-radius: 100px;
}
/deep/.ant-progress-outer {
  display: inline-block;
  width: 90%;
  margin-right: 0;
  padding-right: 0;
}
</style>