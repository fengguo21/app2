<template>
    <yd-layout>
        <yd-navbar slot="navbar" :title="title">
            <yd-icon name="shangyiyehoutuifanhui" slot="left" size='.5rem' @click.native="goBack" custom></yd-icon>
        </yd-navbar>
        <div class="titleBar">
            <div class="title">
                基本信息
            </div>
        </div>
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left"> 开票公司：</span>
                <span slot="left">{{result.invoiceCompany}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">开票性质：</span>
                <span slot="left">{{result.invoiceType | invoiceType}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">申请日期：</span>
                <span slot="left">{{result.invoiceDate}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">购货单位名称：</span>
                <span slot="left">{{result.customerName}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">纳税人识别号：</span>
                <span slot="left">{{result.taxId}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">购货方财务电话：</span>
                <span slot="left">{{result.financePhone}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">购货单位地址：</span>
                <span slot="left" style="white-space:normal">{{result.provinceName}}{{result.cityName}}{{result.districtName}}{{result.address}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">开户银行：</span>
                <span slot="left">{{result.taxBank}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">开户号：</span>
                <span slot="left">{{result.bankAccount}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">回款情况：</span>
                <span slot="left">{{result.cashedStatus == 0 ? "未回款" : "已回款"}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">回款单位：</span>
                <span slot="left">{{result.cashedCompany}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">邮寄联系人：</span>
                <span slot="left">{{result.mailContact}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">邮寄电话：</span>
                <span slot="left">{{result.mailPhone}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">邮寄地址：</span>
                <span slot="left" style="white-space:normal">{{result.mailProvinceName}}{{result.mailCityName}}{{result.mailDistrictName}}{{result.mailAddress}}</span>
            </yd-cell-item>
        </yd-cell-group>
        <yd-accordion accordion>
            <yd-accordion-item title="开票明细" open>
                <div style="padding: .24rem;">
                    <yd-list theme="4">
                        <div class="listLi" v-for="item in result.items">
                            <p><span>品种:</span> <span>{{item.breedName}}</span></p>
                            <p><span>单位:</span> <span>{{item.unit}}</span></p>
                            <p><span>数量:</span> <span>{{item.number}}</span></p>
                            <p><span>单价:</span> <span>{{item.price}}</span></p>
                            <p><span>规格:</span> <span>{{item.spec}}</span></p>
                        </div>
                    </yd-list>
                </div>
            </yd-accordion-item>
        </yd-accordion>
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left"> 开票信息：</span>
                <span slot="left"><img v-for="item in invoiceInfos" :src="item" style="width:90px"></span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">营业执照：</span>
                <span slot="left"><img v-for="item in businessLicenses" :src="item" style="width:90px"></span>
            </yd-cell-item>
        </yd-cell-group>
        <div v-if="!!result.record">
            <div class="titleBar">
                <div class="title">
                    物流信息
                </div>
            </div>
            <yd-grids-group :rows="2" item-height="60px">
                <yd-grids-item>
                    <span slot="else">物流公司：{{result.record.lcompanyName}}</span>
                </yd-grids-item>
                <yd-grids-item>
                    <span slot="else" style="white-space:normal">物流单号：{{result.record.logisticsNo}}</span>
                </yd-grids-item>
            </yd-grids-group>
            <yd-list theme="4">
                <div class="listLi" v-for="item in result.record.details">
                    <p><span>票号:</span> <span>{{item.no}}</span></p>
                    <p><span>图片:</span> <span><img :src="item.img" style="width:90px"></span></p>
                </div>
            </yd-list>
        </div>
        <yd-tabbar slot="tabbar">
            <div class="bottom">
                <div class="button" v-if="flag==0&&result.dataStatus==-1" @click="edit">编辑</div>
                <div class="button" v-if="flag==0&&result.dataStatus==0" @click="apply">申请审核</div>
                <div class="button" v-if="flag==0&&result.dataStatus==-1" @click="apply">重新申请审核</div>
                <div class="button" v-if="flag==1&&result.dataStatus==1" @click="managerAudit">主管审核</div>
                <div class="button" v-if="flag==2&&result.dataStatus==2" @click="makeoutInvoice">开票</div>
                <div class="button" v-if="flag==2&&result.dataStatus==2" @click="rejectInvoice">拒绝开票</div>
            </div>
        </yd-tabbar>
        <audit-invoice :param="managerAuditParam" v-if="managerAuditParam.show" @detail="loadDetail"></audit-invoice>
        <reject-invoice :param="rejectInvoiceParam" v-if="rejectInvoiceParam.show" @detail="loadDetail"></reject-invoice>
        <send-invoice :param="sendInvoiceParam" v-if="sendInvoiceParam.show" @detail="loadDetail"></send-invoice>
    </yd-layout>
</template>
<script>
import http from '../../../libs/httpService.js'
import stringUtil from '../../../libs/stringUtil.js'
import auditInvoice from './operation/auditInvoice.vue'
import rejectInvoice from './operation/rejectInvoice.vue'
import sendInvoice from './operation/sendInvoice.vue'
export default {
    data() {
            return {
                flag: "",
                id: "",
                title: '开票详情',
                result: {},
                invoiceInfos: [],
                businessLicenses: [],
                managerAuditParam: {
                    show: false,
                    bizId: "",
                    validate: "",
                    description: ""

                },
                rejectInvoiceParam: {
                    show: false,
                    bizId: ""
                },
                sendInvoiceParam: {
                    show: false,
                    invoiceRequestId: ''
                },
            }
        },
        computed: {

        },
        components: {
            rejectInvoice,
            auditInvoice,
            sendInvoice
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
                    biz_module: 'erpOrderInvoiceService',
                    biz_method: 'queryInvoiceRequestById',
                    biz_param: {
                        id: this.id,
                    }
                };
                http.commonPost(url, body).then((res) => {
                    let result = res.biz_result;
                    this.result = result;
                    this.invoiceInfos = result.invoiceInfo == "" ? [] : result.invoiceInfo.split(",");
                    this.businessLicenses = result.businessLicense == "" ? [] : result.businessLicense.split(",");
                }).catch((err) => {});
            },

            edit() {
                this.$router.push('/editInvoice/' + this.id);
            },

            apply() {
                let url = http.urlCommon + http.apiUrl.most;
                let body = {
                    biz_module: 'erpOrderInvoiceService',
                    biz_method: 'orderInvoiceSubmit',
                    biz_param: {
                        requestId: this.id,
                    }
                };
                http.commonPost(url, body).then((res) => {
                    let result = res.biz_result;
                    this.$dialog.toast({
                        mes: 'success',
                        timeout: 1500,
                        icon: 'success'
                    });
                    this.result.dataStatus = 1;

                }).catch((err) => {});
            },
            managerAudit() {
                this.managerAuditParam.show = true;
                this.managerAuditParam.bizId = this.id;
            },
            makeoutInvoice() {
                this.sendInvoiceParam.show = true;
                this.sendInvoiceParam.invoiceRequestId = this.id;
            },
            rejectInvoice() {
                this.rejectInvoiceParam.show = true;
                this.rejectInvoiceParam.bizId = this.id;
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
