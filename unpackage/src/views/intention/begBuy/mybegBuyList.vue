<template>
  <intention-list :param="param"></intention-list>
</template>
<script>
import intentionList from "../intentionList.vue";
import http from '../../../libs/httpService.js'
import util from '../../../libs/util.js'
import bus from "../../../libs/bus.js";
export default {
  data() {
    return {
      param: {
        module: "erpIntentionService",
        method: "queryMyIntentionList",
        type: "0"

      }
    };
  },
  components: {
    intentionList
  },
  mounted() {
      this.$nextTick(function() {
        let _this = this;
        // 设置页面右上角更多操作功能项
        bus.$emit('more-operation', [{
          title: '新建求购',
          callback: _this.addNewPurchase,
          icon: ''

        }, {
          title: '询价扩散',
          callback: _this.chooseTransfer,
          icon: ''

        }, {
          title: '终止询价',
          callback: _this.chooseTransferPool,
          icon: ''

        }]); //触发事件

      })
    },
  methods:{
    addNewPurchase(){
      let url="/addPurchase";
      this.$router.push(url);
    }
  }
};
</script>
<style lang="less">

</style>


