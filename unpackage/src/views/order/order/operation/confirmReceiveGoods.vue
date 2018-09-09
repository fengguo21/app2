<template>
    <yd-popup v-model="param.show" position="right" width="80%">
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">物流公司：</span>
                <span slot="right">{{this.param.logistics[0].name}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">物流单号：</span>
                <span slot="right">{{this.param.logistics[0].number}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">物流凭证：</span>
                <span slot="right">{{this.param.logistics[0].name}}</span>
            </yd-cell-item>
        </yd-cell-group>
        <div style="float:right">
            <yd-button type="primary" @click.native="confirm">确认</yd-button>
            <yd-button type="primary" @click.native="getLogisticsDetails">查看物流</yd-button>
        </div>
        <div style="clear:both" v-if="showLog">
            <yd-cell-group>
                <yd-cell-item v-for="item in datalist">
                    <span slot="left" style="font-size:10px;">{{item.time}}<br></span>
                    <span slot="right" style="font-size:10px;white-space:normal">{{item.context}}</span>
                </yd-cell-item>
            </yd-cell-group>
        </div>
    </yd-popup>
</template>
<script>
import http from '../../../../libs/httpService.js'
export default {
    props: ["param"],
    data() {
        return {
            showLog: false,
            datalist: []

        }
    },
    components: {

    },
    methods: {
        pass() {
            this.param.validate = 1;
            this.confirm();
        },
        reject() {
            this.param.validate = 0;
            this.confirm();
        },
        //查看物流信息
        getLogisticsDetails() {
            let url = http.urlCommon + http.apiUrl.most;
            let body = {
                biz_module: 'logisticsService',
                biz_method: 'queryLogisticsDetails',
                biz_param: {
                    orderId: this.param.id,
                }
            };
            http.commonPost(url, body).then((res) => {

                this.showLog = true;
                this.datalist = res.biz_result.data;

            }).catch((err) => {});
        },
        confirm() {
            let url = http.urlCommon + http.apiUrl.most;
            let body = {
                biz_module: 'erpOrderService',
                biz_method: 'receiveConfirm',
                biz_param: {
                    orderId: this.param.id,
                }
            };
            http.commonPost(url, body).then((res) => {
                this.$dialog.toast({
                    mes: 'success',
                    timeout: 1500,
                    icon: 'success'
                });
                this.param.show = false;
                this.$emit("detail");

            }).catch((err) => {});
        },

    },
    created() {

    }
}
</script>
<style>
</style>
