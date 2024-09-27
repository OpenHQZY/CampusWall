<script setup>
import {ref} from 'vue';
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
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

const send_detail_data = (detail_id) => {
  // 用户在主页点击帖子，通过帖子detail_id来后端查询该帖子具体数据，并赋值给counter.index_detail_data
  console.log(detail_id)
  // counter.index_detail_data =
}

const handleNavigatorClick = (detail_id) => {
  send_detail_data(detail_id)

  uni.navigateTo({
    url: '/pages/detail/detail'
  });
}
const submit_star = (event) => {
  event.stopPropagation(); // 阻止事件冒泡
  counter.detail_star = !counter.detail_star;
}
</script>

<template>
  <view class="div-root">
    <wd-tabs v-model="counter.index_tab" animated sticky :offset-top="80">
      <block v-for="item in counter.index_tabs" :key="item">
        <wd-tab :title="`${item}`" :name="item">
          <view class="div-content-flex">
            <view class="div-content" v-for="(data) in counter.index_tab_data" :key="data[0]"
                  @click.stop="handleNavigatorClick(data[0])">

              <view class="div1">
                <view @click.stop="preview_img([data[1]])">
                  <image
                      class="div1-wd-img"
                      :src="data[1]"
                  />
                </view>
                <view class="div1-1">
                  <text class="div1-txt1">{{ data[2] }}</text>
                  <view class="div1-1-1">
                    <text class="div1-txt2">{{ data[3] }}</text>
                    <text class="div1-txt3">{{ data[4] }}次围观</text>
                  </view>
                </view>
              </view>

              <view class="div2">
                <text class="div2-txt">{{ data[5] }}</text>
                <view class="div2-img-flex">
                  <view class="div2-img" v-for="(img_data, img_index) in data[7]" :key="img_index"
                        @click.stop="preview_img(data[7])">
                    <image
                        class="div2-wd-img"
                        :src="img_data"
                    />
                  </view>
                </view>
              </view>

              <view class="div3">
                <view class="div3-1">
                  <text># {{ data[8] }}</text>
                </view>
                <view class="div3-2">
                  <view class="div3-2-flex">
                    <wd-icon name="chat1" size="2.2vh"></wd-icon>
                    <text style="margin-right: 20rpx">{{ data[9] }}</text>
                  </view>
                  <view class="div3-2-flex" v-if="!counter.detail_star" @click.stop="submit_star($event)">
                    <wd-icon name="thumb-up" size="2.2vh"></wd-icon>
                    <text>{{ data[10] }}</text>
                  </view>
                  <view class="div3-2-flex" v-if="counter.detail_star" @click.stop="submit_star($event)">
                    <wd-icon name="thumb-up" size="2.2vh" color="#5fc8e8"></wd-icon>
                    <text style="color: #5fc8e8">{{ data[10] }}</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </wd-tab>
      </block>
    </wd-tabs>
  </view>
</template>

<style lang="scss">

.div2 {
  display: flex;
  flex-direction: column;
  margin-top: 10rpx;
  position: relative;
  margin-left: 80rpx;
  width: 550rpx;

  .div2-txt {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 10; /* 设置最大显示行数 */
    overflow: hidden;
    font-size: 30rpx;
  }


  .div2-img-flex {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-top: 20rpx;
    max-height: 540rpx;
    overflow: hidden;


    .div2-wd-img {
      width: 175rpx;
      height: 175rpx;
      border-radius: 5rpx;
    }
  }
}

.div3 {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  margin-top: 20rpx;
  position: relative;
  margin-left: 70rpx;

  .div3-1 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150rpx;
    height: 45rpx;
    border-radius: 10rpx;
    background-color: rgb(243, 243, 243);
    color: #999999;
    font-size: 23rpx;
  }

  .div3-2 {
    margin-left: auto;
    position: relative;
    left: -10rpx;
    color: #999999;
    font-size: 25rpx;
    display: flex;
    flex-direction: row;

    .div3-2-flex {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.div1 {
  display: flex;
  flex-direction: row;

  .div1-txt1 {
    font-size: 30rpx;
    max-width: 520rpx;
    overflow: hidden; /* 隐藏超出部分 */
    white-space: nowrap; /* 不换行 */
    text-overflow: ellipsis; /* 溢出时显示省略号 */
  }

  .div1-wd-img {
    width: 70rpx;
    height: 70rpx;
    border-radius: 50%;
  }

  .div1-txt2 {
    color: #999999;
    font-size: 24rpx;
  }

  .div1-txt3 {
    margin-left: 30rpx;
    font-size: 24rpx;
    color: #999999;
  }

  .div1-1 {
    display: flex;
    flex-direction: column;
    margin-left: 20rpx;

    .div1-1-1 {
      margin-top: 5rpx;
      display: flex;
      flex-direction: row;
    }
  }
}

.div-root {
  position: relative;
  top: 300rpx;

  .div-content-flex {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: rgb(238, 238, 238);

    .div-content {
      display: flex;
      background-color: white;
      margin-bottom: 10rpx;
      width: 680rpx;
      border-radius: 20rpx;
      padding: 15rpx;
      flex-direction: column;

    }
  }
}
</style>