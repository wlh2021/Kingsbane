<template>
  <div class="dashboard-container">
    主页
    <h1>网站访问量:{{ visits}}</h1>
    <!-- <div class="dashboard-text">name:{{ name }}</div>
    <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data(){
    return{
    }
    
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ]),
     visits() {
      return this.$store.state.website.visits
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
