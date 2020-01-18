<<template>
    <div>

      <div class="stu-info">
        <div>姓名：{{examinfo.name}}</div>
         <div>专业班级：{{examinfo.major}}-{{examinfo.classname}}</div>
          <div>学年学期：{{examinfo.year}}(第{{examinfo.term}}学期)</div>
          <div>总学分：{{examinfo.allscore}}</div>
           <div>已获学分：{{examinfo.getscore}}</div>
           <div>绩点(GPA)：{{examinfo.gpa}}</div>
           <div class="desc">
              <p>1、绩点=（得分-50）/10。如某生绩点4.6，该生得分=绩点*10+50=96分；</p>
              <p>2、家长可关注学院官方微信【江大能动订阅号】，了解学院动态补考信息等；</p>
           </div>
           <div>名次：{{examinfo.rank}}</div>
        </div>
        <table>
          <thead>
            <tr>
              <td class="coursename">课程</td>
              <td>学分</td>
              <td>成绩</td>
            </tr>
          </thead>
          <tbody>
            <block v-for="(item, index) in examinfo.courses" v-bind:key="index">
               <tr>
              <td class="coursename">{{item.name}}</td>
              <td>{{item.weight}}</td>
              <td>{{item.score}}</td>
            </tr>
            </block>
          </tbody>
        </table>

            <i-toast id="toast" />

    </div>
</template>

<script>
const { $Toast } = require("../../../static/iview/base/index");

export default {
  data() {
    return {
      examinfo: {}
    };
  },
  methods: {},
  onLoad: function(e) {
    var that = this;
    // `this` 指向 vm 实例
    // console.log(e);
    this.examinfo = {};
    wx.request({
      url: "https://www.jsdxndxy.cn/frame-web/api/v1/examinfo",
      data: e,
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
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            });
          }, 1000);
          return false;
        }

        if (data.code == 0) {
          that.examinfo = data.data;
        }
      }
    });
  }
};
</script>

<style scoped>
table {
  font-size: 24rpx;
  border-collapse: collapse;
}
table thead {
  background-color: #f8f8f9;
}
table tr {
  display: flex;
}
table td {
  flex: 1;
  border: 1rpx solid #dddee1;
  text-align: center;
}

td.coursename {
  flex: 3;
}

tbody td.coursename {
  text-align: left;
}
.stu-info > div {
  padding: 6rpx 10rpx;
  font-size: 24rpx;
  margin: 20rpx 0;
}
.stu-info .desc p {
  font-size: 22rpx;
  color: #888888;
  clear: both;
}
</style>