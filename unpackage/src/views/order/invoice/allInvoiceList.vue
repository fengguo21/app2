<template>
    <invoice-list :param="param"></invoice-list>
</template>
<script>
import invoiceList from './invoiceList.vue'
export default {
    data() {
            return {
                param: {
                    flag: 2,
                    module: "erpOrderInvoiceService",
                    method: "queryInvoiceRequest",
                }

            }
        },
        components: {
            invoiceList
        },
        created() {


        }
}
</script>
<style lang="less" scoped>
</style>
