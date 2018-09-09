<template>
  <div>
    <customer-list :func-type="$route.query.id"></customer-list>
  </div>
</template>
<script>
import customerList from "../customerList.vue";
export default {
//   mounted() {
//     this.$nextTick(function() {
//       //   if (this.$route.query.id == 0) {
//       let _this = this;
//       // 设置页面右上角更多操作功能项
//       bus.$emit("more-operation", [
//         {
//           title: "新建客户",
//           callback: _this.addCustomer,
//           icon: "jia-xianxingfangkuang"
//         },
//         {
//           title: "认证申请",
//           callback: _this.applyAudit,
//           icon: "yonghuziliao-xianxing"
//         },
//         //
//         {
//           title: "加入黑名单",
//           callback: _this.addToBlackList,
//           icon: "weichuqin"
//         }
//       ]); //触发事件
//     });
//   },
  components: {
    customerList
  }
};
</script>
<style lang="less" scoped>

</style>


