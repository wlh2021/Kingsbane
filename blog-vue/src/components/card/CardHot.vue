<template>
        <div style="margin:40px 10px 0px 0px">
            
                <h1 class="title">最热文章</h1>
                <ul>
                    <li class="blog" @click="view(blog.id)" v-for="blog in hotblogs" :key="blog.id">
                        <a>{{ blog.title }}</a>
                    </li>
                </ul>
        </div>
</template>

<script>
export default {
    namd: "CardHot",
    props: ['hotblogs'],
    data() {
        return {
        }
    },
    ceeated() {
    },
    methods: {
        view(id) {
            this.$router.push({ path: `/view/${id}` })
        },
    }
}
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
.blog:hover{
    color: rgb(251, 83, 83);
}
a{
    color: black;
}
a:hover{
    color: rgb(251, 83, 83);
}
h1{
    cursor:default;
}
</style>