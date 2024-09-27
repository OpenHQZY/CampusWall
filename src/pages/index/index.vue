<script setup>
import {ref} from 'vue';
import Head from './components/Head.vue';
import Option from './components/Option.vue';
import Swiper from './components/Swiper.vue';
import Notice from './components/Notice.vue';
import Content from './components/Content.vue';

wx.showShareMenu({
  withShareTicket: true,
  menus: ["shareAppMessage", "shareTimeline"]
})

</script>


<template>
  <view class="container">
    <Head class="header"></Head>
    <Option></Option>
    <Swiper></Swiper>
    <Notice></Notice>
    <Content></Content>
  </view>
</template>

<style lang="scss">
.wd-notice-bar.data-v-054fedbb {
  width: 700rpx !important;
}

/* ------ 改背景色 ------ */
.wd-tabs__nav.data-v-c72f40b5 {
  background: rgb(243, 243, 243) !important;
}

.wd-tabs.data-v-c72f40b5 {
  background: rgb(243, 243, 243) !important;
}

.wd-tab__body .data-v-5022d6ed {
  background: rgb(243, 243, 243) !important;
}

.data-v-5022d6ed .wd-tab {
  background: rgb(243, 243, 243) !important;
}

.data-v-c72f40b5 .wd-tabs__body .is-animated {
  background: rgb(243, 243, 243) !important;
}

.wd-tabs__container .data-v-c72f40b5 {
  background: rgb(243, 243, 243) !important;
}

.data-v-c7f00bc1 .data-v-c7f00bc1 .wd-sticky {
  background: rgb(243, 243, 243) !important;
}

/* ------ 改背景色 ------ */
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: rgb(243, 243, 243);
}

.header {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10000;
  background-color: rgb(243, 243, 243);
}
</style>
