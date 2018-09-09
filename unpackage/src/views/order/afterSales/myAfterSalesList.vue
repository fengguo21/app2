<template>
    <after-sales-list :param="param"></after-sales-list>
</template>
<script>
import afterSalesList from './afterSalesList.vue'
export default {
    data() {
            return {
                param: {
                    flag: 0,
                    module: "erpAfterSalesService",
                    method: "getListByEmployee",
                }

            }
        },
        components: {
            afterSalesList
        },
        created() {


        }
}
</script>
<style lang="less" scoped>
</style>
