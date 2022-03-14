<template>
  <div>
    <div id="footer">
      <div class="kingsbane">
        <el-image
          class="img"
          :src="KBImg"
          @click="$router.push('/')"
        ></el-image>
      </div>
      <div class="categorys">
        <p
          class="category"
          v-for="category in categorys"
          :key="category"
          @click="goto(category)"
        >
          {{ category.category }}
        </p>
      </div>
      <div class="icons">
        <i
          @click="goPage('https://blog.csdn.net/qq_51951386')"
          :title="csdn.title"
          class="iconfont icon-csdn"
        ></i>
        <i
          @click="
            goPage(
              'https://github.com/wlh2021/https://github.com/wlh2021/kingsbane-'
            )
          "
          :title="github.title"
          class="iconfont icon-github"
        ></i>
      </div>
      <div class="timeandcopyright">
        <p>访客: {{ fk }}</p>
        <p>访问: {{ fw }}</p>
        <p id="htmer_time"></p>
        <p class="copyright">©2021 kingsbane.top</p>
        <a href="http://beian.miit.gov.cn/" class="beian"
          >浙ICP备2021039838号</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import KB from "../../assets/image/KB.png";
import { getVisits } from "../../api/visit";
export default {
  name: "BaseFooter",
  data() {
    return {
      KBImg: KB,
      //访客量
      fk: 0,
      //访问量
      fw: 0,
      categorys: [
        {
          path: "/cot",
          category: "学习",
        },
        {
          path: "/cot",
          category: "休闲",
        },
        {
          path: "/timeaxis",
          category: "时间轴",
        },
      ],
      csdn: {
        title: "csdn",
      },
      github: {
        title: "github",
      },
    };
  },
  methods: {
    goto(cate) {
      this.$router.push({
        path: cate.path,
        query: { category: cate.category, flag: 0 },
      });
    },
    goPage(url) {
      window.open(url, "_blank"); // 在新窗口打开外链接
      //window.location.href = url  //在本页面打开外部链接
    },
    getVisits() {
      getVisits().then((res) => {
        this.fk = res.data.fkTotal;
        this.fw = res.data.fwTotal;
      });
    },
  },
  mounted() {
    this.getVisits();
    function secondToDate(second) {
      if (!second) {
        return 0;
      }
      var time = new Array(0, 0, 0, 0, 0);
      if (second >= 365 * 24 * 3600) {
        time[0] = parseInt(second / (365 * 24 * 3600));
        second %= 365 * 24 * 3600;
      }
      if (second >= 24 * 3600) {
        time[1] = parseInt(second / (24 * 3600));
        second %= 24 * 3600;
      }
      if (second >= 3600) {
        time[2] = parseInt(second / 3600);
        second %= 3600;
      }
      if (second >= 60) {
        time[3] = parseInt(second / 60);
        second %= 60;
      }
      if (second > 0) {
        time[4] = second;
      }
      return time;
    }
    function setTime() {
      //mouth要少一个月不然会出问题
      var create_time = Math.round(
        new Date(Date.UTC(2021, 11, 7, 15, 32, 0)).getTime() / 1000
      );
      var timestamp = Math.round(
        (new Date().getTime() + 8 * 60 * 60 * 1000) / 1000
      );
      var currentTime = secondToDate(timestamp - create_time);
      var currentTimeHtml =
        currentTime[0] +
        "年" +
        currentTime[1] +
        "天" +
        currentTime[2] +
        "时" +
        currentTime[3] +
        "分" +
        currentTime[4] +
        "秒";
      if (document.getElementById("htmer_time") != null)
        document.getElementById("htmer_time").innerHTML =
          "网站已运行" + currentTimeHtml;
    }
    //即时刷新
    setInterval(setTime, 1000);
  },
};
</script>

<style scoped>
#footer {
  padding-bottom: 0px;
  min-height: 592px;
}
.kingsbane {
  width: 100%;
  height: 220px;
  font-size: 35px !important;
  /* margin: 80px auto 0px auto; */
  
  padding-top: 140px;
}
.el-image {
  max-height: 75px;
  max-width: 84px;
  margin-left: 50%;
  cursor: pointer;
}
.categorys {
  width: 160px;
  height: 20px;
  margin-top: 30px;
  margin-left: 48.5%;
}
.category {
  float: left;
  font: small;
  cursor: pointer;
  font-weight: normal;
  margin-right: 16px;
  color: rgb(157, 157, 182);
}
.category:hover {
  color: rgb(251, 83, 83);
}
.icons {
  width: 160px;
  height: 70px;
  margin-top: 20px;
  margin-left: 47.8%;
}
.icons i {
  margin-left: 20px;
  cursor: pointer;
}
.icon-csdn {
  font-size: 48px;
}
.icon-github {
  font-size: 55px;
}
a {
  cursor: pointer;
}
a:hover {
  color: rgb(251, 83, 83);
}
.timeandcopyright {
  width: 200px;
  height: 70px;
  margin-top: 30px;
  margin-left: 46.8%;
}
.timeandcopyright p,
a {
  font-size: small;
  font-weight: normal;
  color: rgb(157, 157, 182);
  margin-top: 7px;
  text-align: center;
}
.copyright {
}
.beian {
  margin-left: 37px;
  text-decoration: none;
}
#htmer_time {
}
@font-face {
  font-family: "iconfont"; /* Project id 2966615 */
  src: url("//at.alicdn.com/t/font_2966615_jx6p5sv3j.woff2?t=1637852345634")
      format("woff2"),
    url("//at.alicdn.com/t/font_2966615_jx6p5sv3j.woff?t=1637852345634")
      format("woff"),
    url("//at.alicdn.com/t/font_2966615_jx6p5sv3j.ttf?t=1637852345634")
      format("truetype");
}
</style>
