<script setup>
import {ref} from 'vue'
import {useCounterStore} from '@/stores/counter'
import {useToast} from 'wot-design-uni';

const toast = useToast()
const {safeAreaInsets} = uni.getSystemInfoSync();
const counter = useCounterStore()
</script>

<template>
  <view class="div-root">
    <view :style="{ paddingTop: safeAreaInsets.top+0 + 'px' }" class="div-head">
      <view>消息</view>
    </view>
    <view class="div1">
      <view class="div1-1">
        <image src="@/static/message/comment.png" class="div1-1-img"></image>
        <text class="div1-1-txt">点赞我的</text>
        <view class="div1-1-ico">
          <wd-icon name="arrow-right" size="18px"></wd-icon>
        </view>
      </view>
      <view class="div1-1" style="margin-left: 30rpx">
        <image src="@/static/message/star.png" class="div1-1-img"></image>
        <text class="div1-1-txt">评论我的</text>
        <view class="div1-1-ico">
          <wd-icon name="arrow-right" size="18px"></wd-icon>
        </view>
      </view>
    </view>
  </view>
  <view class="div2">
    <view class="div2-disable">
      <text class="div2-disable-txt">
        您暂时还没有被评论消息~
      </text>
    </view>
  </view>
</template>

<style scoped lang="scss">

.div2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;

  .div2-disable {
    color: #999999;
    font-size: 30rpx;
    margin-top: 500rpx;
  }
}

.div1 {
  display: flex;
  flex-direction: row;
  align-items: center;

  .div1-1 {
    width: 300rpx;
    height: 120rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    border-radius: 10rpx;
    background: white;
    border: solid 1px rgb(230, 230, 230);
    margin-bottom: 20rpx;
  }

  .div1-1-img {
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
  }

  .div1-1-txt {
    margin-left: 20rpx;
  }

  .div1-1-ico {
    margin-top: 5rpx;
  }
}

.div-root {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  background: rgb(243, 244, 245);
}

.div-head {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 35rpx;
  font-weight: bold;
  height: 85rpx;
  position: sticky; /* Makes the header sticky */
  top: 0; /* Positions it at the top of the viewport */
  z-index: 1000; /* Ensures it stays above other content */
  background-color: white; /* Optional: Set a background color */
}
</style>