<template>
  <div class="work-contain">
    <div class="left-content">
      <div class="t-content">
        <div class="tit one-line">账号资金总览</div>
        <div class="select-des">
          <div class="nowday-content">
            <div class="now">当日汇总</div>
            <div class="num">1832.6W</div>
          </div>
          <div class="time-content">
            <el-date-picker
              v-model="lineTimeData"
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
        <FunkStock />
      </div>
    </div>
    <div class="right-content" @click="dayBtn">
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
      <div class="remind-content">
        <el-divider content-position="left">提醒列表</el-divider>
      </div>
      <div class="remind-list scrollbar-css">
        <template v-for="(val, index) in dayremind" :key="val">
          <template v-for="(vals, indexs) in val" :key="indexs">
            <div class="pay-item">
              <div class="tit-line">
                <div class="l-content">
                  <span class="icon">{{ vals.name.substr(0, 1) }}</span>
                  <span class="des">{{ vals.name }}</span>
                </div>
                <span class="time">{{ index }}</span>
              </div>
              <div class="two-line">
                <div class="des">无备注</div>
                <div class="expand" @click="vals.select = !vals.select">
                  <div v-if="!vals.select">
                    展开<el-icon> <arrow-down /></el-icon>
                  </div>
                  <div v-else>
                    收起<el-icon><arrow-up /> </el-icon>
                  </div>
                </div>
              </div>
              <div class="e-content" v-if="vals.select">
                <ul>
                  <li class="money">
                    <div class="num">{{ vals.ye }}</div>
                    <div class="tits">金额(元)</div>
                  </li>
                  <li class="week-day">
                    <div class="day">{{ vals.expiry || 0 }}</div>
                    <div class="tits">剩余到期日</div>
                  </li>
                  <li>
                    <span class="open">公司名称：</span
                    ><span class="val">{{ vals.gsmc }}</span>
                  </li>
                  <li>
                    <span class="open">期望：</span
                    ><span class="val"
                      >{{ vals.purpose }}sdfsfds fdg fdgfd
                      第三方的个的广泛地刚发的某个地方了</span
                    >
                  </li>
                  <li>
                    <span class="open">公司银行：</span
                    ><span class="val">{{ vals.gsyh }}</span>
                  </li>
                  <!-- <li>
                <span class="open">开户人6565656565656</span><span class="val">吴伟</span>
              </li> -->
                  <li>
                    <span class="open">开户人</span
                    ><span class="val">吴伟</span>
                  </li>
                </ul>
                <!-- "gsmc": "西藏领尚", "purpose": "", "yhzh": "", "gsyh":
            "中国民生银行", "expiry": "2021-12font-size-24", "ye": 1000000 -->
              </div>
            </div>
          </template>
        </template>
        <div v-if="Object.keys(dayremind).length == 0">
          <img src="@/assets/img/noDataRemind.png" alt="" />
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
  </div>
</template>

<script>
import {
  ref,
  watch,
  onMounted,
  reactive,
  getCurrentInstance,
  toRefs,
  watchEffect,
} from "vue";
import CasDate from "./Child/CasDate.vue";
import FunkStock from "./Child/FunkStock.vue";
import { ArrowUp, ArrowDown } from "@element-plus/icons";
import { getMonthRemind, getDayRemind, getRaiseMoney } from "network/request";

export default {
  name: "WorkIndex",
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    let echarts = proxy.echarts;
    const openContent = ref(false);
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
    const dialogVisible = ref(false);

    const remindData = reactive({
      dayremind: {},
      monthremind: {},
    });
    let lineTimeData = ref(["2021-12-1", "2021-12-15"]);
    // const remarks = ref({ "2021-11-13": "some tings" });
    let xData = [];
    let yData = [];
    // 请求资金总览数据
    var getLineData = async (time) => {
      let data = await getRaiseMoney(time);
      xData = Object.keys(data.content);
      yData = Object.values(data.content);
      line(xData, yData);
    };

    const dayBtn = (e) => {
      console.log(e.target);
      // let parent = e.target.parentNode.parentNode.parentNode.querySelector(".days");
      // console.log(parent);
      // Array.from(parent.querySelectorAll(".dayLabel")).forEach((val) => {
      //   val.classList.remove("today");
      // });
      // e.target.parentNode.classList.add("today");

      // let obj = {
      //   year: 2021,
      //   month: 12,
      //   startTime: "2021-12-19",
      //   endTime: "2021-12-19",
      // };
      // getDayRemind(obj).then((da) => {
      //   for (let i in da) {
      //     da[i] = da[i].map((val) => {
      //       val.select = false;
      //       return val;
      //     });
      //   }

      //   remindData.dayremind = da;
      // });
    };

    watch(
      lineTimeData,
      (newVal) => {
        console.log(newVal);
        let time = { startTime: newVal[0], endTime: newVal[1] };
        getLineData(time);
      },
      {
        immediate: true,
      }
    );
    // 线性
    function line(xData, yData) {
      var chartDom = document.querySelector(".line");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        xAxis: {
          type: "category",
          // boundaryGap: false,
          // data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun","dsd"],
          data: xData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: yData,
            type: "line",
            // areaStyle: {},
            // symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
            // showAllSymbol: true,
            symbolSize: 8,
            smooth: true, //平滑
            label: {
              show: true,
              position: "top",
            },
            lineStyle: {
              normal: {
                width: 2.5,
                color: "rgba(0,75,238,1)", // 线条颜色
              },
              // borderColor: "rgba(0,75,238,.1)",
            },

            // tooltip: {
            //   trigger: "item",
            //   formatter: "{a} der<br/>{b} : {c} ({d}%)",
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
          left: "100px",
          top: "16px",
          right: "30px",
          bottom: "36px",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          backgroundColor: "rgba(9, 24, 48, 0.5)",
          borderColor: "rgba(75, 253, 238, 0.4)",
          textStyle: {
            color: "#CFE3FC",
          },
          borderWidth: 1,
          formatter: function (params) {
            // console.log(params);
            let str = "当日金额:" + params[0].data + "元";
            // for (let i = 0; i < params.length; i++) {
            //   if (i == 0) {
            //     str += `${params[i].name}<br/>${params[i].seriesName.slice(
            //       0,
            //       params[i].seriesName.indexOf("(")
            //     )}<br/><span>${params[0].data}</span>%<br/>`;
            //     continue;
            //   }
            //   str += `${params[i].seriesName.slice(
            //     0,
            //     params[i].seriesName.indexOf("(")
            //   )}<br/><span>${params[i].data}</span>个<br/>`;
            // }
            return str;
          },
        },
      };
      option && myChart.setOption(option);
    }

    onMounted(() => {});

    const expandRange = () => {
      openContent.value = !openContent.value;
    };

    let obj = {
      year: 2021,
      month: 12,
      startTime: "2021-12-19",
      endTime: "2021-12-19",
    };
    getMonthRemind(obj).then((da) => {
      console.log(da);
      remindData.monthData = da;
    });
    // console.log(calendar.value);
    getDayRemind(obj).then((da) => {
      for (let i in da) {
        da[i] = da[i].map((val) => {
          val.select = false;
          return val;
        });
      }

      remindData.dayremind = da;
    });

    return {
      dialogVisible,
      expandRange,
      openContent,
      ...toRefs(state),
      ...toRefs(remindData),
      lineTimeData,
      dayBtn,
    };
  },
  components: {
    CasDate,
    FunkStock,
    ArrowDown,
    ArrowUp,
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
    padding: 10px 0;
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
      // display: flex;
      // justify-content: space-between;
      // overflow: hidden;
      // .l-c {
      //   width: 49%;
      //   display: flex;
      //   flex-direction: column;
      //   overflow: hidden;
      //   .pie {
      //     background: #fff;
      //     flex: 1;
      //   }
      //   .tit-name {
      //     // margin: 20px 0;
      //     padding: 15px 10px 10px 10px;
      //     background: #fff;
      //     cursor: pointer;
      //     .bank-name {
      //       position: relative;
      //       padding-right: 5px;
      //       transition: all 0.2s;
      //       color: var(--nosle-text-color);
      //       &.active {
      //         font-size: 16px;
      //         color: var(--text-color);
      //         &::after {
      //           content: "";
      //           position: absolute;
      //           bottom: -6px;
      //           left: 0;
      //           height: 2px;
      //           width: 30px;
      //           background: var(--sle-text-color);
      //           right: 0;
      //           margin: 0 auto;
      //         }
      //       }
      //     }
      //   }
      //   .lines {
      //     background: #fff;
      //     flex: 1;
      //     position: relative;
      //     ul {
      //       margin-top: 15px;
      //     }
      //     .reminder-line {
      //       align-items: center;
      //       display: flex;
      //       justify-content: space-between;
      //       align-items: center;
      //       height: 60px;
      //       width: 100%;
      //       background: url("/static/img/bank1.png") no-repeat;
      //       background-size: contain;
      //       // border: 1px dotted #ccc;
      //       &.remittance-number {
      //         background: url("/static/img/bank3.png") no-repeat;
      //         background-size: contain;
      //         .num {
      //           &::after {
      //             background: linear-gradient(360deg, #9170fe 0%, #b0a0ff 100%);
      //           }

      //           // justify-content: flex-end;
      //         }
      //       }
      //       &.remittance-amount {
      //         background: url("/static/img/bank2.png") no-repeat;
      //         background-size: contain;
      //         .num {
      //           &::after {
      //             background: linear-gradient(360deg, #fde44c 0%, #feeca9 100%);
      //           }

      //           // justify-content: flex-end;
      //         }
      //       }
      //       img {
      //         width: 60px;
      //       }
      //       .b-num {
      //         color: var(--nosle-text-color);
      //         padding-left: 80px;
      //       }
      //       .num {
      //         margin-right: 30px;
      //         font-size: 17px;
      //         position: relative;
      //         &::after {
      //           content: "";
      //           position: absolute;
      //           bottom: -0px;
      //           left: 0;
      //           right: 0;
      //           background: linear-gradient(360deg, #3bd99d 0%, #5ff7bd 100%);
      //           height: 4px;
      //           width: 100%;
      //           margin: 0 auto;
      //         }

      //         // justify-content: flex-end;
      //       }
      //     }

      //     .watch-detail {
      //       text-align: center;
      //       position: absolute;
      //       bottom: 0;
      //       left: 0;
      //       right: 0;
      //       z-index: 100;
      //       // width: 100px;
      //       margin: 0 auto;
      //       // height: 60px;
      //       // line-height: 60px;
      //       .el-button {
      //         min-height: auto;
      //         color: var(--sle-text-color);
      //         padding: 0;
      //         width: 150px;
      //         height: 28px;
      //         border-radius: 2px;
      //         border: 1px solid #004bee;
      //         background: #fff;
      //       }
      //     }
      //   }
      // }
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
          padding-left: 16px;
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
    width: 320px;
    height: 100%;
    .casdate {
      // height: 360px;
      background: #fff;
      .select-mode {
      }
      .date-time {
        display: flex;
        justify-content: space-between;
        padding: 14px 20px 0px 20px;
        .l {
          .day {
            font-size: 17px;
            color: var(--sle-text-color);
            padding-right: 6px;
          }
        }
        .r {
          font-size: 18px;
        }
      }
    }
    .remind-list {
      // border: 1px solid red;
      height: calc(100% - 420px);
      // border: 1px solid #000;
      background: #fff;
      overflow-y: scroll;
      position: relative;
      .pay-item {
        // height: 20px;
        padding: 0 15px;
        margin-bottom: 25px;
        .tit-line {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          .l-content {
            display: flex;
            align-items: center;
            .icon {
              display: inline-block;
              width: 18px;
              height: 18px;
              border-radius: 50%;
              line-height: 18px;
              text-align: center;
              //   line-height: 8px;
              font-size: 11px;
              color: #fff;
              background: linear-gradient(225deg, #ff7a75 0%, #fe4440 100%);
              margin-right: 3px;
            }
            .des {
              font-size: 15px;
              color: var(--text-color);
            }
          }
          .time {
            font-size: 13px;
          }
        }
        .two-line {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          .expand {
            color: var(--sle-text-color);
            cursor: pointer;
            & > div {
              display: flex;
              align-items: center;
            }
          }
          .des {
            padding-left: 24px;
            color: #5e7691;
          }
        }
        .e-content {
          font-size: 14px;
          font-weight: 500;
          ul {
            display: flex;
            padding: 20px 20px 0px 20px;
            flex-wrap: wrap;
            li {
              width: 100%;
              text-align: left;
              border-bottom: 1px solid #eaf2fa;
              margin-bottom: 5px;
              height: 28px;
              display: flex;
              align-items: center;
              overflow: hidden;
              margin-left: 24px;
              &.week-day,
              &.money {
                flex-direction: column;
                margin-left: 0;
                width: 50%;
                height: 50px;
                text-align: center;
                font-weight: 600;
              }
              &.week-day {
                color: #fe4440;
                .day {
                  font-size: 18px;
                }
              }
              &.money {
                // color: red;
                .num {
                  font-size: 18px;
                }
                .tits {
                  color: var(--nosle-text-color);
                }
              }

              .open {
                color: var(--nosle-text-color);
                padding-right: 5px;
                display: inline-block;
                width: 80px;
              }
              .val {
                display: inline-block;
                width: 130px;
                // font-size: 14px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
          }
        }

        // .des {
        //   padding-left: 6px;
        // }
        // .time {
        //   color: var(--nosle-text-color);
        // }
      }
      img {
        width: 60%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
      }
    }
    .remind-content {
      // padding: 15px 0 15px 15px;
      background: #fff;
      font-size: 16px;
      padding: 30px 0;
      ::v-deep .el-divider {
        // background: #fff;
        margin: 0;
        .el-divider__text {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-color);
        }
      }
    }
  }
  ::v-deep .el-dialog {
    .el-dialog__header {
      border-bottom: 1px solid var(--line-color);
    }
    .el-dialog__body {
      // padding-top: 0;
      // padding-left: 30px;
      padding: 0 10px 10px 30px;
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
              font-size: 13px;
              color: #5e7691;
            }
            .a-l {
              text-align: left;
            }
            .a-c {
              color: #d6dee6;
              img {
                width: 30px;
              }
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
