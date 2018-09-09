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
        <yd-accordion accordion>
            <yd-accordion-item title="商品信息">
                <div style="padding: .24rem;">
                    <yd-list theme="1" slot="list">
                        <div class="goodsBox" v-for="item, key in goodsList" :key="key">
                            <p><span>品种:</span> <span>{{item.breedName}}</span></p>
                            <p><span>产地:</span> <span>{{item.location | province}}</span></p>
                            <p><span>规格:</span> <span>{{item.spec}}</span></p>
                            <p><span>单价:</span> <span>
                                <input type="text" v-model="item.price">
                            </span></p>
                            <p><span>数量:</span> <span>
                                <input type="text" v-model="item.number" > 
                            </span></p>
                        </div>
                    </yd-list>
                    <div class="goodsBox">
                        <p><span>运费:</span>
                            <span>
                                <input type="text" v-model="orderInfo.freight"> 
                            </span>
                        </p>
                        <p><span>杂费:</span>
                            <span>
                                <input type="text" v-model="orderInfo.incidentals"> 
                            </span>
                        </p>
                        <p><span>优惠金额:</span>
                            <span>
                                <input type="text" v-model="orderInfo.preferential"> 
                            </span>
                        </p>
                    </div>
                </div>
            </yd-accordion-item>
            <yd-accordion-item title="分期信息">
                <div style="padding: .24rem;">
                    <yd-list theme="1" slot="list">
                        <div class="goodsBox" v-for="item, key in stageList" :key="key">
                            <i class="icon iconfont icon-cuowuguanbiquxiao-xianxingyuankuang" @click="delStage(key)"></i>
                            <p><span>分期金额:</span> <span>
                                <input type="text" v-model="item.amount">
                            </span></p>
                            <p><span>付款时间:</span>
                                <span style="height: 2em;border: 1px solid #d7dde4;width:40%;" @click="selectPayTime(item,key)">{{item.orderStatus | orderDescript}}</span>
                            </p>
                            <p><span>额外支付时间:</span> <span>
                                <input type="text" v-model="item.extra" > 
                            </span></p>
                            <p><span>分期原因:</span> <span>
                                <input type="text" v-model="item.description" @click="selectPayDescription(item,key)" readonly> 
                            </span></p>
                            <p><span>备注:</span> <span>
                                <yd-textarea style="border:1px solid #d7dde4" slot="right" v-model="item.comment" maxlength="100"></yd-textarea>
                            </span></p>
                        </div>
                    </yd-list>
                    <yd-button size="large" type="primary" @click.native="addStage">添加分期</yd-button>
                    <div style="height:2em;line-height:1.5;">订单总金额：{{total}}</div>
                    <div style="height:2em;line-height:1.5;">分期总金额：{{stageTotal}}</div>
                    <div style="height:2em;line-height:1.5;">分期剩余金额：{{restTotal}}</div>
                </div>
            </yd-accordion-item>
            <yd-accordion-item title="合同附件" open>
                <div style="padding: .24rem;">
                    <upload-img :param="imageParam" :imageArray="contractFiles" @postUrl="getImgUrl"></upload-img>
                </div>
            </yd-accordion-item>
        </yd-accordion>
        <yd-popup v-model="show.slideBar" position="right" width="70%">
            <!-- 选择分期付款时间 -->
            <select-pay-time v-if="show.payTime" @selectPayTime="getPayTime"></select-pay-time>
            <!-- 选择分期原因 -->
            <select-pay-description v-if="show.payDescription" @selectPayDescription="getPayDescription"></select-pay-description>
        </yd-popup>
        <!-- 选择客户 -->
        <yd-popup v-model="customerParam.show" position="right" width="70%">
            <customer-list @customer="setCustomer" :param="customerParam"></customer-list>
        </yd-popup>
        <yd-cityselect v-model="showAddress" :callback="selectAddress" :items="district"></yd-cityselect>
        <yd-tabbar slot="tabbar">
            <div class="bottom">
                <div class="button" @click="updateOrder">提交</div>
            </div>
        </yd-tabbar>
    </yd-layout>
</template>
<script>
import http from '../../../libs/httpService.js'
import stringUtil from '../../../libs/stringUtil.js'
import mathUtil from '../../../libs/mathUtil.js'
import customerList from '../../commonPlugin/customerList.vue'
import uploadImg from '../../../common/upload/uploadImg.vue'
import selectPayTime from '../../slideBar/selectPayTime.vue'
import selectPayDescription from '../../slideBar/selectPayDescription.vue'
import District from '../../commonPlugin/address.json';
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
            total() {
                let sum = 0;
                for (let i = 0; i < this.goodsList.length; i++) {
                    sum = mathUtil.add(sum, mathUtil.mul(this.goodsList[i].number, this.goodsList[i].price));
                }
                sum = mathUtil.add(sum, this.orderInfo.freight);
                sum = mathUtil.add(sum, this.orderInfo.incidentals);
                sum = mathUtil.sub(sum, this.orderInfo.preferential);
                return sum;
            },
            stageTotal: function() {
                let sum = 0;
                for (let i = 0; i < this.stageList.length; i++) {
                    sum = mathUtil.add(sum, this.stageList[i].amount);
                }

                return sum;
            },
            restTotal: function() {
                return mathUtil.sub(this.total, this.stageTotal);
            }
        },
        components: {
            customerList,
            uploadImg,
            selectPayTime,
            selectPayDescription
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
            selectPayTime(item, index) {
                this.show.slideBar = true;
                this.show.payTime = true;
                this.payTimeIndex = index;
            },
            getPayTime(item) {
                this.stageList[this.payTimeIndex].orderStatus = item.key;
                this.clearShow();
            },
            selectPayDescription(item, index) {
                this.show.slideBar = true;
                this.show.payDescription = true;
                this.payDescriptionIndex = index;
            },
            getPayDescription(item) {
                this.stageList[this.payDescriptionIndex].description = item;
                this.clearShow();
            },
            clearShow() {
                this.show.slideBar = false;
                this.show.payTime = false;
                this.show.payDescription = false;
            },
            addStage() {
                this.stageList.push({
                    amount: 0,
                    orderStatus: 20,
                    extra: 0,
                    description: '',
                    comment: '',
                    validate: 0
                });
            },
            delStage(index) {
                this.stageList.splice(index, 1);
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
            formatOrderParam() {
                let order = this.orderInfo;
                let goodsList = [];
                let stageList = [];
                let contractList = [];
                let body = {
                    id: order.id,
                    customer: order.customer,
                    customerName: order.customerName,
                    consignee: order.consignee,
                    consigneePhone: order.consigneePhone,
                    consigneeAddr: order.consigneeAddr,
                    country: order.country,
                    province: order.province,
                    city: order.city,
                    district: order.district,
                    freight: order.freight,
                    incidentals: order.incidentals,
                    preferential: order.preferential,
                    //后台要这些数据，不知道为什么
                    type: order.type,
                    tradeTime: order.tradeTime
                }
                for (let i = 0; i < order.goods.length; i++) {
                    let item = order.goods[i];
                    let goods = {
                        id: item.id, //这个id是商品ID
                        breedId: item.breedId,
                        breedName: item.breedName,
                        quality: item.quality,
                        location: item.location,
                        spec: item.spec,
                        number: item.number,
                        price: item.price,
                        costPrice: item.costPrice,
                        unit: item.unit,
                        sourceType: item.sourceType
                    }

                    goodsList.push(goods);
                }
                for (let i = 0; i < order.stages.length; i++) {
                    let item = order.stages[i];
                    let stage = {
                        orderStatus: item.orderStatus,
                        amount: item.amount,
                        extra: item.extra,
                        description: item.description,
                        comment: item.comment,
                        validate: item.validate
                    }
                    stageList.push(stage);
                }
                contractList = this.contractFiles;
                body.goodsList = goodsList;
                body.stagesList = stageList;
                body.filesList = contractList;
                return body;

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
                body.biz_param = this.formatOrderParam();
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
