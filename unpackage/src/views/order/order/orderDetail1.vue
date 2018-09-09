<template>
    <div class="supplierDetail">
        <detailsLayout :showMore="true" :funcs="funcs" :moreFun="moreFun" :title="title">
            <yd-scrolltab>
                <yd-scrolltab-panel label="基本信息" icon="icon iconfont icon-xinxi-xianxingyuankuang" active>
                    <main-info v-if="orderInfo.id" :param="orderInfo"></main-info>
                </yd-scrolltab-panel>
                <yd-scrolltab-panel label="商品列表" icon="icon iconfont icon-shangpin-xianxing">
                    <goods-info v-if="orderInfo.id" :list="goodsList"></goods-info>
                </yd-scrolltab-panel>
                <yd-scrolltab-panel label="分期列表" icon="icon iconfont icon-caiwu-xianxing">
                    <stages-info v-if="orderInfo.id" :list="stageList" :currency="orderInfo.currency"></stages-info>
                </yd-scrolltab-panel>
                <yd-scrolltab-panel label="待采购" icon="icon iconfont icon-caigou-xianxing">
                    <orderlink-info :id="orderId"></orderlink-info>
                </yd-scrolltab-panel>
                <yd-scrolltab-panel label="补充合同" icon="icon iconfont icon-qianshoushenpitongguo-xianxing">
                    <contract-info :id="orderId"></contract-info>
                </yd-scrolltab-panel>
                <yd-scrolltab-panel label="售后" icon="icon iconfont icon--kefu-xianxing">
                    <aftersale-info :id="orderId"></aftersale-info>
                </yd-scrolltab-panel>
                <yd-scrolltab-panel label="订单文件" icon="icon iconfont icon-danju-xianxing">
                    <order-file v-if="orderInfo.id" :param="orderInfo"></order-file>
                </yd-scrolltab-panel>
            </yd-scrolltab>
        </detailsLayout>
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
    </div>
</template>
<script>
import http from '../../../libs/httpService.js'
import stringUtil from '../../../libs/stringUtil.js'
import detailsLayout from "../../../components/detailsLayout.vue"
import mainInfo from "./detail/mainInfo.vue"
import goodsInfo from "./detail/goodsList.vue"
import stagesInfo from "./detail/stageList.vue"
import orderlinkInfo from "./detail/orderLinkList1.vue"
import contractInfo from "./detail/contractList1.vue"
import aftersaleInfo from "./detail/afterSalesList1.vue"
import orderFile from "./detail/orderFile.vue"
//一些关于订单的操作
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
                //所有的功能
                funcsList: [{
                    label: '编辑',
                    callback: () => {
                        this.$router.push('/editOrder/' + this.orderId);
                    },
                    icon: "",
                    condition: () => {
                        return this.flag == 0 && (this.orderInfo.validate == 0 || this.orderInfo.validate == -2) && this.orderInfo.orderStatus !== -1;
                    }

                }, {
                    label: '审核记录',
                    callback: () => {
                        this.showRecord()
                    },
                    icon: "",
                    condition: () => {
                        return this.orderInfo.validate != 0;
                    }
                }, {
                    label: '申请审核',
                    callback: () => {
                        this.applyValidate(1)
                    },
                    icon: "",
                    condition: () => {
                        return this.flag == 0 && this.orderInfo.validate == 0 && (this.orderInfo.orderStatus == 0 || this.orderInfo.orderStatus == 70) && this.orderInfo.cancel == 0;
                    }
                }, {
                    label: '重新申请审核',
                    callback: () => {
                        this.applyValidate(2)
                    },
                    icon: "",
                    condition: () => {
                        return this.flag == 0 && this.orderInfo.validate == -2 && (this.orderInfo.orderStatus == 0 || this.orderInfo.orderStatus == 70) && this.orderInfo.cancel == 0;
                    }
                }, {
                    label: '主管审核',
                    callback: () => {
                        this.auditOrder()
                    },
                    icon: "",
                    condition: () => {
                        return this.flag == 1 && this.orderInfo.validate == 1;
                    }
                }, {
                    label: '申请发货',
                    callback: () => {
                        this.applySendGoods()
                    },
                    icon: "",
                    condition: () => {
                        return this.flag == 0 && this.orderInfo.type == 1 && this.orderInfo.taskKey == 'order_send';
                    }
                }, {
                    label: '收货入库',
                    callback: () => {
                        this.inStorage()
                    },
                    icon: "",
                    condition: () => {
                        return this.flag == 0 && this.orderInfo.type == 0 && this.orderInfo.taskKey == 'order_send';
                    }
                }, {
                    label: '收货',
                    callback: () => {
                        this.confirmReceive()
                    },
                    icon: "",
                    condition: () => {
                        return this.flag == 0 && this.orderInfo.type == 1 && this.orderInfo.orderStatus == 50;
                    }
                }, {
                    label: '质量合格',
                    callback: () => {
                        this.qualityQualified()
                    },
                    icon: "",
                    condition: () => {
                        return this.flag == 0 && this.orderInfo.orderStatus == 60 && (this.orderInfo.logistics == 3 || this.orderInfo.logistics == 2);
                    }
                }, {
                    label: '补充合同',
                    callback: () => {
                        this.addContract()
                    },
                    icon: "",
                    condition: () => {
                        return this.flag == 0 && ((this.orderInfo.orderStatus == 40 && this.orderInfo.taskKey == 'order_send') || this.orderInfo.orderStatus == 60 && (this.orderInfo.logistics == 3 || this.orderInfo.logistics == 2));
                    }
                }, {
                    label: '售后申请',
                    callback: () => {
                        this.applyAfterSales()
                    },
                    icon: "",
                    condition: () => {
                        return this.flag == 0 && this.orderInfo.orderStatus == 60 && (this.orderInfo.logistics == 3 || this.orderInfo.logistics == 2);
                    }
                }, {
                    label: '申请开票',
                    callback: () => {
                        this.applyInvoice()
                    },
                    icon: "",
                    condition: () => {
                        return this.flag == 0 && this.orderInfo.orderStatus == 70 && this.orderInfo.type == 1 && this.orderInfo.invoice == 0;
                    }
                }],
                //不同的条件有不同的功能
                funcs: [],
                moreFun: [],
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
            }
        },
        computed: {

        },
        components: {
            detailsLayout,
            mainInfo,
            goodsInfo,
            stagesInfo,
            orderlinkInfo,
            contractInfo,
            aftersaleInfo,
            orderFile,
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

        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {
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
            },
            //获取功能列表
            getFuncs() {
                for (let i = 0; i < this.funcsList.length; i++) {
                    let item = this.funcsList[i];
                    let condition = item.condition;
                    if (!!condition()) {
                        this.funcs.push(item);
                    }
                }
                console.log(this.funcs);
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
                    this.getFuncs();

                }).catch((err) => {});
            },
        },
        created() {
            [this.orderId, this.flag] = stringUtil.parsePath(this.$route.fullPath);
            this.loadDetail();
        }

}
</script>
<style lang="less" scoped>
.supplierDetail {
    .background {
        background-color: #000 !important;
    }
    .contain {
        padding: 20px 20px;
        background-color: #f3f3f3;
        text-align: left;
        &>div {
            text-align: left;
            .yd-radio {
                margin: 0 0 10px;
                display: inline-block;
                width: 49%;
            }
        }
    }
    .comButton {
        display: flex;
        .button {
            text-align: center;
            background-color: #FF4949;
            flex: 1;
            line-height: 45px;
            &:last-child {
                background-color: #CCCCCC;
            }
        }
    }
    .yd-scrolltab-item {
        padding: 0;
    }
}
</style>
