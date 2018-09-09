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
                <span slot="left">创建时间：</span>
                <span slot="left">{{info.ctime}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">备注：</span>
                <span slot="left" style="white-space:normal">{{info.comment}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">图片：</span>
                <span slot="left" style="white-space:normal"><img v-for="item in info.applyImage" :src="item.path" style="width:90px"></span>
            </yd-cell-item>
        </yd-cell-group>
        <div class="titleBar">
            <div class="title">
                退换货信息
            </div>
        </div>
        <yd-list theme="4">
            <div v-for="item, key in info.itemList" class="listLi">
                <span>品种：{{item.breedName}}</span>
                <p><span>单位：</span>{{item.unit | unit("cn")}}</p>
                <p><span>价格：</span>{{item.price}}</p>
                <p><span>数量：</span>{{item.number}}</p>
                <p><span>退/换货：</span>{{item.type | afterSalesType}}</p>
            </div>
        </yd-list>
        <yd-tabbar slot="tabbar">
            <div class="bottom">
                <div class="button" v-if="this.flag==1&&info.validate==1&&(info.taskKey===''||info.taskKey=='after_sales_governor_validate')" @click="audit">售后审核</div>
                <div class="button" v-if="this.flag==0&&(info.validate==0||info.validate==-2)" @click="edit">编辑</div>
                <div class="button" v-if="this.flag==0&&info.validate==-2&&info.taskKey=='after_sales_employee_handle'" @click="reapply">重新申请审核</div>
            </div>
        </yd-tabbar>
        <audit-aftersale v-if="auditParam.show" :param="auditParam" @detail="loadDetail"></audit-aftersale>
        <reapply-aftersale v-if="reapplyParam.show" :param="reapplyParam" @detail="loadDetail"></reapply-aftersale>
        <edit-aftersale v-if="editParam.show" :param="editParam" @detail="loadDetail"></edit-aftersale>
    </yd-layout>
</template>
<script>
import http from '../../../libs/httpService.js'
import stringUtil from '../../../libs/stringUtil.js'
import auditAftersale from './audit.vue'
import reapplyAftersale from './reapply.vue'
import editAftersale from './edit.vue'

export default {
    data() {
            return {
                id: '',
                flag: '',
                title: '售后详情',
                info: {},
                auditParam: {
                    id: "",
                    show: false
                },
                reapplyParam: {
                    id: "",
                    show: false
                },
                editParam: {
                    show: false,
                    id: "",
                    orderId: "",
                    goodsList: [],
                    itemList: [],
                    images: [],
                    comment: "",

                }
            }
        },
        computed: {

        },
        components: {
            auditAftersale,
            reapplyAftersale,
            editAftersale
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
                    biz_module: 'erpAfterSalesService',
                    biz_method: 'getDetailsById',
                    biz_param: {
                        id: this.id,
                    }
                };
                http.commonPost(url, body).then((res) => {
                    this.info = res.biz_result;

                }).catch((err) => {});
            },
            audit() {
                this.auditParam.show = true;
                this.auditParam.id = this.id;
            },
            reapply() {
                this.reapplyParam.show = true;
                this.reapplyParam.id = this.id;
            },
            edit() {
                this.editParam.id = this.id;
                this.editParam.orderId = this.info.orderId;
                this.editParam.images = this.info.applyImage;
                this.editParam.itemList = this.info.itemList;
                this.editParam.comment = this.info.comment;
                let url = http.urlCommon + http.apiUrl.most;
                let body = {
                    biz_module: 'erpOrderService',
                    biz_method: 'queryOrderGoodsByOrderId',
                    biz_param: {
                        orderId: this.info.orderId,
                    }
                };
                http.commonPost(url, body).then((res) => {
                    this.editParam.show = true;
                    this.editParam.goodsList = res.biz_result.list;
                }).catch((err) => {});

            },

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
