<script setup>
import {ref} from 'vue'
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()


</script>
<template>
  <view class="div-root">
    <navigator url="/pages/notice/notice" hover-class="none">
      <wd-notice-bar prefix="sound" :text="counter.index_notice_text[0][1]" :delay="3"
                     color="black"
                     background-color="white"
                     custom-class="space"/>
    </navigator>
  </view>
</template>

<style scoped lang="scss">
.div-root {
  position: relative;
  top: 290rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

