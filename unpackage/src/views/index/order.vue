<template>
    <div>
        <!--订单列表-->
        <my-order-list v-if="$route.query.id==0"></my-order-list>
        <org-order-list v-if="$route.query.id==1"></org-order-list>
        <all-order-list v-if="$route.query.id==2"></all-order-list>
        <!--收付款列表-->
        <my-fund-list v-if="$route.query.id==7"></my-fund-list>
        <org-fund-list v-if="$route.query.id==8"></org-fund-list>
        <all-fund-list v-if="$route.query.id==9"></all-fund-list>
        <!--补充合同列表-->
        <my-contract-list v-if="$route.query.id==10"></my-contract-list>
        <org-contract-list v-if="$route.query.id==11"></org-contract-list>
        <!--售后申请列表-->
        <my-aftersale-list v-if="$route.query.id==12"></my-aftersale-list>
        <org-aftersale-list v-if="$route.query.id==13"></org-aftersale-list>
        <!--订单处理-->
        <order-handle-list v-if="$route.query.id==14"></order-handle-list>
        <!--待采购列表-->
        <my-orderlink-list v-if="$route.query.id==15"></my-orderlink-list>
        <org-orderlink-list v-if="$route.query.id==16"></org-orderlink-list>
        <!--开票列表-->
        <my-invoice-list v-if="$route.query.id==18"></my-invoice-list>
        <org-invoice-list v-if="$route.query.id==19"></org-invoice-list>
        <all-invoice-list v-if="$route.query.id==20"></all-invoice-list>
    </div>
</template>
<script>
import myOrderList from "../order/order/myOrderList.vue"
import orgOrderList from "../order/order/orgOrderList.vue"
import allOrderList from "../order/order/allOrderList.vue"
import myFundList from "../order/fund/myFundList.vue"
import orgFundList from "../order/fund/orgFundList.vue"
import allFundList from "../order/fund/allFundList.vue"
import myInvoiceList from "../order/invoice/myInvoiceList.vue"
import orgInvoiceList from "../order/invoice/orgInvoiceList.vue"
import allInvoiceList from "../order/invoice/allInvoiceList.vue"
import myContractList from "../order/contract/myContractList.vue"
import orgContractList from "../order/contract/orgContractList.vue"
import myAftersaleList from "../order/afterSales/myAfterSalesList.vue"
import orgAftersaleList from "../order/afterSales/orgAfterSalesList.vue"
import myOrderlinkList from "../order/orderLink/myOrderLinkList.vue"
import orgOrderlinkList from "../order/orderLink/orgOrderLinkList.vue"
import orderHandleList from "../order/orderHandle/orderHandleList.vue"

export default {
    components: {
        myOrderList,
        orgOrderList,
        allOrderList,
        myFundList,
        orgFundList,
        allFundList,
        myInvoiceList,
        orgInvoiceList,
        allInvoiceList,
        myContractList,
        orgContractList,
        myAftersaleList,
        orgAftersaleList,
        myOrderlinkList,
        orgOrderlinkList,
        orderHandleList

    },
    created() {

    }
}
</script>
<style>
</style>
