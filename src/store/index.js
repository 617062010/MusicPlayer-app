
import { createStore } from 'vuex'
import {getSongLyric} from '@/request/api/item';
export default createStore({
  state: {
    songList: [{
      name: "画",
      id: 202369,
      al: {
        id: 20339,
        name: "赵小雷",
        pic: 18876415625841068,
        picUrl: "https://p2.music.126.net/wldFtES1Cjnbqr5bjlqQbg==/18876415625841069.jpg"
      }
    }],
    songListIndex: 0,
    urlList: [{
      data: {
        url: "http://m8.music.126.net/20221113181416/ed796ad38793266564bc50d7530babf8/ymusic/b1a6/171b/d9f5/69e51eeba959db1c9945326fc16067c1.mp3",
      }
    }],
    isPlay: true, //
    songDetailShow: false, //歌曲播放详情页
    lyric:{}, //歌词

  },
  getters: {
  },
  mutations: {
    updateIsPlay(state, value){
      state.isPlay = value
    },
    updateSongList(state, value){
      state.songList = value
      // console.log(state.songList);
    },
    updateSongListIndex(state, value){
      state.songListIndex = value
    },
    updateSongDetailShow(state){
      state.songDetailShow = !state.songDetailShow
      // console.log(state.songDetailShow);
    },
    updateLyric(state, value){
      state.lyric = value;
    }
  },
  actions: {
    async getLyric(context, value){
      let res = await getSongLyric(value)
      // console.log(res);
      context.commit('updateLyric', res.data.lrc)
    },

  },
  modules: {
  }
})
