<template>
    <div>
        <!--供应商列表-->
        
        <!--全部 -->
        <allSupplyList  v-if="$route.query.id==0"></allSupplyList>
        <!--优质 -->
        <qualSupplyList  v-if="$route.query.id==4"></qualSupplyList>
        <!--我的 -->
        <mySupplyList  v-if="$route.query.id==6"></mySupplyList>
        <!--部门 -->
        <partSupplyList  v-if="$route.query.id==7"></partSupplyList>
         <!--部门 -->
        <poolSupplyList  v-if="$route.query.id==8"></poolSupplyList>
        
    </div>
</template>
<script>
import allSupplyList from "../supplier/part/listType/allSupply.vue"
import qualSupplyList from "../supplier/part/listType/qualSupply.vue"
import mySupplyList from "../supplier/part/listType/mySupply.vue"
import partSupplyList from "../supplier/part/listType/partSupply.vue"
import poolSupplyList from "../supplier/part/listType/poolSupply.vue"
export default {
    components: {
        allSupplyList,
        qualSupplyList,
        mySupplyList,
        partSupplyList,
        poolSupplyList

    },
    created() {

    }
}
</script>
<style>
</style>
