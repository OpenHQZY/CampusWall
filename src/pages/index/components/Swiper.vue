<script setup>
import {ref} from 'vue';

const {safeAreaInsets} = uni.getSystemInfoSync();
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()

const current = ref(0)

const swiperList = ref([
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/redpanda.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/capybara.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/panda.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/moon.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/meng.jpg'
])

function handleClick(e) {
  console.log(e)
}

function onChange(e) {
  console.log(e)
}
</script>

<template>
  <view class="div-root">
    <view class="div1">
      <wd-swiper
          :list="swiperList" autoplay
          v-model:current="current"
          :indicator="{ type: 'dots-bar' }"
          @click="handleClick" @change="onChange">
      </wd-swiper>
    </view>
  </view>
</template>

<style scoped lang="scss">
.div1 {
  position: relative;
  top: 200rpx;
  width: 700rpx;
  height: 525rpx;
}

.div-root {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>