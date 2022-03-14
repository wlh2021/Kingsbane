<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    window.addEventListener("beforeunload", (e) => this.beforeunloadHandler(e));
  },
  methods: {
    // Visits(num) {
    //   this.$store.dispatch("Visits", num);
    // },
    beforeunloadHandler(e) {
      if (this.$route.path == "/edit") {
        console.log(this.$route.path);
        this._beforeUnload_time = new Date().getTime();
        e.preventDefault();
        e = e || window.event;
        if (e) {
          e.returnValue = "关闭提示";
        }
        return "关闭提示";
      }
    },
  },
};
</script>

<style>
body .el-table th.gutter {
  display: table-cell !important;
}

label {
  font-weight: 700;
}
</style>
