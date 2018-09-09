<template>
  <div>
    <customer-list :func-type="$route.query.id"></customer-list>
  </div>
</template>
<script>
import customerList from "../customerList.vue";
export default {
  //   mounted() {
  //     this.nextTick(() => {
  //       if (this.$route.query.id == 3) {
  //         let _this = this;
  //         bus.$emit("more-operation", [
  //           {
  //             title: "划转",
  //             callback: _this.addCustomer,
  //             icon: "jia-xianxingfangkuang"
  //           },
  //           {
  //             title: "提取供应商",
  //             callback: _this.addCustomer,
  //             icon: "jia-xianxingfangkuang"
  //           }
  //         ]);
  //       }
  //     });
  //   },
  components: {
    customerList
  }
};
</script>
<style lang="less" scoped>

</style>
