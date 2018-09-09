<template>
    <contract-list :param="param"></contract-list>
</template>
<script>
import contractList from './contractList.vue'
export default {
    data() {
            return {
                param: {
                    flag: 0,
                    module: "erpSupplementaryContractService",
                    method: "getListByEmployee",
                }

            }
        },
        components: {
            contractList
        },
        created() {


        }
}
</script>
<style lang="less" scoped>
</style>
