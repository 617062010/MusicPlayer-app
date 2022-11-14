<template>
  <div class="footer">
    <div class="left" @click="updateSongDetailShow">
      <img :src="songList[songListIndex].al.picUrl" alt="" class="img">
      <div>
        <p>{{ songList[songListIndex].name }}</p>
        <span>横滑切换上下首</span>
      </div>
    </div>
    <div class="right">
      <svg class="icon" aria-hidden="true" @click="play" v-show="isPlay">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="play" v-show="!isPlay">
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-caidan"></use>
      </svg>
    </div>

    <audio ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${songList[songListIndex].id}.mp3 `"></audio>

    <!-- 弹出层 -->
    <van-popup v-model:show="songDetailShow" position="bottom" :style="{ height: '100%', width: '100%' }">
      <songDetail :songPlay="songList[songListIndex]" :play="play"></songDetail>
    </van-popup>

  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import SongDetail from '@/components/item/SongDetail.vue'
export default {
  components: {
    SongDetail
  },

  computed: {
    ...mapState(['songList', 'songListIndex', 'isPlay', 'songDetailShow'])
  },
  methods: {
    play() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play()
        this.updateIsPlay(false)
        // console.log(this.isPlay);
      }
      else {
        this.$refs.audio.pause()
        this.updateIsPlay(true)
        // console.log(this.isPlay);
      }



      // this.$refs.audio.play()

    },
    pause() {
      this.$refs.audio.pause();
    },


    ...mapMutations(['updateIsPlay', 'updateSongDetailShow'])
  },
  
  mounted() {
    this.$store.dispatch('getLyric',this.songList[this.songListIndex].id)

    console.log(this.$refs);
    // console.log(this.isPlay);
    // console.log(this.songDetailShow);
  },
  updated(){
    this.$store.dispatch('getLyric',this.songList[this.songListIndex].id)
    console.log(this.$refs.audio.currentTime);
  },
  watch: {
    songListIndex() {  // 切歌之后自动播放
      this.$refs.audio.play()
      this.$refs.audio.autoplay = true
      if (this.$refs.audio.paused) {
        this.updateIsPlay(false)
      }
    },
    songList() {
      if (this.isPlay) {
        this.$refs.audio.autoplay = true
        this.updateIsPlay(false)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.footer {
  width: 100%;
  height: 1.4rem;
  background-color: white;
  position: fixed;
  border-top: 1px solid #999;
  bottom: 0;
  z-index: 1;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;

  .left {
    width: 60%;
    height: 100%;
    // border: .3rem;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .img {
      border-radius: 50%;
      width: 1rem;
      height: 1rem;
    }
  }

  .right {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .icon {
      width: .6rem;
      height: .6rem;
    }
  }
}
</style>