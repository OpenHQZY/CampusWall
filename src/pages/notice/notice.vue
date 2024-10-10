<script setup>
import {ref} from 'vue'
import {useCounterStore} from '@/stores/counter'
import {notice} from '@/api/notice.js';

const {safeAreaInsets} = uni.getSystemInfoSync();
const counter = useCounterStore()
import {useToast} from 'wot-design-uni';

const toast = useToast()
function handleClickLeft() {
  uni.navigateBack()
}

function copyText(text) {
  uni.setClipboardData({
    data: text,
    success: () => {
      uni.showToast({
        title: '复制成功',
        icon: 'success'
      });
    }
  });
}

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
  <view :style="{ paddingTop: safeAreaInsets.top+0 + 'px' }" class="div-root">
    <wd-navbar title="公告" left-text="返回" left-arrow @click-left="handleClickLeft"></wd-navbar>
    <view class="div1-flex" v-for="(item) in counter.index_notice_text" :key="item.noticeId">
      <view class="div1" @longpress="() => copyText(item.noticeContent)">
        <view class="div1-left">
          <text class="div1-left-txt">{{ item.noticeId }}</text>
        </view>
        <view class="div1-right">
          <wd-text
              :text="item.noticeContent"
              color="black"
              class="div1-right-txt"
          ></wd-text>
          <text class="div1-right-time">{{ item.noticeTime }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.div1-flex {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .div1 {
    display: flex;
    flex-direction: row;
    width: 650rpx;
    padding: 25rpx;
    background: white;
    border-bottom: solid 0.5px #e3e3e3;

    .div1-left {
      display: flex;

      .div1-left-txt {
        font-size: 35rpx;
        color: rgb(144, 147, 153);
      }
    ;
    }

    .div1-right {
      display: flex;
      flex-direction: column;
      margin-left: 40rpx;;

      .div1-right-time {
        margin-top: 8rpx;
        color: rgb(172, 172, 172);
        font-size: 25rpx;
      }
    ;
    }
  }
}
</style>