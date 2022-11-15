<template>
    <div class="main">
        <div class="head">

            <span class="left">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang"></use>
                </svg>
                <span class="w1">播放全部
                    <span class="w2">共{{ songList.length }}首</span>
                </span>
            </span>
            <span class="right">+ 收藏</span>

        </div>
        <div class="list">
            <div v-for="(item, i) in songList" :key="i">
                <div class="songBlock" @click="playTheSong(i)">
                    <span class="li">{{ i + 1 }}</span>
                    <span class="songInfo">
                        <span class="songName">{{ item.name }}</span>
                        <!-- 读取作者，可能有很多个作者 -->
                        <span v-for="(item1, index1) in item.ar" :key="index1" class="singger">{{ item1.name }}. </span>
                    </span>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
import { mapMutations } from 'vuex'

export default {
    setup(props) {

        if ((props.songList = '')) {
            props.songList = JSON.parse(sessionStorage.getItem().playList).songList
            props.urlList = JSON.parse(sessionStorage.getItem().playList).urlList
            // props.urlList = JSON.parse(sessionStorage.getItem().urlList)

        }


        // console.log(props.songList.length);
        // console.log(props);
        // console.log(props.songList,props.urlList);
        // console.log(props.songList[1].ar);

    },
    props: ['songList', 'urlList'],
    methods: {
        playTheSong(i) {
            this.updateSongList(this.songList)
            this.updateSongListIndex(i)
        },
        ...mapMutations(['updateSongList','updateSongListIndex'])
    }

}
</script>

<style lang="less" scoped>
.main {
    height: 100%;
    width: 100%;
    background-color: white;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    padding: 20px;

    .head {
        width: 100%;
        height: 1rem;
        // background-color: pink;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
            width: 3rem;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .icon {
                border: 10px;
            }

            .w1 {
                font-weight: 700;

            }

            .w2 {
                font-weight: 400;
                color: gray;
                font-size: 0.24rem;
            }

        }

        .right {
            width: 2rem;
            height: 100%;
            background-color: red;
            color: white;
            border-radius: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
        }
    }

    .list {

        width: 100%;
        border: .2rem;


        .songBlock {
            height: 1rem;
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: baseline;

            .li {
                height: 100%;
                width: 0.5rem;
                border: .4rem;
                font-weight: 500;
                // background-color: pink;
            }

            .songInfo {
                // background-color: aquamarine;
                border: .4rem;
                display: flex;
                flex-wrap: wrap;
                flex-direction: row;

                // display: inline-block;
                .songName {
                    font-weight: 500;
                    font-size: .3rem;
                    width: 100%;
                    display: inline-block;
                }

                .singger {
                    display: inline;
                    display: flex;
                    font-size: .2rem;
                    font-weight: 200;
                    color: gray;
                }
            }

        }
    }
}
</style>