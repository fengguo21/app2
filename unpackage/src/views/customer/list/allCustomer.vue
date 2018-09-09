<!-- 全部 客户 -->
<template>
  <div>
    <customer-list :func-type="$route.query.id"></customer-list>
  </div>
</template>
<script>
import customerList from "../customerList.vue";
export default {
  //   mounted() {
  //     this.nextTick(function() {
  //       // if (this.$route.query.id == 1 ||this.$route.query.id == 2) {
  //       let _this = this;
  //       bus.$emit("more-operation", [
  //         {
  //           title: "划转",
  //           callback: _this.addCustomer,
  //           icon: "jia-xianxingfangkuang"
  //         },
  //         {
  //           title: "划转客户池",
  //           callback: _this.addCustomer,
  //           icon: "jia-xianxingfangkuang"
  //         }
  //       ]);
  //       // }
  //     });
  //   },
  components: {
    customerList
  },
  beforeDestroy() {
    //清空操作列表
    // bus.$emit("more-operation", []);
  }
};
</script>
<style lang="less" scoped>

</style>
