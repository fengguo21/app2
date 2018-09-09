<template>
    <yd-layout>
            <yd-navbar slot="navbar" :title="title">
                <yd-icon name="shangyiyehoutuifanhui" slot="left" size='.5rem' @click.native="goBack" custom></yd-icon>
            </yd-navbar>
        <order-list :param="param" :mark="mark" ></order-list>
    </yd-layout>
</template>
<script>
import orderList from "../order/order/orderList.vue";
import Vue from "vue";
export default {
  data() {
    return {
      param: {
        flag: 2,
        module: "erpOrderService",
        method: "queryOrderList",
        customer: this.$route.query.id //客户id
      },
      mark: "customer",
      title:"客户订单"
    };
  },
  components: {
    orderList
  },
  methods: {
    goBack() {
      window.history.go(-1);
      console.log("----------------返回-----------------");
    }
  },
  created() {
    // this.loadList();
    // this.$route.fullPath.split("/")[2];
  }
};
</script>
<style>

</style>


