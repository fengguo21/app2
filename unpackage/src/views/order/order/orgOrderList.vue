<template>
    <order-list :param="param"></order-list>
</template>
<script>
import orderList from './orderList.vue'
export default {
    data() {
            return {
                param: {
                    flag: 1,
                    module: "erpOrderService",
                    method: "queryOrgOrderList",
                }

            }
        },
        components: {
            orderList
        },
        created() {


        }
}
</script>
<style lang="less" scoped>
</style>
