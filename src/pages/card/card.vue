<script setup>
import {ref} from 'vue'
import {useCounterStore} from '@/stores/counter'
import {useToast} from 'wot-design-uni';

const toast = useToast()
const {safeAreaInsets} = uni.getSystemInfoSync();
const counter = useCounterStore()
const fileList = ref([
  {
    url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg'
  }
])

const action = 'https://mockapi.eolink.com/zhTuw2P8c29bc981a741931bdd86eb04dc1e8fd64865cb5/upload'

function handleChange({fileList: files}) {
  fileList.value = files
}

const card_show_tabs = () => {
  counter.card_tabs_show = !counter.card_tabs_show
}
const submit_card = () => {
  if (counter.card_comment_inp.length > 0) {
    counter.index_tab_data.unshift(["164512", "/static/index/test_head.png", "测试帖子", "2小时前", "1",
      counter.card_comment_inp, true, [], counter.card_tabs_select, "1", "1"])
    counter.card_comment_inp = ""
    uni.switchTab({
      url: '/pages/index/index'
    });
    toast.show("发布成功")
  } else {
    toast.show("帖子内容为空")
  }

}
const selectCardTab = (data) => {
  counter.card_tabs_select = data
}
</script>

<template>
  <view :style="{ paddingTop: safeAreaInsets.top+0 + 'px' }" class="div-head">
    <view>发布帖子</view>
  </view>

  <view class="div1">
    <wd-textarea
        v-model="counter.card_comment_inp"
        :maxlength="800" clearable show-word-limit
        placeholder="输入帖子内容，请保持合法合规"/>
    <view style="margin-left: 20rpx">
      <wd-upload :file-list="fileList1"
                 image-mode="aspectFill"
                 :action="action"
                 :limit="9"
                 multiple
                 @change="handleChange1"></wd-upload>
    </view>
  </view>
  <view class="div-root">
    <view class="div2" @click="card_show_tabs">
      <view class="div2-1">
        <wd-icon name="books" size="18px"></wd-icon>
        <text style="line-height: 22px;margin-left: 5rpx">帖子标签</text>
      </view>
      <view class="div2-2">
        <text style="line-height: 22px;">{{ counter.card_tabs_select }}</text>
        <wd-icon name="arrow-right" size="18px"></wd-icon>
      </view>
    </view>
    <view class="div3" @click="submit_card">
      <wd-icon name="check" size="18px" color="white"></wd-icon>
      <text class="div3-txt">发布</text>
    </view>
    <view class="div5">
      <text>请自觉遵守社区规范，如有违规会被删帖、禁言、关小黑屋</text>
    </view>
  </view>
  <wd-popup v-model="counter.card_tabs_show"
            position="bottom"
            custom-style="height: 600rpx;border-radius: 10rpx;">
    <view class="div4">
      <text class="div4-1">选择帖子分类</text>
      <view class="div4-2">
        <view v-for="(data, index) in counter.card_tabs" :key="index">
          <view
              class="div4-2-1"
              @click="selectCardTab(data)"
              :class="{ selected: counter.card_tabs_select === data }">
            <view style="margin-left: 20rpx">
              <wd-icon name="books" size="18px"></wd-icon>
            </view>
            <text style="line-height: 22px;margin-left: 5rpx;font-size: 30rpx">{{ data }}</text>
            <view style="margin-left: auto;margin-right: 20rpx" v-if="counter.card_tabs_select === data">
              <wd-icon name="check-circle-filled" size="18px"></wd-icon>
            </view>
          </view>
        </view>
      </view>
    </view>
  </wd-popup>
  <wd-toast/>
</template>

<style scoped lang="scss">
.div5{
  font-size: 25rpx;
  color: #999999;
  margin-top: 120rpx;
}
.div4 {
  display: flex;
  flex-direction: column;
  align-items: center;

  .div4-1 {
    margin-top: 30rpx;
    margin-bottom: 30rpx;
    font-weight: bold;
  }

  .div4-2 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;


    .div4-2-1 {
      margin: 15rpx;
      width: 320rpx;
      height: 100rpx;
      border-radius: 10rpx;
      display: flex;
      background: rgb(238, 238, 238);
      flex-direction: row;
      align-items: center;
      color: #999999;

      &.selected {
        background-color: rgb(54, 110, 244);
        color: white;
      }

    }
  }
}

.div3 {
  margin-top: 60rpx;
  width: 300rpx;
  height: 80rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 10rpx;
  background: rgb(1, 99, 255);


  .div3-txt {
    margin-left: 10rpx;
    color: white;
  }
}

.div2 {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1px;
  border-top: solid 0.5px rgb(245, 245, 245);
  border-bottom: solid 0.5px rgb(245, 245, 245);
  width: 700rpx;
  height: 100rpx;

  .div2-1 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: #4c4c4c;
  }

  .div2-2 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-left: auto; /* 添加此行 */
    color: #999999;
  }
}

.div-root {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.div-head {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 35rpx;
  font-weight: bold;
  height: 85rpx;
}
</style>