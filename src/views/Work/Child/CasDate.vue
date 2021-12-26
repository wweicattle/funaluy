<template>
  <div class="container">
    <div class="dec">
      <img src="static/img/sunshine.png" alt="" class="sunshine" />
      <img src="static/img/flower.png" alt="" class="flower" />
      <img src="static/img/flower1.png" alt="" class="flower1" />
      <img src="static/img/mountain.png" alt="" class="mountain" />
      <img src="static/img/tree.png" alt="" class="tree" />
      <nav>
        <div class="controls">
          <span id="previousMonth">&lt;</span>
          <div id="today"><div class="date"></div></div>
          <span id="nextMonth">&gt;</span>
        </div>
      </nav>
    </div>
    <div class="calendar-date">
      <div class="calendar" ref="calendar" @click="faBtn"></div>
      <div class="remind-text">
        <div class="item">
          <span class="icon"></span>
          <span class="destail">到期预警</span>
        </div>
        <!-- <div class="item">
          <span class="icon"></span>
          <span class="destail">大额预警</span>
        </div> -->
      </div>
    </div>

    <!-- <div class="page">
    <nav>
        <h1 class="date"></h1>
        <div class="controls">
            <button id="previousMonth">&lt;</button>
            <button id="today">今天</button>
            <button id="nextMonth">&gt;</button>
        </div>
    </nav>
    <div class="calendar"></div>
</div> -->
  </div>
</template>

<script>
import Calendar, { fragment, dayNum } from "./calendar.js";
import {
  reactive,
  ref,
  onMounted,
  toRefs,
  nextTick,
  defineComponent,
  watch,
  watchEffect,
} from "vue";
import { getMonthRemind, getDayRemind } from "network/request";
import { useStore } from "@/store/index.js";
console.log(useStore);
export default defineComponent({
  name: "Casdate",
  setup(prop, { emit }) {
    let stateData = useStore();
    console.log(stateData);
    // stateData.EDIT_SELECTTIME("2021-5-2");
    let calendar = ref(null);
    let monthRemind = reactive({
      monthData: {},
    });
    onMounted(async () => {
      await nextTick();
      let calendars = new Calendar({
        element: calendar.value,
      });
      previousMonth.onclick = function () {
        calendars.previousMonth();
      };
      nextMonth.onclick = function () {
        calendars.nextMonth();
      };
      today.onclick = function () {
        calendars.resetMonth();
      };
      // console.log(calendar.value.querySelector(".day").);
      calendar.value.querySelectorAll(".day").forEach((val) => {
        var arr=[19,17,18,21,23,22,24]
        // arr.some(vals=>{
        //   return vals==val.innerText;
        // })
        console.log(val.innerText);
        // console.log(arr.includes(Number(val.innerText)));
        if (arr.includes(Number(val.innerText))) {
          val.classList.add('state');
        }

        //   val.addEventListener(
        //     "click",
        //     (e) => {
        //       // document.querySelectorAll(".day").forEach((val) => {
        //       //   if (val.classList.contains("today"))
        //       //     val.classList.remove("today");
        //       // });
        //       console.log(e.target);
        //       // e.target.classList.add("today");
        //       e.stopPropagation();
        //       return false;
        //     },
        //     false
        //   );
      });
    });

    watchEffect(() => {
      console.log(stateData.selectTime);
      emit("refreshData", stateData.selectTime);
    });
    // watch(()=>stateData.$state,(newVal)=>{
    //   console.log(newVal);
    // },{
    //   deep:true,immediate:true
    // })
    // let$state,()=> obj = {
    //   year: 2021,
    //   month: 12,
    //   startTime: "2021-12-1",
    //   endTime: "2021-12-30",
    // };
    // getMonthRemind(obj).then((da) => {
    //   console.log(da);
    //   monthRemind.monthData = da;
    // });
    // // console.log(calendar.value);
    // getDayRemind(obj).then((da) => {
    //   console.log(da);
    // });
    let data = ref();
    return {
      data,
      calendar,
      ...toRefs(monthRemind),
    };
  },
});
</script>

<style lang="scss">
.container {
  height: 305px;
  // border: 1px solid red;
  // .page {
  //   min-height: 100vh;
  //   display: flex;
  //   flex-direction: column;
  .dec {
    height: 100px;
    // border: 1px solid red;
    // background: url("/static/img/mountain.png");
    background-size: contain;
    background-repeat: no-repeat;
    position: relative;

    .sunshine {
      position: absolute;
      left: 55px;
      right: 0;
      width: 90px;
      margin: 0 auto;
      top: -30px;
      z-index: 11;
    }
    .tree {
      position: absolute;
      // left: 0;
      right: 31px;
      width: 40px;
      // margin: 0 auto;
      // top: -30px;
      z-index: 16;
    }
    .mountain {
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 15;
    }
    .flower,
    .flower1 {
      position: absolute;
      left: 5px;
      right: 0;
      width: 100px;
      margin: 0 auto;
      // top: -30px;
      z-index: 100;
      width: 30px;
    }
    .flower1 {
      top: 5px;
      left: 100px;
    }
    .controls {
      position: absolute;
      top: 17px;
      left: 20px;
      display: flex;
      z-index: 17;
      align-items: center;
      #today {
        padding: 0 8px;
        font-size: 13px;
      }
    }
  }
  .calendar-date {
    position: relative;
    top: -55px;
    z-index: 100;
    padding: 0 12px;
    .remind-text {
      padding: 4px 15px 0 25px;
      display: flex;
      align-items: center;
      .item {
        display: flex;
        align-items: center;
        .icon {
          display: inline-block;
          width: 11px;
          height: 6px;
          // background: #000;
          background: linear-gradient(225deg, #ff7a75 0%, #fe4440 100%);
          border-radius: 0px 100px 0px 100px;
          margin-right: 4px;
        }
        .destail {
          font-size: 12px;
          color: var(--nosle-text-color);
          margin-right: 16px;
        }
      }
    }
  }
  nav:first-child {
    text-align: right;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // padding: 1em;
  }

  .calendar {
    // flex-grow: 0.5;
    // border: 1px solid red;
    height: 240px;
    display: flex;
    flex-direction: column;
  }

  .calendar > ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .calendar ol.weekdays {
    display: flex;
    text-align: right;
    height: 30px;
    margin-bottom: 10px;
  }

  .calendar ol.weekdays li {
    width: 14.2857%;
    padding: 0.5em 1em;
  }

  .calendar > ol.days {
    display: flex;
    flex-wrap: wrap;
    // border: 1px solid red;
    // height: 210px;
    // flex-grow: 1;
  }

  .calendar > ol.days > li {
    width: calc(100% / 7);
    // border-right: 1px solid #c7c7cc;
    // border-top: 1px solid #c7c7cc;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    margin: 8px 0;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }

  .calendar > ol.days > li:nth-child(7n) {
    border-right: none;
  }

  .days .day {
    position: relative;
    &.today {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      margin: auto;
      background: linear-gradient(148deg, #4749ff 0%, #004bee 100%);
      width: 26px;
      // display: inline-block;
      text-align: center;
      height: 26px;
      line-height: 26px;
      border-radius: 50%;
      color: #fff;
      // position: relative;
      // &::after {
      //   content: "";
      //   position: absolute;
      //   bottom: -4px;
      //   left: 0;
      //   right: 0;
      //   width: 5px;
      //   height: 5px;
      //   margin: 0 auto;
      //   border-radius: 50%;
      //   background: red;
      // }
    }
    &.state {
      // position: absolute;
      // left: 0;
      // right: 0;
      // bottom: 0;
      // margin: auto;
      // background: linear-gradient(148deg, #4749ff 0%, #004bee 100%);
      // border-radius: 50%;
      // color: red;
      // width: 13px;;
      // height: 13px;
      &::after {
        content: "";
        position: absolute;
        bottom: -8px;
        left: 0;
        right: 0;
        width: 5px;
        height: 5px;
        margin: 0 auto;
        border-radius: 50%;
        background: red;
      }
    }
  }

  .calendar .weekdays .weekend {
    color: #b8b8b8;
  }

  .calendar .days .weekend {
    background: #f5f5f5;
  }

  .calendar .days .previousMonth,
  .calendar .days .nextMonth {
    color: var(--sle-text-color);
  }
  #previousMonth,
  #nextMonth {
    color: var(--sle-text-color);
  }
  // }
}
</style>
