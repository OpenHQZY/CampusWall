<script setup>
import {ref, watch, nextTick} from 'vue'
import {useCounterStore} from '@/stores/counter'
import {useToast} from 'wot-design-uni';

const toast = useToast()

const {safeAreaInsets} = uni.getSystemInfoSync();
const counter = useCounterStore()


function handleClickLeft() {
  uni.navigateBack()
}

const preview_img = (img_list) => {
  uni.previewImage({
    urls: (img_list),
    current: (img_list),
    longPressActions: {
      itemList: [img_list],
      success: function (data) {
      },
      fail: function (err) {
      }
    }
  })
}
</script>

<template>
  <view :style="{ paddingTop: safeAreaInsets.top+0 + 'px' }" class="div-root">
    <wd-navbar fixed title="最新校历" left-text="返回" left-arrow safeAreaInsetTop
               @click-left="handleClickLeft"></wd-navbar>
    <image
        class="div1-wd-img"
        src="/static/link_calendar/calendar.png"
        @click="preview_img(['/static/link_calendar/calendar.png'])"
    />
  </view>
</template>

<style scoped lang="scss">

.div1-wd-img {
  margin-top: 20rpx;
  width: 100vw;
  height: 2100rpx;
}

.div-root {
  width: 100vw;
  display: flex;
  flex-direction: column;
  background: white;
}
</style>