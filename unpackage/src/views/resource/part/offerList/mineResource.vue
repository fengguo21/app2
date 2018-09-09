<template>
	<public-list :param="dataList"></public-list>
</template>

<script>
import bus from "../../../../libs/bus.js";
import publicList from "../publicList.vue";
export default {
  data() {
    return {
      dataList: {
        operateIds: [],
        biz_method: "queryMySendOffer",
        biz_module: "erpIntentionOfferService"
      },
    };
  },
  components: {
    publicList
  },
    mounted() {
      this.$nextTick(function() {
        let _this = this;
        // 设置页面右上角更多操作功能项
        bus.$emit('more-operation', []); //触发事件

      })
	},
	//  methods:{
    // addNewResource(){
    // //  this.
    // }
//   },
  created() {},
};
</script>

<style>

</style>