<template>
  <div class="header-contain">
    <div class="h-left">
      <div class="title">工作台</div>
    </div>
    <div class="h-right">
      <el-select v-model="tzvalue" placeholder="请选择" class="select-tz">
        <el-option
          v-for="item in tabs"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        >
        </el-option>
      </el-select>
      <el-input v-model="input4" placeholder="请输入搜索内容" class="search">
        <template #prefix>
          <el-icon class="el-input__icon"><search /></el-icon>
        </template>
      </el-input>

      <!-- <div class="select-content">
        <el-select v-model="tzvalue" placeholder="请选择">
          <el-option
            v-for="item in talist"
            :key="item.value"
            :label="item.mc"
            :value="item.mc"
          >
          </el-option>
        </el-select>
      </div> -->
      <span class="icon"><img src="static/img/time.png" alt="" /></span>
      <img src="~assets/img/ee.jpg" alt="" class="actor" />
      <span> wuwei</span>
      <!-- <span class="down"><img src="static/img/downup.png" alt="" /></span> -->
      <!-- Or use it independently without derive attributes from parent -->
      <!-- <el-icon :size="size" :color="color"> -->
      <el-icon><arrow-down /></el-icon>

      <!-- </el-icon> -->

      <!-- <div class="ti me-content">
          <span>{{ date }}</span>
          <div class="year">{{ year }}</div>
        </div> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { Edit, Search, ArrowDown } from "@element-plus/icons";
import { getTzlistData } from "network/request";
// import { mapMutations, mapState } from "vuex";
import { defineComponent, ref, reactive, onBeforeMount, toRefs } from "vue";
export default defineComponent({
  data() {
    return {
      tzvalue: "",
      time: "",
      tabState: 0,
      UserName: "",
    };
  },
  setup(props) {
    const year = ref();
    const date = ref();
    let tzvalue=ref("全部部门");
    let tablist = reactive({
      tabs: [{ value: "全部部门", label: "全部部门" }],
    });
    setInterval((val) => {
      date.value = new Date();
      // console.log(time);
    }, 1000);

    onBeforeMount(() => {
      // clearInterval(times);
    });
    return {
      tzvalue: "",
      time: "",
      year,
      date,
      tabState: 0,
      ...toRefs(tablist),
      UserName: "",
      tzvalue
    };
  },
  components: { Edit, Search, ArrowDown },
  // methods: {
  //   ...mapMutations({
  //     editMainName: "EDIT_MAIN_PRODUCT", //also supports payload `this.nameOfMutation(amount)`
  //   }),
  //   getTzlistData() {
  //     getTzlistData().then((da) => {
  //       console.log(da);
  //       if (da.data.errcode == 0) {
  //         console.log(da.data.data);
  //         this.talist = da.data.data;
  //         this.tzvalue = this.talist[0]["mc"];
  //       } else {
  //         this.$Message.error("获取数据失败！" + da.data.errmsg + "请重试！");
  //       }
  //     });
  //   },
  // },
  // computed: {
  //   ...mapState({
  //     userInfo: "userInfo",
  //   }),
  // },
  // watch: {
  //   tzvalue(newVal) {
  //     this.editMainName({ state: newVal });
  //   },
  // },
});
</script>

<style  scoped lang="scss">
$defaultColor: #1c6fee;
.header-contain {
  height: 100%;
  // height: ;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background: #000;
  .h-left {
    .title {
      font-size: 17px;
    }
  }
  .h-right {
    height: 40px;
    display: flex;
    align-items: center;
    ::v-deep .el-input__inner {
      height: 30px;
      line-height: 30px;
    }
    .search {
      margin-left: 10px;
      width: auto;
      ::v-deep .el-input__inner {
        background: #f9fafc;
        border-radius: 14px;
        width: 300px;
      }
    }
    .select-tz {
      width: 100px;
      ::v-deep .el-input__inner {
        border: none;
      }
    }

    ::v-deep .el-input__suffix {
      display: flex;
      align-items: center;
    }

    .actor {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      margin: 0 14px;
    }
    .icon {
      margin-left: 14px;
      img {
        height: 24px;
        width: 24px;
      }
    }
    .down {
      img {
        width: 14px;
        height: 14px;
      }
    }
  }
}

::v-deep .el-input {
  line-height: 30px;
  .el-input__prefix {
    // display: flex;
    // align-items: center;
  }
}
</style>
