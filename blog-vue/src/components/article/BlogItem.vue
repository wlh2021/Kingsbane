<template>
  <div>
    <div
      class="cards waterfall px-container clearfix"
      ref="blogContainer"
      v-cloak
    >
      <ul
        class="px-waterfall left"
        v-for="(blogList, index) in blogs"
        :key="index"
      >
        <transition-group name="slide-fade">
          <li v-for="(blog, i) in blogList" :key="i">
            <div class="card">
              <div @click="view(blog.id)">
                <div class="img">
                  <div class="time">
                    <br />
                    <h1 class="day">{{ blog.day }}</h1>
                    <h6 class="yearAndMonth">
                      {{ blog.month }}&nbsp;{{ blog.year }}
                    </h6>
                  </div>
                  <el-image
                    style="
                      height: 30%;
                      width: 100%;
                      margin-top: 0px;
                      max-height: 30%;
                      padding: 0px;
                    "
                    :src="blog.cover"
                    :fit="fit"
                  ></el-image>
                </div>
                <div style="height: 40px">
                  <h3 class="title">{{ blog.title }}</h3>
                </div>
                <div class="bottom">
                  <p class="read">{{ blog.viewCounts }}&nbsp;阅读</p>
                  <el-divider
                    direction="vertical"
                    style="float: left; margin-top: 24px"
                  ></el-divider>
                  <span>
                    <p
                      class="tag"
                      v-for="(tag, i) in blog.tags"
                      :key="tag"
                      @click.stop="searchTag(tag)"
                    >
                      {{ i > 0 ? "/" : "" }}{{ tag }}
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </li>
        </transition-group>
      </ul>
    </div>

    <!-- <div class="pagination">
      <button class="pre" @click="nextPre(-1)" v-show="currentPage != 1"><p>上一页</p></button>
      <button class="next" @click="nextPre(1)" v-show="currentPage != Math.ceil(total / pageSize)"><p>下一页</p></button>
      <el-pagination
        background
        layout="prev pager next"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div> -->

    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
//import { formatTime } from "../../utils/time";

import { getBlogs, addBlogViewCountById } from "../../api/blog";
export default {
  name: "BlogItem",
  props: ["type"],
  data() {
    return {
      mytype: this.type,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      show: true,
      //判断否是网页刷新的旗子
      isRes: true,
      blogs: [[], []],
    };
  },
  mounted() {
    this.blogs=[[], []],
    this.load();
  },
  methods: {
    load() {
      // if (this.isRes == true) {
      //   let tmpPageSize = JSON.parse(sessionStorage.getItem("MainCurrentPage"));
      //   if (tmpPageSize == null) {
      //   } else {
      //     this.currentPage = tmpPageSize;
      //   }
      //   sessionStorage.setItem("MainCurrentPage", this.currentPage);
      //   this.isRes = true;
      // }
      getBlogs(this.currentPage, this.pageSize, this.mytype).then((res) => {
        res.data.blogDtoList.forEach((blog, i) => {
          switch (i % 2) {
            case 0:
              this.blogs[0].push(blog);
              break;
            case 1:
              this.blogs[1].push(blog);
              break;
          }
        });
        this.total = res.data.count;
      });
    },

    //跳转到该标签分类页
    searchTag(tag) {
      this.$router.push({
        path: "/cot",
        query: { category: tag, flag: false },
      });
    },

    //跳转到该文章详情页
    view(id) {
      addBlogViewCountById(id);
      this.$router.push({ path: `/view/${id}` });
    },

    //改变当前页码触发
    handleCurrentChange(pageNum) {
      this.isRes = false;
      this.currentPage = pageNum;
      this.blogs = [[], []];
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.load();
      sessionStorage.setItem("MainCurrentPage", this.currentPage);
    },
    //上一页或下一页
    // nextPre(num){
    //   this.currentPage = this.currentPage + num
    //   document.body.scrollTop = 0;
    //   document.documentElement.scrollTop = 0;
    //   this.load();
    // }
  },
  watch: {
    type: {
      handler(type) {
        this.mytype = type;
        this.load();
      },
    },
  },
};
</script>

<style scoped>
.px-container {
  width: 100%;
  margin: 0;
  margin-top: 40px;
  min-height: calc(100vh - 30px);
}
[v-cloak] {
  display: none !important;
}
.px-waterfall {
  width: 44%;
  list-style: none;
}
li {
  list-style-type: none;
  margin-bottom: 50px !important;
  margin-left: 40px;
}
.left {
  float: left;
}
.card {
  /* transform: scale(1); */
  transition: transform 1s ease 0s;
}
.card:hover .el-image {
  transform: scale(1.13);
}
.card:hover .title {
  color: white;
}
.card:hover {
  background-color: rgb(251, 83, 83);
  color: white !important;
}

.time {
  position: absolute;
  z-index: 3;
  background-color: rgb(251, 83, 83);
  width: 120px;
  height: 120px;
  padding: 0px;
}
.day {
  font-size: 50px;
  height: 60px;
  margin: 0px;
  text-align: center;
  color: white !important;
}
.yearAndMonth {
  text-align: center;
  float: center;
  margin-top: 10px;
  color: white;
}
p,
h3,
h6 {
  cursor: pointer;
}
.title {
  margin: 20px 0px 30px 0px !important;
  padding-left: 20px;
  font-size: 20px;
}
.img {
  overflow: hidden;
}
.el-image {
  transform: scale(1);
  max-width: 100%;
  max-height: 100%;
  transition: transform 1s ease 0s;
}
.bottom {
  height: 50px;
  margin-left: 20px;
}
.read {
  margin-top: 20px;
  float: left;
}
.tag {
  margin-top: 20px;
  font-weight: bolder;
  float: left;
}

.pagination {
  margin: 30px auto;
  height: 30px;
}
/* /deep/.el-pagination {
  float:none;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 25%;
} */
.el-pagination {
  margin-left: 40%;
}
button {
  border: none;
  border: 3px solid rgb(225, 232, 237);
  background-color: rgb(250, 251, 252);
  border-radius: 5px;
  height: 40px;
  width: 100px;
  line-height: 40px;
}
button:hover {
  border-color: rgb(251, 83, 83);
}
button:hover p {
  color: rgb(251, 83, 83);
}
.next {
  float: right;
}
.pre {
  float: left;
}
/* /deep/.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
        margin: 0 5px;
    background-color: #f4f4f5;
    color: var(--el-text-color-regular);
    min-width: 40px;
    min-height: 40px;
    border-radius: 2px;
    line-height: 40px;
} */

/deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: rgb(251, 83, 83);
  color: var(--el-color-white);
}

/* 可以设置不同的进入和离开动画   */
/* 设置持续时间和动画函数        */
.slide-fade-enter-active {
  transition: all 2s ease;
}

.slide-fade-enter-from {
  transform: translateY(11vh);
  opacity: 0;
}
</style>