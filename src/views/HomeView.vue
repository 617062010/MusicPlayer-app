<template>
  <div class="home">
    <TopNavVue></TopNavVue>
    <swiper-top></swiper-top>
    <icon-list></icon-list>
    <MusicList></MusicList>
    </div>
</template>

<script>
// @ is an alias to /src
import TopNavVue from '@/components/TopNav.vue';
import SwiperTop from '@/components/SwiperTop.vue';
import IconList from '@/components/IconList.vue';
import MusicList from '@/components/MusicList.vue'

export default {
  name: 'HomeView',
  components: {
    TopNavVue,
    SwiperTop,
    IconList,
    MusicList
  }
}
</script>
<style lang="less" scoped>
.home{
  background-color: pink;
}
</style>