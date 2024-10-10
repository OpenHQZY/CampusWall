<script setup>
import {ref, watch} from 'vue';
import {useCounterStore} from '@/stores/counter'
import {post_page, add_postLikeStatistics, del_postLikeStatistics} from "@/api/index.js";
import {post, postClassification} from '@/api/card.js';
import {post_getPost_postId_userId, postComment_getPostComment} from '@/api/detail.js';

const counter = useCounterStore()
import {useToast} from 'wot-design-uni';
import {onPullDownRefresh, onReachBottom, onShow} from "@dcloudio/uni-app";

const toast = useToast()

const get_card_tabs = () => {
  postClassification()
      .then(res => {
        if (res.code !== 1) {
          toast.warning(res.msg)
        } else {
          counter.index_tabs = res.data
          counter.index_tabs.unshift({postClassificationId: 0, postClassificationName: "全部"})
          pages.value = 1
          post_page_default(true, counter.index_tab)
        }
      })
      .catch(error => {
        // 处理登录失败的情况
        toast.error('服务器异常')
      });
}
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
    for (let i = 0; i < counter.index_tab_data.length; i++) {
      if (counter.index_tab_data[i].postId === postId) {
        counter.index_tab_data[i].likes += 1
        counter.index_tab_data[i].liked = true
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
    for (let i = 0; i < counter.index_tab_data.length; i++) {
      if (counter.index_tab_data[i].postId === postId) {
        counter.index_tab_data[i].likes -= 1
        counter.index_tab_data[i].liked = false
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

let pages = ref(1);
const post_page_default = (status, postClassificationId) => {
  if (postClassificationId === "全部") {
    postClassificationId = null
  } else {
    postClassificationId = counter.index_tabs.filter(data => data.postClassificationName === postClassificationId)[0].postClassificationId
  }
  post_page(`${pages.value}`, `${counter.index__glide_total_num}`, postClassificationId, counter.get_user_id()).then(res => {
    counter.index_glide_loading = false;
    if (res.code !== 1) {
      toast.warning(res.msg)
    } else {
      if (status) {
        counter.index_tab_data = []
        counter.index_tab_data = res.data.records
      } else {
        for (let i = 0; i < res.data.records.length; i++) {
          counter.index_tab_data.push(res.data.records[i])
        }
      }
      if (pages.value * counter.index__glide_total_num > res.data.total) {
        counter.index_glide_loading_desc = "已加载到最底部"
      } else {
        counter.index_glide_loading_desc = "努力加载中..."
      }
    }
  }).catch(error => {
    counter.index_glide_loading = false;
    toast.error("服务器异常")
  })
}
watch(() => counter.index_tab, () => {
  pages.value = 1
  post_page_default(true, counter.index_tab)
}, {deep: true});
onReachBottom(() => {
  counter.index_glide_loading = true;
  pages.value += 1
  post_page_default(false, counter.index_tab)
})
onPullDownRefresh(() => {
  counter.index_glide_loading = true;
  pages.value = 1
  post_page_default(true, counter.index_tab)
})
onShow(() => {
  get_card_tabs()
})
</script>

<template>
  <view class="div-root">
    <wd-tabs v-model="counter.index_tab" animated sticky :offset-top="80">
      <block v-for="item in counter.index_tabs" :key="item.postClassificationId">
        <wd-tab :title="`${item.postClassificationName}`" :name="item.postClassificationName">
          <view class="div-content-flex">

            <view class="div-content" v-for="(data) in counter.index_tab_data" :key="data.postId"
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
          <view class="div4" v-if="counter.index_glide_loading">
            <wd-loading :size="17"/>
            <view>&nbsp;{{ counter.index_glide_loading_desc }}</view>
          </view>

          <view v-if="counter.index_tab_data.length===0" class="div5">
            该分类下暂无帖子
          </view>

        </wd-tab>
      </block>
    </wd-tabs>
  </view>
</template>

<style lang="scss">
.div5 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100rpx;
  margin-top: 10rpx;
  margin-bottom: 10rpx;
}

.div4 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 50rpx;
  margin-top: 10rpx;
  margin-bottom: 10rpx;
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