<template>
    <div>
        <img :src="songPlay.al.picUrl" alt="" class="bgimg">
        <div class="head">
            <div class="headLeft">
                <svg class="icon" aria-hidden="true" @click="updateSongDetailShow">
                    <use xlink:href="#icon-zuojiantou"></use>
                </svg>

            </div>
            <div class="songName">
                <Vue3Marquee>
                    <p>{{ songPlay.name }}</p>
                </Vue3Marquee>
                <span v-for="item in songPlay.ar" :key="item">{{ item.name }}</span>
            </div>
            <div class="headRight">
                <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                    <use xlink:href="#icon-fenxiang"></use>
                </svg>
            </div>
        </div>


        <div class="content" v-show="false">
            <img src="../../assets/cizhen.png" alt="" class="cizhen" :class="{ cizhen_active: !isPlay }">
            <img src="../../assets/yuanpan.png" alt="" class="cipan">
            <img :src="songPlay.al.picUrl" alt="" class="cover"
                :class="{ cover_active: !isPlay, cover_paused: isPlay }">

        </div>

        <div class="lyric">
            <p v-for="item in opLyric" :key="item" :class="{
                active:
                    currentTime * 1000 >= item.time && currentTime * 1000 < item.pre,
            }">
                {{ item.lrc }}
            </p>
        </div>

        <div class="footer">
            <div class="f1">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xihuan1"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiazai"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-pinglun"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang"></use>
                </svg>

            </div>
            <div class="f2"></div>
            <div class="f3">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shangyishou"></use>
                </svg>
                <svg class="icon" aria-hidden="true" @click="play" v-show="isPlay">
                    <use xlink:href="#icon-bofang"></use>
                </svg>
                <svg class="icon" aria-hidden="true" @click="play" v-show="!isPlay">
                    <use xlink:href="#icon-zanting"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiayishou"></use>
                </svg>
            </div>

        </div>

    </div>
</template>

<script>
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { mapMutations, mapState } from 'vuex';
export default {

    components: {
        Vue3Marquee
    },
    props: ['songPlay', 'play'],
    computed: {
        ...mapState(['songDetailShow', 'isPlay', 'lyric']),


        // 处理歌词数据格式
        opLyric: function () {
            let arr;
            if (this.lyric.lyric) {
                arr = this.lyric.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
                    let min = item.slice(1, 3);
                    let sec = item.slice(4, 6);
                    let ms = item.slice(7, 10);
                    let lrc = item.slice(11, item.length);
                    let time =
                        parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(ms);
                    if (isNaN(Number(ms))) {
                        ms = item.slice(7, 9);
                        lrc = item.slice(10, item.length);
                        time =
                            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(ms);
                    }
                    console.log(min, sec, Number(ms), lrc);
                    return { min, sec, ms, lrc, time };
                });
                arr.forEach((item, i) => {
                    if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
                        item.pre = 100000;
                    } else {
                        item.pre = arr[i + 1].time;
                    }
                });
            }
            // console.log(arr);
            return arr;
        },
    },
    methods: {
        ...mapMutations(['updateSongDetailShow'])
    },
    mounted() {
        // console.log(this.songPlay);
    }
}
</script>

<style lang="less" scoped>
.bgimg {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    filter: blur(70px);


}

.head {
    height: 1rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .2rem;
    border-top: .2rem;

    .headLeft {
        display: flex;
        align-items: center;

        svg {
            width: .6rem;
            height: .6rem;
            margin-left: .3rem;
            border: .2rem;
        }


    }

    .songName {
        width: 60%;
        height: 100%;


        span {
            display: flex;
            justify-content: center;
            color: #999;
            font-size: 0.1rem;
        }
    }

    .headRight {
        svg {
            width: .6rem;
            height: .6rem;
            margin-right: .3rem;
            border: .2rem;
        }
    }

}

.content {
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .cizhen {
        width: 2.4rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(-10deg);
        transition: all 2s;
    }

    .cizhen_active {
        width: 2rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(0deg);
        transition: all 2s;
    }

    .cipan {
        width: 5rem;
        height: 5rem;
        position: absolute;
        bottom: 2.3rem;
        z-index: -1;
    }

    .cover {
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
        position: absolute;
        bottom: 3.14rem;
        animation: rotate_ar 10s linear infinite;

    }

    .cover_active {
        animation-play-state: running;
    }

    .cover_paused {
        animation-play-state: paused;
    }

    @keyframes rotate_ar {
        0% {
            transform: rotateZ(0deg);
        }

        100% {
            transform: rotateZ(360deg);
        }
    }
}

.lyric{
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    overflow: scroll;
    p{
        color: rgb(109, 107, 107);
        margin-bottom: 0.3rem;

    }
}

.footer {
    width: 100%;
    height: 3rem;
    position: absolute;
    bottom: 0.2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .f1 {
        // background-color: white;
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .f3 {
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
}
</style>