<script setup>
import {ref, watch, nextTick} from 'vue'
import {useCounterStore} from '@/stores/counter'
import {useToast} from 'wot-design-uni';
import {
  post_getPost_postId_userId,
  postComment_getPostComment,
  postComment,
  add_postCommentLike,
  del_postCommentLike,
  add_postCollect,
  del_postCollect,
  add_postReport,
  del_postComment,
} from '@/api/detail.js';
import {post_page, add_postLikeStatistics, del_postLikeStatistics} from "@/api/index.js";

const toast = useToast()

const {safeAreaInsets} = uni.getSystemInfoSync();
const counter = useCounterStore()


function handleClickLeft() {
  uni.navigateBack()
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

const fileList = ref([])


function handleChange({fileList: files}) {
  fileList.value = files
}

const func_comment_show = () => {
  counter.detail_comment_reply_var = ["", ""]
  counter.detail_comment_reply_desc = []
  counter.detail_comment_show = true;
}
const submit_comment = () => {
  if (counter.detail_comment_inp.length > 0) {
    if (counter.detail_comment_reply_var[0].length === 0) {
      // 父级评论为0
      counter.detail_submit_postParentCommentId = 0
    } else if (counter.detail_comment_reply_var[1]) {
      // 父级评论为子评论
      counter.detail_submit_postParentCommentId = counter.detail_comment_reply_var[1]
    } else {
      // 父级评论为父评论
      counter.detail_submit_postParentCommentId = counter.detail_comment_reply_var[0]
    }
    if (fileList.value.length > 0) {
      counter.detail_submit_postCommentPicture = fileList.value[0].response
    } else {
      counter.detail_submit_postCommentPicture = ""
    }
    postComment(counter.detail_comment_inp,
        counter.detail_submit_postCommentPicture,
        new Date(),
        counter.detail_submit_postParentCommentId,
        counter.detail_card_data.postId,
        counter.get_user_id())
        .then(res => {
          if (res.code !== 1) {
            toast.warning(res.msg)
          } else {
            send_detail_data(counter.detail_card_data.postId)
            send_detail_comment_data(counter.detail_card_data.postId, counter.detail_send_detail_comment_data_type)
            counter.detail_comment_inp = "";
            counter.detail_comment_show = false;
            toast.show('发布成功')
          }
        })
        .catch(error => {
          // 处理登录失败的情况
          toast.error('服务器异常')
        });
  } else {
    toast.show('输入内容为空')
  }
}

const btnLongTap = (data) => {
  counter.detail_comment_touch_data = data
  counter.detail_comment_show_status = true
}
const touchstart = () => {
  counter.detail_touchT = new Date().getTime();
}
const touchend = () => {
  counter.detail_touchE = new Date().getTime();
}
const func_reply_comment_show = (reply1, reply2) => {
  if (counter.detail_touchE - counter.detail_touchT < 350) {
    counter.detail_comment_reply_var = [reply1, reply2]
    if (reply2.length === 0) {
      for (let i = 0; i < counter.detail_comment_data.length; i++) {
        if (counter.detail_comment_data[i].postCommentId === reply1) {
          counter.detail_comment_reply_desc = counter.detail_comment_data[i];
        }
      }
    } else {
      for (let i = 0; i < counter.detail_comment_data.length; i++) {
        for (let j = 0; j < counter.detail_comment_data[i].child.length; j++) {
          if (counter.detail_comment_data[i].child[j].postCommentId === reply2) {
            counter.detail_comment_reply_desc = counter.detail_comment_data[i].child[j];
          }
        }
      }
    }
    counter.detail_comment_show = true;
  }
}
const submit_collect = (postId, status_num) => {
  if (status_num === 1) {
    add_postCollect(new Date(), postId, counter.get_user_id()).then(res => {
      if (res.code !== 1) {
        toast.warning(res.msg)
      } else {
        counter.detail_card_data.collected = true
      }
    }).catch(error => {
      toast.error("服务器异常")
    })

  } else {
    del_postCollect(postId).then(res => {
      if (res.code !== 1) {
        toast.warning(res.msg)
      } else {
        counter.detail_card_data.collected = false
      }
    }).catch(error => {
      toast.error("服务器异常")
    })
  }
}
const submit_report_show = () => {
  counter.detail_report_show = true
}
const submit_report_off = () => {
  counter.detail_report_show = false
}
const submit_report_enable = (postId) => {
  add_postReport(counter.detail_report_inp, new Date(), postId).then(res => {
    if (res.code !== 1) {
      toast.warning(res.msg)
    } else {
      counter.detail_report_inp = ""
      counter.detail_report_show = false
      toast.show('举报提交成功')
    }
  }).catch(error => {
    toast.error("服务器异常")
  })

}

const detail_submit_star = (postId, status_num) => {
  if (status_num === 1) {
    counter.detail_card_data.likes += 1
    counter.detail_card_data.liked = true
    add_postLikeStatistics(postId).then(res => {
      if (res.code !== 1) {
        toast.warning(res.msg)
      } else {
      }
    }).catch(error => {
      toast.error("服务器异常")
    })

  } else {
    counter.detail_card_data.likes -= 1
    counter.detail_card_data.liked = false
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


const comment_submit_star = (event, postCommentId, status_num) => {
  event.stopPropagation(); // 阻止事件冒泡
  if (status_num === 1) {
    add_postCommentLike(postCommentId, counter.get_user_id()).then(res => {
      if (res.code !== 1) {
        toast.warning(res.msg)
      } else {
        for (let i = 0; i < counter.detail_comment_data.length; i++) {
          if (counter.detail_comment_data[i].postCommentId === postCommentId) {
            counter.detail_comment_data[i].likes += 1
            counter.detail_comment_data[i].liked = true
          } else {
            for (let j = 0; j < counter.detail_comment_data[i].child.length; j++) {
              if (counter.detail_comment_data[i].child[j].postCommentId === postCommentId) {
                counter.detail_comment_data[i].child[j].likes += 1
                counter.detail_comment_data[i].child[j].liked = true
              }
            }
          }
        }
      }
    }).catch(error => {
      toast.error("服务器异常")
    })
  } else {
    del_postCommentLike(postCommentId).then(res => {
      if (res.code !== 1) {
        toast.warning(res.msg)
      } else {
        for (let i = 0; i < counter.detail_comment_data.length; i++) {
          if (counter.detail_comment_data[i].postCommentId === postCommentId) {
            counter.detail_comment_data[i].likes -= 1
            counter.detail_comment_data[i].liked = false
          } else {
            for (let j = 0; j < counter.detail_comment_data[i].child.length; j++) {
              if (counter.detail_comment_data[i].child[j].postCommentId === postCommentId) {
                counter.detail_comment_data[i].child[j].likes -= 1
                counter.detail_comment_data[i].child[j].liked = false
              }
            }
          }
        }
      }
    }).catch(error => {
      toast.error("服务器异常")
    })
  }
}


// --------------------------------------获得帖子内容和评论--------------------------------------
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
const cancel_touch = () => {
  counter.detail_comment_show_status = false
}
const report_touch = (postCommentId) => {
  // 举报待写
  // func_temp(postCommentId)
  //     .then(res => {
  //       if (res.code !== 1) {
  //         toast.warning(res.msg)
  //       } else {
  //             toast.show("该评论举报成功")
  //       }
  //     })
  //     .catch(error => {
  //       // 处理登录失败的情况
  //       toast.error('服务器异常')
  //     });
}
const delete_touch = (postCommentId) => {
  del_postComment(postCommentId)
      .then(res => {
        if (res.code !== 1) {
          toast.warning(res.msg)
        } else {
          send_detail_comment_data(counter.detail_card_data.postId, counter.detail_send_detail_comment_data_type)
          counter.detail_comment_show_status = false
          toast.show("该评论删除成功")
        }
      })
      .catch(error => {
        // 处理登录失败的情况
        toast.error('服务器异常')
      });
}
watch(() => counter.detail_segmented_current, () => {
  if (counter.detail_segmented_current === "时间") {
    counter.detail_send_detail_comment_data_type = 1
    send_detail_comment_data(counter.detail_card_data.postId, 1)
  } else {
    counter.detail_send_detail_comment_data_type = 2
    send_detail_comment_data(counter.detail_card_data.postId, 2)
  }
})
// send_detail_data(2)
// send_detail_comment_data(2, 2)
// --------------------------------------获得帖子内容和评论--------------------------------------
</script>

<template>
  <view :style="{ paddingTop: safeAreaInsets.top+0 + 'px' }" class="div-root">
    <wd-navbar fixed title="详情" left-text="返回" left-arrow safeAreaInsetTop
               @click-left="handleClickLeft"></wd-navbar>
    <view class="div1">

      <view class="div1-1">
        <view @click.stop="preview_img([counter.detail_card_data.userProfilePicture])">
          <image
              class="div1-1-wd-img"
              :src="counter.detail_card_data.userProfilePicture"
          />
        </view>
        <view class="div1-1-1">
          <text class="div1-1-1-txt1">{{ counter.detail_card_data.userName }}</text>
          <view class="div1-1-1-1">
            <text class="div1-1-1-txt2">{{ counter.detail_card_data.postTime }}</text>
            <text class="div1-1-1-txt3">{{ counter.detail_card_data.postViewCount }}次围观</text>
          </view>
        </view>
        <view class="div1-1-2" v-if="!counter.detail_card_data.liked"
              @click="detail_submit_star(counter.detail_card_data.postId, 1)">
          <wd-icon name="thumb-up" size="2.2vh"></wd-icon>
          <text>{{ counter.detail_card_data.likes }}</text>
        </view>
        <view class="div1-1-2" v-if="counter.detail_card_data.liked"
              @click="detail_submit_star(counter.detail_card_data.postId, 0)">
          <wd-icon name="thumb-up" size="2.2vh" color="#5fc8e8"></wd-icon>
          <text style="color: #5fc8e8">{{ counter.detail_card_data.likes }}</text>
        </view>
      </view>

      <view class="div1-2">
        <text class="div1-2-txt" selectable="true">{{ counter.detail_card_data.postContent }}</text>
        <view class="div1-2-img-flex">
          <view class="div1-2-img" v-for="(img_data, img_index) in counter.detail_card_data.postPicturesArray"
                :key="img_index"
                @click.stop="preview_img(counter.detail_card_data.postPicturesArray)">
            <image
                class="div1-2-wd-img"
                :src="img_data"
            />
          </view>
        </view>
      </view>

      <view class="div1-3">
        <view class="div1-3-1">
          <text># {{ counter.detail_card_data.postClassificationName }}</text>
        </view>
        <view class="div1-3-2">
          <view class="div1-3-2-flex" @click="submit_report_show">
            <wd-icon name="check-rectangle" size="2.2vh"></wd-icon>
            <text style="margin-left: 2.5rpx">举报</text>
          </view>
          <view class="div1-3-2-flex" style="margin-left: 20rpx" v-if="!counter.detail_card_data.collected"
                @click="submit_collect(counter.detail_card_data.postId, 1)">
            <wd-icon name="star" size="2.2vh"></wd-icon>
            <text style="margin-left: 2.5rpx">收藏</text>
          </view>
          <view class="div1-3-2-flex" style="margin-left: 20rpx" v-if="counter.detail_card_data.collected"
                @click="submit_collect(counter.detail_card_data.postId, 0)">
            <wd-icon name="star" size="2.2vh" color="#5fc8e8"></wd-icon>
            <text style="margin-left: 2.5rpx;color: #5fc8e8">取消</text>
          </view>
        </view>
      </view>
      <wd-popup v-model="counter.detail_report_show"
                position="center"
                custom-style="height: 800rpx;width:600rpx;border-radius: 10rpx;">
        <view class="div1-3-3">
          <view class="div1-3-3-1">举报该帖子</view>
          <view class="div1-3-3-2">
            <wd-textarea v-model="counter.detail_report_inp" placeholder="请填写举报理由"/>
          </view>
          <view class="div1-3-3-3">
            <view class="div1-3-3-3-1" @click="submit_report_off">取消</view>
            <view class="div1-3-3-3-2" style="color: rgb(1, 99, 255)"
                  @click="submit_report_enable(counter.detail_card_data.postId)">确认
            </view>
          </view>
        </view>
      </wd-popup>

    </view>

    <view class="div2-flex">
      <view class="div2">

        <view class="div2-1">
          <text class="div2-1-1">评论（{{ counter.detail_card_data.comments }}）</text>
          <view class="div2-1-2">
            <wd-segmented :options="counter.detail_segmented_list"
                          size="small"
                          v-model:value="counter.detail_segmented_current"></wd-segmented>
          </view>
        </view>

        <view class="div2-2-flex" v-for="(data, index) in counter.detail_comment_data" :key="index">
          <view class="div2-2">
            <view @click.stop="preview_img([data.userProfilePicture])">
              <image
                  class="div2-2-1-wd-img"
                  :src="data.userProfilePicture"
              />
            </view>
            <view class="div2-2-2"
                  @tap="func_reply_comment_show(data.postCommentId, '')"
                  @longtap="btnLongTap(data)"
                  @touchstart='touchstart'
                  @touchend='touchend'>
              <text class="div2-2-2-txt1">{{ data.userName }}</text>
              <text class="div2-2-2-txt2">{{ data.postCommentContent }}</text>
              <view @click.stop="preview_img([data.postCommentPicture])" v-if="data.postCommentPicture">
                <image
                    class="div2-2-2-img1"
                    :src="data.postCommentPicture"
                />
              </view>
              <view class="div2-2-2-flex">
                <text class="div2-2-2-txt3">{{ data.postCommentTime }}</text>
                <view class="div2-2-2-2-flex" v-if="!data.liked"
                      @click.stop="comment_submit_star($event,data.postCommentId, 1)">
                  <wd-icon name="thumb-up" size="2vh" color="#999999"></wd-icon>
                  <text style="color: #999999">{{ data.likes }}</text>
                </view>
                <view class="div2-2-2-2-flex" v-if="data.liked"
                      @click.stop="comment_submit_star($event,data.postCommentId, 0)">
                  <wd-icon name="thumb-up" size="2vh" color="#5fc8e8"></wd-icon>
                  <text style="color: #5fc8e8">{{ data.likes }}</text>
                </view>
              </view>
            </view>
          </view>
          <view class="div2-3" v-if="data.child.length>0">
            <view class="div2-3-flex" v-for="(data_item, index) in data.child" :key="index">
              <view class="div2-3-0">
                <view @click.stop="preview_img([data_item.userProfilePicture])">
                  <image
                      class="div2-3-1-wd-img"
                      :src="data_item.userProfilePicture"
                  />
                </view>
                <view class="div2-3-2"
                      @tap="func_reply_comment_show(data.postCommentId, data_item.postCommentId)"
                      @longtap="btnLongTap(data_item)"
                      @touchstart='touchstart'
                      @touchend='touchend'>
                  <text class="div2-3-2-txt1">{{ data_item.userName }}</text>

                  <text class="div2-3-2-txt2"
                        v-if="!data_item.thirdComment">
                    {{ data_item.postCommentContent }}
                  </text>
                  <text class="div2-3-2-txt2"
                        v-if="data_item.thirdComment">
                    回复
                    <text style="color: #5fc8e8">@{{ data_item.postCommentUserName }}</text>
                    :{{
                      data_item.postCommentContent
                    }}
                  </text>

                  <view @click.stop="preview_img([data_item.postCommentPicture])" v-if="data_item.postCommentPicture">
                    <image
                        class="div2-3-2-img1"
                        :src="data_item.postCommentPicture"
                    />
                  </view>
                  <view class="div2-3-2-flex">
                    <text class="div2-3-2-txt3">{{ data_item.postCommentTime }}</text>
                    <view class="div2-3-2-2-flex" v-if="!data_item.liked"
                          @click.stop="comment_submit_star($event,data_item.postCommentId, 1)">
                      <wd-icon name="thumb-up" size="2vh" color="#999999"></wd-icon>
                      <text style="color: #999999">{{ data_item.likes }}</text>
                    </view>
                    <view class="div2-3-2-2-flex" v-if="data_item.liked"
                          @click.stop="comment_submit_star($event,data_item.postCommentId, 0)">
                      <wd-icon name="thumb-up" size="2vh" color="#5fc8e8"></wd-icon>
                      <text style="color: #5fc8e8">{{ data_item.likes }}</text>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>


        <view class="div2-10-flex">
          <view class="div2-10" @click="func_comment_show">
            <image class="div2-10-1" src="/static/detail/comment.png"></image>
            <view class="div2-10-2">
              <text class="div2-10-2-txt">评论千万条，友善第一条...</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view v-if="counter.detail_comment_data.length===0" class="div5">
      <view class="div5-txt">暂无评论，快来抢沙发</view>
    </view>
    <view class="div3">
      <view class="div3-1">
        <text class="div3-1-txt">湖汽万能墙@2024</text>
      </view>
    </view>

    <view class="div4-wd">
      <wd-popup v-model="counter.detail_comment_show"
                position="center"
                custom-style="height: 900rpx;width:650rpx;border-radius: 10rpx;">
        <view class="div4-flex">
          <view class="div4-1">
            <text class="div4-1-txt">发表评论</text>
          </view>
          <view style="margin-top: 30rpx" v-if="counter.detail_comment_reply_desc.length===0"></view>
          <view class="div4-4" v-if="counter.detail_comment_reply_desc.length!==0">
            @&nbsp;<image class="div4-4-img" :src="counter.detail_comment_reply_desc.userProfilePicture"></image>
            &nbsp;
            <text>{{ counter.detail_comment_reply_desc.userName }}: &nbsp;</text>
            <view class="div4-4-txt">
              {{ counter.detail_comment_reply_desc.postCommentContent }}
            </view>
          </view>
          <view class="div4-2-content">
            <wd-textarea v-model="counter.detail_comment_inp" placeholder="请输入"/>
            <view style="margin-top: 30rpx;margin-left: 20rpx">
              <wd-upload :file-list="fileList"
                         image-mode="aspectFill"
                         :action="counter.oss_url"
                         :limit="1"
                         @change="handleChange"></wd-upload>
            </view>
          </view>
          <view class="div4-3" @click="submit_comment">
            <wd-icon name="check" size="22px" color="white"></wd-icon>
            <text class="div4-3-txt">发表</text>
          </view>
        </view>
      </wd-popup>
    </view>

    <wd-popup v-model="counter.detail_comment_show_status"
              position="bottom"
              custom-style="height: 500rpx;border-radius: 20rpx;z-index:2000;background-color: rgb(243, 243, 243);">
      <view class="div6">
        <view class="div6-1">
          <image :src="counter.detail_comment_touch_data.userProfilePicture" class="div6-1-img"></image>
          <view class="div6-1-txt1">
            {{ counter.detail_comment_touch_data.userName }}
          </view>
          :
          <view class="div6-1-txt2">
            {{ counter.detail_comment_touch_data.postCommentContent }}
          </view>
        </view>
        <view class="div6-2" @click="copyBtn(counter.detail_comment_touch_data.postCommentContent)">
          <view style="margin-left: 50rpx;">
            <wd-icon name="file-copy" size="20px"></wd-icon>
          </view>
          <view style="margin-left: 20rpx;">复制该条评论</view>
        </view>
        <view class="div6-2" style="color: red" v-if="counter.detail_comment_touch_data.userId!==counter.get_user_id()"
              @click="report_touch(counter.detail_comment_touch_data.postCommentId)">
          <view style="margin-left: 50rpx;">
            <wd-icon name="warning" size="20px"></wd-icon>
          </view>
          <view style="margin-left: 20rpx;">举报</view>
        </view>
        <view class="div6-2" style="color: red" v-if="counter.detail_comment_touch_data.userId===counter.get_user_id()"
              @click="delete_touch(counter.detail_comment_touch_data.postCommentId)">
          <view style="margin-left: 50rpx;">
            <wd-icon name="delete-thin" size="20px"></wd-icon>
          </view>
          <view style="margin-left: 20rpx;">删除</view>
        </view>
        <view class="div6-2" @click="cancel_touch">
          <view style="margin-left: 50rpx;">
            <wd-icon name="close-outline" size="20px"></wd-icon>
          </view>
          <view style="margin-left: 20rpx;">取消操作</view>
        </view>
      </view>
    </wd-popup>

    <wd-toast/>
  </view>
</template>

<style scoped lang="scss">

.div6 {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;

  .div6-1 {
    margin-top: 10rpx;
    width: 700rpx;
    height: 100rpx;
    display: flex;
    flex-direction: row;
    align-items: center;

    .div6-1-txt1 {
      margin-left: 10rpx;
      max-width: 300rpx;
      overflow: hidden; /* 隐藏超出部分 */
      white-space: nowrap; /* 不换行 */
      text-overflow: ellipsis; /* 溢出时显示省略号 */
    }

    .div6-1-txt2 {
      margin-left: 20rpx;
      max-width: 300rpx;
      overflow: hidden; /* 隐藏超出部分 */
      white-space: nowrap; /* 不换行 */
      text-overflow: ellipsis; /* 溢出时显示省略号 */
    }

    .div6-1-img {
      width: 60rpx;
      height: 60rpx;
      border-radius: 50%;
    }
  }

  .div6-2 {
    width: 700rpx;
    height: 80rpx;
    border-radius: 10rpx;
    background: white;
    margin-top: 20rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}

.div5 {
  margin-top: 20rpx;
  height: 800rpx;
  width: 100vw;
  background-color: rgb(243, 243, 243);
  color: #999999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.div5-txt {

}

.div4-flex {
  display: flex;
  flex-direction: column;
  align-items: center;

  .div4-4 {
    height: 50rpx;
    width: 550rpx;
    padding: 10rpx;
    margin-top: 10rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;


    .div4-4-img {
      width: 50rpx;
      height: 50rpx;
      border-radius: 50%;
    }

    .div4-4-txt {
      color: #999999;
      max-width: 350rpx;
      overflow: hidden; /* 隐藏超出部分 */
      white-space: nowrap; /* 不换行 */
      text-overflow: ellipsis; /* 溢出时显示省略号 */
    }
  }

  .div4-1 {
    margin-top: 30rpx;

    .div4-1-txt {
      font-weight: bold;
    }
  }

  .div4-2-content {
    margin-top: 10rpx;
    height: 550rpx;
    width: 550rpx;
    padding: 10rpx;
    background-color: rgb(243, 243, 243);
  }

  .div4-3 {
    margin-top: 40rpx;
    width: 300rpx;
    height: 80rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 10rpx;
    background: rgb(1, 99, 255);


    .div4-3-txt {
      margin-left: 10rpx;
      color: white;
    }
  }
}

.div3 {
  background-color: rgb(243, 243, 243);
  height: 500rpx;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;

  .div3-1 {
    margin-top: 100rpx;

    .div3-1-txt {
      color: #999999;
      font-size: 30rpx;
    }
  }
}

.div2-10-flex {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: white;

  .div2-10 {
    height: 100rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .div2-10-1 {
      width: 60rpx;
      height: 60rpx;
    }

    .div2-10-2 {
      margin-left: 20rpx;
      width: 600rpx;
      height: 60rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      border-radius: 40rpx;
      background-color: rgb(243, 243, 243);

      .div2-10-2-txt {
        margin-left: 50rpx;
        color: #999999;
        font-size: 30rpx;
      }
    }


  }

}

.div2-3 {
  margin-top: 10rpx;
  padding: 0 10rpx 10px 10px;
  border-radius: 10rpx;
  margin-left: 70rpx;
  width: 600rpx;
  background: white;

  .div2-3-flex {
    margin-top: 30rpx;
    display: flex;
    flex-direction: column;

    .div2-3-0 {

      display: flex;
      flex-direction: row;

      .div2-3-1-wd-img {
        width: 50rpx;
        height: 50rpx;
        border-radius: 50%;
      }

      .div2-3-2 {
        display: flex;
        flex-direction: column;
        margin-left: 20rpx;


        .div2-3-2-txt1 {
          color: #999999;
          font-size: 26rpx;
          max-width: 520rpx;
          overflow: hidden; /* 隐藏超出部分 */
          white-space: nowrap; /* 不换行 */
          text-overflow: ellipsis; /* 溢出时显示省略号 */
        }

        .div2-3-2-txt2 {
          font-size: 26rpx;
          margin-top: 5rpx;
        }

        .div2-3-2-img1 {
          margin-top: 10rpx;
          width: 175rpx;
          height: 175rpx;
          border-radius: 5rpx;
        }

        .div2-3-2-flex {
          width: 520rpx;
          margin-top: 5rpx;
          display: flex;
          flex-direction: row;


          .div2-3-2-txt3 {
            color: #999999;
            font-size: 22rpx;
          }

          .div2-3-2-2-flex {
            margin-left: auto;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
          }

        }
      }
    }
  }
}

.div2-2-flex {
  margin-top: 30rpx;
  display: flex;
  flex-direction: column;

  .div2-2 {

    display: flex;
    flex-direction: row;

    .div2-2-1-wd-img {
      width: 50rpx;
      height: 50rpx;
      border-radius: 50%;
    }

    .div2-2-2 {
      display: flex;
      flex-direction: column;
      margin-left: 20rpx;


      .div2-2-2-txt1 {
        color: #999999;
        font-size: 26rpx;
        max-width: 520rpx;
        overflow: hidden; /* 隐藏超出部分 */
        white-space: nowrap; /* 不换行 */
        text-overflow: ellipsis; /* 溢出时显示省略号 */
      }

      .div2-2-2-txt2 {
        font-size: 26rpx;
        margin-top: 5rpx;
      }

      .div2-2-2-img1 {
        margin-top: 10rpx;
        width: 175rpx;
        height: 175rpx;
        border-radius: 5rpx;
      }

      .div2-2-2-flex {
        width: 605rpx;
        margin-top: 5rpx;
        display: flex;
        flex-direction: row;


        .div2-2-2-txt3 {
          color: #999999;
          font-size: 22rpx;
        }

        .div2-2-2-2-flex {
          margin-left: auto;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;

          .div2-2-2-txt4 {
            margin-left: 3rpx;
            font-size: 25rpx;
            color: #999999;
          }
        }

      }
    }
  }


}

.div2-flex {
  display: flex;
  flex-direction: column;
  align-items: center;

  .div2 {
    width: 700rpx;

    .div2-1 {
      display: flex;
      flex-direction: row;
      align-items: center;

      .div2-1-1 {
        font-weight: bold;
      }

      .div2-1-2 {
        margin-left: auto;
        width: 200rpx;
      }
    }
  }
}


.div-root {
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: white;
}

.div1 {
  display: flex;
  margin-top: 100rpx;
  background-color: white;
  margin-bottom: 10rpx;
  width: 100vw;
  padding: 20rpx;
  flex-direction: column;

  .div1-1 {
    display: flex;
    flex-direction: row;

    .div1-1-1-txt1 {
      font-size: 30rpx;
      max-width: 520rpx;
      overflow: hidden; /* 隐藏超出部分 */
      white-space: nowrap; /* 不换行 */
      text-overflow: ellipsis; /* 溢出时显示省略号 */
    }

    .div1-1-wd-img {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
    }

    .div1-1-1-txt2 {
      color: #999999;
      font-size: 24rpx;
    }

    .div1-1-1-txt3 {
      margin-left: 30rpx;
      font-size: 24rpx;
      color: #999999;
    }

    .div1-1-1 {
      display: flex;
      flex-direction: column;
      margin-left: 20rpx;

      .div1-1-1-1 {
        margin-top: 5rpx;
        display: flex;
        flex-direction: row;
      }
    }

    .div1-1-2 {
      margin-left: auto;
      position: relative;
      left: -50rpx;
      color: #999999;
      font-size: 28rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
    }
  }

  .div1-2 {
    display: flex;
    flex-direction: column;
    margin-top: 10rpx;
    position: relative;
    margin-left: 80rpx;
    width: 550rpx;

    .div1-2-txt {
      font-size: 30rpx;
    }


    .div1-2-img-flex {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      margin-top: 20rpx;


      .div1-2-wd-img {
        width: 175rpx;
        height: 175rpx;
        border-radius: 5rpx;
      }
    }
  }

  .div1-3 {
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-between;
    margin-top: 20rpx;
    position: relative;
    margin-left: 70rpx;

    .div1-3-1 {
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

    .div1-3-2 {
      margin-left: auto;
      position: relative;
      left: -50rpx;
      color: #999999;
      font-size: 25rpx;
      display: flex;
      flex-direction: row;

      .div1-3-2-flex {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }


  }
}

.div1-3-3 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20rpx;

  .div1-3-3-1 {
    font-size: 35rpx;
    margin-top: 40rpx;
    margin-bottom: 20rpx;
  }

  .div1-3-3-2 {
    width: 500rpx;
    background-color: rgb(243, 243, 243);
    padding: 10rpx;
    border-radius: 10rpx;
  }

  .div1-3-3-3 {
    margin-top: 40rpx;
    display: flex;
    flex-direction: row;
    justify-content: center;

    .div1-3-3-3-1 {
      width: 220rpx;
      height: 90rpx;
      border-radius: 10rpx;
      margin-left: 30rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 40rpx;
      background-color: rgb(243, 243, 243);
    }

    .div1-3-3-3-2 {
      width: 220rpx;
      height: 90rpx;
      border-radius: 10rpx;
      margin-left: 30rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 40rpx;
      background-color: rgb(243, 243, 243);
    }
  }
}
</style>