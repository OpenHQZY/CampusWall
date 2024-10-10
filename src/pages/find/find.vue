<script setup>
import {ref, watch} from 'vue'
import {useCounterStore} from '@/stores/counter'
import {useToast} from 'wot-design-uni';
import {add_postLikeStatistics, del_postLikeStatistics} from "@/api/index.js";
import {post_getPostHeatRank, post_page} from "@/api/find.js";
import {post_getPost_postId_userId, postComment_getPostComment} from '@/api/detail.js';
import {onReachBottom} from "@dcloudio/uni-app";

const toast = useToast()
const {safeAreaInsets} = uni.getSystemInfoSync();
const counter = useCounterStore()
let pages = ref(1);
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
const get_find_hot_data = () => {
  post_getPostHeatRank()
      .then(res => {
        if (res.code !== 1) {
          toast.warning(res.msg)
        } else {
          counter.find_hot_data = res.data
        }
      })
      .catch(error => {
        // 处理登录失败的情况
        toast.error('服务器异常')
      });
}
const temp_find_search_data = uni.getStorageSync('find_search_data')
if (temp_find_search_data) {
  counter.find_search_data = JSON.parse(temp_find_search_data)
}
get_find_hot_data()
// -------------------根据帖子id跳转到详情页-------------------
const send_detail_data = (postId) => {
  post_getPost_postId_userId(postId, counter.get_user_id())
      .then(res => {
        if (res.code !== 1) {
          toast.warning(res.msg)
        } else {
          counter.detail_card_data = res.data
        }
      })
      .catch(error => {
        // 处理登录失败的情况
        toast.error('服务器异常')
      });
}
const send_detail_comment_data = (postId, type) => {
  postComment_getPostComment(postId, counter.get_user_id(), type)
      .then(res => {
        if (res.code !== 1) {
          toast.warning(res.msg)
        } else {
          counter.detail_comment_data = res.data
        }
      })
      .catch(error => {
        // 处理登录失败的情况
        toast.error('服务器异常')
      });
}
const handleNavigatorClick = (postId) => {
  send_detail_data(postId)
  send_detail_comment_data(postId, 2)

  uni.navigateTo({
    url: '/pages/detail/detail'
  });
}
// -------------------根据帖子id跳转到详情页-------------------
const submit_star = (event, postId, status_num) => {
  event.stopPropagation(); // 阻止事件冒泡
  if (status_num === 1) {
    for (let i = 0; i < counter.find_search_index_data.length; i++) {
      if (counter.find_search_index_data[i].postId === postId) {
        counter.find_search_index_data[i].likes += 1
        counter.find_search_index_data[i].liked = true
        add_postLikeStatistics(postId).then(res => {
          if (res.code !== 1) {
            toast.warning(res.msg)
          } else {
          }
        }).catch(error => {
          toast.error("服务器异常")
        })
      }
    }
  } else {
    for (let i = 0; i < counter.find_search_index_data.length; i++) {
      if (counter.find_search_index_data[i].postId === postId) {
        counter.find_search_index_data[i].likes -= 1
        counter.find_search_index_data[i].liked = false
        del_postLikeStatistics(postId).then(res => {
          if (res.code !== 1) {
            toast.warning(res.msg)
          } else {
          }
        }).catch(error => {
          toast.error("服务器异常")
        })
      }
    }
  }

}

const delete_search_data = (find_search_id) => {
  counter.find_search_data = counter.find_search_data.filter(data => data.find_search_id !== find_search_id);
  uni.setStorageSync('find_search_data', JSON.stringify(counter.find_search_data));
}
const click_search_data = (find_search_content) => {
  counter.find_search_inp = find_search_content;
  counter.find_search_status = true
  pages.value = 1
  post_page_default(true)
}
const all_delete_search_data = (index) => {
  counter.find_search_data = [];
  uni.setStorageSync('find_search_data', JSON.stringify(counter.find_search_data));
}
const clear_search_data = () => {
  if (counter.find_search_inp.length === 0) {
    counter.find_search_index_data = []
    counter.find_search_status = false
  }
}
const add_search_data = () => {
  if (counter.find_search_inp.length > 0) {
    counter.find_search_status = true
    pages.value = 1
    counter.find_search_data.push({find_search_id: counter.uuid(), find_search_content: counter.find_search_inp})
    uni.setStorageSync('find_search_data', JSON.stringify(counter.find_search_data));
    post_page_default(true)
  } else {
    toast.show("搜索内容为空")
  }
}

const post_page_default = (status) => {
  post_page(`${pages.value}`, `${counter.find__glide_total_num}`, counter.find_search_inp, counter.get_user_id()).then(res => {
    counter.find_glide_loading = false;
    if (res.code !== 1) {
      toast.warning(res.msg)
    } else {
      if (status) {
        counter.find_search_index_data = []
        counter.find_search_index_data = res.data.records
      } else {
        for (let i = 0; i < res.data.records.length; i++) {
          counter.find_search_index_data.push(res.data.records[i])
        }
      }
      if (pages.value * counter.find__glide_total_num > res.data.total) {
        counter.find_glide_loading_desc = "已加载到最底部"
      } else {
        counter.find_glide_loading_desc = "努力加载中..."
      }
    }
  }).catch(error => {
    counter.find_glide_loading = false;
    toast.error("服务器异常")
  })
}
onReachBottom(() => {
  counter.find_glide_loading = true;
  pages.value += 1
  post_page_default(false)
})

</script>

<template>
  <view :style="{ paddingTop: safeAreaInsets.top+0 + 'px' }" class="view-head">
    <view>发现&搜索</view>
  </view>
  <wd-search v-model="counter.find_search_inp"
             placeholder="搜索帖子和文章"
             placeholder-left
             cancel-txt="搜索"
             @blur="add_search_data"
             @clear="clear_search_data"
             @change="clear_search_data"
             maxlength="300"/>
  <view class="view1-flex">
    <view class="view1">
      <text class="view1-1" style="font-weight: bold">搜索历史</text>
      <view class="view1-2" @click="all_delete_search_data">
        <wd-icon name="delete-thin" size="17px"></wd-icon>
        <view style="margin-left: 5rpx">清空</view>
      </view>
    </view>
  </view>
  <view class="view2">
    <view v-for="(data) in counter.find_search_data" :key="data.find_search_id">
      <view class="view2-1">
        <text style="font-size: 30rpx" @click="click_search_data(data.find_search_content)">{{
            data.find_search_content
          }}
        </text>
        <view style="margin-left: 5rpx" @click="delete_search_data(data.find_search_id)">
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
    <view v-for="(data, index) in counter.find_hot_data" :key="index">
      <view class="view4" @click.stop="handleNavigatorClick(data.postId)">
        <view class="view4-1">{{ index + 1 }}</view>
        <view class="view4-2">{{ data.postContent }}</view>
        <view class="view4-3">{{ data.postHeat }}&nbsp;热度</view>
      </view>
    </view>
  </view>

  <view style="width: 100vw;height: 1100rpx; background: rgb(243, 243, 243);" v-if="counter.find_search_status">
    <view class="div-content-flex">
      <view class="div-content" v-for="(data) in counter.find_search_index_data" :key="data.postId"
            @click.stop="handleNavigatorClick(data.postId)">

        <view class="div1">
          <view @click.stop="preview_img([data.userProfilePicture])">
            <image
                class="div1-wd-img"
                :src="data.userProfilePicture"
            />
          </view>
          <view class="div1-1">
            <view class="div1-1-1">
              <text class="div1-txt1">{{ data.userName }}</text>
              <image class="div1-txt1-auth"
                     src="/static/index/auth.png"
                     v-if="data.authenticated"
              ></image>
            </view>
            <view class="div1-1-1">
              <text class="div1-txt2">{{ data.postTime }}</text>
              <text class="div1-txt3">{{ data.postViewCount }}次围观</text>
            </view>
          </view>
        </view>

        <view class="div2">
          <text class="div2-txt">{{ data.postContent }}</text>
          <view class="div2-img-flex">
            <view class="div2-img" v-for="(img_data, img_index) in data.postPicturesArray" :key="img_index"
                  @click.stop="preview_img(data.postPicturesArray)">
              <image
                  class="div2-wd-img"
                  :src="img_data"
              />
            </view>
          </view>
        </view>

        <view class="div3">
          <view class="div3-1">
            <text># {{ data.postClassificationName }}</text>
          </view>
          <view class="div3-2">
            <view class="div3-2-flex">
              <wd-icon name="chat1" size="2.2vh"></wd-icon>
              <text style="margin-right: 20rpx">{{ data.comments }}</text>
            </view>
            <view class="div3-2-flex" v-if="!data.liked" @click.stop="submit_star($event, data.postId, 1)">
              <wd-icon name="thumb-up" size="2.2vh"></wd-icon>
              <text>{{ data.likes }}</text>
            </view>
            <view class="div3-2-flex" v-if="data.liked" @click.stop="submit_star($event, data.postId, 0)">
              <wd-icon name="thumb-up" size="2.2vh" color="#5fc8e8"></wd-icon>
              <text style="color: #5fc8e8">{{ data.likes }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="div4" v-if="counter.find_glide_loading">
      <wd-loading :size="17"/>
      <view>&nbsp;{{ counter.find_glide_loading_desc }}</view>
    </view>

    <view v-if="counter.find_search_index_data.length===0 && counter.find_search_status" class="div4">
      搜索结果为空
    </view>

  </view>

  <wd-toast/>
</template>

<style scoped lang="scss">


.div4 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100rpx;
  margin-top: 10rpx;
  margin-bottom: 10rpx;
}

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
  position: sticky; /* Makes the header sticky */
  top: 0; /* Positions it at the top of the viewport */
  z-index: 1000; /* Ensures it stays above other content */
  background-color: white; /* Optional: Set a background color */
}


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
    height: 50rpx;
    border-radius: 10rpx;
    background-color: rgb(243, 243, 243);
    color: #999999;
    font-size: 25rpx;
  }

  .div3-2 {
    margin-left: auto;
    position: relative;
    left: -20rpx;
    color: #999999;
    font-size: 25rpx;
    display: flex;
    flex-direction: row;

    .div3-2-flex {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 10rpx;
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

  .div1-txt1-auth {
    margin-left: 10rpx;
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%;
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
      align-items: center;
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