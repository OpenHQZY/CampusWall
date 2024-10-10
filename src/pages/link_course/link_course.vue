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

const savePosterPath = (url) => {
  uni.showLoading({
    title: '正在保存图片...'
  });
  //获取用户的当前设置。获取相册权限
  uni.getSetting({
    success: (res) => {
      //如果没有相册权限
      if (!res.authSetting["scope.writePhotosAlbum"]) {
        //向用户发起授权请求
        uni.authorize({
          scope: "scope.writePhotosAlbum",
          success: () => {
            //授权成功保存图片到系统相册
            uni.saveImageToPhotosAlbum({
              //图片路径，不支持网络图片路径
              filePath: url,
              success: (res) => {
                uni.hideLoading();
                return uni.showToast({
                  title: "保存成功！",
                });
              },
              fail: (res) => {
                console.log(res.errMsg);
                return uni.showToast({
                  title: res.errMsg,
                });
              },
              complete: (res) => {
                uni.hideLoading();
              },
            });
          },
          //授权失败
          fail: () => {
            uni.hideLoading();
            uni.showModal({
              title: "您已拒绝获取相册权限",
              content: "是否进入权限管理，调整授权？",
              success: (res) => {
                if (res.confirm) {
                  //调起客户端小程序设置界面，返回用户设置的操作结果。（重新让用户授权）
                  uni.openSetting({
                    success: (res) => {
                      console.log(res.authSetting);
                    },
                  });
                } else if (res.cancel) {
                  return uni.showToast({
                    title: "已取消！",
                  });
                }
              },
            });
          },
        });
      } else {
        //如果已有相册权限，直接保存图片到系统相册
        uni.saveImageToPhotosAlbum({
          filePath: url,
          success: (res) => {
            uni.hideLoading();
            return uni.showToast({
              title: "保存成功！",
            });
          },
          fail: (res) => {
            uni.hideLoading();
            console.log(res.errMsg);
            return uni.showToast({
              title: res.errMsg,
            });
          },
          //无论成功失败都走的回调
          complete: (res) => {
            uni.hideLoading();
          },
        });
      }
    },
    fail: (res) => {
    },
  });
};

const copyBtn = (txt) => {
  wx.setClipboardData({
    data: txt,
    success: function () {
      wx.getClipboardData({
        success: function () {
          wx.showToast({
            title: '复制成功'
          });
        }
      });
    }
  });
}
</script>

<template>
  <view :style="{ paddingTop: safeAreaInsets.top+0 + 'px' }" class="div-root">
    <wd-navbar fixed title="湖汽课表" left-text="返回" left-arrow safeAreaInsetTop
               @click-left="handleClickLeft"></wd-navbar>
    <view class="div1">
      <view class="div1-1">网址</view>
      <view class="div1-2">{{ counter.link_course_url}}</view>
      <wd-button block @click="copyBtn(counter.link_course_url)">点击复制</wd-button>

    </view>
    <view class="div2">
      <view class="div2-1">二维码</view>
      <image class="div2-2" :src="counter.link_course_or_code"></image>
      <wd-button block @click="savePosterPath(counter.link_course_or_code)">点击保存到相册</wd-button>
    </view>
  </view>
</template>

<style scoped lang="scss">
.div1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150rpx;
  width: 100vw;


  .div1-1 {
    font-weight: bold;
    margin-bottom: 10rpx;
    font-size: 40rpx;
  }

  .div1-2 {
    margin-bottom: 30rpx;
    width: 450rpx;
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10rpx;
    background-color: rgb(243, 243, 243);
  }


}

.div2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80rpx;
  width: 100vw;

  .div2-1 {
    font-weight: bold;
    margin-bottom: 10rpx;
    font-size: 40rpx;
  }

  .div2-2 {
    margin-bottom: 30rpx;
    border-radius: 10rpx;
    width: 450rpx;
    height: 450rpx;
  }

}

.div-root {
  width: 100vw;
  display: flex;
  flex-direction: column;
  background: white;
}
</style>