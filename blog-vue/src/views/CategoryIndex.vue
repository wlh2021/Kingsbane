<template>
  <div class="index" v-loading="loading">
      
        <el-container>
            <el-main width=70% margin-right=0px margin-top=20px>
                <category-blog-item ref = "child" :flag ="flag"   :categoryOrTag ="categoryOrTag"></category-blog-item>
            </el-main>
        </el-container>
    </div>
</template>

<script>

import CategoryBlogItem from '../components/article/CategoryBlogItem.vue'
export default {
    name:"CategoryIndex",
    components:{
    CategoryBlogItem,
},
    data(){
        
        return {
            categoryOrTag:this.$route.query.category,
            flag:this.$route.query.flag
        }
    },
    methods:{
    },
    watch:{
        '$route' (to,from){
            this.categoryOrTag = this.$route.query.category
            this.flag = this.$route.query.flag
            //this.$refs.child.load();
            
        }
    }
}
</script>

<style scoped>
</style>