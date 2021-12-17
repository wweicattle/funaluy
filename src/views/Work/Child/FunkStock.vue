<template>
  <div class="funk-container">
    <div class="l-c">
      <div class="tit">资金存量</div>
      <div class="tit-name">
        <template v-for="(val, index) in accountTit" :key="index">
          <span
            class="bank-name"
            :class="{
              active: selectIndex == index,
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
      <div class="tit">到账提醒</div>
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
            <span class="b-num">{{ acountRemindData.totalBanksName }}</span>
            <span class="num"> {{ acountRemindData.totalBanks }}家</span>
          </li>
          <li class="reminder-line remittance-number">
            <!-- <img src="static/img/ee.jpg" alt="" /> -->
            <span class="b-num">{{ acountRemindData.totalNumName }}</span>
            <span class="num">{{ acountRemindData.totalNum }}笔</span>
          </li>
          <li class="reminder-line remittance-amount">
            <!-- <img src="static/img/ee.jpg" alt="" /> -->
            <span class="b-num">{{ acountRemindData.totalAmountName }}</span>
            <span class="num">
              {{ Number(acountRemindData.totalAmount) / 10000 }} W</span
            >
          </li>
        </ul>
        <div class="watch-detail">
          <el-button type="border" @click="sendOpenDialogBtn"
            >查看明细</el-button
          >
        </div>
      </div>
    </div>
    <el-dialog
      v-model="dialogShow"
      title="到账提醒"
      width="480px"
      class="momney"
    >
      <div class="funk-pass scrollbar-css">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="expand">
            <template #default="props">
              <!-- <p>{{ props.row.content }}</p> -->
              <ul>
                <template
                  v-for="(val, index) in props.row.content"
                  :key="index"
                >
                  <li>
                    <div class="card">
                      <span class="no">卡号:</span
                      ><span class="no-val">{{ val.sysno }}</span>
                    </div>
                    <div class="money-num">
                      余额:<span class="no-val">{{ val.ye }}</span>
                    </div>
                  </li>
                </template>
              </ul>
            </template>
          </el-table-column>
          <el-table-column
            label="资金名称"
            prop="orgname"
            v-if="selectIndex == 0"
          />
          <el-table-column label="资金名称" prop="bnkname" v-else />

          <el-table-column label="对公金额" prop="publicAmount" />
          <el-table-column label="对私金额" prop="publicAmount" />
        </el-table>
        <!-- <ul>
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
                  <div><img src="~assets/img/back.png" alt="" /></div>
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
        </ul> -->
      </div>
    </el-dialog>

    <el-dialog v-model="accountdialogShow" title="到账提醒" width="480px">
      <div class="account-pass scrollbar-css">
        请选择银行：
        <el-select v-model="accountValue" placeholder="Select">
          <el-option
            v-for="item in acountRemindData.content"
            :key="item.value"
            :label="item.bnkname"
            :value="item.bnkname"
          >
          </el-option>
        </el-select>

        <ul>
          <template v-for="(val, index) in accountOpitons" :key="index">
            <li class="a-item">
              <div class="tits"></div>
              <div class="a-content">
                <div class="a-l">
                  <el-tooltip :content="val.ACTNAM" placement="top">
                    <div class="tit-com">{{ val.ACTNAM }}</div>
                  </el-tooltip>

                  <div class="mar">{{ val.ACTNBR }}</div>
                  <div>{{ val.BNKTIM }}</div>
                </div>
                <div class="a-c">
                  <div><img src="~assets/img/back.png" alt="" /></div>
                  <div>到账</div>
                </div>
                <div class="a-r">
                  <el-tooltip :content="val.OTHNAM" placement="top">
                    <div class="tit-com">{{ val.OTHNAM }}</div>
                  </el-tooltip>

                  <!-- <el-tooltip :content="val.OTHACT" placement="top"> -->
                  <div class="mar">
                    {{ val.OTHACT }}
                  </div>
                  <!-- </el-tooltip> -->

                  <div class="pri">{{ val.CCYNBR + val.OTHACT }}</div>
                </div>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>

<script >
import { defineComponent, onBeforeMount, watch } from "vue";
import { reactive, ref, onMounted, getCurrentInstance, toRefs } from "vue";
import { getTzlistData, getArriveData } from "@/network/request.js";

export default defineComponent({
  name: "App",
  // emit: ["sendOpenDialog"],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    let echarts = proxy.echarts;
    const accountTit = ["银行资金存量", "组织资金存量"];
    const remindAccounts = ["本周到账提醒"];
    const selectIndex = ref(0);
    const accountIndex = ref(0);
    let bankData = [];
    let orgMap = [];
    let data = ref(null);
    let myChart = ref(null);
    const dialogShow = ref(false);
    let tableData = ref([]);
    let accountdialogShow = ref(false);
    //

    let accountOpitons = ref([]);
    const accountValue = ref(null);
    let acountRemind = reactive({
      acountRemindData: {},
    });

    let bankValue;
    let orgValue;

    const changeBank = (index) => {
      selectIndex.value = index;
      myChart.value.resize();
      if (!selectIndex.value) return pie(bankData);
      pie(orgMap);
    };
    const changeAccount = (index) => {
      accountIndex.value = index;
    };

    watch(accountValue, (newVal) => {
      accountOpitons.value = acountRemind.acountRemindData.content.find(
        (val) => {
          return val.bnkname == newVal;
        }
      ).content;
      // console.log(accountOpitons);
    });
    const sendOpenDialogBtn = () => {
      // emit("sendOpenDialog");
      accountdialogShow.value = true;
    };
    window.addEventListener("resize", () => {
      // myChart.value.resize();
    });
    onBeforeMount(() => {
      // window.removeEventListener("resize")
    });
    // 饼图
    function pie(data) {
      var chartDom = document.querySelector(".pie");
      myChart.value = echarts.init(chartDom);
      var option;
      option = {
        title: {
          // text: "同名数量统计",
          // subtext: "纯属虚构",
          // left: "right",
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c}元<br/>占比率：({d}%)",
          position: "right",
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          // right: 40,
          top: 24,
          left: 280,
          // bottom: 30,
          itemGap: 15,
          itemWidth: 6,
          itemHeight: 6,
          icon: "circle",
          textStyle: {
            color: "#222",
            fontSize: 12,
          },
          formatter: (name) => {
            let sum=accountValue.value==0?bankValue:orgValue;

            let nowsum = data.find((val) => val.name == name).value;
            return name + `   ${((nowsum / sum.toFixed(2)) * 100).toFixed(2)}%`;
          },
        },
        series: [
          {
            name: "姓名",
            type: "pie",
            radius: ["45%", "60%"],
            center: ["30%", "50%"],
            data: data,
            label: {
              show: true,
              position: "center",
            },
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

      option && myChart.value.setOption(option);
    }

    const getTzlistDatas = async () => {
      let obj = { startTime: "2021-12-01", endTime: "2021-12-30" };
      let data = await getTzlistData(obj);
      bankValue = data.bankMap.reduce((acc, sum, index, arr) => {
        return acc + sum.totleAmount;
      }, 0);
      bankData = data.bankMap.map((val) => {
        return {
          name: val.bnkname,
          value: val.totleAmount,
          content: val.content,
          privateAmount: val.privateAmount,
          publicAmount: val.publicAmount,
        };
      });

      orgMap = data.orgMap.map((val) => {
        return {
          name: val.orgname,
          value: val.totleAmount,
          content: val.content,
          privateAmount: val.privateAmount,
          publicAmount: val.publicAmount,
        };
      });
      orgValue = data.orgMap.reduce((acc, sum, index, arr) => {
        return acc + sum.totleAmount;
      }, 0);
      // console.log(bankValue);
      // console.log(orgValue);
      pie(bankData);
      myChart.value.on("click", function (params) {
        // 控制台打印数据的名称
        dialogShow.value = true;
        tableData.value = params.data.content;
        // console.log(tableData);
      });

      // legend
      myChart.value.on("legendselectchanged", function (params) {
        myChart.value.setOption({
          legend: { selected: { [params.name]: true } },
        });
        dialogShow.value = true;
        console.log(params);
        // tableData.value = params.data.content;
      });
    };
    getTzlistDatas();

    const getArriveDatas = async () => {
      let obj = { endTime: "2021-12-08" };
      acountRemind.acountRemindData = await getArriveData(obj);
      // 第一次默认回流
      accountValue.value = acountRemind.acountRemindData.content[0].bnkname;
    };
    getArriveDatas();

    return {
      data,
      accountTit,
      remindAccounts,
      accountIndex,
      selectIndex,
      changeBank,
      changeAccount,
      sendOpenDialogBtn,
      dialogShow,
      accountdialogShow,
      tableData,
      accountOpitons,
      accountValue,
      ...toRefs(acountRemind),
    };
  },
});
</script>

<style lang="scss" scoped>
.funk-container {
  height: 100%;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  .tit {
    font-size: 17px;
    color: #5e7691;
    padding: 15px 0 10px 0;
    background: auto;
    &.one-line {
      padding-top: 0;
    }
    // margin-b: 15px 0;
  }
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
        padding-right: 15px;
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
        &:hover {
          opacity: 0.8;
        }
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
  .funk-pass {
    height: 420px;
    overflow-y: scroll;
    padding: 0 15px;
    ul {
      padding: 0 40px;
      li {
        display: flex;
        // text-align: center;
        height: 20px;
        margin: 10px 0;
        .card {
          width: 200px;
          overflow: hidden;
          .no {
            // font-size: 17px;
          }
          .no-val {
            padding-left: 5px;
            color: #999;
          }
        }
        .money-num {
          flex: 1;
          padding-left: 10px;
          .no-val {
            padding-left: 5px;
            color: #999;
          }
        }
      }
    }
  }
  .account-pass {
    // padding: 20px;
    height: 420px;
    overflow-y: scroll;
    padding: 0 30px 20px 30px;
    ::v-deep .el-select {
      margin-top: 30px;
      width: 240px;
      .el-input__inner {
        height: 32px;
        background: rgb(248, 247, 247);
      }
    }
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
            // width: 200px;
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
            width: 170px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-weight: 600;
          }
        }
      }
    }
  }
}
::v-deep .el-dialog {
  font-weight: 500;
  .el-dialog__header {
    border-bottom: 1px solid var(--line-color);
  }
  .el-dialog__body {
    // padding-top: 0;
    // padding-left: 30px;
    padding: 0 !important;
  }
}
</style>
