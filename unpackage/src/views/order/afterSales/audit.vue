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
                <yd-button slot="right" type="primary" @click.native="pass">通过</yd-button>
                <yd-button slot="right" type="warning" @click.native="reject">不通过</yd-button>
            </div>
        </div>
    </yd-popup>
</template>
<script>
import http from '../../../libs/httpService.js'

export default {
    props: ["param"],
    data() {
        return {
            validate: '',
            description: ''

        }
    },
    components: {

    },
    methods: {
        pass() {
            this.validate = 2;
            this.confirm();
        },
        reject() {
            this.validate = -2;
            this.confirm();
        },
        confirm() {
            let url = http.urlCommon + http.apiUrl.most;
            let body = {
                biz_module: 'orderFlowService',
                biz_method: 'orderAfterSalesGovernorValidate',
                biz_param: {
                    id: this.param.id,
                    validate: this.validate,
                    description: this.description,
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
        }

    },
    created() {

    }
}
</script>
<style>
</style>
