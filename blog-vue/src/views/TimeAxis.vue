<template>
  <div>
    <transition-group name="slide-fade">
      <a-timeline mode="alternate" v-for="(list, index) in lists" :key="index">
        <a-timeline
          pending="未完待续..."
          v-show="index == 0 ? true : false"
        ></a-timeline>
        <h1 class="year" v-show="list.count == 0 ? false : true">
          {{ list.year }}
          <el-divider direction="vertical"></el-divider>
          {{ list.count }}篇
        </h1>
        <a-timeline-item
          color="black"
          v-for="(blog, index) in list.list"
          :key="index"
        >
          {{ blog.created }}<br />
          <h4 class="title"  @click="view(blog.id)">{{ blog.title }}</h4>
        </a-timeline-item>
        <div style="margin-bottom:150px"></div>
      </a-timeline>
      
    </transition-group>
  </div>
</template>

<script>
import { getBlogs, addBlogViewCountById } from "../api/blog";
import { timeAxis } from "../api/timeaxis";
export default {
  name: "TimeAxis",
  data() {
    return {
      timestamp: "",
      /* tip:"查看摘要", */
      color: "#000000",
      show: false,
      lists: [],
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      timeAxis().then((res) => {
        this.lists = res.data;
        this.show = !this.show;
      });
    },
    view(id) {
      addBlogViewCountById(id);
      this.$router.push({ path: `/view/${id}` });
    },
  },
};
</script>

<style scoped>
.timeAxis {
  margin-left: 50%;
}
/deep/.ant-timeline-item {
  position: relative;
  margin: 0;
  padding: 0 0 20px;
  font-size: 20px;
  list-style: none;
}
/deep/.ant-timeline-item-head-blue {
  color: black;
  border-color: #1890ff;
}
.year {
  width: calc(56.8%);
  margin: 0;
  text-align: right;
  margin-bottom: 30px;
  font-size: 50px;
}
.title:hover {
  color: rgb(251, 83, 83);
}
.el-collapse-item__header {
  border: none;
}
.mycollapse {
  --el-collapse-border-color: var(none) !important;
}
.slide-fade-enter-active {
  transition: all 2s ease;
}

.slide-fade-leave-active {
  /* transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1); */
  transition: all 2s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(12vh);
  opacity: 0;
}
</style>