<template>
  <div class="index" v-loading="loading">
    <el-container>
      <el-main width="70%" margin-right="0px">
        <blog-item :type="type" />
      </el-main>
      <el-aside width="30%" margin-left="0px">

        <transition name="slide-fade">
          <card-hot v-show="hotshow" :hotblogs="hotblogs"></card-hot>
        </transition>

        <transition name="slide-fade">
          <card-news v-show="newshow" :newblogs="newblogs"></card-news>
        </transition>

       

        <transition name="slide-fade">
          <card-weather v-show="weashow"></card-weather>
        </transition>

        <transition name="slide-fade">
          <card-weibo v-show="weiboshow" :weibo="weibo"></card-weibo>
        </transition>
      </el-aside>
    </el-container>

  </div>
</template>

<script>
import axios from "axios";
import { getNewBlogs, getHotBlogs } from "../api/blog";
import BlogItem from "../components/article/BlogItem.vue";
import CardNews from "../components/card/CardNews.vue";
import CardHot from "../components/card/CardHot.vue";
import CardWeibo from "../components/card/CardWeibo.vue";
import CardWeather from "../components/card/CardWeather.vue";
export default {
  name: "Index",
  components: {
    BlogItem,
    CardNews,
    CardHot,
    CardWeibo,
    CardWeather,
  },
  data() {
    return {
      newblogs: [],
      hotblogs: [],
      weibo: [],
      loading: false,
      type: "",
      weashow: false,
      weiboshow: false,
      hotshow: false,
      newshow: false,
    };
  },
  mounted() {
    this.loading = true;
    this.newload();
    this.hotload();
    this.weaload();
    this.weiboload();
    this.loading = false;
  },
  methods: {
    //天气预报
    weaload() {
      this.weashow = true;
    },
    //微博top10
    weiboload() {
      axios({ url: "https://tenapi.cn/resou/", method: "get" }).then((res) => {
        this.weibo = res.data.list;
        this.weiboshow = true;
      });
    },
    //最新文章
    newload() {
      getNewBlogs(this.type).then((res) => {
        this.newblogs = res.data;
        this.newshow = true;
      });
    },
    //最热文章
    hotload() {
      getHotBlogs(this.type).then((res) => {
        this.hotblogs = res.data;
        this.hotshow = true;
        this.myshow = true;
      });
    },
  },
  watch: {
    $route() {
      this.type = this.$route.query.type;
    },
  },
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 2s ease;
}

.slide-fade-enter-from {
  transform: translateY(11vh);
  opacity: 0;
}
</style>