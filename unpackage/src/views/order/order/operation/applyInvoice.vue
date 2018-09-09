<!-- 申请收付款（分期） -->
<template>
    <yd-popup v-model="param.show" position="right" width="90%">
        <div class="titleBar">
            <div class="title">
                基本信息
            </div>
        </div>
        <yd-cell-group>
            <yd-cell-item arrow type="label">
                <span slot="left">申请开票公司：</span>
                <select slot="right" v-model="formData.invoiceCompany">
                    <option v-for="item in invoiceCompanyList" :value="item">{{item}}</option>
                </select>
            </yd-cell-item>
            <yd-cell-item arrow type="label">
                <span slot="left">开票日期：</span>
                <yd-datetime type="datetime" v-model="formData.invoiceDate" slot="right"></yd-datetime>
            </yd-cell-item>
            <yd-cell-item arrow type="label">
                <span slot="left">开票性质：</span>
                <select slot="right" v-model="formData.invoiceType">
                    <option value=""></option>
                    <option value="0">普票</option>
                    <option value="1">专票</option>
                </select>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">购货单位全称：</span>
                <input slot="right" type="text" v-model="formData.customerName">
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">纳税人识别号：</span>
                <input slot="right" type="text" v-model="formData.taxId">
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">购货单位电话：</span>
                <input slot="right" type="text" v-model="formData.customerPhone">
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">购货单位省市区：</span>
                <input slot="right" type="text" @click.stop="showAddress = true" v-model="address" readonly placeholder="请选择收货地址">
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">购货单位地址：</span>
                <input slot="right" type="text" v-model="formData.address">
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">开户银行：</span>
                <input slot="right" type="text" v-model="formData.taxBank">
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">开户账号：</span>
                <input slot="right" type="text" v-model="formData.bankAccount">
            </yd-cell-item>
        </yd-cell-group>
        <div class="titleBar">
            <div class="title">
                开票明细
            </div>
        </div>
        <yd-list theme="1">
            <div class="goodsBox" v-for="item, key in goodslist" :key="key">
                <p>
                    <span>品种:</span>
                    <span>
                        <select class="form-control" v-model="item.orderItemId" @click="currentIndex=key" @change="selectBreed(item.orderItemId)">
                            <option :value="breed.orderItemId" v-for="breed in breedlist">{{breed.breedName}}</option>          
                        </select>
                    </span>
                </p>
                <p>
                    <span>单位:</span>
                    <span>
                        <select class="form-control" v-model="item.unit">
                            <option :value="unit.id" v-for="unit in unitList">{{unit.name}}</option>          
                        </select>
                    </span>
                </p>
                <p><span>单价:</span> <span><input type="text" class="form-control" v-model="item.price"></span></p>
                <p><span>数量:</span> <span><input type="text" class="form-control" v-model="item.number"></span></p>
                <p><span>规格:</span> <span><input type="text" class="form-control" v-model="item.spec"></span></p>
                <p><span>商品总额:</span> <span><input type="text" class="form-control" v-model="item.total"></span></p>
                <p>
                    <span></span><span><yd-button @click.native="delItem(key)">删除</yd-button></span>
                </p>
            </div>
        </yd-list>
        <yd-button size="large" @click.native="addItem">添加条目</yd-button>
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">商品总金额：</span>
                <span slot="right">{{invoiceTotal}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">开票总金额：</span>
                <input slot="right" type="text" v-model="formData.invoiceValue">
            </yd-cell-item>
            <yd-cell-item arrow type="label">
                <span slot="left">回款情况：</span>
                <select slot="right" v-model="formData.cashedStatus">
                    <option value=""></option>
                    <option value="0">未回款</option>
                    <option value="1">已回款</option>
                </select>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">汇款单位名称：</span>
                <input slot="right" type="text" v-model="formData.cashedCompany">
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">购贷方财务电话：</span>
                <input slot="right" type="text" v-model="formData.financePhone">
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">邮寄联系人：</span>
                <input slot="right" type="text" v-model="formData.mailContact">
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">邮寄电话：</span>
                <input slot="right" type="text" v-model="formData.mailPhone">
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">邮寄省市区：</span>
                <input slot="right" type="text" @click.stop="showMailAddress = true" v-model="mailAddress" readonly placeholder="请选择收货地址">
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">邮寄地址：</span>
                <input slot="right" type="text" v-model="formData.address">
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">营业执照：</span>
                <div slot="left" style="margin:10px" @click="imgIndex=0">
                    <upload-img slot="right" :imageArray="licenceImages" @postUrl="getImgUrl"></upload-img>
                </div>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">开票信息：</span>
                <div slot="left" style="margin:10px" @click="imgIndex=1">
                    <upload-img slot="right" :imageArray="ticketImages" @postUrl="getImgUrl"></upload-img>
                </div>
            </yd-cell-item>
        </yd-cell-group>
        <div style="float:right;margin:0 10px 20px 0;">
            <yd-button type="hollow" @click.native="param.show=false">取消</yd-button>
            <yd-button type="primary" @click.native="confirm">保存</yd-button>
            <yd-button type="primary" @click.native="confirm(1)">保存并申请</yd-button>
        </div>
        <yd-cityselect v-model="showAddress" :callback="selectAddress" :items="district"></yd-cityselect>
        <yd-cityselect v-model="showMailAddress" :callback="selectMailAddress" :items="district"></yd-cityselect>
    </yd-popup>
</template>
<script>
import http from '../../../../libs/httpService.js'
import mathUtil from '../../../../libs/mathUtil.js'
import dateUtil from '../../../../libs/dateUtil.js'
import uploadImg from '../../../../common/upload/uploadImg.vue'
import commonConstant from '../../../commonPlugin/commonConstant.js'
import District from '../../../commonPlugin/address.json';
export default {
    props: ["param"],
    data() {
        return {
            currentIndex: 0,
            unitList: [],
            //开票商品条目
            goodslist: [],
            //可供选择的商品
            breedlist: [],
            licenceImages: [],
            ticketImages: [],
            formData: {
                orderId: this.param.orderId,
                invoiceCompany: '',
                invoiceDate: '',
                invoiceType: '',
                invoiceValue: '',
                cashedStatus: '',
                cashedCompany: '',
                financePhone: '',
                customerId: '',
                customerName: '',
                customerPhone: '',
                taxId: '',
                province: '',
                city: '',
                district: '',
                address: '',
                taxBank: '',
                bankAccount: '',
                items: [],
                mailProvince: '',
                mailCity: '',
                mailDistrict: '',
                mailAddress: '',
                mailContact: '',
                mailPhone: '',
                businessLicense: '',
                invoiceInfo: '',
                isSaveInvoiceInfo: 1, //0表示不保存，1表示保存，现在默认保存
            },

            address: '',
            showAddress: false,
            mailAddress: '',
            showMailAddress: false,
            district: District[0].c,
            invoiceCompanyList: commonConstant.invoiceCompany

        }
    },
    components: {
        uploadImg,
        commonConstant
    },
    computed: {
        //对于goodlist（数组，其中的元素是对象），我们只需要监听number和price的变化，可以通过计算属性作为中间件来实现
        listBack: function() {
            var obj = {};
            for (var i = 0; i < this.goodslist.length; i++) {
                obj[i + "-0"] = this.goodslist[i].number;
                obj[i + "-1"] = this.goodslist[i].price;
            }
            obj.length = this.goodslist.length;
            return obj;
        },
        //商品总金额
        invoiceTotal: function() {
            let total = 0;
            for (var i = 0; i < this.goodslist.length; i++) {
                total = mathUtil.add(total, this.goodslist[i].total);
            }

            this.formData.invoiceValue = total;
            return total;
        }
    },
    watch: {
        //监听这个计算属性
        listBack: {
            handler(newValue, oldValue) {
                let newLength = newValue.length;
                let oldLength = oldValue.length;
                if (newLength == oldLength) { //如果数组的长度不变
                    for (let i = 0; i < newLength; i++) {
                        if (newValue[i + "-0"] != oldValue[i + "-0"] || newValue[i + "-1"] != oldValue[i + "-1"]) {
                            this.goodslist[i].total = mathUtil.mul(newValue[i + "-0"], newValue[i + "-1"]);
                            break;
                        }
                    }
                }　　　　　　　
            },
            　　　　
            deep: true,

        }
    },
    methods: {
        selectAddress(ret) {
            this.address = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3;
            this.formData.province = ret.itemValue1;
            this.formData.city = ret.itemValue2;
            this.formData.district = ret.itemValue3;
        },
        selectMailAddress(ret) {
            this.mailAddress = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3;
            this.formData.mailProvince = ret.itemValue1;
            this.formData.mailCity = ret.itemValue2;
            this.formData.mailDistrict = ret.itemValue3;
        },
        selectBreed(goodsId) {
            let item = this.goodslist[this.currentIndex];
            for (let i = 0; i < this.breedlist.length; i++) {
                let breed = this.breedlist[i];
                if (breed.orderItemId == goodsId) {
                    item.breedId = breed.breedId;
                    item.breedName = breed.breedName;
                    item.unit = breed.unit;
                    item.number = breed.number;
                    item.spec = breed.spec;
                    item.price = breed.price;
                    break;
                }
            }
        },
        addItem() {
            this.goodslist.push({
                orderItemId: "",
                breedId: "",
                breedName: "",
                unit: "",
                number: "",
                spec: "",
                price: "",
                total: "",
            });
        },
        delItem(index) {
            this.goodslist.splice(index, 1);
        },
        getImgUrl(url) {
            if (this.imgIndex == 0) {
                this.licenceImages.push(url);
            }
            if (this.imgIndex == 1) {
                this.ticketImages.push(url);
            }

        },
        getUnitList() {
            let url = http.urlCommon + http.apiUrl.most;
            let body = {
                biz_module: 'enumService',
                biz_method: 'queryEnumList',
                biz_param: {
                    type: "MU"
                }
            };

            http.commonPost(url, body).then((res) => {
                this.unitList = res.biz_result.list;
                console.log(this.unitList);

            }).catch((err) => {});
        },

        //申请时通过订单ID获取少量信息,编辑时获取全部信息
        getInvoiceDetail() {
            let _this = this;
            let url = http.urlCommon + http.apiUrl.most;
            let body = {
                biz_module: "erpOrderInvoiceService",
                biz_method: "buildInvoiceRequestByOrder",
                biz_param: {
                    orderId: this.param.orderId
                }
            }
            if (this.param.flag == 2) { //编辑时
                body.biz_method = "queryInvoiceRequestById";
                body.biz_param.id = this.param.id;
            }
            http.commonPost(url, body).then(suc => {

                let result = suc.biz_result;
                let goods = result.items;
                _this.breedlist = goods;
                _this.goodslist = [];
                _this.formData.customerName = result.customerName;
                _this.formData.customerId = result.customerId;
                _this.formData.customerPhone = result.customerPhone;
                //收发地址
                _this.formData.province = result.province;
                _this.formData.city = result.city;
                _this.formData.district = result.district;
                _this.formData.address = result.address;
                _this.address = result.provinceName + " " + result.cityName + " " + result.districtName;
                //邮寄地址
                _this.formData.mailProvince = result.mailProvince;
                _this.formData.mailCity = result.mailCity;
                _this.formData.mailDistrict = result.mailDistrict;
                _this.formData.mailAddress = result.mailAddress;
                _this.mailAddress = result.mailProvinceName + " " + result.mailCityName + " " + result.mailDistrictName;

                //根据客户ID查询客户的发票申请信息列表
                /*if (result.customerId) {
                    _this.getCustomerInvoice(result.customerId);
                }*/

                for (let i = 0; i < goods.length; i++) {
                    let item = goods[i];
                    let total = mathUtil.mul(item.price, item.number);
                    let temp = {
                        orderItemId: item.orderItemId,
                        breedId: item.breedId,
                        breedName: item.breedName,
                        unit: item.unit,
                        number: item.number,
                        spec: item.spec,
                        price: item.price,
                        total: total,

                    };
                    if (this.param.flag == 2) {
                        temp.id = item.id;
                    }
                    _this.goodslist.unshift(temp);

                }

                //编辑时获取额外的数据
                if (this.param.flag == 2) {
                    _this.formData.invoiceCompany = result.invoiceCompany;
                    _this.formData.invoiceDate = result.invoiceDate;
                    _this.formData.invoiceType = result.invoiceType;
                    _this.formData.taxId = result.taxId;
                    _this.formData.taxBank = result.taxBank;
                    _this.formData.bankAccount = result.bankAccount;
                    _this.formData.cashedStatus = result.cashedStatus;
                    _this.formData.cashedCompany = result.cashedCompany;
                    _this.formData.financePhone = result.financePhone;
                    _this.formData.mailContact = result.mailContact;
                    _this.formData.mailPhone = result.mailPhone;

                    //修改时需要传入开票ID
                    _this.formData.id = _this.param.id;

                }

            }, err => {

                console.log(err);
            })
        },
        //检测表单数据
        checkFormData() {
            let errMsg = "";
            let param = this.formData;
            if (!param.invoiceCompany) {
                errMsg += "请选择开票公司<br>";
            }
            if (!param.invoiceDate) {
                errMsg += "请选择开票日期<br>";
            }
            if (param.invoiceType === "") {
                errMsg += "请选择开票性质<br>";
            }
            if (!param.customerName) {
                errMsg += "请填写购货单位全称<br>";
            }
            if (errMsg) {
                this.$dialog.toast({
                    mes: errMsg,
                    timeout: 1500

                });
                return false;
            }
            return true;
        },
        confirm(isSubmit) {
            let url = http.urlCommon + http.apiUrl.most;
            let body = {
                biz_module: 'erpOrderInvoiceService',
                biz_method: 'saveInvoiceRequest',
                biz_param: this.formData
            };
            if (!this.checkFormData()) {
                return;
            }
            //保存并申请
            if (isSubmit == 1) {
                this.formData.isSubmit = 1;
            }
            this.formData.items = this.goodslist;
            this.formData.businessLicense = this.licenceImages.join(",");
            this.formData.invoiceInfo = this.ticketImages.join(",");
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
        this.formData.invoiceDate = dateUtil.formatDate(new Date(), 0, 4);
        this.getUnitList();
        this.getInvoiceDetail();
    }
}
</script>
<style lang="less" scoped>
.form-control {
    padding: 2px 5px;
}

.titleBar {
    .title {
        margin-top: 10px;
        line-height: 40px;
        color: #666;
        font-size: 20px;
        padding: 0 10px;
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
        margin-bottom: 8px;
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
}
</style>
