<template>
    <transition name="slide-fade">
        <div v-show="show" style="margin:40px 10px 0px 0px">
            <h1 class="title">最新文章</h1>
            <ul>
                <li class="blog" @click="view(blog.id)" v-for="blog in newblogs" :key="blog.id">
                    <a>{{ blog.title }}</a>
                </li>
            </ul>
        </div>
    </transition>
</template>

<script>
export default {
    namd: "CardNews",
    props: ['newblogs'],
    data() {
        return {
            show: true
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
li {
    list-style-type: none;
}
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
    margin-bottom: 5px;
}
.slide-fade-enter-active {
    transition: all 2s ease;
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