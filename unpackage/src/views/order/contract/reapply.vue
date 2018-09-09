<template>
    <yd-popup v-model="param.show" position="center" width="70%">
        <div style="padding:10px;box-sizing:border;">
            <div style="height:80px;text-align:center;font-size:16px;">
                <p>请确认您的补充合同信息已更改！</p>
                <p>是否确认重新申请补充合同？</p>
            </div>
            <div style="float:right;margin-bottom:10px">
                <yd-button slot="left" type="hollow" style="margin-right:10px;" @click.native="param.show=false">取消</yd-button>
                <yd-button slot="right" type="primary" @click.native="pass">申请</yd-button>
                <yd-button slot="right" type="warning" @click.native="reject">不申请</yd-button>
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
                biz_method: 'orderSContractReapply',
                biz_param: {
                    id: this.param.id,
                    validate: this.validate,

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
