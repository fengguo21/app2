<template>
  <div>
    <customer-list :func-type="$route.query.id"></customer-list>
  </div>
</template>
<script>
import customerList from "../customerList.vue";
export default {
//   mounted() {
//     // if (this.$route.query.id == 4) {
//     this.nextTick(function() {
//       let _this = this;
//       bus.$emit("more-operation", [
//         {
//           title: "移出黑名单",
//           callback: _this.addCustomer,
//           icon: "jia-xianxingfangkuang"
//         }
//       ]);
//     });
//     // }
//   },
  components: {
    customerList
  }
};
</script>
<style lang="less" scoped>

</style>
