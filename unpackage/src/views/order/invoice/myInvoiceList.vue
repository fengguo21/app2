<template>
    <invoice-list :param="param"></invoice-list>
</template>
<script>
import invoiceList from './invoiceList.vue'
export default {
    data() {
            return {
                param: {
                    flag: 0,
                    module: "erpOrderInvoiceService",
                    method: "queryMyInvoiceRequest",
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
