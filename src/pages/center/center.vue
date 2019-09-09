<template>
  <div>
    <div @click="loginBtn">登陆</div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    loginBtn: function(e) {
      console.log(e);
      wx.login({
        success: res => {
          console.log(res);
        },
        fail: () => {},
        complete: () => {}
      });
    }
  }
};
</script>

<style>
</style>