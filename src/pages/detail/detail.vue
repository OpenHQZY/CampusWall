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

watch(() => counter.detail_segmented_current, () => {
  if (counter.detail_segmented_current === "时间") {
    counter.detail_comment_data = counter.detail_comment_data_time
  } else {
    counter.detail_comment_data = counter.detail_comment_data_hot
  }
})

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

const fileList = ref([
  {
    url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg'
  }
])

const action = 'https://mockapi.eolink.com/zhTuw2P8c29bc981a741931bdd86eb04dc1e8fd64865cb5/upload'

function handleChange({fileList: files}) {
  fileList.value = files
}

function getCurrentTime() {
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1; // 月份是从0开始的
  let day = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();

  // 补齐时分前面的0
  hour = hour < 10 ? '0' + hour : hour;
  minute = minute < 10 ? '0' + minute : minute;

  // 补齐月份和日期前面的0
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;

  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
}

const func_comment_show = () => {
  counter.detail_comment_reply_var = ["", ""]
  counter.detail_comment_reply_desc = []
  counter.comment_show = true;
}
const submit_comment = () => {
  if (counter.detail_comment_inp.length > 0) {
    const current_data_format = getCurrentTime();
    if (counter.detail_comment_reply_var[0].length === 0) {
      const submit_comment_add_func1 = (comment_data) => {
        comment_data.push(["164512", "54678", "13687", "/static/index/test_head.png", "测试用户", counter.detail_comment_inp, current_data_format, 0, []])
      }
      submit_comment_add_func1(counter.detail_comment_data)
      submit_comment_add_func1(counter.detail_comment_data_hot)
      submit_comment_add_func1(counter.detail_comment_data_time)
    } else if (counter.detail_comment_reply_var[1].length > 0) {
      console.log(counter.detail_comment_reply_var)
      const submit_comment_add_func2 = (comment_data) => {
        for (let i = 0; i < comment_data.length; i++) {
          for (let j = 0; j < comment_data[i][8].length; j++) {
            if (comment_data[i][8][j][1] === counter.detail_comment_reply_var[1]) {
              console.log("ac", comment_data[i][8][j][1], counter.detail_comment_reply_var[1])
              comment_data[i][8].push(["164512", "54678", "13687", "/static/index/test_head.png", "测试用户", counter.detail_comment_inp, current_data_format, 0, comment_data[i][8][j][4]])
            }
          }
        }
      }
      submit_comment_add_func2(counter.detail_comment_data)
      submit_comment_add_func2(counter.detail_comment_data_hot)
      submit_comment_add_func2(counter.detail_comment_data_time)
    } else {
      const submit_comment_add_func3 = (comment_data) => {
        for (let i = 0; i < comment_data.length; i++) {
          if (comment_data[i][1] === counter.detail_comment_reply_var[0]) {
            comment_data[i][8].push(["164512", "54678", "13687", "/static/index/test_head.png", "测试用户", counter.detail_comment_inp, current_data_format, 0, ""])
          }
        }
      }
      submit_comment_add_func3(counter.detail_comment_data)
      submit_comment_add_func3(counter.detail_comment_data_hot)
      submit_comment_add_func3(counter.detail_comment_data_time)
    }
    counter.detail_comment_inp = "";
    counter.comment_show = false;
    toast.show('发布成功')
  } else {
    toast.show('输入内容为空')
  }
}

const func_reply_comment_show = (reply1, reply2) => {
  counter.detail_comment_reply_var = [reply1, reply2]
  if (reply2.length === 0) {
    for (let i = 0; i < counter.detail_comment_data.length; i++) {
      if (counter.detail_comment_data[i][1] === reply1) {
        counter.detail_comment_reply_desc = counter.detail_comment_data[i];
      }
    }
  } else {
    for (let i = 0; i < counter.detail_comment_data.length; i++) {
      for (let j = 0; j < counter.detail_comment_data[i][8].length; j++) {
        if (counter.detail_comment_data[i][8][j][1] === reply2) {
          counter.detail_comment_reply_desc = counter.detail_comment_data[i][8][j];
        }
      }
    }
  }
  counter.comment_show = true;
}
const submit_collect = () => {
  counter.detail_collect = !counter.detail_collect
}
const submit_report_show = () => {
  counter.detail_report_show = true
}
const submit_report_off = () => {
  counter.detail_report_show = false
}
const submit_report_enable = () => {
  counter.detail_report_show = false
  toast.show('举报提交成功')
}
const submit_star = (event) => {
  event.stopPropagation(); // 阻止事件冒泡
  counter.detail_star = !counter.detail_star;
}

/*
*评论
* [帖子id，评论id，用户id，头像，用户名，评论文字内容，评论时间，评论点赞数，评论图片，
* [帖子id，评论id，用户id，头像，用户名，评论文字内容，评论时间，评论点赞数，回复对象的用户名,评论图片],
* [帖子id，评论id，用户id，头像，用户名，评论文字内容，评论时间，评论点赞数，回复对象的用户名,评论图片],
* [帖子id，评论id，用户id，头像，用户名，评论文字内容，评论时间，评论点赞数，回复对象的用户名,评论图片],
* [帖子id，评论id，用户id，头像，用户名，评论文字内容，评论时间，评论点赞数，回复对象的用户名,评论图片],
* ]
*
*
*
* */
</script>

<template>
  <view :style="{ paddingTop: safeAreaInsets.top+0 + 'px' }" class="div-root">
    <wd-navbar title="详情" left-text="返回" left-arrow @click-left="handleClickLeft"></wd-navbar>
    <view class="div1">

      <view class="div1-1">
        <view @click.stop="preview_img([counter.detail_card_data[2]])">
          <image
              class="div1-1-wd-img"
              :src="counter.detail_card_data[2]"
          />
        </view>
        <view class="div1-1-1">
          <text class="div1-1-1-txt1">{{ counter.detail_card_data[3] }}</text>
          <view class="div1-1-1-1">
            <text class="div1-1-1-txt2">{{ counter.detail_card_data[4] }}</text>
            <text class="div1-1-1-txt3">{{ counter.detail_card_data[5] }}次围观</text>
          </view>
        </view>
        <view class="div1-1-2" v-if="!counter.detail_star" @click.stop="submit_star($event)">
          <wd-icon name="thumb-up" size="2.2vh"></wd-icon>
          <text>{{ counter.detail_card_data[11] }}</text>
        </view>
        <view class="div1-1-2" v-if="counter.detail_star" @click.stop="submit_star($event)">
          <wd-icon name="thumb-up" size="2.2vh" color="#5fc8e8"></wd-icon>
          <text style="color: #5fc8e8">{{ counter.detail_card_data[11] }}</text>
        </view>
      </view>

      <view class="div1-2">
        <text class="div1-2-txt">{{ counter.detail_card_data[6] }}</text>
        <view class="div1-2-img-flex">
          <view class="div1-2-img" v-for="(img_data, img_index) in counter.detail_card_data[8]" :key="img_index"
                @click.stop="preview_img(counter.detail_card_data[8])">
            <image
                class="div1-2-wd-img"
                :src="img_data"
            />
          </view>
        </view>
      </view>

      <view class="div1-3">
        <view class="div1-3-1">
          <text># {{ counter.detail_card_data[9] }}</text>
        </view>
        <view class="div1-3-2">
          <view class="div1-3-2-flex" @click="submit_report_show">
            <wd-icon name="check-rectangle" size="2.2vh"></wd-icon>
            <text style="margin-left: 2.5rpx">举报</text>
          </view>
          <view class="div1-3-2-flex" style="margin-left: 20rpx" v-if="!counter.detail_collect" @click="submit_collect">
            <wd-icon name="star" size="2.2vh"></wd-icon>
            <text style="margin-left: 2.5rpx">收藏</text>
          </view>
          <view class="div1-3-2-flex" style="margin-left: 20rpx" v-if="counter.detail_collect" @click="submit_collect">
            <wd-icon name="star" size="2.2vh" color="#5fc8e8"></wd-icon>
            <text style="margin-left: 2.5rpx;color: #5fc8e8">取消</text>
          </view>
        </view>
      </view>
      <wd-popup v-model="counter.detail_report_show"
                position="center"
                custom-style="height: 400rpx;width:600rpx;border-radius: 10rpx;">
        <view class="div1-3-3">
          <view class="div1-3-3-1">提示</view>
          <view class="div1-3-3-2">是否举报该帖子？</view>
          <view class="div1-3-3-3">
            <view class="div1-3-3-3-1" @click="submit_report_off">取消</view>
            <view class="div1-3-3-3-2" style="color: rgb(1, 99, 255)" @click="submit_report_enable">确认</view>
          </view>
        </view>
      </wd-popup>

    </view>

    <view class="div2-flex">
      <view class="div2">

        <view class="div2-1">
          <text class="div2-1-1">评论（{{ counter.detail_card_data[12] }}）</text>
          <view class="div2-1-2">
            <wd-segmented :options="counter.detail_segmented_list"
                          size="small"
                          v-model:value="counter.detail_segmented_current"></wd-segmented>
          </view>
        </view>


        <view class="div2-2-flex" v-for="(data, index) in counter.detail_comment_data" :key="index">
          <view class="div2-2">
            <view @click.stop="preview_img([data[3]])">
              <image
                  class="div2-2-1-wd-img"
                  :src="data[3]"
              />
            </view>
            <view class="div2-2-2" @click="func_reply_comment_show(data[1], '')">
              <text class="div2-2-2-txt1">{{ data[4] }}</text>
              <text class="div2-2-2-txt2">{{ data[5] }}</text>
              <view class="div2-2-2-flex">
                <text class="div2-2-2-txt3">{{ data[6] }}</text>
                <view class="div2-2-2-2-flex" v-if="!counter.detail_star" @click.stop="submit_star($event)">
                  <wd-icon name="thumb-up" size="2vh" color="#999999"></wd-icon>
                  <text style="color: #999999">{{ data[7] }}</text>
                </view>
                <view class="div2-2-2-2-flex" v-if="counter.detail_star" @click.stop="submit_star($event)">
                  <wd-icon name="thumb-up" size="2vh" color="#5fc8e8"></wd-icon>
                  <text style="color: #5fc8e8">{{ data[7] }}</text>
                </view>
              </view>
            </view>
          </view>

          <view class="div2-3" v-if="data[8].length>0">
            <view class="div2-3-flex" v-for="(data_item, index) in data[8]" :key="index">
              <view class="div2-3-0">
                <view @click.stop="preview_img([data_item[3]])">
                  <image
                      class="div2-3-1-wd-img"
                      :src="data_item[3]"
                  />
                </view>
                <view class="div2-3-2" @click="func_reply_comment_show(data[1], data_item[1])">
                  <text class="div2-3-2-txt1">{{ data_item[4] }}</text>
                  <text class="div2-3-2-txt2" v-if="data_item[8].length===0">{{ data_item[5] }}</text>
                  <text class="div2-3-2-txt2" v-if="data_item[8].length!==0">
                    回复
                    <text style="color: #5fc8e8">@{{ data_item[8] }}</text>
                    :{{
                      data_item[5]
                    }}
                  </text>
                  <view class="div2-3-2-flex">
                    <text class="div2-3-2-txt3">{{ data_item[6] }}</text>
                    <view class="div2-3-2-2-flex" v-if="!counter.detail_star" @click.stop="submit_star($event)">
                      <wd-icon name="thumb-up" size="2vh" color="#999999"></wd-icon>
                      <text style="color: #999999">{{ data_item[7] }}</text>
                    </view>
                    <view class="div2-3-2-2-flex" v-if="counter.detail_star" @click.stop="submit_star($event)">
                      <wd-icon name="thumb-up" size="2vh" color="#5fc8e8"></wd-icon>
                      <text style="color: #5fc8e8">{{ data_item[7] }}</text>
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

    <view class="div3">
      <view class="div3-1">
        <text class="div3-1-txt">湖汽万能墙@2024</text>
      </view>
    </view>

    <view class="div4-wd">
      <wd-popup v-model="counter.comment_show"
                position="center"
                custom-style="height: 900rpx;width:650rpx;border-radius: 10rpx;">
        <view class="div4-flex">
          <view class="div4-1">
            <text class="div4-1-txt">发表评论</text>
          </view>
          <view style="margin-top: 30rpx" v-if="counter.detail_comment_reply_desc.length===0"></view>
          <view class="div4-4" v-if="counter.detail_comment_reply_desc.length>0">
            @&nbsp;<image class="div4-4-img" :src="counter.detail_comment_reply_desc[3]"></image>
            &nbsp;
            <text>{{ counter.detail_comment_reply_desc[4] }}: &nbsp;</text>
            <view class="div4-4-txt">
              {{ counter.detail_comment_reply_desc[5] }}
            </view>
          </view>
          <view class="div4-2-content">
            <wd-textarea v-model="counter.detail_comment_inp" placeholder="请输入"/>
            <view style="margin-top: 30rpx;margin-left: 20rpx">
              <wd-upload :file-list="fileList1"
                         image-mode="aspectFill"
                         :action="action"
                         :limit="1"
                         @change="handleChange1"></wd-upload>
            </view>
          </view>
          <view class="div4-3" @click="submit_comment">
            <wd-icon name="check" size="22px" color="white"></wd-icon>
            <text class="div4-3-txt">发表</text>
          </view>
        </view>
      </wd-popup>
    </view>

    <wd-toast/>
  </view>
</template>

<style scoped lang="scss">
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
  background-color: rgb(243, 243, 243);
}

.div1 {
  display: flex;
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
      height: 45rpx;
      border-radius: 10rpx;
      background-color: rgb(243, 243, 243);
      color: #999999;
      font-size: 23rpx;
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
  }

  .div1-3-3-2 {
    font-size: 35rpx;
    margin-top: 40rpx;
    margin-bottom: 40rpx;
  }

  .div1-3-3-3 {
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