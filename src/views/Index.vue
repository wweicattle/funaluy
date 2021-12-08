<template>
  <div class="Home-contain">
    <el-container class="laytotal-w">
      <el-aside>
        <left-menu></left-menu>
      </el-aside>
      <el-container class="right-content">
        <el-header height="57px">
          <Header />
        </el-header>
        <el-main>
          <work-place></work-place>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "./Home/Child/Header.vue";
import LeftMenu from "./Home/Child/LeftMenu.vue";
import WorkPlace from "./Work/Index.vue";

export default {
  name: "Home",
  components: {
    Header,
    LeftMenu,
    WorkPlace,
  },
};
</script>
<style lang="scss">
.Home-contain {
  height: 100%;
  .laytotal-w {
    height: 100%;
    display: flex;
    .el-aside {
      // background: #008c8c;
      width:200px;
      height: 100%;
      box-shadow: 1px 0px 14px 0px rgba(0, 0, 0, 0.12);
    }
    .el-header {
      background: #fff;
      box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.12);
    }
  }
}
</style>
