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
      <div class="calendar" ref="calendar"></div>
      <div class="remind-text">
        <div class="item">
          <span class="icon"></span>
          <span class="destail">大额预警</span>
        </div>
        <div class="item">
          <span class="icon"></span>
          <span class="destail">大额预警</span>
        </div>
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
import Calendar from "./calendar.js";
import { defineComponent } from "vue";
import { reactive, ref, onMounted } from "vue";
export default defineComponent({
  name: "App",
  setup() {
    let calendar = ref(null);
    onMounted(() => {
      console.log(calendar.value);
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
    });
    // console.log(calendar.value);

    let data = ref();
    return {
      data,
      calendar,
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
      top: 20px;
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
    top: -45px;
    z-index: 100;
    .remind-text {
      padding: 10px 15px 0 25px;
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
    height: 220px;
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
  }

  .calendar ol.weekdays li {
    width: 14.2857%;
    padding: 0.5em 1em;
  }

  .calendar > ol.days {
    display: flex;
    flex-wrap: wrap;
    height: 210px;
    // flex-grow: 1;
  }

  .calendar > ol.days > li {
    width: 14.2857%;
    // border-right: 1px solid #c7c7cc;
    // border-top: 1px solid #c7c7cc;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
  }

  .calendar > ol.days > li:nth-child(7n) {
    border-right: none;
  }
  .calendar .today .day {
    background: linear-gradient(148deg, #4749ff 0%, #004bee 100%);
    width: 1.6em;
    display: inline-block;
    text-align: center;
    height: 1.6em;
    line-height: 1.6em;
    border-radius: 50%;
    color: white;
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
