<template>
    <yd-popup v-model="param.show" position="center" width="70%">
        <div style="padding:10px;box-sizing:border;">
            <yd-cell-group>
                <yd-cell-item>
                    <yd-textarea slot="right" maxlength="100" style="margin:10px" v-model="param.description"></yd-textarea>
                </yd-cell-item>
            </yd-cell-group>
            <div style="float:right;margin-bottom:10px">
                <yd-button slot="left" type="hollow" style="margin-right:10px;" @click.native="param.show=false">取消</yd-button>
                <yd-button slot="right" type="primary" @click.native="pass">通过</yd-button>
                <yd-button slot="right" type="warning" @click.native="reject">不通过</yd-button>
            </div>
        </div>
    </yd-popup>
</template>
<script>
import http from '../../../../libs/httpService.js'
export default {
    props: ["param"],
    data() {
        return {


        }
    },
    components: {

    },
    methods: {
        pass() {
            this.param.validate = 1;
            this.submit();
        },
        reject() {
            this.param.validate = 0;
            this.submit();
        },
        submit() {
            let url = http.urlCommon + http.apiUrl.most;
            let body = {
                biz_module: 'erpOrderInvoiceService',
                biz_method: 'orderInvoiceApprove',
                biz_param: {
                    bizId: this.param.bizId,
                    description: this.param.description,
                    validate: this.param.validate
                }
            };
            http.commonPost(url, body).then((res) => {
                let result = res.biz_result;
                this.$dialog.toast({
                    mes: 'success',
                    timeout: 1500,
                    icon: 'success'
                });
                this.param.show = false;
                this.$emit("detail");

            }).catch((err) => {});
        }
    },
    created() {

    }
}
</script>
<style>
</style>
