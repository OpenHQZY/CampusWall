<script setup>
import {ref} from 'vue';


const {safeAreaInsets} = uni.getSystemInfoSync();
</script>

<template>
  <view :style="{ paddingTop: safeAreaInsets.top+0 + 'px' }" class="div-root">
    <view class="div1">
      <image src="@/static/index/head.png" class="div1-img"></image>
      <text class="div1-txt">湖汽万能墙</text>
    </view>
    <view class="div2">
      <view class="div2-ico">
        <wd-icon name="search" color="#a0a0a0" size="2vh"/>
      </view>
      <text class="div2-txt">搜索帖子</text>
    </view>
  </view>
</template>

<style lang="scss">
.div1 {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  left: 10rpx;

  .div1-img {
    width: 70rpx;
    height: 70rpx;
    border-radius: 50%;
  }

  .div1-txt {
    position: relative;
    left: 5rpx;
    font-size: 45rpx;
    font-weight: bold;
  }
}

.div2 {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 25rpx;
  height: 50rpx;
  width: 200rpx;
  border-radius: 30rpx;
  background-color: rgb(238, 238, 238);

  .div2-ico {
    display: flex;
    align-items: center;
    position: relative;
    left: 25rpx;
  }

  .div2-txt {
    position: relative;
    left: 35rpx;
    font-size: 25rpx;
    color: rgb(176, 176, 176);
  }
}


.div-root {
  display: flex;
  height: 85rpx;
  flex-direction: row;
  align-items: center;
}
</style>