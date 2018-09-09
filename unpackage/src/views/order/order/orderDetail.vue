<template>
    <yd-layout>
        <yd-navbar slot="navbar" :title="title">
            <yd-icon name="shangyiyehoutuifanhui" slot="left" size='.5rem' @click.native="goBack" custom></yd-icon>
            <!-- <yd-icon name="liebiaoshitucaidan" slot="right" size='.5rem' @click.native="showOperation" custom></yd-icon> -->
        </yd-navbar>
        <div class="titleBar">
            <div class="title">
                基本信息
            </div>
        </div>
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">订单ID：</span>
                <span slot="left">{{orderInfo.id}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">订单号：</span>
                <span slot="left">{{orderInfo.no}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">收货人：</span>
                <span slot="left">{{orderInfo.consignee}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">收货人手机：</span>
                <span slot="left">{{orderInfo.consigneePhone}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">收货人地址：</span>
                <span slot="left" style="white-space:normal">{{orderInfo.provinceName}}{{orderInfo.cityName}}{{orderInfo.districtName}}{{orderInfo.consigneeAddr}}</span>
            </yd-cell-item>
        </yd-cell-group>
        <yd-accordion accordion>
            <yd-accordion-item title="商品列表" open>
                <div style="padding: .24rem;">
                    <yd-list theme="4">
                        <yd-list-item v-for="item, key in goodsList" :key="key">
                            <img slot="img" :src="item.image | singleImg">
                            <span slot="title">{{item.breedName}}</span>
                            <yd-list-other slot="other">
                                <div>
                                    <span>{{item.price}}元*{{item.number}}{{item.unit | unit("cn")}}</span>
                                    <p><span>规格：</span>{{item.spec}}</p>
                                    <p><span>质量：</span>{{item.quality}}</p>
                                </div>
                                <div></div>
                            </yd-list-other>
                        </yd-list-item>
                    </yd-list>
                </div>
            </yd-accordion-item>
            <yd-accordion-item title="分期列表">
                <div style="padding: .24rem;">
                    <yd-list theme="4">
                        <div v-for="item, key in stageList" class="listLi">
                            <div>
                                <span v-if="item.extra==0">{{item.orderStatus | orderDescript}}立即支付{{item.amount}}{{orderInfo.currency | currency("cn")}}</span>
                                <span v-else>{{item.orderStatus | orderDescript}}{{item.extra}}天立即支付{{item.amount}}{{orderInfo.currency | currency("cn")}}</span>
                            </div>
                            <span>类型：{{item.type | payType}}</span>
                            <p><span>申请状态：</span>{{item.validate | stageValid}}</p>
                            <p><span>创建时间：</span>{{item.ctime}}</p>
                            <p><span>备注：</span>{{item.comment}}</p>
                            <p style="margin:1em 0;">
                                <yd-button v-if="isApplyStage(orderInfo,item)&&item.validate==0" type="primary" size="small" @click.native="applyStage(item)">申请审核</yd-button>
                                <yd-button v-if="isApplyStage(orderInfo,item)&&item.validate==3" type="primary" size="small" @click.native="applyStage(item)">重新申请审核</yd-button>
                            </p>
                        </div>
                    </yd-list>
                </div>
            </yd-accordion-item>
            <yd-accordion-item title="待采购">
                <div style="padding: .24rem;">
                    <order-link :id="orderId"></order-link>
                </div>
            </yd-accordion-item>
            <yd-accordion-item title="订单文件">
                <div style="padding: .24rem;">
                    <yd-cell-group>
                        <yd-cell-item>
                            <span slot="left">合同凭证：</span>
                            <span slot="left">
                                <img v-for="img in orderInfo.contractList" :src="img.path" style="width:90px">
                            </span>
                        </yd-cell-item>
                        <yd-cell-item>
                            <span slot="left">支付凭证：</span>
                            <span slot="left">
                                <img v-for="img in orderInfo.payPics" :src="img.path" style="width:90px">
                            </span>
                        </yd-cell-item>
                        <yd-cell-item>
                            <span slot="left">物流凭证：</span>
                            <span slot="left">
                                <img v-for="img in orderInfo.sendPics" :src="img.path" style="width:90px">
                            </span>
                        </yd-cell-item>
                    </yd-cell-group>
                </div>
            </yd-accordion-item>
            <yd-accordion-item title="补充合同">
                <div style="padding: .24rem;">
                    <contract :id="orderId"></contract>
                </div>
            </yd-accordion-item>
            <yd-accordion-item title="售后">
                <div style="padding: .24rem;">
                    <after-sales :id="orderId"></after-sales>
                </div>
            </yd-accordion-item>
        </yd-accordion>
        <yd-tabbar slot="tabbar">
            <div class="bottom">
                <div class="button" v-if="flag==0&&(orderInfo.validate==0||orderInfo.validate==-2)&&orderInfo.orderStatus!==-1" @click="edit">编辑</div>
                <div class="button" v-if="flag==0&&orderInfo.validate==0&&(orderInfo.orderStatus==0||orderInfo.orderStatus==70)&&orderInfo.cancel==0" @click="applyValidate(1)">申请审核</div>
                <div class="button" v-if="flag==0&&orderInfo.validate==-2&&(orderInfo.orderStatus==0||orderInfo.orderStatus==70)&&orderInfo.cancel==0" @click="applyValidate(2)">重新申请审核</div>
                <div class="button" v-if="orderInfo.validate!=0" @click="showRecord">审核记录</div>
                <div class="button" v-if="flag==1&&orderInfo.validate==1" @click="auditOrder">主管审核</div>
                <!-- 销售订单发货 -->
                <div class="button" v-if="flag==0&&orderInfo.type==1&&orderInfo.taskKey=='order_send'" @click="applySendGoods">申请发货</div>
                <!-- 采购订单入库 -->
                <div class="button" v-if="flag==0&&orderInfo.type==0&&orderInfo.taskKey=='order_send'" @click="inStorage">收货入库</div>
                <!-- 销售订单确认客户收货 -->
                <div class="button" v-if="flag==0&&orderInfo.type==1&&orderInfo.orderStatus==50" @click="confirmReceive">收货</div>
                <!-- 质量合格 -->
                <div class="button" v-if="flag==0&&orderInfo.orderStatus==60&&(orderInfo.logistics==3||orderInfo.logistics==2)" @click="qualityQualified">质量合格</div>
                <!-- 补充合同 -->
                <div class="button" v-if="flag==0&&((orderInfo.orderStatus==40&&orderInfo.taskKey=='order_send')||orderInfo.orderStatus==60&&(orderInfo.logistics==3||orderInfo.logistics==2))" @click="addContract">补充合同</div>
                <!-- 售后申请 -->
                <div class="button" v-if="flag==0&&orderInfo.orderStatus==60&&(orderInfo.logistics==3||orderInfo.logistics==2)" @click="applyAfterSales">售后申请</div>
                <!-- 申请开票 -->
                <div class="button" v-if="flag==0&&orderInfo.orderStatus==70&&orderInfo.type==1&&orderInfo.invoice==0" @click="applyInvoice">申请开票</div>
            </div>
        </yd-tabbar>
        <!-- 申请审核 -->
        <apply-validate v-if="applyValidateParam.show" :param="applyValidateParam" @detail="loadDetail"></apply-validate>
        <!-- 主管审核 -->
        <order-audit v-if="auditOrderParam.show" :param="auditOrderParam" @detail="loadDetail"></order-audit>
        <!-- 申请分期收付款 -->
        <apply-fund v-if="applyStageParam.show" :param="applyStageParam" @detail="loadDetail"></apply-fund>
        <!-- 申请发货 -->
        <apply-send v-if="applySendParam.show" :param="applySendParam" @detail="loadDetail"></apply-send>
        <!-- 入库 -->
        <instock v-if="inStorageParam.show" :param="inStorageParam" @detail="loadDetail"></instock>
        <!-- 确认收货 -->
        <confirm-receive-goods v-if="confirmReceiveParam.show" :param="confirmReceiveParam" @detail="loadDetail"></confirm-receive-goods>
        <!-- 补充合同 -->
        <supplemental-contract v-if="contractParam.show" :param="contractParam" @detail="loadDetail"></supplemental-contract>
        <!-- 售后 -->
        <after-sales-apply v-if="afterSalesParam.show" :param="afterSalesParam" @detail="loadDetail"></after-sales-apply>
        <!-- 开票 -->
        <invoice-apply v-if="invoiceParam.show" :param="invoiceParam" @detail="loadDetail"></invoice-apply>
        <record v-if="recordParam.show" :param="recordParam"></record>
        <operate v-if="operateParam.show" :param="operateParam"></operate>
    </yd-layout>
</template>
<script>
import http from '../../../libs/httpService.js'
import stringUtil from '../../../libs/stringUtil.js'
import orderLink from './detail/orderLinkList.vue'
import contract from './detail/contractList.vue'
import afterSales from './detail/afterSalesList.vue'
import applyValidate from '../slideBar/applyValidate.vue'
import orderAudit from './operation/orderAudit.vue'
import applyFund from './operation/applyFund.vue'
import applySend from './operation/applySend.vue'
import instock from './operation/instock.vue'
import confirmReceiveGoods from './operation/confirmReceiveGoods.vue'
import supplementalContract from './operation/supplementalContract.vue'
import afterSalesApply from './operation/afterSales.vue'
import invoiceApply from './operation/applyInvoice.vue'
import record from './operation/record.vue'
import operate from './operate.vue'
export default {
    data() {
            return {
                flag: "",
                orderId: "",
                title: '订单详情',
                //订单详情信息
                orderInfo: {},
                //商品信息
                goodsList: [],
                //分期信息
                stageList: [],
                applyValidateParam: {
                    show: false,
                    flag: '', //1申请，2重新申请
                    id: '',
                    description: ''
                },
                auditOrderParam: {
                    show: false,
                    id: '',
                    description: '',
                    validate: ''

                },
                applyStageParam: {
                    show: false,
                    bizId: "",
                    bizSubId: "",
                    currency: "",
                },
                applySendParam: {
                    show: false,
                    id: '',
                    description: ''
                },
                inStorageParam: {
                    show: false,
                    id: ""
                },
                confirmReceiveParam: {
                    show: false,
                    id: "",
                    logistics: []
                },
                contractParam: {
                    flag: 0,
                    show: false,
                    orderId: "",
                    goodsList: [],
                    total: "",
                },
                afterSalesParam: {
                    show: false,
                    orderId: "",
                    goodsList: []
                },
                invoiceParam: {
                    show: false,
                    orderId: ""
                },
                recordParam: {
                    show: false,
                    bizType: "order_validate",
                    bizId: "",
                },
                operateParam: {
                    show: false
                }
            }
        },
        computed: {

        },
        components: {
            orderLink,
            contract,
            afterSales,
            applyValidate,
            orderAudit,
            applyFund,
            applySend,
            instock,
            confirmReceiveGoods,
            supplementalContract,
            afterSalesApply,
            invoiceApply,
            record,
            operate
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {
            /*------分期列表方法--------*/
            //是否显示申请审核（申请付款）按钮
            isApplyStage(order, item) {
                //taskKey需要满足的条件
                let taskKeyAudit = order.taskKey == "order_validate" || order.taskKey == "order_pay" || order.taskKey == "order_send" || order.taskKey == "order_receive" || order.taskKey == "order_qa";
                //订单状态大于分期节点，已审核，是自己的订单
                return order.orderStatus >= item.orderStatus && order.validate == 2 && (taskKeyAudit || order.orderStatus == 70);
            },
            applyStage(item) {
                this.applyStageParam.currency = this.orderInfo.currency;
                this.applyStageParam.bizId = this.orderId;
                this.applyStageParam.bizSubId = item.id;
                this.applyStageParam.show = true;
            },
            goBack() {
                let _self = this;
                window.history.go(-1);
            },
            showOperation() {
                this.operateParam.show = true;
            },
            loadDetail() {
                let url = http.urlCommon + http.apiUrl.most;
                let body = {
                    biz_module: 'erpOrderService',
                    biz_method: 'getOrderDetail',
                    biz_param: {
                        id: this.orderId,
                    }
                };
                http.commonPost(url, body).then((res) => {
                    this.orderInfo = res.biz_result;
                    this.goodsList = res.biz_result.goods;
                    this.stageList = res.biz_result.stages;

                }).catch((err) => {});
            },
            edit() {
                this.$router.push('/editOrder/' + this.orderId);
            },
            applyValidate(flag) {
                this.applyValidateParam.id = this.orderId;
                this.applyValidateParam.flag = flag;
                this.applyValidateParam.show = true;
            },
            auditOrder() {
                this.auditOrderParam.id = this.orderId;
                this.auditOrderParam.show = true;
            },
            applySendGoods() {
                this.applySendParam.id = this.orderId;
                this.applySendParam.show = true;
            },
            inStorage() {
                this.inStorageParam.id = this.orderId;
                this.inStorageParam.show = true;
            },
            confirmReceive() {
                this.confirmReceiveParam.id = this.orderId;
                this.confirmReceiveParam.logistics = this.orderInfo.logisticses;
                this.confirmReceiveParam.show = true;
            },
            qualityQualified() {
                let url = http.urlCommon + http.apiUrl.most;
                let body = {
                    biz_module: 'erpOrderService',
                    biz_method: 'orderQualityQualified',
                    biz_param: {
                        orderId: this.orderId
                    }
                };
                http.commonPost(url, body).then((res) => {
                    this.$dialog.toast({
                        mes: 'success',
                        timeout: 1500,
                        icon: 'success'
                    });
                    this.loadDetail();
                }).catch((err) => {});
            },
            addContract() {
                this.contractParam.orderId = this.orderId;
                this.contractParam.total = this.orderInfo.total;
                this.contractParam.goodsList = [];
                let list = this.contractParam.goodsList;
                for (let i = 0; i < this.goodsList.length; i++) {
                    let item = this.goodsList[i];
                    list.push({
                        goodsId: item.id,
                        breedName: item.breedName,
                        price: item.price,
                        number: item.number,
                        newPrice: item.price,
                        newNumber: item.number,
                        unit: item.unit,
                        spec: item.spec,
                        quality: item.quality
                    });
                }
                this.contractParam.show = true;
            },
            applyAfterSales() {
                this.afterSalesParam.orderId = this.orderId;
                this.afterSalesParam.goodsList = this.goodsList;
                this.afterSalesParam.show = true;
            },
            applyInvoice() {
                this.invoiceParam.orderId = this.orderId;
                this.invoiceParam.show = true;
            },
            showRecord() {
                this.recordParam.bizId = this.orderId;
                this.recordParam.show = true;
            }
        },
        created() {
            [this.orderId, this.flag] = stringUtil.parsePath(this.$route.fullPath);
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
