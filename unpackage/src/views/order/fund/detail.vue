<template>
    <yd-layout>
        <yd-navbar slot="navbar" :title="title">
            <yd-icon name="shangyiyehoutuifanhui" slot="left" size='.5rem' @click.native="goBack" custom></yd-icon>
        </yd-navbar>
        <div class="titleBar">
            <div class="title">
                基本详情
            </div>
        </div>
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">订单ID：</span>
                <span slot="left">{{info.bizId}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">支付类型：</span>
                <span slot="left">{{info.type == 1?"收款":"付款"}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">支付名称：</span>
                <span slot="left">{{info.payName}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">用户名：</span>
                <span slot="left">{{info.payUserName}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">账号：</span>
                <span slot="left">{{info.payNumber}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">支付金额：</span>
                <span slot="left">{{info.amount}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">创建时间：</span>
                <span slot="left">{{info.ctime}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">备注：</span>
                <span slot="left" style="white-space:normal">{{info.comment}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left"> 图片：</span>
                <span slot="left"><img v-for="item in info.images" :src="item" style="width:90px"></span>
            </yd-cell-item>
        </yd-cell-group>
        <finance-confirm :param="financeParam" v-if="financeParam.show" @detail="loadDetail"></finance-confirm>
        <confirm-receive :param="customerConfirmParam" v-if="customerConfirmParam.show" @detail="loadDetail"></confirm-receive>
        <yd-tabbar slot="tabbar">
            <div class="bottom">
                <div class="button" v-if="flag==2&&info.validate==1&&info.type==1" @click="audit()">审核收款</div>
                <div class="button" v-if="flag==2&&info.validate==1&&info.type==0" @click="audit()">确认付款</div>
                <div class="button" v-if="info.type==0&&info.pr==0&&info.validate==2" @click="customerConfirm">客户确认收款</div>
                <div class="button" v-if="flag==2&&info.bizType == 'order_cancel_refund'&&info.validate==0" @click="">确认退款</div>
            </div>
        </yd-tabbar>
    </yd-layout>
</template>
<script>
import http from '../../../libs/httpService.js'
import stringUtil from '../../../libs/stringUtil.js'
import financeConfirm from './operation/financialConfirm.vue'
import confirmReceive from './operation/confirmReceive.vue'

export default {
    data() {
            return {
                id: '',
                flag: '',
                title: '收付款详情',
                info: {},
                financeParam: {
                    show: false,
                    id: "",

                },
                customerConfirmParam: {
                    show: false,
                    id: "",
                }
            }
        },
        computed: {

        },
        components: {
            financeConfirm,
            confirmReceive
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {

            goBack() {
                let _self = this;
                window.history.go(-1);
            },
            loadDetail() {
                let url = http.urlCommon + http.apiUrl.most;
                let body = {
                    biz_module: 'payStagesFundService',
                    biz_method: 'getById',
                    biz_param: {
                        id: this.id,
                    }
                };
                http.commonPost(url, body).then((res) => {
                    this.info = res.biz_result;

                }).catch((err) => {});
            },
            audit() {
                this.financeParam.id = this.info.id;
                this.financeParam.show = true;
            },
            customerConfirm() {
                this.customerConfirmParam.id = this.info.id;
                this.customerConfirmParam.show = true;
            }

        },
        created() {
            [this.id, this.flag] = stringUtil.parsePath(this.$route.fullPath);
            this.loadDetail();
        }

}
</script>
<style lang="less" scoped>
.titleBar {
    .title {
        margin-top: 10px;
        line-height: 40px;
        color: #666;
        font-size: 20px;
        padding: 0 10px;
    }
}

.bottom {
    width: 100%;
    display: flex;
    text-align: center;
    color: #666;
    line-height: .8rem;
    .button {
        flex: 1;
    }
}

.listLi {
    margin-left: 10px;
    line-height: 30px;
}
</style>
