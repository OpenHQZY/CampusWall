<script setup>
import {ref} from 'vue'
import {useCounterStore} from '@/stores/counter'
import {useToast} from 'wot-design-uni';

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

const toast = useToast()
const {safeAreaInsets} = uni.getSystemInfoSync();
const counter = useCounterStore()
const delete_search_data = (index) => {
  counter.find_search_data = counter.find_search_data.filter(data => data[0] !== index);
}
const click_search_data = (inp) => {
  counter.find_search_inp = inp;
  counter.find_search_index_data = counter.index_tab_data.filter(data => data[5].includes(counter.find_search_inp))
  counter.find_search_status = true
}
const all_delete_search_data = (index) => {
  counter.find_search_data = [];
}
const add_search_data = () => {
  if (counter.find_search_inp.length > 0) {
    counter.find_search_data.push([counter.uuid(), counter.find_search_inp])
    counter.find_search_index_data = counter.index_tab_data.filter(data => data[5].includes(counter.find_search_inp))
    counter.find_search_status = true
  } else {
    toast.show("搜索内容为空")
  }
}
const clear_search_data = () => {
  if (counter.find_search_inp.length === 0) {
    counter.find_search_index_data = []
    counter.find_search_status = false
  }
}
</script>

<template>
  <view :style="{ paddingTop: safeAreaInsets.top+0 + 'px' }" class="view-head">
    <view>发现&搜索</view>
  </view>
  <wd-search v-model="counter.find_search_inp"
             placeholder="搜索帖子和文章"
             placeholder-left
             cancel-txt="搜索"
             @cancel="add_search_data"
             @blur="add_search_data"
             @clear="clear_search_data"
             @change="clear_search_data"
             maxlength="300"/>
  <view class="view1-flex">
    <view class="view1">
      <text class="view1-1">搜索历史</text>
      <view class="view1-2" @click="all_delete_search_data">
        <wd-icon name="delete-thin" size="17px"></wd-icon>
        <view style="margin-left: 5rpx">清空</view>
      </view>
    </view>
  </view>
  <view class="view2">
    <view v-for="(data) in counter.find_search_data" :key="data[0]">
      <view class="view2-1">
        <text style="font-size: 30rpx" @click="click_search_data(data[1])">{{ data[1] }}</text>
        <view style="margin-left: 5rpx" @click="delete_search_data(data[0])">
          <wd-icon name="close" size="15px" color="#999999"></wd-icon>
        </view>
      </view>
    </view>
  </view>
  <view class="div3-blank">
  </view>
  <view class="view3" v-if="!counter.find_search_status">
    <view class="view3-1">
      <image src="@/static/find/fire.png" class="view3-1-img"></image>
      <view class="view3-1-txt1">热门帖子</view>
      <view class="view3-1-txt2">大家都在看</view>
    </view>
  </view>
  <view class="view4-flex" v-if="!counter.find_search_status">
    <view v-for="(data) in counter.find_hot_data" :key="data[0]">
      <view class="view4" @click.stop="handleNavigatorClick(data[0])">
        <view class="view4-1">{{ data[0] }}</view>
        <view class="view4-2">{{ data[1] }}</view>
        <view class="view4-3">{{ data[2] }}&nbsp;热度</view>
      </view>
    </view>
  </view>


  <view class="div-search_show">
    <view class="div-content-flex">
      <view class="div-content" v-for="(data) in counter.find_search_index_data" :key="data[0]"
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
  </view>
  <view v-if="counter.find_search_index_data.length===0 && counter.find_search_status" class="div4">
    搜索结果为空
  </view>
  <wd-toast/>
</template>

<style scoped lang="scss">

.view4-flex {
  width: 100vw;
  padding: 15rpx;
  display: flex;
  flex-direction: column;
  align-items: center;

  .view4 {
    width: 700rpx;
    height: 100rpx;
    margin-bottom: 10rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: solid 0.5px rgb(245, 245, 245);

    .view4-1 {
      font-size: 35rpx;
      font-weight: bold;
      color: #999999;
    }

    .view4-2 {
      font-size: 30rpx;
      margin-left: 20rpx;
      max-width: 520rpx;
      overflow: hidden; /* 隐藏超出部分 */
      white-space: nowrap; /* 不换行 */
      text-overflow: ellipsis; /* 溢出时显示省略号 */
    }

    .view4-3 {
      margin-right: 15rpx;
      font-size: 25rpx;
      margin-left: auto;
      color: #999999;
    }
  }
}

.div3-blank {
  margin-top: 10rpx;
  width: 100vw;
  height: 25rpx;
  background: rgb(243, 243, 243);
}

.view3 {
  width: 100vw;
  padding: 15rpx;
  display: flex;
  flex-direction: column;

  .view3-1 {
    display: flex;
    flex-direction: row;
    align-items: center;

    .view3-1-img {
      width: 40rpx;
      height: 40rpx;
      border-radius: 50%;
    }

    .view3-1-txt1 {
      margin-left: 15rpx;
      color: black;
      font-size: 35rpx;
      font-weight: bold;
    }

    .view3-1-txt2 {
      margin-left: 30rpx;
      font-size: 30rpx;
      color: #999999;
    }
  }
}

.view2 {
  width: 100vw;
  padding: 10rpx;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .view2-1 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: rgb(243, 243, 243);
    padding: 20rpx;
    width: fit-content; /* 添加此行 */
    margin-left: 20rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;
  }
}

.view1-flex {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;


  .view1 {
    width: 700rpx;
    display: flex;
    flex-direction: row;
    align-items: center;

    .view1-1 {
      font-size: 35rpx;
    }

    .view1-2 {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      color: #999999;
      margin-left: auto;
    }
  }
}


.view-head {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 35rpx;
  font-weight: bold;
  height: 85rpx;
}


.div-search_show {

  .div-content-flex {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: rgb(238, 238, 238);

    .div-content {
      display: flex;
      background-color: white;
      margin-top: 10rpx;
      margin-bottom: 10rpx;
      width: 680rpx;
      border-radius: 20rpx;
      padding: 15rpx;
      flex-direction: column;

    }
  }

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
}

.div4 {
  margin-top: 150rpx;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #999999;
}

</style>