<template>
  <div class="containers">
    <el-dialog
      v-model="accountShow"
      title="到账提醒详情"
      width="88%"
      @close="closeDialogBtn"
    >
      <div class="account-contains">
        <div class="left-content">
          <div class="header">
            <img src="@/assets/img/totalbank.png" alt="" />
            <span>本周到账银行</span>
          </div>
          <ul class="">
            <template v-for="(val, index) in accountData.content" :key="index">
              <li
                @click="changeIndex(index)"
                :class="{ acitveClass: active == index }"
              >
                {{ val.bnkname }}
              </li>
            </template>
          </ul>
        </div>
        <div class="right-content">
          <div class="top-content">
            <!-- <img src="@/assets/img/com.png" alt="" />
            <span>到账银行:{{rightDatas.lineNums.bank}}</span> -->
            <img src="@/assets/img/num.png" alt="" />
            <span>到账总笔数:{{ rightDatas.lineNums.money }}家</span>
            <img src="@/assets/img/moneyicon.png" alt="" />
            <span>到账总金额:{{rightDatas.lineNums.num}}元</span>
          </div>
          <div class="bottom-content">
            <div class="top display: flex; align-items: center;">
              <div class="search flex-center">
                <span class="tit"
                  >到账记录<span class="num"
                    >({{ rightDatas.table.length }})</span
                  ></span
                >
                <el-input
                  v-model="input4"
                  placeholder="请输入搜索内容"
                  class="searchs"
                >
                  <template #prefix>
                    <el-icon class="el-input__icon"><search /></el-icon>
                  </template>
                </el-input>
              </div>
              <div class="search-r flex-center">
                <div class="l flex-center cursor" @click="changeViewBtn">
                  <img src="@/assets/img/changeview.png" alt="" />
                  <span class="text">{{ viewdes }}</span>
                </div>
                <button>导出</button>
              </div>
            </div>
            <!-- <transition name="slide"> -->
            <div v-if="changeView" class="data-table scrollbar-css">
              <div class="header">
                <el-checkbox
                  v-model="checkAll"
                  :indeterminate="isIndeterminate"
                  @change="handleCheckAllChange"
                  >全选</el-checkbox
                >
              </div>

              <template v-for="(val, index) in rightDatas.table" :key="index">
                <div class="content">
                  <div class="select flex-center">
                    <el-checkbox> </el-checkbox>
                  </div>
                  <div class="r-content">
                    <div class="icon"></div>
                    <div class="bottom-c">
                      <div class="l">
                        <div class="flex-center">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="val.OTHNAM"
                            placement="top-start"
                          >
                            <span class="l-tit">{{ val.OTHNAM }}</span>
                          </el-tooltip>

                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="val.OTHACT"
                            placement="top-start"
                          >
                            <span class="num des-num">{{ val.OTHACT }}</span>
                          </el-tooltip>
                        </div>
                        <div class="time num">{{ val.BNKTIM }}</div>
                      </div>
                      <div class="c">
                        <div class="turn-icon">
                          <img src="@/assets/img/turnright.png" alt="" />
                        </div>
                        <!-- <div>货款</div> -->
                      </div>
                      <div class="r">
                        <div class="flex-center">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="val.ACTNAM"
                            placement="top-start"
                          >
                            <span class="l-tit">{{ val.ACTNAM }}</span>
                          </el-tooltip>

                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="val.ACTNBR"
                            placement="top-start"
                          >
                            <span class="num des-num">{{ val.ACTNBR }}</span>
                          </el-tooltip>
                        </div>
                        <div class="time num">
                          {{ val.CCYNBR + " " }}{{ val.TRSBAL }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <!-- </transition> -->
            <!-- <transition name="slide"> -->
            <div class="table-data scrollbar-css" v-show="!changeView">
              <el-table
                stripe
                border="false"
                :data="rightDatas.table"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                header-row-class-name="header-css"
                max-height="430px"
              >
                <el-table-column type="selection" width="55" />
                <template v-for="(val, index) in dataLabel" :key="index">
                  <el-table-column :label="val.value">
                    <template #default="scope">{{
                      scope.row[val.attr]
                    }}</template>
                  </el-table-column>
                </template>
              </el-table>
            </div>
            <!-- </transition> -->
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reactive,
  ref,
  toRefs,
  watch,
  onMounted,
  getCurrentInstance,
} from "vue";
import { Edit, Search } from "@element-plus/icons";
import { format } from "@/utils/priceAdujust";

const cityOptions = ["Shanghai", "Beijing", "Guangzhou", "Shenzhen"];
export default {
  name: "Account",
  props: {
    // accountShow: {
    //   type: Boolean,
    //   default: true,
    // },
    accountData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup(prop, { emit }) {
    let accountData = prop.accountData;
    var active = ref(0);
    let changeView = ref(false);
    let accountShow = ref(true);
    let formats = reactive(format);
    const dataLabel = ref([
      {
        attr: "ACTNAM",
        value: "收款方名称",
      },
      {
        attr: "ACTNBR",
        value: "收款方账号",
      },
      {
        attr: "NUSAGE",
        value: "用途",
      },
      {
        attr: "TRSBAL",
        value: "金额",
      },

      {
        attr: "OTHACT",
        value: "付款方账号",
      },
      {
        attr: "OTHNAM",
        value: "付款方名称",
      },
      {
        attr: "BNKTIM",
        value: "交易时间",
      },
    ]);
    const state = reactive({
      checkAll: false,
      checkedCities: ["Shanghai", "Beijing"],
      cities: cityOptions,
      isIndeterminate: true,
    });
    const handleCheckAllChange = (val) => {
      state.checkedCities = val ? cityOptions : [];
      state.isIndeterminate = false;
    };
    const handleCheckedCitiesChange = (value) => {
      const checkedCount = value.length;
      state.checkAll = checkedCount === state.cities.length;
      state.isIndeterminate =
        checkedCount > 0 && checkedCount < state.cities.length;
    };
    let rightDatas = reactive({
      lineNums: {
        num: "323",
        money: "323",
      },
      table: [],
    });
    const changeIndex = (index) => {
      active.value = index;
      // console.log(active.value);
      // 筛选右边的区域
      rightDatas.lineNums = {
        num: formats(accountData.content[index].totalAmount),
        money: accountData.content[index].totalNum,
      };
      rightDatas.table = accountData.content[index].content;
      console.log(rightDatas.table);
      // rightDatas.table.forEach((val) => {
      //   val.TRSBAL = format(val.TRSBAL);
      // });
    };

    changeIndex(0);
    const closeDialogBtn = () => {
      emit("closeDialog");
    };

    let tableData = reactive([
      {
        date: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-02",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-04",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
    ]);
    let multipleSelection = ref([]);

    const toggleSelection = (rows) => {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    };
    const handleSelectionChange = (val) => {
      // this.multipleSelection = val;
    };
    let viewdes = ref("列表视图");
    const changeViewBtn = () => {
      console.log(212);
      viewdes.value = viewdes.value == "卡片视图" ? "列表视图" : "卡片视图";
      changeView.value = !changeView.value;
    };
    return {
      active,
      changeIndex,
      ...toRefs(state),
      handleCheckAllChange,
      handleCheckedCitiesChange,
      multipleSelection,
      tableData,
      toggleSelection,
      handleSelectionChange,
      dataLabel,
      changeView,
      changeViewBtn,
      closeDialogBtn,
      accountShow,
      rightDatas,
      viewdes,
      formats
    };
  },
  components: {
    Search,
  },
};
</script>

<style lang="scss" scoped>
.containers {
  .account-contains {
    height: 560px;
    overflow: hidden;
    //   padding: 15px;
    display: flex;

    .left-content {
      width: 15%;
      // border: 1px solid #008c8c;
      // background: #f9fafc;
      background: #f5f5f5;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      // font-weight: 600;
      font-size: 15px;
      .header {
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        //   border: 1px solid rebeccapurple;
        width: 100%;
        font-weight: 600;
        img {
          height: 20px;
        }
      }
      ul {
        width: 80%;
        //   border: 1px solid rebeccapurple;
        //   overflow-y: scroll;
        height: calc(100% - 86px);
        li {
          display: flex;
          align-items: center;
          padding: 10px 0;
          width: 100%;
          justify-content: flex-end;
          padding-right: 24%;
          &:hover {
            cursor: pointer;
            opacity: 0.9;
          }
          &.acitveClass {
            border-radius: 20px 0 0 20px;
            color: var(--sle-text-color);
            background: #fff;
          }
        }
      }
    }
    .right-content {
      width: 85%;
      // margin-left: 20px;
      // border: 1px solid red; //   height: 100%;
      padding: 20px;
      .top-content {
        display: flex;
        align-items: center;
        // margin: 14px 0;
        margin-bottom: 10px;
        font-size: 15px;
        img {
          height: 20px;
          margin-right: 4px;
        }
        span {
          margin-right: 22px;
          color: var(--nosle-text-color);
        }
      }
      .bottom-content {
        // border: 1px solid red;
        height: calc(100% - 30px);
        font-size: 15px;
        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          // border: 1px solid #f9fafc;
          border: 1px solid #d6dee6;

          .search {
            font-weight: 600;
            margin: 0 16px;
            .tit {
              white-space: nowrap;
            }
            .num {
              font-size: var(--font-size);
            }

            .searchs {
              margin-left: 10px;
              width: auto;
              ::v-deep .el-input__inner {
                background: #f9fafc;
                border-radius: 14px;
                width: 240px;
                height: 30px;
              }
            }
          }
          .search-r {
            height: 44px;
            .l {
              height: 100%;

              img {
                padding: 0 2px 0 20px;
                height: 20px;
              }
              border-left: 1px solid #d6dee6;
              span {
                padding-right: 20px;
                font-size: 14px;
              }
            }
            button {
              height: 100%;
              outline: none;
              border: none;
              width: 120px;
              color: #fff;
              background: var(--sle-text-color);
            }
          }
        }
        .data-table {
          padding: 0 20px 0 20px;
          overflow-y: scroll;
          height: 430px;
          .content {
            display: flex;
            width: 100%;
            margin: 11px 0;
            border-radius: 4px;
            .r-content {
              flex: 1;
              font-size: 15px;
              border: 1px solid #eef2f6;
              padding: 10px 20px;
              border-radius: 4px;

              .icon {
                position: relative;
                height: 15px;
                &::before {
                  width: 16px;
                  height: 16px;
                  background: #fe4440;
                  border-radius: 50%;
                  position: absolute;
                  left: 0;
                  content: "";
                }
                &::after {
                  width: 16px;
                  height: 16px;
                  background: #ffe54c;
                  border-radius: 50%;
                  position: absolute;
                  left: 14px;
                  content: "";
                }
              }
              .bottom-c {
                display: flex;
                justify-content: space-between;
                padding-top: 5px;
                .c {
                  color: #fe4440;
                  font-size: var(--font-size);
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  .turn-icon {
                    width: 24px;
                    img {
                      width: 100%;
                    }
                  }
                }

                .num {
                  font-size: 14px;
                  font-weight: 600;
                  padding-left: 4px;
                  &.des-num {
                    display: inline-block;
                    max-width: 170px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                }
                .r {
                  .num {
                    text-align: right;
                  }
                }
                .time {
                  padding-top: 10px;
                }
                .l-tit {
                  max-width: 200px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
            }

            .select {
              width: 40px;
              // border: 1px solid red;
              justify-content: center;
            }
          }
          .header {
            background: #f9fafc;
            position: sticky;
            top: 0;
            z-index: 100;
            background: #fff;
          }
        }
        .table-data {
          overflow: hidden;
          height: 430px;
          ::v-deep .el-table {
            tr {
              td {
                text-align: center;
                word-break: break-all;
              }
            }
            .el-table__body-wrapper {
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

            .header-css {
              th {
                background: #f9fafc;
                padding: 4px 0;
                text-align: center;
              }
            }

            tr {
              th,
              td {
                border: none;
                padding: 6px 0;
              }
            }
          }
        }

        ::v-deep .el-checkbox__inner {
          width: 16px;
          height: 16px;
          border-radius: 2px;
          border: 1px solid #5e7691;
          //   display: fle;
          //   align-items: center;
          //   justify-content: center;
          &::after {
            height: 10px;
            left: 5px;
            top: 0px;
          }
        }
      }
    }
  }
}
</style>
