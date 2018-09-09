<!-- 申请收付款（分期） -->
<template>
    <yd-popup v-model="param.show" position="right" width="80%">
        <yd-cell-group>
            <yd-cell-item arrow type="label">
                <span slot="left">国家：</span>
                <select slot="right" v-model="formData.payCountry" @change="changeCountry">
                    <option v-for="country in countryList" :value="country.id">{{country.cname}}</option>
                </select>
            </yd-cell-item>
            <!-- 国内支付方式 -->
            <div v-if="formData.payCountry==7">
                <yd-cell-item arrow type="label">
                    <span slot="left">支付方式：</span>
                    <select slot="right" v-model="formData.payWay">
                        <option value=""></option>
                        <option value="0">银行转账</option>
                        <option value="1">支付宝</option>
                        <option value="4">微信</option>
                        <option value="3">药款支付</option>
                    </select>
                </yd-cell-item>
                <div v-if="formData.payWay==0&&formData.payWay!==''">
                    <yd-cell-item>
                        <span slot="left">银行名称：</span>
                        <span slot="right">{{formData.payName}}</span>
                        <span slot="right"><yd-search :result="bankResult" fullpage v-model="bankValue" :item-click="itemClickHandler" :on-submit="submitHandler"></yd-search>
                        
                        </span>
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">支付分行：</span>
                        <span slot="right">{{formData.paySubName}}</span>
                        <span slot="right"><yd-search :result="subBankResult" fullpage v-model="subBankValue" :item-click="itemClickHandler2"></yd-search>
                        </span>
                    </yd-cell-item>
                </div>
                <yd-cell-item>
                    <span slot="left">用户名：</span>
                    <input slot="right" type="text" v-model="formData.payUserName" placeholder="请输入用户名">
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">账号：</span>
                    <input slot="right" type="text" v-model="formData.payNumber" placeholder="请输入账号">
                </yd-cell-item>
            </div>
            <!-- 国外支付方式 -->
            <div v-else>
                <yd-cell-item arrow type="label">
                    <span slot="left">支付方式：</span>
                    <select slot="right" v-model="formData.payWay">
                        <option value=""></option>
                        <option value="0">银行转账</option>
                        <option value="5">PayPal</option>
                        <option value="1">支付宝</option>
                    </select>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">形式发票：</span>
                    <input slot="right" type="text" v-model="formData.payNumber" placeholder="请输入">
                </yd-cell-item>
            </div>
            <yd-cell-item>
                <span slot="left">币种：</span>
                <span slot="right">{{formData.currency | currency('cn')}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">物流凭证：</span>
                <div slot="left" style="padding: .24rem 0;white-space:normal">
                    <upload-img :param="imageParam" :imageArray="images" @postUrl="getImgUrl"></upload-img>
                </div>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">备注：</span>
                <yd-textarea slot="right" maxlength="100" v-model="formData.comment"></yd-textarea>
            </yd-cell-item>
        </yd-cell-group>
        <div style="float:right">
            <yd-button type="hollow" @click.native="param.show=false">取消</yd-button>
            <yd-button type="primary" @click.native="confirm">确认</yd-button>
        </div>
    </yd-popup>
</template>
<script>
import http from '../../../../libs/httpService.js'
import uploadImg from '../../../../common/upload/uploadImg.vue'
export default {
    props: ["param"],
    data() {
        return {
            countryList: [],
            payWayList: ["银行转账", "支付宝", "平安", "药款宝", "微信", "PayPal"],
            images: [],
            imageParam: {
                keyName: 'yaocai'
            },
            formData: {
                bizId: this.param.bizId,
                bizSubId: this.param.bizSubId,
                payCountry: 7,
                payWay: "",
                payName: "", //当payWay=0(银行转账)并且payCountry=7时,表示银行名，否则就是payWay对应的文本
                paySubName: "", //当payWay=0(银行转账)时,表示支行名
                payUserName: "", //支付用户名
                payNumber: "", //（国内）支付账号，国外（形式发票）
                currency: this.param.currency, //货币类型
                comment: "",
                images: "" //图片
            },
            /*----选择银行总行的数据---*/
            bankValue: '', //用于从结果集中搜索银行
            bankResult: [], //根据bankValue从结果集allBankList中获取的列表
            allBankList: [],
            /*----选择银行支行的数据---*/
            subBankValue: '', //用于从结果集中搜索银行
            subBankResult: [], //根据bankValue从结果集allBankList中获取的列表
            allSubBankList: [],

        }
    },
    components: {
        uploadImg
    },
    watch: {
        bankValue(val) {
            this.bankResult = this.getFilterBankList(val);
        },
        subBankValue() {
            this.subBankResult = this.getFilterSubBankList(val);
        }
    },
    methods: {
        changeCountry() {
            this.formData.payNumber = "";
            this.formData.payWay = "";
        },

        getFilterBankList(val) {
            if (!val) return this.allBankList;
            return this.allBankList.filter(value => new RegExp(val, 'i').test(value.label));
        },
        getFilterSubBankList(val) {
            if (!val) return this.allSubBankList;
            return this.allSubBankList.filter(value => new RegExp(val, 'i').test(value.label));
        },
        itemClickHandler(item) { //选中总行
            if (this.formData.payName != item.label) {
                this.formData.payName = item.label;
                this.formData.paySubName = "";
                this.getSubBankList(item.label);

            }
        },
        itemClickHandler2(item) { //选中支行
            this.formData.paySubName = item.label;
        },
        getImgUrl(url) {
            this.images.push(url);
        },
        getCountryList() {
            let url = http.urlCommon + http.apiUrl.most;
            let body = {
                biz_module: 'locationService',
                biz_method: 'queryLocationCountry',
                biz_param: {

                }
            };
            http.commonPost(url, body).then((res) => {
                this.countryList = res.biz_result.list;
            }).catch((err) => {});
        },
        getBankList() {
            let url = http.urlCommon + http.apiUrl.most;
            let body = {
                biz_module: 'enumService',
                biz_method: 'queryBanks',
                biz_param: {

                }
            };
            http.commonPost(url, body).then((res) => {
                this.allBankList = res.biz_result.list;
                this.bankResult = this.allBankList;
            }).catch((err) => {});
        },
        //获取支行列表
        getSubBankList(name) {
            let url = http.urlCommon + http.apiUrl.most;
            let body = {
                biz_module: 'enumService',
                biz_method: 'querySubBranchs',
                biz_param: {
                    name: name
                }
            };
            http.commonPost(url, body).then((res) => {
                this.allSubBankList = res.biz_result.list;
                this.subBankResult = this.allSubBankList;
            }).catch((err) => {});
        },

        //格式化表单数据
        formatParam() {
            let errMsg = "";
            if (this.formData.payWay === "") {
                errMsg += "请选择支付方式！<br>";
            } else {
                //如果是国外，或者不是银行转账，payName将重置为payWay对应的文本，paySubName置为空
                if (this.formData.payCountry != 7 || this.formData.payWay != 0) {
                    this.formData.payName = this.payWayList[this.formData.payWay];
                    this.formData.paySubName = "";
                }
            }
            if (this.formData.payCountry != 7) {
                //如果是国外不需要用户名（payUserName）字段，而payNumber在国内（账号）外（形式发票）表现形式不同
                this.formData.payUserName = "";
            }
            this.formData.images = this.images.join(",");
            if (errMsg) {
                this.$dialog.toast({
                    mes: errMsg,
                    timeout: 2500
                });
                return false;
            }
            return true;
        },
        confirm() {
            let url = http.urlCommon + http.apiUrl.most;
            let body = {
                biz_module: 'erpOrderService',
                biz_method: 'createByOrderStages',
                biz_param: this.formData
            };
            if (!this.formatParam()) {
                return;
            }
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

        this.getBankList();
        this.getCountryList();
    }
}
</script>
<style>
</style>
