<template>
    <yd-cell-group>
        <yd-cell-item>
            <span slot="left">ID：</span>
            <span slot="left">{{param.id}}</span>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">订单号：</span>
            <span slot="left">{{param.no}}</span>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">收货人：</span>
            <span slot="left">{{param.consignee}}</span>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">收货人手机：</span>
            <span slot="left">{{param.consigneePhone}}</span>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">收货人地址：</span>
            <span slot="left" style="white-space:normal">{{param.provinceName}}{{param.cityName}}{{param.districtName}}{{param.consigneeAddr}}</span>
        </yd-cell-item>
    </yd-cell-group>
</template>
<script>
import http from '../../../../libs/httpService.js'
import stringUtil from '../../../../libs/stringUtil.js'
export default {
    props: ["param"],
    data() {
        return {

        }
    },
    computed: {

    },
    components: {


    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {


    },
    created() {

    }

}
</script>
<style lang="less" scoped>
</style>
