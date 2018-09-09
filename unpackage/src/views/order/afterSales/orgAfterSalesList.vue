<template>
    <after-sales-list :param="param"></after-sales-list>
</template>
<script>
import afterSalesList from './afterSalesList.vue'
export default {
    data() {
            return {
                param: {
                    flag: 1,
                    module: "erpAfterSalesService",
                    method: "getListByOrg",
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
