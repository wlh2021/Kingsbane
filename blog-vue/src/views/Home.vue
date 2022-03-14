<template>
  <div>
    <transition name="mask">
      <div id="maskContainer" @mousewheel.prevent="rollImg" v-show="flag">
        <i
          @click="shutdown()"
          class="iconfont icon-guanbi"
          style="
            z-index: 1000;
            color: white;
            font-weight: bolder;
            float: right;
            margin: 20px 20px;
          "
        ></i>
        <div class="sosuo">
          <input
            class="sosouk"
            type="text"
            placeholder="搜索"
            v-model="mySearch"
            @keyup.enter="search()"
          />
          <i
            class="iconfont icon-sousuo"
            style="color: white; width: 30%; font-size: 70px"
            @click="search()"
          ></i>
        </div>
      </div>
    </transition>
    <div class="Home">
      <!-- <el-scrollbar always height="100vh"> -->
      <!-- <el-backtop target=".el-scrollbar .el-scrollbar__wrap" visibility-height="100" :bottom="60"></el-backtop> -->
      <el-backtop visibility-height="100" :bottom="60"></el-backtop>
      <div class="content">
        <base-header class="baseHeader" />
        <router-view />
      </div>
      <word-cloud ref="wordcloud"></word-cloud>
      <div class="footer">
        <base-footer />
      </div>
      <!-- </el-scrollbar> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BaseHeader from "../views/common/BaseHeader.vue";
import BaseFooter from "../views/common/BaseFooter.vue";
import { addVisits } from "../api/visit";
import WordCloud from "../components/WordCloud.vue";
export default {
  name: "Home",
  components: { BaseHeader, BaseFooter, WordCloud },
  data() {
    return {
      flag: this.$store.state.maskFlag,
      mySearch: "",
    };
  },
  mounted() {
    this.$refs.wordcloud.initChart();
    if (window.performance.navigation.type == 1) {
    } else {
      let ip = returnCitySN["cip"];
      axios({
        url: `https://restapi.amap.com/v5/ip?ip=${ip}&type=4&key=68673521ec0bff8f9ed90b83801ccda0`,
        method: "get",
      }).then((res) => {
        localStorage.setItem("weizhi", JSON.stringify(res.data.location));
        addVisits(res.data).then((res) => {});
      });
    }
  },
  methods: {
    shutdown() {
      this.$store.commit("SET_MASKFLAG");
      //使body内超过屏幕的内容可见
      document.body.style.overflow = "visible";
    },
    search() {
      if (this.mySearch == "") this.mySearch = " ";
      this.$router.push({
        path: "/cot",
        query: { category: this.mySearch, flag: 1 },
      });
      this.shutdown();
    },
  },
  watch: {
    "$route.path": {
      immediate: true,
      handler: function (newVal, oldVal) {
        this.activePath = newVal;
      },
    },

    "$store.state.maskFlag"(newVal, oldVal) {
      //对数据进行操作
      this.flag = newVal;
      if (this.flag) {
        //使body内超过屏幕的部分不可见->禁滚动
        document.body.style.overflow = "hidden";
        this.mySearch = "";
      }
    },
  },
};
</script>

<style scoped>
.Home {
  height: 100%;
  min-height: 100%;
  overflow-x: hidden;
  background-color: rgb(250, 251, 252);
}
#maskContainer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(23, 26, 30);
  /* opacity: 0.5; */
  z-index: 999;
}
.sosuo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 98px;
  text-align: center;
  border-bottom: 1px solid rgba(40, 114, 250, 1);
}
.sosouk {
  width: 80%;
  height: 100%;
  background: rgb(23, 26, 30);
  border: none;
  outline: none;
  caret-color: white;
  float: left;
  font-size: 50px !important;
  color: white;
}
/* 过渡效果 */
.mask-enter,
.mask-leave-to {
  opacity: 0;
  transform: translateY(-100vh);
}
.mask-enter-active,
.mask-leave-active {
  transition: all 1s ease;
}
.baseHeader {
  margin-bottom: 50px;
}
.content {
  min-height: calc(100vh);
}
.el-backtop {
  --el-backtop-font-color: black !important;
}
.footer {
  height: 592px;
  width: 100%;
  background-color: rgb(242, 245, 247);
}

::-webkit-input-placeholder {
  color: white;
  font-size: 50px;
}

.ant-input-lg {
  font-size: 50px;
}
</style>