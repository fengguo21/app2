<template>
    <div>
        <order-list :param="param" :queryParam="queryParam"></order-list>
    </div>
</template>
<script>
import orderList from "../../order/order/list.vue";
import Vue from "vue";
export default {
    data() {
            return {
                param: {
                    flag: 2,
                    module: "erpOrderService",
                    method: "queryOrderList",
                },
                queryParam: {
                    customer: this.$route.query.id//客户id
                },
                title: "客户订单"
            };
        },
        components: {
            orderList
        },
        // props: ["customerInfo"],
        methods: {
            goBack() {
                window.history.go(-1);
                console.log("----------------返回-----------------");
            }
        },
        created() {
            console.log("客户订单的",this.customerInfo);
            // this.loadList();
            // this.$route.fullPath.split("/")[2];
        }
};
</script>
<style>
</style>
