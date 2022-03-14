<template>
    <div id="maskContainer"  v-if="flag">
        <i
            @click="shutdown()"
            class="iconfont icon-guanbi"
            style="z-index: 1000; color: rgb(250, 251, 252);font-weight:bolder;float:right;margin: 20px 20px"
        ></i>
        <div class="sosuo">
            <input class="sosouk" type="text" placeholder="搜索" v-model="mySearch" />
            <i
                class="iconfont icon-icon_sousuo-mian"
                style="color:blue;width:20%;font-size:50px"
                @click="search()"
            ></i>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Mask',
    data() {
        return {
            mySearch: '',
            flag: this.$store.state.maskFlag,
        }
    },
    methods: {
        //关闭遮蔽层
        shutdown() {
            this.$store.commit('changeMaskFlag')
        },
        //搜索
        search() {
            this.$router.push({ path: `/cot/${this.mySearch}`, query: { category: this.mySearch, flag: true } })
            this.shutdown()
        },
    },
    watch: {
        '$store.state.maskFlag'(newVal, oldVal) {
            //对数据进行操作
            this.flag = newVal
        },
    }
}
</script>

<style scoped>
#maskContainer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(23, 26, 30);
    opacity: 0.5;
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
    caret-color: red;
    float: left;
}
/* placeholder的设置 */
::-webkit-input-placeholder {
    color: white;
    font-size: 50px;
}
</style>