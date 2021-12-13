<template>
  <div class="funk-container">
    <div class="l-c">
      <div class="tit">资金存量</div>
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
          <el-button type="border" @click="sendOpenDialogBtn"
            >查看明细</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import { defineComponent } from "vue";
import { reactive, ref } from "vue";
export default defineComponent({
  name: "App",
  emit: ["sendOpenDialog"],
  setup(props, { emit }) {
    const accountTit = ["银行资金存量", "组织资金存量"];
    const remindAccounts = ["本周到账提醒"];
    const slectIndex = ref(0);
    const accountIndex = ref(0);
    let data = ref();
    const changeBank = (index) => {
      slectIndex.value = index;
    };
    const changeAccount = (index) => {
      accountIndex.value = index;
    };
    const sendOpenDialogBtn = () => {
      emit("sendOpenDialog");
    };
    return {
      data,
      accountTit,
      remindAccounts,
      accountIndex,
      slectIndex,
      accountIndex,
      changeBank,
      changeAccount,
      sendOpenDialogBtn
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
    padding: 15px 0;
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
</style>
