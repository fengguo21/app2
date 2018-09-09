<!-- 公共的订单处理界面 -->
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
                <yd-button slot="right" type="primary" @click.native="pass">{{passname}}</yd-button>
                <yd-button slot="right" type="warning" @click.native="reject">{{rejectname}}</yd-button>
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
            result: '',
            description: '',
            passname: '',
            rejectname: '',
        }
    },
    components: {

    },
    methods: {
        init() {
            this.passname = this.param.passname ? this.param.passname : "通过";
            this.rejectname = this.param.rejectname ? this.param.rejectname : "不通过";
            this.param.passname = "";
            this.param.rejectname = "";
        },
        pass() {
            this.result = 1;
            this.confirm();
        },
        reject() {
            this.result = 0;
            this.confirm();
        },
        confirm() {
            let url = http.urlCommon + http.apiUrl.most;
            let body = {
                biz_module: 'flowService',
                biz_method: 'taskComplete',
                biz_param: {
                    taskId: this.param.taskId,
                    result: this.result,
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
                this.$emit("query");

            }).catch((err) => {});
        }

    },
    created() {
        this.init();
    }
}
</script>
<style>
</style>
