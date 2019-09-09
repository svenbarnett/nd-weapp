<template>
  <div>
    <swiper class="swiper-class" autoplay="True" interval="3000" duration="1000">
      <block v-for="(item, index) in imgUrls" :key="index">
        <swiper-item>
          <image :src="item" class="slide-image" width="355" height="150" />
        </swiper-item>
      </block>
    </swiper>

    <div class="grid-box">
      <i-grid>
        <i-grid-item i-class="grade-color">
          <i-grid-icon>
            <span class="layui-icon layui-icon-grade"></span>
          </i-grid-icon>
          <i-grid-label>查看成绩</i-grid-label>
        </i-grid-item>

        <i-grid-item>
          <i-grid-icon>
            <span class="layui-icon layui-icon-more"></span>
          </i-grid-icon>
          <i-grid-label>敬请期待</i-grid-label>
        </i-grid-item>
      </i-grid>
    </div>
  </div>
</template>

<script>
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
    handleClick(e) {
      console.log(e);
    }
  }
};
</script>

<style>
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
</style>