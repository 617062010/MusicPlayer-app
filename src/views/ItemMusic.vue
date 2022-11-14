<template>
    <ItemMusicTop :playList="state.playList"/>
    <item-music-list :songList="state.songList" :urlList="state.urlList"></item-music-list>
</template>

<script>
import { onMounted, reactive } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import { getMusicItem, getSongUrl ,getSongDetail} from '@/request/api/item'
import itemMusicTop from '@/components/item/itemMusicTop.vue'
import ItemMusicList from '@/components/item/itemMusicList.vue';
export default {
    setup(){
        const state = reactive({
            playList: {},//歌单详情页
            songList:[],//歌曲列表
            urlList: {}
        })
        onMounted(async()=>{
            let id = useRoute().query.id
            let res = await getMusicItem(id)
            // console.log(id,res);

            // 获取歌单详情页
            state.playList = res.data.playlist
            // console.log(res.data);


            // 获取歌单。歌单里的歌trackID是个数组
            let musicId = res.data.playlist.trackIds;
            // console.log(musicId);//是个数组对象，歌单里关于每个歌曲的信息

            let arr_music_id = [];// 提取出数组中每个对象里的id，放在一个数组中
            musicId.forEach((item, index) => {
                arr_music_id[index] = item.id
            });
 
            // 获取音乐url
            let songUrl = await getSongUrl(arr_music_id)
            // console.log(songUrl);

            // 获取音乐信息
            let songDetail = await getSongDetail(arr_music_id)
            // console.log(songDetail);

            // 传参
            state.songList = songDetail.data.songs
            state.urlList = songUrl.data
            // 为了防止页面刷新后的数据丢失（因为先渲染，后读取数据），将数据保存在sessionStorag里面
            sessionStorage.setItem('itemDetail',JSON.stringify(state))
        })
        return { state}
    },
    components:{
        itemMusicTop,
        ItemMusicList
    }
}
</script>

<style>

</style>