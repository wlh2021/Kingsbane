<template>
  <transition name="slide-fade">
    <div class="main">
      <!-- <h1 class="wordCloud">标签云</h1> -->

      <div
        id="wordCloud"
        style="height: 600px; width: 100%; background-color: rgb(250, 251, 252)"
      ></div>
    </div>
  </transition>
</template>

<script>
import * as echarts from "echarts";
import "echarts-wordcloud";
export default {
  name: "CardMe",
  data() {
    return {
      echartsData: [
        { value: "30", name: "开发" },
        { value: "29", name: "算法与数据结构" },
        { value: "28", name: "安全" },
        { value: "27", name: "Java" },
        { value: "26", name: "linux" },
        { value: "25", name: "操作系统" },
        { value: "23", name: "前端" },
        { value: "22", name: "游戏" },
        { value: "21", name: "vue" },
        { value: "20", name: "spring" },
        { value: "16", name: "springboot" },
        { value: "15", name: "mysql" },
        { value: "14", name: "redis" },
        { value: "14", name: "生活" },
        {value: "16", name: "数学"}
      ],
    };
  },
  // mounted() {
  //   this.initChart();
  // },
  methods: {
    initChart() {
      const that = this
      var myChart = echarts.init(document.getElementById("wordCloud"));
      const option = {
        title: {
          text: "",
          x: "center",
        },
        backgroundColor: "#fff",
        // tooltip: {
        //   pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
        // },
        series: [
          {
            type: "wordCloud",
            //用来调整词之间的距离
            gridSize: 40,
            //用来调整字的大小范围
            // Text size range which the value in data will be mapped to.
            // Default to have minimum 12px and maximum 60px size.
            sizeRange: [40, 80],
            // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
            //用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
            // rotationRange: [-45, 0, 45, 90],
            // rotationRange: [ 0,90],
            rotationRange: [0, 0],
            //随机生成字体颜色
            // maskImage: maskImage,
            textStyle: {
              color: function () {
                return (
                  "rgb(" +
                  Math.round(Math.random() * 255) +
                  ", " +
                  Math.round(Math.random() * 255) +
                  ", " +
                  Math.round(Math.random() * 255) +
                  ")"
                );
              },
            },
            //位置相关设置
            // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
            // Default to be put in the center and has 75% x 80% size.
            left: "center",
            top: "center",
            right: null,
            bottom: null,
            width: "100%",
            height: "100%",
            //数据
            data: this.echartsData,
          },
        ],
      };
      myChart.setOption(option);
      // 点击某个字
      myChart.on("click", function (params) {
        that.$router.push({
          path: "/cot",
          query: { category: params.data.name, flag: false },
        });
      });
    },
  },
};
</script>

<style scope>
.main {
  margin: 40px 10px 0px 0px;
  background-color: rgb(250, 251, 252) !important;
}
.wordCloud {
  text-align: center;
  font-size: 30px;
  border-bottom: 1px solid black;
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

.slide-fade-enter-active {
  transition: all 2s ease;
}

.slide-fade-leave-active {
  /* transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1); */
  transition: all 2s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(15vh);
  opacity: 0;
}
</style>