<template>
  <div style="margin: 40px 10px 0px 0px">
    <h1 class="title">微博top10</h1>
    <ul>
      <li class="weibo"  v-for="w in weibo" :key="w">
        <a class="weiboname" @click="view(w)">{{ w.name }}</a>
        
        <a class="hot">{{ w.hot }}</a>
        <i class="iconfont icon-redu"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  namd: "CardWeibo",
  props: ["weibo"],
  data() {
    return {};
  },
  created() {},
  methods: {
    view(w) {
      window.open(w.url, "_blank");
    },
  },
};
</script>

<style scoped>
/* li{
    list-style-type:none;
} */
.title {
  text-align: center;
  border-bottom: 1px solid black;
  margin-bottom: 10px;
  font-size: 25px;
}
.weibo {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0px auto 5px 5px;
}
.weibo:hover .weiboname:hover,.iconfont{
  color: rgb(251, 83, 83);
}
a {
  color: black;
}

h1,.hot,.iconfont{
  cursor: default;
}
.hot {
  float: right;
  margin-right: 15px;
}
.iconfont{
    float: right;
}
</style>