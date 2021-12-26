<template>
  <div class="work-contain">
    <div class="left-content">
      <div class="t-content">
        <div class="tit one-line">账号资金总览</div>
        <div class="select-des">
          <div class="nowday-content">
            <div class="now">当日汇总</div>
            <div class="num">{{ curTotal }}W</div>
          </div>
          <div class="time-content">
            <ul class="selectItems">
              <template v-for="(val, index) in selectWeek" :key="index">
                <li
                  @click="clickChangeDay(index)"
                  :class="{ active: weekIndex == index }"
                >
                  {{ val }}
                </li>
              </template>
            </ul>
            <!-- <el-select size="small" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select> -->
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
            <span class="d-num">单位(万)</span>
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
          <span class="r">30°</span>
        </div>

        <CasDate @refreshData="refreshData" />
      </div>

      <!--  -->
      <div class="remind-content">
        <el-divider content-position="left">提醒列表</el-divider>
      </div>
      <div class="remind-list scrollbar-css">
        <template v-for="(val, index) in dayremind" :key="val">
          <template v-for="(vals, indexs) in val" :key="indexs">
            <el-popover placement="left" :width="400" trigger="hover">
              <template #reference>
                <div class="pay-item cursor flex-cnter">
                  <div class="tit-line">
                    <div class="l-content">
                      <span class="icon">{{ vals.name.substr(0, 1) }}</span>
                      <span class="des">{{ vals.name }}</span>
                      <span class="nums">{{ vals.total }}</span>
                    </div>
                    <span class="time">{{ index }}</span>
                  </div>
                  <!-- {{val}}
              ------------------------
              {{vals}} -->
                  <!-- <div class="two-line">
                <div class="des">无备注</div>
                <div class="expand" @click="vals.select = !vals.select">
                  <div v-if="!vals.select">
                    展开<el-icon> <arrow-down /></el-icon>
                  </div>
                  <div v-else>
                    收起<el-icon><arrow-up /> </el-icon>
                  </div>
                </div>
              </div> -->
                </div>
                <!-- <el-button>Click to activate</el-button> -->
              </template>
              <div class="picket-contains scrollbar-css">
                <div class="tit spe">{{ vals.name}}</div>
                <div class="items">
                  <el-timeline>
                    <template
                      v-for="(item, iIndex) in vals.content"
                      :key="iIndex"
                    >
                      <el-timeline-item
                        :timestamp="item.expiry"
                        placement="top"
                      >
                        <el-card>
                          <div class="e-content">
                            <div class="tit flex-center">
                              <div class="icon"></div>
                              <div>{{ item.gsyh }}</div>
                              <div>{{ item.yhzh }}</div>
                            </div>
                            <ul>
                              <li class="money">
                                <div class="num">{{ item.ye || 0 }}</div>
                                <div class="tits">金额(元)</div>
                              </li>
                              <li class="week-day">
                                <div class="day">{{ item.diffday || 0 }}</div>
                                <div class="tits">剩余到期日</div>
                              </li>
                              <!-- <li>
                                <span class="open">公司名称：</span>
                                <el-tooltip
                                  class="item"
                                  effect="dark"
                                  content="Top Left prompts info"
                                  placement="top-start"
                                >
                                  <span class="val">{{
                                    item.gsmc || 3243434
                                  }}</span>
                                </el-tooltip>
                              </li> -->

                              <li>
                                <span class="open">公司名称：</span>
                                <el-tooltip
                                  class="item"
                                  effect="dark"
                                  :content="item.gsmc"
                                  placement="top-start"
                                >
                                  <span class="val">{{ item.gsmc }}</span>
                                </el-tooltip>
                              </li>
                              <li>
                                <span class="open">期望：</span>
                                <el-tooltip
                                  class="item"
                                  effect="dark"
                                  :content="item.purpose"
                                  placement="top-start"
                                >
                                  <span class="val">{{ item.purpose }}</span>
                                </el-tooltip>
                              </li>
                              <!-- <li>
                <span class="open">开户人6565656565656</span><span class="val">吴伟</span>
              </li> -->
                              <!-- <li>
                                <span class="open">开户人</span>
                                <el-tooltip
                                  class="item"
                                  effect="dark"
                                  content="Top Left prompts info"
                                  placement="top-start"
                                >
                                  <span class="val">{{ vals.gsmc }}</span>
                                </el-tooltip>
                              </li> -->
                            </ul>
                            <!-- "gsmc": "西藏领尚", "purpose": "", "yhzh": "", "gsyh":
            "中国民生银行", "expiry": "2021-12font-size-24", "ye": 1000000 -->
                          </div>
                        </el-card>
                      </el-timeline-item>
                    </template>
                  </el-timeline>
                </div>
              </div>
            </el-popover>
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
    let start_time = dayjs().startOf("week").add(1, "day").format("YYYY-MM-DD");
    let monthNow = dayjs().format("YYYY-MM-DD");
    let lineTimeData = ref(["2021-12-01", "2021-12-06"]);
    let xData = [];
    let yData = [];

    let curTotal = ref(0);

    const selectWeek = ref(["月", "周", "自定义"]);
    // 月周点击
    const clickChangeDay = (index) => {
      weekIndex.value = index;
      // 改变视图
      if (index == 0) {
        let monthOne = dayjs().startOf("months").format("YYYY-MM-DD");
        let monthNow = dayjs().format("YYYY-MM-DD");

        let time = { startTime: monthOne, endTime: monthNow };
        lineTimeData.value = [monthOne, monthNow];
        getLineData(time);
      } else if (index == 1) {
        let start_time = dayjs()
          .startOf("week")
          .add(1, "day")
          .format("YYYY-MM-DD");
        let monthNow = dayjs().format("YYYY-MM-DD");
        let time = { startTime: start_time, endTime: monthNow };
        lineTimeData.value = [start_time, monthNow];
        getLineData(time);
      } else {
      }
    };
    // 请求资金总览数据
    var getLineData = async (time) => {
      let data = await getRaiseMoney(time);
      curTotal.value = data.curAmount;
      xData = Object.keys(data.content);
      yData = Object.values(data.content);
      line(xData, yData);
    };
    const weekIndex = ref(2);

    const dayBtn = (e) => {};
    const refreshData = (val) => {
      let obj = {
        year: 2021,
        month: 12,
        startTime: val,
        endTime: val,
      };
      getDayRemind(obj).then((da) => {
        for (let i in da) {
          da[i] = da[i].map((val) => {
            val.select = false;
            return val;
          });
        }

        remindData.dayremind = da;
      });
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
              fontWeight: 500,
              fontSize: 13,
              color: "#004BEE",
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
          left: "8%",
          top: "18%",
          right: "4%",
          bottom: "15%",
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
            let str = "当日金额:" + params[0].data + "万元";
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
      startTime: "2021-12-24",
      endTime: "2021-12-24",
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
      selectWeek,
      weekIndex,
      clickChangeDay,
      curTotal,
      refreshData,
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

            .el-range-separator {
              line-height: 18px;
            }
          }
          .d-num {
            padding: 0 16px;
          }
          ::v-deep .el-input__inner {
            height: 28px;
          }

          .selectItems {
            display: flex;
            border: 1px solid #d6dee6;
            height: 28px;
            line-height: 28px;
            font-weight: 500;
            color: #94979e;
            margin-right: 14px;
            // var(--el-input-border,var(--el-border-base))
            li {
              padding: 0 7px;
              border-right: 1px solid #ccc;
              &:last-child {
                border-right: none;
              }
              &:hover {
                cursor: pointer;
              }
              &.active {
                background: var(--sle-text-color);
                color: #fff;
              }
            }
          }
          // ::v-deep .el-select {
          //   width: 84px;
          //   font-weight: 600;
          //   .el-input__inner {
          //     border: none;
          //     padding: 0;
          //     text-align: center;
          //   }
          // }
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
        // border: 1px solid red;
        padding: 20px 15px;
        box-shadow: 0px 0px 6px 0px rgba(184, 191, 207, 0.3);
        border-radius: 4px;
        .tit-line {
          display: flex;
          justify-content: space-between;
          align-items: center;
          // margin-bottom: 8px;
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
            .nums {
              color: #fe4440;
              padding-left: 14px;
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
      padding: 43px 0 15px 0;
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

.picket-contains {
  // width: 300px;
  // padding: 10px;
  height: 500px;
  // border: 1px solid red;
  overflow: scroll;
  ::v-deep .el-card__body {
    padding: 0;
  }
  .tit {
    margin: 15px 0;
    font-size: 18px;
    font-weight: 600;

    &.spe {
      // background: red;
      position: sticky;
      background: #fff;
      z-index: 9000;
      width: 100%;
      top: 0;
      padding: 15px;
      margin: 0;
    }
  }
  .e-content {
    font-size: 14px;
    font-weight: 500;
    // padding: 0 15px;
    .tit {
      padding: 0 20px;
      font-size: var(--font-size);

      .icon {
        position: relative;
        height: 15px;
        width: 40px;
        &::before {
          width: 12px;
          height: 12px;
          background: #fe4440;
          border-radius: 50%;
          position: absolute;
          left: 0;
          content: "";
        }
        &::after {
          width: 12px;
          height: 12px;
          background: #ffe54c;
          border-radius: 50%;
          position: absolute;
          left: 14px;
          content: "";
        }
      }
    }

    ul {
      display: flex;
      // padding: 20px 20px 0px 20px;
      flex-wrap: wrap;
      margin-bottom: 10px;
      li {
        width: 100%;
        text-align: left;
        margin-bottom: 5px;
        height: 28px;
        display: flex;
        align-items: center;
        overflow: hidden;
        // margin-left: 24px;
        padding: 0 45px;
        &.week-day,
        &.money {
          flex-direction: column;
          margin-left: 0;
          width: 50%;
          height: 50px;
          text-align: center;
          font-weight: 600;
          border-bottom: 1px solid #eaf2fa;
          padding: 0;
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
          width: 90px;
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
}
</style>
