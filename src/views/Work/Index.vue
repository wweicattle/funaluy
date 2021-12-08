<template>
  <div class="work-contain">
    <div class="left-content">
      <div class="t-content">
        <div class="tit one-line">账号租金总览</div>
        <div class="select-des">
          <div class="nowday-content">
            <div class="now">当日汇总</div>
            <div class="num">1832.6W</div>
          </div>
          <div class="time-content">
            <el-date-picker
              v-model="value1"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
              size="small"
            >
            </el-date-picker>
            <el-select size="small" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="line">
          <!-- <v-chart class="chart" :option="option" /> -->
        </div>
      </div>
      <div class="l-content">
        <div class="l-c">
          <div class="tit">账号租金总览</div>
          <div class="tit-name">
            <template v-for="(val, index) in accountTit" :key="index">
              <span
                class="bank-name"
                :class="{
                  active: slectIndex == index,
                }"
                @click="changeBank(index)"
                >{{ val }}
              </span>
            </template>
            <!-- <span class="ative">银行资金存量</span>

            <span>组织资金存量</span> -->
          </div>
          <div class="pie"></div>
        </div>
        <div class="l-c">
          <div class="tit">账号租金总览</div>
          <div class="lines">
            <div class="tit-name">
              <template v-for="(val, index) in remindAccounts" :key="index">
                <span
                  class="bank-name"
                  :class="{
                    active: accountIndex == index,
                  }"
                  @click="changeAccount(index)"
                  >{{ val }}
                </span>
              </template>
              <!-- <span class="ative">银行资金存量</span>

            <span>组织资金存量</span> -->
            </div>
            <ul>
              <li class="reminder-line">
                <!-- <img src="static/img/ee.jpg" alt="" /> -->
                <span class="b-num">银行总数</span>
                <span class="num"> 36 家</span>
              </li>
              <li class="reminder-line remittance-number">
                <!-- <img src="static/img/ee.jpg" alt="" /> -->
                <span class="b-num">汇款总笔数</span>
                <span class="num"> 264 笔</span>
              </li>
              <li class="reminder-line remittance-amount">
                <!-- <img src="static/img/ee.jpg" alt="" /> -->
                <span class="b-num">汇款总金额</span>
                <span class="num"> 2612.4 W</span>
              </li>
            </ul>
            <div class="watch-detail">
              <el-button type="border" @click="dialogShow = true"
                >查看明细</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right-content">
      <div class="tit one-line">到期提醒</div>
      <div class="casdate">
        <div class="date-time">
          <div class="l">
            <span class="day">02</span>
            <span class="week">星期二</span>
          </div>
          <span class="r">20oc</span>
        </div>

        <CasDate />
      </div>
      <div class="remind-content" @click="ss">提醒列表</div>
      <div class="remind-list">
        <div class="pay-item">
          <div>
            <span class="icon"></span>
            <span class="des">大额转账支付预警</span>
          </div>
          <span class="time">2021.11.30</span>
        </div>

        <div class="pay-item">
          <div>
            <span class="icon"></span>
            <span class="des">大额转账支付预警</span>
          </div>
          <span class="time">2021.11.30</span>
        </div>
        <div class="pay-item">
          <div>
            <span class="icon"></span>
            <span class="des">大额转账支付预警</span>
          </div>
          <span class="time">2021.11.30</span>
        </div>
      </div>

      <el-dialog
        v-model="dialogVisible"
        title="Tips"
        width="60%"
        :before-close="handleClose"
        :close-on-click-modal="false"
      >
        <cas-date />
      </el-dialog>
    </div>
    <el-dialog v-model="dialogShow" title="到账提醒" width="480px">
      <div class="account-pass scrollbar-css">
        <ul>
          <template v-for="(val, index) in 3" :key="index">
            <li class="a-item">
              <div class="tits"></div>
              <div class="a-content">
                <div class="a-l">
                  <div class="tit-com">成都闽画商贸易公司</div>
                  <div class="mar">22914312411</div>
                  <div>今天 10:36:00</div>
                </div>
                <div class="a-c">
                  <div>--></div>
                  <div>到账</div>
                </div>
                <div class="a-r">
                  <div class="tit-com">利郎(中国)有限公司</div>
                  <div class="mar">2291431241</div>
                  <div class="pri">+ CNY 1.200.000.000</div>
                </div>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Calendar from "mpvue-calendar";
import {
  getRaiseMoney,
  getRemindData,
  getMoneyVolation,
} from "network/request.js";
import { getDateRange } from "utils/getDateRange";
import { mapState } from "vuex";
import {
  ref,
  watch,
  onMounted,
  reactive,
  getCurrentInstance,
  toRefs,
} from "vue";
import CasDate from "./Child/CasDate.vue";
export default {
  name: "WorkIndex",
  setup(props) {
    const { proxy } = getCurrentInstance();
    const dialogShow = ref(false);
    const slectIndex = ref(0);
    const accountIndex = ref(0);
    const state = reactive({
      shortcuts: [
        {
          text: "Last week",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return [start, end];
          },
        },
        {
          text: "Last month",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            return [start, end];
          },
        },
        {
          text: "Last 3 months",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            return [start, end];
          },
        },
      ],
      value1: [],
      value2: "",
      options: [
        {
          value: "30",
          label: "本月",
        },
        {
          value: "90",
          label: "三个月",
        },
      ],
      value: "本月",
    });

    let echarts = proxy.echarts;
    const accountTit = ["银行资金存量", "组织资金存量"];
    const remindAccounts = ["本周到账提醒"];
    const dialogVisible = ref(false);
    const remarks = ref({ "2021-11-13": "some tings" });

    const changeBank = (index) => {
      slectIndex.value = index;
    };
    const changeAccount = (index) => {
      console.log(index);
      accountIndex.value = index;
    };

    const handleClose = () => {
      console.log(323);
    };
    watch(
      () => state.value1,
      (newVal) => {
        console.log(newVal[0]);
      }
    );

    onMounted(() => {
      // 线性
      function line() {
        // console.log(ctx.echarts);
        var chartDom = document.querySelector(".line");
        var myChart = echarts.init(chartDom);
        var option;
        option = {
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: "line",
              areaStyle: {},
              // symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
              showAllSymbol: true,
              symbolSize: 0,
              smooth: true, //平滑
              lineStyle: {
                normal: {
                  width: 2.5,
                  color: "rgba(0,75,238,1)", // 线条颜色
                },
                // borderColor: "rgba(0,75,238,.1)",
              },
              // itemStyle: {
              //   color: "rgba(25,163,223,1)",
              //   borderColor: "#004BEE",
              //   borderWidth: 2,
              // },
              // tooltip: {
              //   show: true,
              // },
              areaStyle: {
                //区域填充样式
                normal: {
                  //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                  color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "rgba(0,75,238,.3)",
                      },
                      {
                        offset: 1,
                        color: "rgba(0,75,238,0)",
                      },
                    ],
                    false
                  ),
                  shadowColor: "rgba(25,163,223, 0.5)", //阴影颜色
                  shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                },
              },
            },
          ],
          grid: {
            left: "40px",
            top: "16px",
            right: "30px",
            bottom: "36px",
          },
        };
        option && myChart.setOption(option);
      }
      line();

      // 饼图
      function pie() {
        var chartDom = document.querySelector(".pie");
        var myChart = echarts.init(chartDom);
        var option;

        const data = genData(5);
        option = {
          title: {
            // text: "同名数量统计",
            // subtext: "纯属虚构",
            // left: "center",
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)",
          },
          legend: {
            type: "scroll",
            orient: "vertical",
            right: 10,
            top: 20,
            bottom: 20,
            data: data.legendData,
          },
          series: [
            {
              name: "姓名",
              type: "pie",
              radius: ["40%", "55%"],
              center: ["40%", "50%"],
              data: data.seriesData,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        };
        function genData(count) {
          // prettier-ignore
          const nameList = [
        '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '席', '季', '麻', '强', '贾', '路', '娄', '危'
    ];
          const legendData = [];
          const seriesData = [];
          for (var i = 0; i < count; i++) {
            var name =
              Math.random() > 0.65
                ? makeWord(4, 1) + "·" + makeWord(3, 0)
                : makeWord(2, 1);
            legendData.push(name);
            seriesData.push({
              name: name,
              value: Math.round(Math.random() * 100000),
            });
          }
          return {
            legendData: legendData,
            seriesData: seriesData,
          };
          function makeWord(max, min) {
            const nameLen = Math.ceil(Math.random() * max + min);
            const name = [];
            for (var i = 0; i < nameLen; i++) {
              name.push(
                nameList[Math.round(Math.random() * nameList.length - 1)]
              );
            }
            return name.join("");
          }
        }

        option && myChart.setOption(option);
      }
      pie();
    });

    return {
      remarks,
      dialogVisible,
      accountTit,
      accountIndex,
      remindAccounts,
      dialogShow,
      slectIndex,
      changeBank,
      changeAccount,
      ...toRefs(state),
    };
  },
  components: {
    Calendar,
    CasDate,
  },
};
</script>

<style scoped lang="scss">
.work-contain {
  display: flex;
  align-items: center;
  height: 40px;
  // border: 1px solid red;
  height: 100%;
  padding: 16px;
  // background: #f8f8f8;
  overflow: hidden;
  .tit {
    font-size: 17px;
    color: #5e7691;
    padding: 15px 0;
    background: auto;
    &.one-line {
      padding-top: 0;
    }
    // margin-b: 15px 0;
  }
  .left-content {
    flex: 1;
    // border: 1px solid red;
    height: 100%;
    margin-right: 15px;
    .t-bottom {
      height: 50%;
    }
    .l-content {
      height: 50%;
      display: flex;
      justify-content: space-between;
      overflow: hidden;
      .l-c {
        width: 49%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        .pie {
          background: #fff;
          flex: 1;
        }
        .tit-name {
          // margin: 20px 0;
          padding: 15px 10px 10px 10px;
          background: #fff;
          cursor: pointer;
          .bank-name {
            position: relative;
            padding-right: 5px;
            transition: all 0.2s;
            color: var(--nosle-text-color);
            &.active {
              font-size: 16px;
              color: var(--text-color);
              &::after {
                content: "";
                position: absolute;
                bottom: -6px;
                left: 0;
                height: 2px;
                width: 30px;
                background: var(--sle-text-color);
                right: 0;
                margin: 0 auto;
              }
            }
          }
        }
        .lines {
          background: #fff;
          flex: 1;
          position: relative;
          ul {
            margin-top: 15px;
          }
          .reminder-line {
            align-items: center;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 60px;
            width: 100%;
            background: url("/static/img/bank1.png") no-repeat;
            background-size: contain;
            // border: 1px dotted #ccc;
            &.remittance-number {
              background: url("/static/img/bank3.png") no-repeat;
              background-size: contain;
              .num {
                &::after {
                  background: linear-gradient(360deg, #9170fe 0%, #b0a0ff 100%);
                }

                // justify-content: flex-end;
              }
            }
            &.remittance-amount {
              background: url("/static/img/bank2.png") no-repeat;
              background-size: contain;
              .num {
                &::after {
                  background: linear-gradient(360deg, #fde44c 0%, #feeca9 100%);
                }

                // justify-content: flex-end;
              }
            }
            img {
              width: 60px;
            }
            .b-num {
              color: var(--nosle-text-color);
              padding-left: 80px;
            }
            .num {
              margin-right: 30px;
              font-size: 17px;
              position: relative;
              &::after {
                content: "";
                position: absolute;
                bottom: -0px;
                left: 0;
                right: 0;
                background: linear-gradient(360deg, #3bd99d 0%, #5ff7bd 100%);
                height: 4px;
                width: 100%;
                margin: 0 auto;
              }

              // justify-content: flex-end;
            }
          }

          .watch-detail {
            text-align: center;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 100;
            // width: 100px;
            margin: 0 auto;
            // height: 60px;
            // line-height: 60px;
            .el-button {
              min-height: auto;
              color: var(--sle-text-color);
              padding: 0;
              width: 150px;
              height: 28px;
              border-radius: 2px;
              border: 1px solid #004bee;
              background: #fff;
            }
          }
        }
      }
    }
    .t-content {
      height: 50%;
      display: flex;
      flex-direction: column;
      .tit {
        // height:40px;
      }
      .select-des {
        display: flex;
        justify-content: space-between;
        background: #fff;
        padding: 15px 30px;
        .nowday-content {
          .now {
            color: var(--nosle-text-color);
            position: relative;
            &::after {
              content: "";
              left: -16px;
              position: absolute;
              top: 0;
              bottom: 0;
              margin: auto 0;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: var(--sle-text-color);
            }
          }
          .num {
            padding-top: 6px;
            font-size: 20px;
          }
        }
        .time-content {
          display: flex;
          align-items: center;
          ::v-deep .el-date-editor {
            width: 240px;
          }
          ::v-deep .el-select {
            width: 84px;
            font-weight: 600;
            .el-input__inner {
              border: none;
              padding: 0;
              text-align: center;
            }
          }
        }
      }
      .line {
        flex: 1;
        background: #fff;
        // height: 1;
      }
    }
  }
  .right-content {
    // background: #fff;
    // border: 1px solid rgb(100, 32, 32);
    width: 300px;
    height: 100%;
    .casdate {
      // height: 360px;
      background: #fff;
      .select-mode {
      }
      .mpvue-calendar {
        width: 300px;
      }
      .date-time {
        display: flex;
        justify-content: space-between;
        padding: 30px 20px 20px 20px;
        .l{
          .day{
            font-size: 17px;
            color:var(--sle-text-color);
            padding-right:6px
          }

        }
        .r{
          font-size: 18px;
        }
      }
    }
    .remind-list {
      height: calc(100% - 400px);
      // border: 1px solid #000;
      background: #fff;
      .pay-item {
        height: 20px;
        display: flex;
        align-items: center;
        padding: 15px;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        // margin: 10px 0;
        margin-bottom: 20px;
        .icon {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          line-height: 8px;
          background: linear-gradient(225deg, #ff7a75 0%, #fe4440 100%);
        }
        .des {
          padding-left: 6px;
        }
        .time {
          color: var(--nosle-text-color);
        }
      }
    }
    .remind-content {
      padding: 15px 0 15px 15px;
      background: #fff;
      font-size: 16px;
    }
  }
  ::v-deep .el-dialog {
    .el-dialog__header {
      border-bottom: 1px solid var(--line-color);
    }
    .el-dialog__body {
      padding-top: 0;
      padding-left: 30px;
    }
    .account-pass {
      // padding: 20px;
      height: 420px;
      overflow-y: scroll;

      ul {
        .a-item {
          .tits {
            position: relative;
            height: 15px;
            margin-top: 30px;
            &::before {
              width: 10px;
              height: 10px;
              background: #fe4440;
              border-radius: 50%;
              position: absolute;
              left: 0;
              content: "";
            }
            &::after {
              width: 10px;
              height: 10px;
              background: #ffe54c;
              border-radius: 50%;
              position: absolute;
              left: 8px;
              content: "";
            }
          }
          .a-content {
            // height: 90px;
            // border: 1px solid red;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 10px;
            .mar {
              padding: 4px 0 6px 0;
              font-size: 14px;
              color: #5e7691;
            }
            .a-l {
              text-align: left;
            }
            .a-c {
              color: #d6dee6;
            }
            .a-r {
              text-align: right;
              .pri {
                color: var(--sle-text-color);
              }
            }
            .tit-com {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
}
</style>
