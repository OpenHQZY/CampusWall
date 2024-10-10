<script setup>
import {ref} from 'vue'
import {useCounterStore} from '@/stores/counter'
import {notice} from '@/api/notice.js';
import {useToast} from 'wot-design-uni';

const toast = useToast()
const counter = useCounterStore()
const get_data = () => {
  notice()
      .then(res => {
        if (res.code !== 1) {
          toast.warning(res.msg)
        } else {
          counter.index_notice_text = []
          counter.index_notice_text = res.data
        }
      })
      .catch(error => {
        // 处理登录失败的情况
        toast.error('服务器异常')
      });
}
get_data()

</script>
<template>
  <view class="div-root">
    <navigator url="/pages/notice/notice" hover-class="none">
      <wd-notice-bar prefix="sound"
                     v-if="counter.index_notice_text.length > 0"
                     :text="counter.index_notice_text[0].noticeContent" :delay="3"
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

