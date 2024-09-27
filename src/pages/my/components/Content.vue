<script setup>
import {
  ref
} from 'vue';

// 问题意见反馈与重新登入模块
const feedbackAndLoginModule = ref(['问题与意见反馈', '重新登入']);

// 控制底部弹出层
const show = ref(false)
const popup = () => {
  show.value = !show.value
}

</script>

<template>
  <!-- 校园认证模块 -->
  <navigator url="/pages/authentication/authentication" hover-class="none">
    <view class="features-container">
      <view class="feature-item">
        <image src="@/static/my/authentication.png"></image>
        <text>校园认证</text>
      </view>
      <view class="unverified">
        <text>未认证</text>
        <wd-icon name="arrow-right" color="rgb(185, 185, 185)" size="18px"></wd-icon>
      </view>
    </view>
  </navigator>

  <!-- 多功能模块 -->
  <view class="share-contact-container">
    <view class="feature-item-container">
      <!-- 社区规范&小黑屋 -->
      <navigator url="/pages/communityNorms/communityNorms" hover-class="none">
        <view class="feature-item-navigator" style="border-bottom: 1px solid rgba(0, 0, 0, 0.1);">
          <view class="feature-item">
            <image src="@/static/my/authentication.png"></image>
            <text>社区规范&小黑屋</text>
          </view>
          <view class="unverified">
            <wd-icon name="arrow-right" color="rgb(185, 185, 185)" size="18px"></wd-icon>
          </view>
        </view>
      </navigator>

      <!-- 分享好友 -->
      <button class="button1" open-type="share" plain="true">
        <view class="feature-item-navigator" style="border-bottom: 1px solid rgba(0, 0, 0, 0.1);">
          <view class="feature-item">
            <image src="@/static/my/authentication.png"></image>
            <text>分享好友</text>
          </view>
          <view class="unverified">
            <wd-icon name="arrow-right" color="rgb(185, 185, 185)" size="18px"></wd-icon>
          </view>
        </view>
      </button>

      <!-- 联系墙墙 -->
      <view class="feature-item-navigator" @click="popup">
        <view class="feature-item">
          <image src="@/static/my/authentication.png"></image>
          <text>联系墙墙</text>
        </view>
        <view class="unverified">
          <wd-icon name="arrow-right" color="rgb(185, 185, 185)" size="18px"></wd-icon>
        </view>
      </view>
      <!-- 底部弹出层 -->
      <wd-popup v-model="show" position="bottom">
        <view class="popup-content">
          <view class="popup-text">
            <image src="../../../static/my/contact.png"></image>
            <view>有问题，随时联系墙墙</view>
          </view>
        </view>
      </wd-popup>
    </view>
  </view>

  <view class="share-contact-container">
    <view class="feature-item-container" v-for="(item, index) in feedbackAndLoginModule" :key="index">
      <view class="feature-item-navigator">
        <view class="feature-item">
          <image src="@/static/my/authentication.png"></image>
          <text>{{ item }}</text>
        </view>
        <view class="unverified">
          <wd-icon name="arrow-right" color="rgb(185, 185, 185)" size="18px"></wd-icon>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
// 校园认证模块
.features-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(255, 255, 255);
  margin: 0 30rpx;
  margin-top: 30rpx;

  .feature-item {
    display: flex;
    align-items: center;
    color: rgb(75, 72, 89);
    padding: 30rpx;

    image {
      width: 37rpx;
      /* 根据需要调整图片大小 */
      height: 37rpx;
      /* 根据需要调整图片大小 */
    }

    text {
      padding-left: 15rpx;
    }
  }

  .unverified {
    display: flex;
    align-items: center;
    padding-right: 18rpx;

    text {
      color: rgb(185, 185, 185);
    }
  }
}

// 多个模块
.share-contact-container {
  background-color: rgb(255, 255, 255);
  margin: 0 30rpx;
  margin-top: 30rpx;
  padding: 0 20rpx;

  .feature-item-container {
    // 底部弹出层
    .popup-content {
      background-color: rgb(245, 246, 245);
      height: 35vh;
      padding: 20rpx;

      .popup-text {
        height: 35vh;
        background-color: rgb(255, 255, 255);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-weight: bold;

        image {
          width: 400rpx;
          /* 根据需要调整图片大小 */
          height: 400rpx;
          /* 根据需要调整图片大小 */
          margin: 18rpx;
        }
      }
    }

    .feature-item-navigator {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .button1 {
      background: none; /* 清除背景 */
      border: none; /* 清除边框 */
      padding: 0; /* 清除内边距 */
      margin: 0; /* 清除外边距 */
      font: inherit; /* 继承字体样式 */
      color: inherit; /* 继承文本颜色 */
      cursor: pointer; /* 指定鼠标指针样式 */
    }

    .feature-item {
      display: flex;
      align-items: center;
      color: rgb(75, 72, 89);
      padding: 30rpx;
      padding-left: 10rpx;

      image {
        width: 37rpx;
        /* 根据需要调整图片大小 */
        height: 37rpx;
        /* 根据需要调整图片大小 */
      }

      text {
        padding-left: 15rpx;
      }
    }

    .unverified {
      display: flex;
      align-items: center;
    }
  }
}

// 多个模块设置边框分割
.feature-item-container:not(:last-child) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
</style>