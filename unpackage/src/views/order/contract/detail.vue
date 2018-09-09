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
                <span slot="left">品种：</span>
                <span slot="left">{{info.orderDesc}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">客户名称：</span>
                <span slot="left">{{info.customerName}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">客户联系方式：</span>
                <span slot="left">{{info.customerPhone}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">支付流水号：</span>
                <span slot="left">{{info.orderNo}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">补充合同文本：</span>
                <span slot="left">{{info.contractText}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">差额：</span>
                <span slot="left">{{info.adjusted}}元</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">创建时间：</span>
                <span slot="left">{{info.ctime | timestampToDate}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">备注：</span>
                <span slot="left" style="white-space:normal">{{info.comment}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">图片：</span>
                <span slot="left"><img v-for="item in info.images" :src="item" style="width:90px"></span>
            </yd-cell-item>
        </yd-cell-group>
        <div class="titleBar">
            <div class="title">
                商品列表
            </div>
        </div>
        <yd-list theme="4">
            <div v-for="item, key in info.itemList" class="listLi">
                <span>品种：{{item.breedName}}</span>
                <p><span>质量/规格：</span>{{item.goods.quality}}/{{item.goods.spec}}</p>
                <p><span>价格：</span>{{item.oldPrice}}-->{{item.newPrice}}(元/{{item.goods.unit | unit("cn")}})</p>
                <p><span>数量：</span>{{item.oldNumber}}-->{{item.newNumber}}({{item.goods.unit | unit("cn")}})</p>
            </div>
        </yd-list>
        <yd-tabbar slot="tabbar">
            <div class="bottom">
                <!-- 审核通过validate=2不通过validate=-2 -->
                <div class="button" v-if="flag==1&&info.validate == 1" @click="audit()">审核</div>
                <div class="button" v-if="flag==0&&info.validate == -2" @click="edit()">编辑</div>
                <div class="button" v-if="flag==0&&info.validate == -2" @click="reapply()">重新申请</div>
            </div>
        </yd-tabbar>
        <audit-contract v-if="auditParam.show" :param="auditParam" @detail="loadDetail"></audit-contract>
        <reapply-contract v-if="reapplyParam.show" :param="reapplyParam" @detail="loadDetail"></reapply-contract>
        <edit-contract v-if="editParam.show" :param="editParam" @detail="loadDetail"></edit-contract>
    </yd-layout>
</template>
<script>
import http from '../../../libs/httpService.js'
import stringUtil from '../../../libs/stringUtil.js'
import auditContract from './audit.vue'
import reapplyContract from './reapply.vue'
import editContract from '../order/operation/supplementalContract'

export default {
    data() {
            return {
                id: '',
                flag: '',
                title: '补充合同详情',
                info: {},
                auditParam: {
                    show: false,
                    id: ""
                },
                reapplyParam: {
                    show: false,
                    id: ""
                },
                editParam: {
                    flag: 1, //0表示申请，1表示编辑
                    show: false,
                    id: "",
                    orderId: "",
                    goodsList: [],
                    contractText: "",
                    images: [],
                    total: "",
                },


            }
        },
        computed: {

        },
        components: {
            auditContract,
            reapplyContract,
            editContract
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
                    biz_module: 'sContractService',
                    biz_method: 'queryById',
                    biz_param: {
                        id: this.id,
                    }
                };
                http.commonPost(url, body).then((res) => {
                    this.info = res.biz_result;

                }).catch((err) => {});
            },
            audit() {
                this.auditParam.id = this.id;
                this.auditParam.show = true;
            },
            reapply() {
                this.reapplyParam.id = this.id;
                this.reapplyParam.show = true;
            },
            edit() {
                let _this = this;
                this.editParam.images = [];
                this.editParam.goodsList = [];
                let list = this.editParam.goodsList;
                let itemList = this.info.itemList;
                this.editParam.id = this.id;
                this.editParam.orderId = this.info.orderId;
                this.editParam.contractText = this.info.contractText;
                this.editParam.total = this.info.oldTotal;
                this.info.images.forEach(function(item) {
                    _this.editParam.images.push(item);
                });
                for (let i = 0; i < itemList.length; i++) {
                    let item = itemList[i];
                    list.push({
                        goodsId: item.id,
                        breedName: item.breedName,
                        price: item.oldPrice,
                        number: item.oldNumber,
                        newPrice: item.newPrice,
                        newNumber: item.newNumber,
                        unit: item.goods.unit,
                        spec: item.goods.spec,
                        quality: item.goods.quality
                    });
                }
                this.editParam.show = true;
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
