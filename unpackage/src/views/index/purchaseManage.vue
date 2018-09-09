<template>
    <div>
        <!--我的求购列表-->
        <my-beg-buy-list  v-if="$route.query.id==0"></my-beg-buy-list>
        <!--我的求购列表-->
        <org-Purchaselist  v-if="$route.query.id==1"></org-Purchaselist>
        <!--我的求购列表-->
        <all-Purchaselist  v-if="$route.query.id==2"></all-Purchaselist>
    </div>
</template>
<script>
import myBegBuyList from "../intention/begBuy/myBegBuyList.vue";
import orgPurchaselist from '../intention/begBuy/orgPurchaselist'
import allPurchaselist from '../intention/begBuy/allPurchaselist'

export default {
  components: {
    myBegBuyList,
    orgPurchaselist,
    allPurchaselist
  },
  created() {
      console.log("2@@@@@@@@@@@@@@@@@@@",this.$route);
  }
};
</script>
<style>

</style>
