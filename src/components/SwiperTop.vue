<template>
    <div id="swiperTop">
        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="image in state.images" :key="image">
                <img :src="image.pic" />
            </van-swipe-item>
        </van-swipe>
    </div>


</template>

<script>

import { getBanner } from '@/request/api/home'
import { onMounted, reactive } from 'vue';

export default {
    setup() {
        const state = reactive({
            images: [
            'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
            'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
        ]})

        onMounted(async ()=>{
            // 直接使用axios请求（未封装
            // axios.get('http://localhost:3000/banner?type=2').then(res=>{
            //     console.log(res);
                
            //     state.images = res.data.banners
            //     console.log(state.images);
            // })

            let res = await getBanner()
            // console.log(res);
            state.images = res.data.banners
        })
        return { state };


    },
}
</script>

<style lang="less" scoped>
#swiperTop {
    .van-swipe {
        widows: 100%;
        height: 150px;

        .van-swipe__track {
            .van-swipe-item {
                // background-color: pink;
                padding: 0 10px;
                img {
                    width: 100%;
                    height: 3rem;
                    border-radius: 10px;
                }
            }

            /deep/.van-swipe__indicator--active{
                background-color: black;
            }
        }

    }
}
</style>