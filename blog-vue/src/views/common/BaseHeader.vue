<template>
<div>
    <div class="header">
    <el-image class="img" :src="KB" @click="$router.push('/')"></el-image>
    <i  class="iconfont icon-sousuo category" @click="changeMaskFlag()"></i>
    <p  class="category"><router-link to="/about">关于我</router-link></p>
    <p  class="category new" @click="goPage('http://file.kingsbane.top')">资源分享</p>
    <p  class="category"><router-link to="/timeaxis">时间轴</router-link></p>
    <p  class="category" v-for="i in list" :key="i.category"><router-link :to= "{ path: i.url,query:{category: i.category,flag:0}}">{{i.category}}</router-link></p>
    <p  class="category"><router-link to="/">首页</router-link></p>
  
  </div>
</div>

</template>

<script>
import KBImg from '../../assets/image/KB.png'
export default {
  name: "BaseHeader",
  data() {
    return {
      activeClass: -1,
      KB:KBImg,
      list: [
        {
          url: '/cot',
          category: '休闲'
        },
        {
          url: '/cot',
          category: '学习'
        },
      ],
    }
  },
  methods: {
    changeMaskFlag(){
      this.$store.commit('SET_MASKFLAG')
    },
    goto(){
      //go里面一般写1或-1来表示浏览器的前进或后退
      this.$router.go("/");
    },
     goPage(url) {
      window.open(url, "_blank"); // 在新窗口打开外链接
      //window.location.href = url  //在本页面打开外部链接
    },
  },
  computed:{
    routes() {
      return this.$router.options.routes
    },
  }
}
</script>

<style scoped>
/* .el-sub-menu__title{
  width: 50px;
 
} */
.header {
  width: 100%;
  height: 140px;
  background-color: #fcfcfc;
}

.el-image{
  max-height: 120px;
  max-width: 120px;
  margin-left: 38px;
  margin-top: 40px;
  float: left;
  cursor: pointer;
}

.category{
  float: right;
  line-height: 135px;
}

.router-link-active {
  text-decoration: none;
  color: black;
}
.new {
  cursor:pointer;
  text-decoration: none;
  color: black;
  font-size: small;
  margin-right: 30px;
}
a {
  cursor:pointer;
  text-decoration: none;
  color: black;
  font-size: small;
  margin-right: 30px;
}
a:hover{
  color: rgb(251, 83, 83);
}
.icon-sousuo{
  margin-right:30px;
  color:black;
}
.active {
  color: rgb(251, 83, 83);
}


</style>