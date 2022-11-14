<template>
    <div class="musicList">
        <div class="musicTop">
            <div class="title">发现好歌单</div>
            <div class="more">查看更多</div>
        </div>
        <div class="musicContent">
            <van-swipe :loop="false" :width="150" class="swiper" :show-indicators="false">
                <van-swipe-item v-for="item in state.musicList" :key="item">
                    <router-link :to="{ path: '/itemMusic',query: {id:item.id} }">
                        <img :src="item.picUrl" alt="" />
                        <span class="playCount">
                            <svg class="icon" aria-hidden="true" style="display:inline">
                                <use xlink:href="#icon-bofang1"></use>
                            </svg>
                            {{ changeCount(item.playCount) }}
                        </span>
                        <span class="name">{{ item.name }}</span>
                    </router-link>
                </van-swipe-item>

            </van-swipe>

        </div>
    </div>
</template>
<!-- 
<script>
import { getMusicList } from '@/request/api/home'
export default {
    data() {
        return {
            musicList: []
        }
    },
    methods: {
        async gedan() {
            let res = await getMusicList();
            console.log(res);
            this.musicList = res.data.result
        },
         changeCount(num){
            if(num>100000000){
                return (num/100000000).toFixed(1) + '亿'
            }
            if(num>10000){
                return (num/10000).toFixed(1) + '万'
            }
         }
    },
    mounted() {
        this.gedan()
    }
}
</script> -->
<script>
import { getMusicList } from '@/request/api/home';
import { reactive, onMounted } from 'vue';
export default {
    setup() {
        const state = reactive({
            musicList: [],
        })
        function changeCount(num) {
            if (num > 100000000) {
                return (num / 100000000).toFixed(1) + '亿'
            }
            if (num > 10000) {
                return (num / 10000).toFixed(1) + '万'
            }
        }
        onMounted(async () => {
            let res = await getMusicList();
            // console.log(res);
            state.musicList = res.data.result;
        })
        return { state, changeCount }
    }
}
</script>
<style lang="less" scoped>
.musicList {
    width: 100%;
    height: 100%;
    padding: 0.2rem;

    .musicTop {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: .2rem;

        .title {
            font-size: 0.4rem;
            font-weight: 900;
        }

        .more {
            border: 1px solid #ccc;
            text-align: center;
            line-height: .6rem;
            padding: 0 0.2rem;
            border-radius: .4rem;
        }
    }

    .musicContent {

        width: 100%;
        height: 200px;

        .swiper {
            height: 100%;
            font-size: 0.2rem;

            img {
                padding-right: 10px;
                border-radius: .4rem;
                width: 100%;
                height: 80%;
                z-index: 1;
            }

            .playCount {
                display: inline;
                // background-color: green;
                position: absolute;
                left: -30px;
                // float: right;
                // top: -100px;
                z-index: 2;
            }
        }
    }
}
</style>