<template>
    <invoice-list :param="param"></invoice-list>
</template>
<script>
import invoiceList from './invoiceList.vue'
export default {
    data() {
            return {
                param: {
                    flag: 1,
                    module: "erpOrderInvoiceService",
                    method: "queryOrgInvoiceRequest",
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
