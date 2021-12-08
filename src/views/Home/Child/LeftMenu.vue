<template>
  <div class="left-contains">
    <div class="logo-content">
      <img src="@/assets/img/icon.png" alt="" />
      <span>利郎财务资金平台</span>
    </div>
    <div class="menu-contains">
      <el-menu
        active-text-color="#004BEE"
        background-color="#fff"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#222"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <img src="static/img/menu1.png" alt="" class="menu-icons" />
            <span>首页</span>
          </template>
          <el-menu-item index="1-1">工作台</el-menu-item>
          <el-menu-item index="1-2">常用报表</el-menu-item>
          <el-menu-item index="1-2">个人备忘录</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <img src="static/img/menu2.png" alt="" class="menu-icons" />
            <span>常用报表</span>
          </template>
          <el-menu-item index="1-1">工作台</el-menu-item>
          <el-menu-item index="1-2">常用报表</el-menu-item>
          <el-menu-item index="1-2">个人备忘录</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from "@element-plus/icons";

export default defineComponent({
  components: {
    Location,
    Document,
    Setting,
    IconMenu,
  },
  setup() {
    const handleOpen = (key, keyPath) => {};
    const handleClose = (key, keyPath) => {};
    return {
      handleOpen,
      handleClose,
    };
  },
});
</script>

<style scoped lang="scss">
.left-contains {
  height: 100%;
  overflow: hidden;
  background: #fff;
  .logo-content {
    height: 58px;
    // line-height:68px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--sle-text-color);
    font-weight: 600;
    font-size: 16px;
    border-bottom: 1px solid #ededed;

    img {
      width: 25px;
      // height: 25px;
      padding-right: 6px;
    }
  }
}
.menu-contains {
  height: calc(100% - 68px);
  ::v-deep .el-menu {
    width: 100%;
    font-weight: 600;
    border: none;
    .el-sub-menu__title {
      font-size: var(--font-size);
      .menu-icons {
        width: 24px;
        margin-right: 4px;
      }
    }

    .el-menu-item {
      padding-left: 47px !important;
      // position: relative;
      &.is-active {
        position: relative;
        &::after {
          content: "";
          position: absolute;
          right: 0;
          width: 3px;
          height: 20px;
          background: var(--sle-text-color);
        }
      }
    }
  }
}
</style>
