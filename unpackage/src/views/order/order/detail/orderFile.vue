<template>
    <yd-cell-group>
        <yd-cell-item>
            <span slot="left">合同凭证：</span>
            <span slot="left">
                <img v-for="img in param.contractList" :src="img.path" style="width:90px">
            </span>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">支付凭证：</span>
            <span slot="left">
                <img v-for="img in param.payPics" :src="img.path" style="width:90px">
            </span>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">物流凭证：</span>
            <span slot="left">
                <img v-for="img in param.sendPics" :src="img.path" style="width:90px">
            </span>
        </yd-cell-item>
    </yd-cell-group>
</template>
<script>
import http from '../../../../libs/httpService.js'
export default {

    props: ["param"],
    data() {
        return {
            list: []
        }
    },
    components: {

    },
    methods: {


    },
    created() {

    }
}
</script>
<style>
</style>
