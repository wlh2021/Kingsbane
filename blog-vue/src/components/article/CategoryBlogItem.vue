<template>
  <div>
    <div style="width: 100%; height: 50px; margin-left: 20px">
      <h1 style="font-size: 35px">
        {{ myFlag == 1 ? "搜索结果 " : "" }}{{ categoryOrTag }}
      </h1>
      <!-- <h1 v-show="total == 0">抱歉,没有与您搜索字词匹配的文章</h1> -->
    </div>
    <div class="nothing" v-show="nothingFlag">
      抱歉,没有与您搜索字词匹配的文章。
    </div>
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
        layout="pager"
        :total="total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
   
    </div> -->
    <div class="pagination" v-show="!nothingFlag">
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
import {
  getBlogs,
  getBlogsByAllKey,
  addBlogViewCountById,
} from "../../api/blog";
export default {
  name: "CategoryBlogItem",
  props: ["flag", "categoryOrTag"],
  data() {
    return {
      myCategoryOrTag: this.categoryOrTag,
      myFlag: this.flag,
      //判断否是网页刷新的旗子
      isRes: true,
      currentPage: 1,
      pageSize: 9,
      total: 0,
      show: true,
      nothingFlag: false,
      blogs: [[], [], []],
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      if (this.isRes == true) {
        let tmpPageSize = JSON.parse(
          sessionStorage.getItem(this.myCategoryOrTag + "CurrentPage")
        );
        if (tmpPageSize == null) {
        } else {
          this.currentPage = tmpPageSize;
        }
      }
      if (this.myFlag == true) {
        getBlogsByAllKey(
          this.currentPage,
          this.pageSize,
          this.myCategoryOrTag
        ).then((res) => {
          res.data.blogDtoList.forEach((blog, i) => {
            switch (i % 3) {
              case 0:
                this.blogs[0].push(blog);
                break;
              case 1:
                this.blogs[1].push(blog);
                break;
              case 2:
                this.blogs[2].push(blog);
                break;
            }
          });
          this.total = res.data.count;
          if (this.total > 0) {
            this.nothingFlag = false;
          } else {
            this.nothingFlag = true;
          }
        });
      } else {
        getBlogs(this.currentPage, this.pageSize, this.myCategoryOrTag).then(
          (res) => {
            res.data.blogDtoList.forEach((blog, i) => {
              switch (i % 3) {
                case 0:
                  this.blogs[0].push(blog);
                  break;
                case 1:
                  this.blogs[1].push(blog);
                  break;
                case 2:
                  this.blogs[2].push(blog);
                  break;
              }
            });
            this.total = res.data.count;
            if (this.total > 0) {
              this.nothingFlag = false;
            } else {
              this.nothingFlag = true;
            }
          }
        );
      }

      sessionStorage.setItem(
        this.myCategoryOrTag + "CurrentPage",
        this.currentPage
      );
      this.isRes = true;
      document.title = this.myCategoryOrTag + " - Kingsbane弑君";
    },

    //跳转到该标签分类页
    searchTag(tag) {
      this.$router.push({
        path: "/cot",
        query: { category: tag, flag: false },
      });
    },

    view(id) {
      addBlogViewCountById(id);
      this.$router.push({ path: `/view/${id}` });
    },

    //改变当前页码触发
    handleCurrentChange(pageNum) {
      this.isRes = false;
      this.currentPage = pageNum;
      (this.blogs = [[], [], []]), (document.body.scrollTop = 0);
      document.documentElement.scrollTop = 0;
      this.load();
      sessionStorage.setItem(
        this.myCategoryOrTag + "CurrentPage",
        this.currentPage
      );
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
    categoryOrTag(newValue, oldValue) {
      (this.blogs = [[], [], []]), (this.myCategoryOrTag = newValue);
      this.load();
    },

    flag(newValue, oldValue) {
      this.myFlag = newValue;
    },
  },
};
</script>

<style scoped>
.px-container {
  width: 100%;
  margin: 0;
  margin-top: 30px;
  min-height: calc(100vh - 30px);
}
[v-cloak] {
  display: none !important;
}
.px-waterfall {
  width: 32%;
  list-style: none;
}
li {
  list-style-type: none;
  margin-bottom: 50px !important;
  margin-left: 20px;
}
.left {
  float: left;
}
.card {
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
  color: white;
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
/deep/.el-image:hover {
  transform: scale(1.13);
}
.created {
  font-size: smaller;
  text-align: right;
  float: left;
  padding-left: 3px;
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
.el-pagination {
  margin-left: 48.5%;
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
.nothing {
  margin-top: 20px;
  margin-left: 20px;
}
/* /deep/.el-pagination.is-background .el-pager li {
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