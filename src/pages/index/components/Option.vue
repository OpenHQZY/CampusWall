<script setup>
import {ref} from 'vue';

const {safeAreaInsets} = uni.getSystemInfoSync();
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
const open_link = (data) => {
  if (data.link_type === "miniProgram") {
    uni.navigateToMiniProgram({
      appId: data.link_appid,
      success(res) {
      },
      fail(err) {
        console.log(err)
        // 打开失败/取消
        uni.showToast({
          title: '跳转失败'
        })
      }
    })
  } else if (data.link_type === "page") {
    uni.navigateTo({
      url: data.link_page
    });
  }

}
</script>

<template>
  <view class="div0" v-show="counter.index_glide_loading">
    <wd-loading :size="17"/>
    <view>&nbsp;正在刷新数据</view>
  </view>
  <view class="div-root">
    <view class="div1">
      <view class="div1-1" v-for="(data) in counter.index_link_options" :key="data.link_id"
            @click="open_link(data)">
        <image :src="data.link_head" class="div1-img"></image>
        <text class="div1-txt">{{ data.link_name }}</text>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.div0 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 175rpx;
  width: 100vw;
  margin-top: 10rpx;
  margin-bottom: 10rpx;
}

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