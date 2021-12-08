<template>
  <div class="App-contain">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  min-width: 1200px;
}
.App-contain {
  height: 100%;
}
</style>
