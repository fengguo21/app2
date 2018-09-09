<template>
    <yd-popup v-model="param.show" position="right" width="80%">
        <yd-cell-group>
            <yd-cell-item arrow type="label">
                <span slot="left">入库方式：</span>
                <select slot="right" v-model="logistics.virtual">
                    <option :value="0">直接发给客户</option>
                    <option :value="1">先入库再发货</option>
                </select>
            </yd-cell-item>
        </yd-cell-group>
        <div class="box" v-for="item in goodsList" :key="item.id">
            <p>
                <span><yd-checkbox v-if="item._disabled" disabled></yd-checkbox>
            <yd-checkbox v-else v-model="item._checked">{{item._checked?"已选":"未选"}}</yd-checkbox></span>
            </p>
            <p><span>品种:</span> <span>{{item.breedName}}</span></p>
            <p><span>数量:</span> <span>{{item.number}}{{item.unit | unit("cn")}}</span></p>
            <p><span>是否已入库:</span> <span>{{!!item.stockInItemId?"已入库":"未入库"}}</span></p>
        </div>
        <yd-cell-group v-if="logistics.virtual==1">
            <yd-cell-item arrow type="label">
                <span slot="left">发货方式：</span>
                <select slot="right" v-model="logistics.way">
                    <option :value="0">第三方物流</option>
                    <option :value="1">包车自运</option>
                </select>
            </yd-cell-item>
            <yd-cell-item arrow>
                <span slot="left">发货时间：</span>
                <yd-datetime type="datetime" v-model="logistics.deliveryTime" slot="right"></yd-datetime>
            </yd-cell-item>
            <!-- 第三方物流 -->
            <div v-if="logistics.way==0">
                <yd-cell-item arrow>
                    <span slot="left">物流公司：</span>
                    <select slot="right" v-model="logistics.logistics">
                        <option v-for="express in expressList" :value="express.id + ',' + express.name +','+express.code">{{express.name}}</option>
                    </select>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">物流单号：</span>
                    <input slot="right" type="text" v-model="logistics.logisticsNo">
                </yd-cell-item>
            </div>
            <!-- 包车自运 -->
            <div v-if="logistics.way==1">
                <yd-cell-item>
                    <span slot="left">司机姓名：</span>
                    <input slot="right" type="text" v-model="logistics.driverName">
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">身份证号：</span>
                    <input slot="right" type="text" v-model="logistics.driverPid">
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">联系方式：</span>
                    <input slot="right" type="text" v-model="logistics.driverTel">
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">车牌号：</span>
                    <input slot="right" type="text" v-model="logistics.vehicleNo">
                </yd-cell-item>
            </div>
            <yd-cell-item arrow type="label">
                <span slot="left">运费支付方式：</span>
                <select slot="right" v-model="logistics.freightType">
                    <option :value="0">我方支付</option>
                    <option :value="1">客户支付</option>
                </select>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">运费金额：</span>
                <input slot="right" type="number" v-model="logistics.freight">
            </yd-cell-item>
            <div>
                <yd-cell-item>
                    <span slot="left">物流凭证：</span>
                    <div slot="left" style="padding: .24rem 0;white-space:normal">
                        <upload-img :param="imageParam" :imageArray="images" @postUrl="getImgUrl"></upload-img>
                    </div>
                </yd-cell-item>
            </div>
            <yd-cell-item arrow>
                <span slot="left">仓库地址：</span>
                <select slot="right" v-model="stock.stock">
                    <option v-for="storage in storageList" :value="storage.id + ',' + storage.name">{{storage.name}}</option>
                </select>
            </yd-cell-item>
            <yd-cell-item arrow>
                <span slot="left">入库时间：</span>
                <yd-datetime type="datetime" v-model="stock.inTime" slot="right"></yd-datetime>
            </yd-cell-item>
        </yd-cell-group>
        <yd-button size="large" type="primary" @click.native="confirmInstock">提交</yd-button>
    </yd-popup>
</template>
<script>
import Vue from 'vue'
import http from '../../../../libs/httpService.js'
import dateUtil from '../../../../libs/dateUtil.js'
import uploadImg from '../../../../common/upload/uploadImg.vue'
export default {
    props: ["param"],
    data() {
        return {
            expressList: [],
            storageList: [],
            order: {},
            goodsList: [{
                id: 1
            }], //采购单对应的销售单列表
            logistics: {
                virtual: 1,
                way: 0,
                logistics: '', //物流公司id,name,code
                logisticsNo: '',
                driverName: '',
                driverPid: '',
                driverTel: '',
                vehicleNo: '',
                images: '',
                freightType: 0, //"运费支付 0/1 我方支付/客户支付",
                freight: 0, //运费金额
                deliveryTime: ''
            },
            stock: {
                stock: '', //仓库id,name
                id: '',
                name: '',
                no: '',
                inTime: ''
            },
            images: [],
            imageParam: {
                keyName: 'yaocai'
            },
        }
    },
    components: {
        uploadImg
    },
    methods: {
        getImgUrl(url) {
            this.images.push(url);
        },
        //获取物流公司列表
        getExpressList() {
            let url = http.urlCommon + http.apiUrl.most;
            let body = {
                biz_module: 'expressService',
                biz_method: 'queryExpressList',
                biz_param: {

                }
            };
            http.commonPost(url, body).then((res) => {
                this.expressList = res.biz_result.list;

            }).catch((err) => {});
        },
        //获取仓库列表
        getStorageList() {
            let url = http.urlCommon + http.apiUrl.most;
            let body = {
                biz_module: 'wmsDepotService',
                biz_method: 'queryDepot',
                biz_param: {
                    pageSize: 100
                }
            };
            http.commonPost(url, body).then((res) => {
                this.storageList = res.biz_result.list;

            }).catch((err) => {});
        },
        getDetail() {
            let url = http.urlCommon + http.apiUrl.most;
            let body = {
                biz_module: "erpOrderService",
                biz_method: "deliveryInBatchesView",
                biz_param: {
                    id: this.param.id
                }
            }
            http.commonPost(url, body).then(suc => {
                let result = suc.biz_result;
                this.order = result.order;
                this.goodsList = result.goodItems;

                for (let i = 0; i < this.goodsList.length; i++) {
                    let item = this.goodsList[i];
                    if (item.stockInItemId) {
                        Vue.set(item, "_disabled", true);
                    }
                    Vue.set(item, "_checked", false);

                }


            }, err => {

                console.log(err);
            })
        },
        //获取直接发货参数
        getBizParam1() {
            let errMsg = "";
            let list = [];
            let body = {
                orderId: this.order.id,
                virtual: this.logistics.virtual,
                goodItems: [],
            };
            for (let i = 0; i < this.goodsList.length; i++) {
                if (this.goodsList[i]._checked) {
                    list.push(this.goodsList[i]);
                }
            }
            if (list.length <= 0) {
                errMsg += "请至少选择一件商品！<br>";
            }
            if (errMsg) {
                this.$dialog.toast({
                    mes: errMsg,
                    timeout: 2500
                });
                return false;
            }
            body.goodItems = list;
            return body;

        },
        //获取入库参数
        getBizParam2() {
            let logis = this.logistics;
            let list = [];
            let stock = this.stock;
            let errMsg = "";
            let body = {
                orderId: this.order.id,
                virtual: this.logistics.virtual,
                goodItems: [],
                logistics: {
                    freightType: logis.freightType,
                    freight: logis.freight,
                    consignor: this.order.customer,
                    consignorName: this.order.consignee,
                    consignorPhone: this.order.consigneePhone,
                    consignorCountry: 7,
                    consignorProvince: this.order.province,
                    consignorCity: this.order.city,
                    consignorDistrict: this.order.district,
                    consignorAddress: this.order.consigneeAddr,
                    deliveryTime: "",
                    logisticDescription: "",
                },
                godownEntry: {
                    customerId: this.order.customer,
                    virtual: this.logistics.virtual,
                }
            };
            logis.images = "";
            if (this.images && this.images.length > 0) {
                logis.images = this.images.join(",");
            }
            for (let i = 0; i < this.goodsList.length; i++) {
                if (this.goodsList[i]._checked) {
                    list.push(this.goodsList[i]);
                }
            }
            if (logis.way == 0) {
                if (!logis.logistics) {
                    errMsg += "请选择物流公司！<br>";
                }
                if (!logis.logisticsNo) {
                    errMsg += "请填写物流单号！<br>";
                }

            } else if (logis.way == 1) {
                if (!logis.driverName) {
                    errMsg += "请填写司机姓名！<br>";
                }
                if (!logis.driverPid) {
                    errMsg += "请填写司机身份证号！<br>";
                }
                if (!logis.driverTel) {
                    errMsg += "请填写司机电话！<br>";
                }
                if (!logis.vehicleNo) {
                    errMsg += "请填写车牌号！<br>";
                }
            }
            if (!logis.deliveryTime) {
                errMsg += "请选择发货时间！<br>";
            }
            if (!logis.images) {
                errMsg += "请上传物流单凭证！<br>";
            }
            if (list.length <= 0) {
                errMsg += "请至少选择一件商品！<br>";
            }
            if (!stock.stock) {
                errMsg += "请选择仓库！<br>";
            }
            if (!stock.inTime) {
                errMsg += "请选择入库时间！<br>";
            }
            if (errMsg) {
                this.$dialog.toast({
                    mes: errMsg,
                    timeout: 2500
                });
                return false;
            }
            if (logis.way == 0) {
                body.logistics.logisticsMode = 0;
                body.logistics.logisticsCompany = logis.logistics.split(",")[0];
                body.logistics.logisticsCompanyName = logis.logistics.split(",")[1];
                body.logistics.logisticsCompanyCode = logis.logistics.split(",")[2];
                body.logistics.logisticsVoucher = logis.logisticsNo;
                body.logistics.images = logis.images;
            } else if (logis.way == 1) {
                body.logistics.logisticsMode = 1;
                body.logistics.driverName = logis.driverName;
                body.logistics.driverPid = logis.driverPid;
                body.logistics.driverTel = logis.driverTel;
                body.logistics.vehicleNo = logis.vehicleNo;
                body.logistics.images = logis.images;
            }
            body.logistics.deliveryTime = logis.deliveryTime;
            body.godownEntry.inTime = stock.inTime;
            body.godownEntry.depotType = "自营库存";
            body.godownEntry.depotId = stock.stock.split(",")[0];
            body.godownEntry.depotName = stock.stock.split(",")[1];
            body.goodItems = list;


            return body;

        },
        confirmInstock() {
            let bizParam = {};
            if (this.logistics.virtual == 0) { //直接发货
                bizParam = this.getBizParam1();
            } else if (this.logistics.virtual == 1) { //先入库再发货
                bizParam = this.getBizParam2();
            }
            if (!bizParam) {
                return;
            }
            let url = http.urlCommon + http.apiUrl.most;
            let body = {
                biz_module: "erpOrderService",
                biz_method: "purchasingStorage",
                biz_param: {

                }
            }
            body.biz_param = bizParam;
            http.commonPost(url, body).then((res) => {
                this.$dialog.toast({
                    mes: 'success',
                    timeout: 1500,
                    icon: 'success'
                });
                this.param.show = false;
                this.$emit("detail");

            }).catch((err) => {});

        },
    },
    created() {
        this.logistics.deliveryTime = dateUtil.formatDate(new Date(), 0, 4);
        this.stock.inTime = dateUtil.formatDate(new Date(), 0, 4);
        this.getExpressList();
        this.getStorageList();
        this.getDetail();
    }
}
</script>
<style scoped>
.box {
    padding: 10px;
    border: 1px solid #d7dde4;
}
</style>
