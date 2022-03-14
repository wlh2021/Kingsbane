<template>
  <div style="margin: 40px 10px 0px 0px">
    <h1 class="title">天气预报</h1>
    <div id="he-plugin-standard"></div>
  </div>
</template>

<script>
export default {
  namd: "CardWeather",
  data() {
    return {};
  },
  created() {
    window.WIDGET = {
      CONFIG: {
        layout: "1",
        // width: "450",
        // height: "150",
        background: "1",
        dataColor: "FFFFFF",
        key: "b3bd5c2dbc414e89bf5d25a616e2b538",
      },
    };
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0';
    document.getElementsByTagName('head')[0].appendChild(script);
  },
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
.blog {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0px auto 5px 5px;
}
.blog:hover {
  color: rgb(251, 83, 83);
}
a {
  color: black;
}
.weiboname:hover {
  color: rgb(251, 83, 83);
}
h1,
.hot {
  cursor: default;
}
.hot {
  float: right;
  margin-right: 15px;
}
</style>