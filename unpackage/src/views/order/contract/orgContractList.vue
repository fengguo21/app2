<template>
    <contract-list :param="param"></contract-list>
</template>
<script>
import contractList from './contractList.vue'
export default {
    data() {
            return {
                param: {
                    flag: 1,
                    module: "erpSupplementaryContractService",
                    method: "getListByOrg",
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
