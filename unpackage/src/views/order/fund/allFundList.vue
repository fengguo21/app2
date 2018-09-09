<template>
    <fund-list :param="param"></fund-list>
</template>
<script>
import fundList from './fundList.vue'
export default {
    data() {
            return {
                param: {
                    flag: 2,
                    module: "payStagesFundService",
                    method: "getList",
                }

            }
        },
        components: {
            fundList
        },
        created() {


        }
}
</script>
<style lang="less" scoped>
</style>
