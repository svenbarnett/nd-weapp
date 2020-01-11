<template>
  <div class="container">
    <div>
      <ul v-for="(item, index) in funList" v-bind:key="index">
        <li class="func-box" :class="item.color" @click="navigator" :data-url="item.url">
          <div class="name" :class="item.color">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </div>
          <div class="desc">{{item.desc}}</div>
        </li>
      </ul>
    </div>

    <div class="ad-box">
      <ad unit-id="adunit-db7d552ed896d403"></ad>
    </div>

    <div class="official-box">
      <official-account></official-account>
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
      funList: [
        {
          url: "../exam/main",
          name: "成绩查询",
          color: "color-6a65d8",
          icon: "layui-icon layui-icon-grade",
          desc:
            "为学生和家长提供在线移动端成绩查询！数据来源能动学院学工处，以实际为准，数据仅供参考！"
        },
        {
          url: "WILL_BE_UP",
          name: "资料获取",
          color: "color-f55555",
          icon: "layui-icon layui-icon-volunteer",
          desc:
            "功能对接能动学院能动文库，为学生提供相关专业知识，涉及考研资料，学业资料等！"
        },
        {
          url: "",
          name: "更多功能",
          color: "color-6a6558",
          icon: "layui-icon layui-icon-more",
          desc:
            "数据来源于能动学院学工处，仅供参考，为学生和家长提供在线移动端成绩查询！"
        }
      ]
    };
  },
  methods: {
    navigator(e) {
      let url = e.currentTarget.dataset.url;
      if (url == "WILL_BE_UP") {
        this.$options.willBeUp();
        return;
      }
      if (url) {
        wx.navigateTo({
          url: url
        });
        return;
      }
      this.$options.moreFunction();
    }
  },
  moreFunction() {
    $Toast({
      content: "策划中...",
      type: "success"
    });
  },
  willBeUp() {
    $Toast({
      content: "即将上线...",
      type: "success"
    });
  }
};
</script>

<style>
.func-box {
  margin: 40rpx 20rpx;
  border: 1px solid #dddddd;
  border-radius: 10rpx;
  padding: 5rpx;
  box-shadow: #888888 2px 2px;
}
.func-box.color-6a65d8 {
  border-left: 5px solid #6a65d8;
}
.func-box.color-f55555 {
  border-left: 5px solid #f55555;
}
.func-box i {
  display: inline-block;
  margin: 40rpx;
}
.color-6a65d8 i {
  color: #6a65d8;
}
.color-f55555 i {
  color: #f55555;
}
.func-box .name {
  font-weight: bold;
  font-size: 36rpx;
}
.func-box .desc {
  color: #959699;
  font-size: 28rpx;
  margin: 4rpx 10rpx;
}

.grade-color {
  color: #6a65d8;
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