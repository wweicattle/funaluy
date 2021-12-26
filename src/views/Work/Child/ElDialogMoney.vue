<template>
  <div class="money-container">
    <el-dialog
      v-model="showDialog"
      :title="tableDatas.name"
      width="88%"
      @close="closeDialogBtn"
    >
      <!-- {{ tableDatas }} -->
      <div class="funk-pass scrollbar-css">
        <!-- <div class="top-content">
          <span>银行名称：</span>
          <el-select v-model="accountValue" placeholder="Select" size="mini">
            <el-option
              v-for="item in acountRemindData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div> -->
        <div class="bottom-content">
          <div class="left-c">
            <el-table
              :data="tableDatas.content"
              style="width: 100%"
              height="520px"
            >
              <el-table-column type="expand" width="30">
                <template #default="scope">
                  <div class="card-content">
                    <ul class="card-items">
                      <li class="item-header">
                        <div>
                          <img src="@/assets/img/com.png" />共{{
                            scope.row.content.length
                          }}张卡
                        </div>
                        <div>卡号</div>
                        <div>余额</div>
                      </li>
                      <template
                        v-for="(val, index) in scope.row.content"
                        :key="index"
                      >
                        <li class="item-num">
                          <div>{{ index + 1 }}</div>

                          <el-tooltip :content="val.sysno" placement="top">
                            <div class="sysno">{{ val.yhzh }}</div>
                          </el-tooltip>

                          <div>{{ val.ye }}</div>
                        </li>
                      </template>
                    </ul>
                  </div>

                  <!-- <p>State: {{ props.row.state }}</p> -->
                </template>
              </el-table-column>
              <template v-if="tableDatas.state == 0">
                <el-table-column prop="orgname" label="资金名称" align="center">
                </el-table-column>
              </template>
              <template v-else>
                <el-table-column prop="bnkname" label="资金名称" align="center">
                </el-table-column>
              </template>

              <el-table-column label="对公金额（元）" align="center">
                <el-table-column
                  prop="publicCurrentAmount"
                  label="定期"
                  width="140"
                  align="center"
                />
                <el-table-column
                  prop="publicRegularAmount"
                  label="活期"
                  width="140"
                  align="center"
                />
              </el-table-column>
              <el-table-column
                prop="privateAmount"
                align="center"
                label="对私金额（元）"
                width="150"
              />
              <el-table-column
                prop="totalAmount"
                label="总计"
                width="140"
                align="center"
              />
            </el-table>
            <!-- {{ tableData }} -->
          </div>
          <div class="right-c">
            <div class="tit">{{ tableDatas.name }}分布图</div>
            <div class="despie" ref="desPie"></div>
            <div class="des-item">
              <div class="one-line flex-center">
                <div class="l flex-center">
                  <img src="@/assets/img/public.png" alt="" /><span
                    >对公金额</span
                  >
                </div>
                <span>{{ publicNum }}%</span>
              </div>
              <div class="i-line">
                <span class="m-tit">定期金额</span>
                <!-- {{}}} -->
                <span class="m-num"
                  >{{ tableDatas.publicRegularAmount || 0.0 }}元</span
                >
              </div>
              <div class="i-line">
                <span class="m-tit">活期金额</span>
                <span class="m-num"
                  >{{ tableDatas.publicCurrentAmount || 0.0 }}元</span
                >
              </div>
              <div class="i-line">
                <span class="m-tit">总计金额</span>
                <span class="m-num"
                  >{{ formats(tableDatas.publicAmount) || 0.0 }}元</span
                >
              </div>
            </div>
            <div class="des-item">
              <div class="one-line flex-center">
                <div class="l flex-center">
                  <img src="@/assets/img/private.png" alt="" /><span
                    >对私金额</span
                  >
                </div>
                <span>{{ privateNum }}%</span>
              </div>
              <div class="i-line">
                <span class="m-tit">定期金额</span>
                <span class="m-num"
                  >{{ formats(tableDatas.privateAmount) || 0.0 }}元</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { format } from "@/utils/priceAdujust";

import {
  reactive,
  ref,
  watch,
  onMounted,
  getCurrentInstance,
  nextTick,
  computed,
} from "vue";
import { changeNum } from "@/utils/numChange";

export default {
  name: "App",
  emits: ["closeDialog"],
  props: {
    tableDatas: {
      type: Object,
      default() {
        return {};
      },
    },
    dialogShow: {
      type: Boolean,
      default: true,
    },
  },
  setup(prop, { emit }) {
    console.log(32323);
    console.log(prop.tableDatas);
    let { tableDatas } = prop;
    // tableDatas.name = tableDatas.name + "资金存量";
    console.log(tableDatas);
    let data = ref();
    let showDialog = ref(true);
    const accountValue = ref("");
    const { proxy } = getCurrentInstance();

    let formats = reactive(format);

    let privateNum = computed(() => {
      console.log(tableDatas);
      let num;
      num =
        (
          tableDatas.privateAmount /
          (tableDatas.publicAmount + tableDatas.privateAmount)
        )?.toFixed(2) * 100;
      return isNaN(num) ? 0.0 : num;
    });
    let publicNum = computed(() => {
      let num;
      num =
        (
          tableDatas.publicAmount /
          (tableDatas.publicAmount + tableDatas.privateAmount)
        )?.toFixed(2) * 100;
      return isNaN(num) ? 0.0 : num;
    });
    let echarts = proxy.echarts;
    let myChart = ref(null);
    const desPie = ref(null);
    let pieData = [];
    const acountRemindData = ref([
      {
        value: "Option1",
        label: "Option1",
      },
      {
        value: "Option2",
        label: "Option2",
      },
      {
        value: "Option3",
        label: "Option3",
      },
      {
        value: "Option4",
        label: "Option4",
      },
      {
        value: "Option5",
        label: "Option5",
      },
    ]);
    const closeDialogBtn = () => {
      emit("closeDialog");
    };
    // 饼图
    function pie(data) {
      myChart.value = echarts.init(desPie.value);
      var option;
      option = {
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 10,
        },
        label: {
          show: false,
          position: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: (val) => {
            let { name, value } = val.data;
            return `${name}:${changeNum(value)}W`;
          },
          position: "left",
          extraCssText:
            "border-image: linear-gradient(11deg, rgba(255, 255, 255, 1), rgba(145, 112, 254, 0.2), rgba(254, 211, 82, 0.19), rgba(255, 255, 255, 1), rgba(255, 255, 255, 1), rgba(253, 208, 77, 0.2), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)) 1 1",
          borderWidth: 0,
          borderColor: "#333",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          textStyle: {
            fontStyle: "italic",
            color: "#222",
            fontWeight: 600,
          },
        },
        series: [
          {
            name: "姓名",
            type: "pie",
            radius: ["60%", "85%"],
            center: ["50%", "50%"],
            data: data,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
              label: {
                show: true,
                fontSize: "16",
                fontWeight: "bold",
                lineHeight: 20,
                formatter(params) {
                  console.log(params);
                  return `{a|${changeNum(params.data.value)}W}\n{b|${
                    params.data.name
                  }}`;
                },
                rich: {
                  a: {
                    color: "#222",
                    fontSize: "17px",
                    fontWeight: 600,
                  },
                  b: {
                    color: "#5e7691",
                    fontSize: "13px",
                  },
                },
              },
              // label: {
              //   show: true,
              //   fontSize: "16",
              //   fontWeight: "bold",
              //   lineHeight: 20,
              //   formatter(params) {
              //     console.log(params);
              //     return `{a|${changeNum(params.data.value)}W}\n{b|${
              //       params.data.name
              //     }}`;
              //   },
              //   rich: {
              //     a: {
              //       color: "#222",
              //       fontSize: "17px",
              //       fontWeight: 600,
              //     },
              //     b: {
              //       color: "#5e7691",
              //       fontSize: "13px",
              //     },
              //   },
              // },
            },
          },
        ],
      };

      option && myChart.value.setOption(option);
    }

    onMounted(async () => {
      await nextTick();
      let data = prop.tableDatas;
      let { publicAmount, privateAmount } = data;
      pieData = [
        { name: "对公金额", value: publicAmount },
        { name: "对私金额", value: privateAmount },
      ];
      pie(pieData);
      tableDatas.content.forEach((val) => {
        val.privateAmount = formats(val.privateAmount);
        val.publicAmount = formats(val.publicAmount);
        val.publicCurrentAmount = formats(val.publicCurrentAmount);
        val.publicRegularAmount = formats(val.publicRegularAmount);
        val.totalAmount = formats(val.totalAmount);
        val.content.forEach((vals) => {
          vals.ye = formats(vals.ye);
        });
      });
      // privateAmount: 0
      // publicAmount: 0
      // publicCurrentAmount: 0
      // publicRegularAmount: 0
      // totalAmount
      // let { publicAmount, privateAmount } = data;
      // publicAmount = format(publicAmount);
      // privateAmount = format(privateAmount);
    });

    // watch(
    //   prop.dialogShow,
    //   (newVal) => {
    //     showDialog.value = newVal;
    //   },
    //   { immediate: true }
    // );

    const tableData = [
      {
        date: "2016-05-03",
        name: "Tom",
        state: "43434",
        city: "32323",
        address: "121",
        zip: "CA 90036",
      },
      {
        date: "2016-05-02",
        name: "Tom",
        state: "California",
        city: "Los 32",
        address: "121",
        zip: "CA 90036",
      },
      {
        date: "2016-05-02",
        name: "Tom",
        state: "California",
        city: "Los 32",
        address: "121",
        zip: "CA 90036",
      },

      {
        date: "2016-05-02",
        name: "Tom",
        state: "California",
        city: "Los 32",
        address: "121",
        zip: "CA 90036",
      },
      {
        date: "2016-05-02",
        name: "Tom",
        state: "California",
        city: "Los 32",
        address: "121",
        zip: "CA 90036",
      },
      {
        date: "2016-05-02",
        name: "Tom",
        state: "California",
        city: "Los 32",
        address: "121",
        zip: "CA 90036",
      },

      {
        date: "2016-05-02",
        name: "Tom",
        state: "California",
        city: "Los 32",
        address: "121",
        zip: "CA 90036",
      },
    ];
    return {
      data,
      accountValue,
      acountRemindData,
      tableData,
      desPie,
      closeDialogBtn,
      showDialog,
      publicNum,
      privateNum,
      formats,
    };
  },
};
</script>

<style lang="scss" scoped>
.money-container {
  .funk-pass {
    height: 560px;
    overflow: hidden;
    padding: 15px;
    // border: 1px solid #ccc;
    .top-content {
      margin-bottom: 10px;
      font-size: 15px;
      ::v-deep .el-select {
        width: 134px;
        font-weight: 600;
        .el-input__inner {
          border: none;
          padding: 0;
          text-align: center;
        }
      }
    }
    .bottom-content {
      display: flex;
      .left-c {
        width: 73%;
        // border-right: 1px solid #004bee;
        .card-content {
          // border: 1px solid red;
          ul {
            li {
              display: flex;
              justify-content: space-around;
              padding: 0 100px;

              // text-align: ;
              div {
                width: 33.33%;
                text-align: center;
                // border: 1px solid red;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              &.item-header {
                margin: 3px 0;
                img {
                  height: 24px;
                }
                font-weight: 600;
                color: var(--nosle-text-color);
                background: #f9fafc;
                .sysno {
                  width: 100%;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }

              &.item-num {
                font-weight: 600;
                margin: 16px 0;
                .sysno {
                  word-break: break-all;
                }
              }
            }
          }
        }
        ::v-deep .el-table {
          font-weight: 600;
          .el-table__header-wrapper {
            tr {
              th {
                padding: 6px 0;
              }
            }
          }
          tr {
            td {
              border-right: none;
              border-bottom: none;
              .cell {
                display: flex;
                align-items: center;
                position: relative;
                justify-content: flex-end;
                // text-align: right;

                img {
                  position: absolute;
                  height: 30px;
                  left: -0px;
                }
              }
              &:nth-child(2) {
                .cell {
                  justify-content: center;
                }
              }
            }
          }
          .el-table__body-wrapper {
            // overflow-y: scroll;
            &::-webkit-scrollbar {
              width: 16px;
              background: inherit;
              height: 14px;
            }

            &::-webkit-scrollbar-track,
            &::-webkit-scrollbar-thumb {
              border-radius: 999px;
              width: 20px;
              border: 5px solid transparent;
            }

            &::-webkit-scrollbar-track {
            }

            &::-webkit-scrollbar-thumb {
              width: 20px;
              min-height: 20px;
              background-clip: content-box;
              box-shadow: 0 0 0 5px #999 inset;
            }
          }
        }
      }
      .right-c {
        height: 520px;
        width: 200px;
        margin-left: 14px;
        flex: 1;
        // border: 1px solid red;
        border: 1px solid #d6dee6;
        .despie {
          height: 182px;
          // border: 1px solid red;
        }
        .tit {
          text-align: center;
          margin: 30px 0 10px 0;
        }
        .des-item {
          background: #f9fafc;
          margin: 0 12px;
          padding: 0 10px;
          .one-line {
            justify-content: space-between;
            padding: 6px 0;
            border-bottom: 1px solid #d6dee6;
            font-weight: 600;
            img {
              height: 24px;
            }
            .l {
              span {
                padding-left: 4px;
              }
            }
          }

          .i-line {
            display: flex;
            justify-content: space-between;
            text-align: right;
            margin: 15px 0;
            .m-tit {
              width: 66px;
              // border: 1px solid red;
            }
            .m-num {
              flex: 1;
            }
          }
        }
      }
    }
  }
}
</style>
