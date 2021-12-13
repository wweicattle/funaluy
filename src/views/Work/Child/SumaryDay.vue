<template>
  <div class="summary-container"></div>
</template>

<script>
import { defineComponent } from "vue";
import { reactive, ref } from "vue";
export default defineComponent({
  name: "App",
  setup() {
    let data = ref();
    return {
      data,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
