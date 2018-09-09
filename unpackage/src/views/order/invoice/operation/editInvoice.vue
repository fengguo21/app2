<template>
    <yd-layout>
        <yd-navbar slot="navbar" :title="title">
            <yd-icon name="shangyiyehoutuifanhui" slot="left" size='.5rem' @click.native="goBack" custom></yd-icon>
        </yd-navbar>
        <div class="titleBar">
            <div class="title">
                客户详情
            </div>
        </div>
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">客户名称：</span>
                <yd-input slot="right" v-model="orderInfo.customerName" :show-clear-icon="false" @click.native="customerParam.show = true" readonly></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">收/发货人：</span>
                <yd-input slot="right" v-model="orderInfo.consignee"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">收/发货人手机：</span>
                <yd-input slot="right" v-model="orderInfo.consigneePhone"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">收/发货地址：</span>
                <input slot="right" type="text" @click.stop="showAddress = true" v-model="address" readonly placeholder="请选择收货地址">
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">详细地址：</span>
                <yd-input slot="right" v-model="orderInfo.consigneeAddr"></yd-input>
            </yd-cell-item>
        </yd-cell-group>
        <yd-tabbar slot="tabbar">
            <div class="bottom">
                <div class="button" @click="updateOrder">提交</div>
            </div>
        </yd-tabbar>
    </yd-layout>
</template>
<script>
import http from '../../../../libs/httpService.js'
import stringUtil from '../../../../libs/stringUtil.js'
import mathUtil from '../../../../libs/mathUtil.js'
import uploadImg from '../../../../common/upload/uploadImg.vue'
import District from '../../../commonPlugin/address.json';
export default {
    data() {
            return {
                title: '编辑订单',
                customerParam: {
                    show: false
                },
                showAddress: false,
                address: '',
                district: District[0].c,
                //订单详情信息
                orderInfo: {},
                //商品信息
                goodsList: [],
                //分期信息
                stageList: [],
                show: {
                    slideBar: false,
                    payTime: false,
                    payDescription: false
                },
                //分期付款时间（节点）
                payTimeIndex: 0,
                //分期原因
                payDescriptionIndex: 0,
                //合同附件
                imageParam: {
                    keyName: 'yaocai'
                },
                contractFiles: [],
            }
        },
        computed: {

        },
        components: {
            uploadImg,

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
            selectAddress(ret) {
                this.address = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3;
                this.orderInfo.province = ret.itemValue1;
                this.orderInfo.city = ret.itemValue2;
                this.orderInfo.district = ret.itemValue3;
            },
            setCustomer(item) {
                this.orderInfo.customer = item.id;
                this.orderInfo.customerName = item.name;
                this.orderInfo.consignee = item.name;
                this.orderInfo.customerPhone = item.mainPhone;
                this.orderInfo.consigneePhone = item.mainPhone;
            },



            getImgUrl(url) {
                this.contractFiles.push(url);
            },
            loadDetail() {
                let url = http.urlCommon + http.apiUrl.most;
                let body = {
                    biz_module: 'erpOrderService',
                    biz_method: 'getOrderDetail',
                    biz_param: {
                        id: this.$route.fullPath.split('/')[2],
                    }
                };
                http.commonPost(url, body).then((res) => {
                    this.orderInfo = res.biz_result;
                    this.goodsList = res.biz_result.goods;
                    this.stageList = res.biz_result.stages;
                    let contracts = res.biz_result.contractList;
                    this.contractFiles = [];
                    for (let i = 0; i < contracts.length; i++) {
                        this.contractFiles.push(contracts[i].path);
                    }

                    this.address = res.biz_result.provinceName + ' ' + res.biz_result.cityName + ' ' + res.biz_result.districtName;


                }).catch((err) => {});
            },

            updateOrder() {
                this.loading = true;
                let url = http.urlCommon + http.apiUrl.most;
                let body = {
                    biz_module: "erpOrderService",
                    biz_method: "updateOrder",
                    biz_param: {

                    }
                }

                http.commonPost(url, body).then(suc => {
                    this.loading = false;
                    let result = suc.biz_result;
                    this.$dialog.toast({
                        mes: 'success',
                        timeout: 1500,
                        icon: 'success'
                    });
                    this.goBack();

                }, err => {
                    this.loading = false;
                    console.log(err);
                })

            },



        },
        created() {
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

.goodsBox {
    position: relative;
    background-color: #fff;
    padding: 10px;
    border-bottom: 1px solid black;
    p {
        line-height: 28px;
        font-size: 12px;
        display: flex;
        span:nth-child(1) {
            display: inline-block;
            width: 30%;
        }
        span:nth-child(2) {
            display: inline-block;
            width: 70%;
            input {
                height: 2em;
                border: 1px solid #d7dde4;
            }
        }
    }
    i {
        font-size: 30px;
        position: relative;
        top: -12px;
        left: 94%;
        color: red;
    }
}
</style>
