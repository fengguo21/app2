<template>
    <order-link-list :param="param"></order-link-list>
</template>
<script>
import orderLinkList from './orderLinkList.vue'
export default {
    data() {
            return {
                param: {
                    flag: 1,
                    module: "erpOrderLinkService",
                    method: "getListByOrg",
                }

            }
        },
        components: {
            orderLinkList
        },
        created() {


        }
}
</script>
<style lang="less" scoped>
</style>
