<template>
  <div class="container">
    <swiper class="swiper-class" autoplay="True" interval="3000" duration="1000">
      <block v-for="(item, index) in imgUrls" :key="index">
        <swiper-item>
          <image :src="item" class="slide-image" width="355" height="150" />
        </swiper-item>
      </block>
    </swiper>

    <div class="grid-box">
      <i-grid>
        <i-grid-item i-class="grade-color" @click="toExamPage">
          <i-grid-icon>
            <span class="layui-icon layui-icon-grade"></span>
          </i-grid-icon>
          <i-grid-label>成绩</i-grid-label>
        </i-grid-item>

        <i-grid-item @click="moreFunction">
          <i-grid-icon>
            <span class="layui-icon layui-icon-more"></span>
          </i-grid-icon>
          <i-grid-label>敬请期待</i-grid-label>
        </i-grid-item>
      </i-grid>
    </div>

    <div class="ad-box">
      <ad unit-id="adunit-db7d552ed896d403"></ad>
    </div>

    <div class="info">
      <div class="data">数据来源江苏大学能源与动力工程学院，仅供参考</div>
      <div class="run">运营策划：江苏大学能源与动力工程学院</div>
      <div class="support">技术支持：14级彭思文</div>
    </div>

    <i-toast id="toast" />
  </div>
</template>

<script>
const { $Toast } = require("../../../static/iview/base/index");

export default {
  data() {
    return {
      imgUrls: [
        "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640",
        "https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640",
        "https://images.unsplash.com/photo-1551446591-142875a901a1?w=640"
      ]
    };
  },
  methods: {
    moreFunction() {
      $Toast({
        content: "更多功能策划中...",
        type: "success"
      });
    },
    handleClick(e) {
      console.log(e);
    },
    toExamPage(e) {
      wx.navigateTo({
        url: "../exam/main",
        events: {
          // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          acceptDataFromOpenedPage: function(data) {
            console.log(data);
          },
          someEvent: function(data) {
            console.log(data);
          }
        },
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit("acceptDataFromOpenerPage", { data: "test" });
        }
      });
    }
  }
};
</script>

<style>
.container {
}
.grid-box {
  margin-top: 10rpx;
}
.grade-color,
.i-grid-label {
  color: #6a65d8;
}
.swiper-class {
  height: 420rpx;
}
.swiper-class image {
  width: 100%;
  height: 100%;
}
.ad-box {
  margin: 40rpx 0;
}
.ad-box ad {
  width: 300rpx;
  margin: 2rpx auto;
  height: 80px !important;
  border-radius: 10rpx;
}
.info {
  margin: 40rpx 0;
  width: 750rpx;
  font-size: 24rpx;
  color: #dddee1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.info div {
  text-align: center;
}
.info .support {
}
.clearfix {
  clear: both;
}
</style>