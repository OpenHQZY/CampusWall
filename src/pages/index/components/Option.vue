<script setup>
import {ref} from 'vue';

const {safeAreaInsets} = uni.getSystemInfoSync();
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
const open_link = (url) => {
  uni.navigateTo({
    url: '/pages/webview/webview?url=' + url
  })
}
</script>

<template>
  <view class="div-root">
    <view class="div1">
      <view class="div1-1" v-for="(item, index) in counter.index_link_options" :key="item[0]"
            @click="open_link(item[2])">
        <image :src="item[3]" class="div1-img"></image>
        <text class="div1-txt">{{ item[1] }}</text>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.div1 {
  display: flex;
  flex-direction: row;
  position: relative;
  top: 185rpx;
  width: 700rpx;
  height: 120rpx;
  border-radius: 15rpx;
  background-color: white;
  align-items: center;
  justify-content: space-evenly;

  .div1-1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .div1-img {
    width: 70rpx;
    height: 70rpx;
    border-radius: 50%;
    }

    .div1-txt {
      font-size: 20rpx;
    }
  }
}

.div-root {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>