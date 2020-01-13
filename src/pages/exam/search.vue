<template>
  <div>
    <i-panel title="姓名：">
      <view>
        <input
          class="condition-input"
          v-model="name"
          type="text"
          placeholder="请输入姓名"
          maxlength="50"
        />
      </view>
    </i-panel>

    <i-panel title="身份证号：">
      <view>
        <input
          class="condition-input"
          v-model="idnumber"
          type="text"
          placeholder="请输入身份证号"
          maxlength="18"
        />
      </view>
    </i-panel>

    <i-panel title="学年：">
      <view class="condition-input">
        <picker @change="bindYearPickerChange" :value="yearObject.index" :range="yearObject.array">
          <view class="picker">当前选择：{{yearObject.array[yearObject.index]}}</view>
        </picker>
      </view>
    </i-panel>

    <i-panel title="学期：">
      <view class="condition-input">
        <picker @change="bindTermPickerChange" :value="termObject.index" :range="termObject.array">
          <view class="picker">当前选择：{{termObject.array[termObject.index]}}</view>
        </picker>
      </view>
    </i-panel>

    <div class="btn-box">
      <i-button @click="handleClick" type="primary">查询</i-button>
    </div>

    <i-toast id="toast" />
  </div>
</template>

<script>
const { $Toast } = require("../../../static/iview/base/index");
export default {
  onLoad() {
    var myDate = new Date();
    var curYear = myDate.getFullYear();
    let yearLine1 = curYear + "-" + (curYear + 1);
    let yearLine2 = curYear - 1 + "-" + curYear;
    let yearLine3 = curYear - 2 + "-" + (curYear - 1);
    let yearLine4 = curYear - 3 + "-" + (curYear - 2);
    var arr = [];

    arr.push(yearLine1, yearLine2, yearLine3, yearLine4);

    this.yearObject.array = arr;
    this.year = yearLine1;
    this.term = 1;
    this.name = "";
    this.idnumber = "";
  },
  data() {
    return {
      yearObject: {
        index: 0,
        array: []
      },
      termObject: {
        index: 0,
        array: ["第一学期", "第二学期"]
      },
      name: "",
      number: "",
      idnumber: "",
      year: "",
      term: ""
    };
  },
  methods: {
    bindYearPickerChange(e) {
      this.yearObject.index = e.mp.detail.value;
      this.year = this.yearObject.array[this.yearObject.index];
    },
    bindTermPickerChange(e) {
      this.termObject.index = e.mp.detail.value;
      this.term = this.termObject.index + 1;
    },
    doFailToast(str) {
      $Toast({
        content: str,
        type: "error"
      });
    },
    handleClick(e) {
      let stuName = this.name,
        number = this.number,
        idnumber = this.idnumber,
        year = this.year,
        term = this.term;
      if (!stuName && stuName == "") {
        this.doFailToast("姓名不能为空！");
        return false;
      }
      if (!idnumber && idnumber == "") {
        this.doFailToast("身份证不能为空！");
        return false;
      }
      if (!year && year == "") {
        this.doFailToast("请选择学年！");
        return false;
      }
      if (!term && term == "") {
        this.doFailToast("请选择学期！");
        return false;
      }
      wx.request({
        url: "https://www.jsdxndxy.cn/frame-web/api/v1/examinfo",
        data: {
          idnumber: idnumber,
          name: stuName,
          term: term,
          year: year
        },
        method: "POST",
        header: {
          "content-type": "application/json" // 默认值
        },
        success(res) {
          var data = res.data;
          if (data.code == 1) {
            $Toast({
              content: data.msg,
              type: "error"
            });
            return false;
          }
          wx.navigateTo({
            url:
              "../examinfo/main?name=" +
              stuName +
              "&idnumber=" +
              idnumber +
              "&year=" +
              year +
              "&term=" +
              term
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.btn-box {
  margin-top: 140rpx;
}
.condition-input {
  padding: 5rpx 50rpx;
  font-size: 24rpx;
  height: 54rpx;
  line-height: 48rpx;
  border: 1px solid #eeeeee;
}
</style>