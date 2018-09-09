<template>
  <div>
    <!-- 客户列表 -->

    <!-- 我的客户 -->
       <my-customer-list v-if="$route.query.id==0" ></my-customer-list>
    <!-- 部门客户 -->
       <dept-customer-list v-if="$route.query.id==1"></dept-customer-list>
    <!-- 全部客户 -->
       <all-customer-list v-if="$route.query.id==2" ></all-customer-list>
    <!-- 外源客户池 -->
       <out-customer-pool v-if="$route.query.id==3" ></out-customer-pool>
    <!-- 客户黑名单 -->
       <cus-blacklist v-if="$route.query.id==4" ></cus-blacklist>
    <!-- 客户池 -->
       <customer-pool v-if="$route.query.id==7"></customer-pool>
  </div>
</template>
<script>
import myCustomerList from "../customer/list/myCustomer.vue";
import deptCustomerList from "../customer/list/deptCustomer.vue";
import allCustomerList from "../customer/list/allCustomer.vue";
import outCustomerPool from "../customer/list/outCustomerPool.vue";
import cusBlacklist from "../customer/list/cusBlacklist.vue";
import customerPool from "../customer/list/customerPool.vue";
export default {
  components: {
    myCustomerList,
    deptCustomerList,
    allCustomerList,
    outCustomerPool,
    cusBlacklist,
    customerPool
  },
  created() {}
};
</script>
<style scoped>

</style>


