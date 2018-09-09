<template>
    <yd-popup v-model="param.show" position="center" width="70%">
        <div style="padding:10px;box-sizing:border;">
            <yd-cell-group>
                <yd-cell-item>
                    <yd-textarea slot="right" maxlength="100" style="margin:10px" v-model="description"></yd-textarea>
                </yd-cell-item>
            </yd-cell-group>
            <div style="float:right;margin-bottom:10px">
                <yd-button slot="left" type="hollow" style="margin-right:10px;" @click.native="param.show=false">取消</yd-button>
                <yd-button slot="right" type="primary" @click.native="confirm">确定</yd-button>
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
            description: ""

        }
    },
    components: {

    },
    methods: {
        confirm() {
            let url = http.urlCommon + http.apiUrl.most;
            let body = {
                biz_module: 'erpOrderInvoiceService',
                biz_method: 'orderInvoiceDrawer',
                biz_param: {
                    bizId: this.param.bizId,
                    description: this.description,
                    validate: 0
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
