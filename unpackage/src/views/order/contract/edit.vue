<template>
    <yd-popup v-model="param.show" position="right" width="80%">
        <div class="box" v-for="item in param.goodsList" :key="item.id">
            <p><span>品种:</span> <span>{{item.breedName}}</span></p>
            <p><span>数量:</span> <span>{{item.number}}{{item.unit | unit("cn")}}</span></p>
            <p><span>修改后的数量:</span> <span><input class="form-control inline" type="number" v-model="item.newNumber">{{item.unit | unit("cn")}}</span></p>
            <p><span>价格:</span> <span>{{item.price}}元/{{item.unit | unit("cn")}}</span></p>
            <p><span>修改后的价格:</span> <span><input class="form-control inline" type="number" v-model="item.newPrice">元/{{item.unit | unit("cn")}}</span></p>
            <p><span>规格:</span> <span>{{item.spec}}</span></p>
            <p><span>质量:</span> <span>{{item.quality}}</span></p>
        </div>
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">原订单总金额：</span>
                <span slot="right">{{this.param.total}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">现订单总金额：</span>
                <span slot="right">{{newTotal}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">上传图片：</span>
                <div slot="left" style="padding: .24rem 0;white-space:normal">
                    <upload-img :param="imageParam" :imageArray="images" @postUrl="getImgUrl"></upload-img>
                </div>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">文本说明：</span>
                <yd-textarea slot="right" v-model="contractText" maxlength="100"></yd-textarea>
            </yd-cell-item>
        </yd-cell-group>
        <div style="float:right;margin-right:10px">
            <yd-button type="hollow" @click.native="param.show = false">取消</yd-button>
            <yd-button type="primary" @click.native="confirm">确认</yd-button>
        </div>
    </yd-popup>
</template>
<script>
import http from '../../../libs/httpService.js'
import mathUtil from '../../../libs/mathUtil.js'
import uploadImg from '../../../common/upload/uploadImg.vue'
export default {
    props: ["param"],
    data() {
        return {
            contractText: "",
            images: [],
            imageParam: {
                keyName: 'yaocai'
            },

        }
    },
    computed: {
        newTotal() {
            let list = this.param.goodsList;
            let sum = 0;
            for (let i = 0; i < list.length; i++) {
                sum = mathUtil.add(sum, mathUtil.mul(list[i].newPrice, list[i].newNumber));
            }
            return sum;
        }
    },
    components: {
        uploadImg
    },
    methods: {
        getImgUrl(url) {
            this.images.push(url);
        },
        confirm() {
            let url = http.urlCommon + http.apiUrl.most;
            let itemList = [];
            for (let i = 0; i < this.param.goodsList.length; i++) {
                let item = this.param.goodsList[i];
                itemList.push({
                    goodsId: item.goodsId,
                    newPrice: item.newPrice,
                    newNumber: item.newNumber,
                });
            }
            let body = {
                biz_module: 'sContractService',
                biz_method: 'update',
                biz_param: {
                    orderId: this.param.id,
                    images: this.images,
                    contractText: this.contractText,
                    itemList: itemList,
                }
            };

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
        this.contractText = this.param.contractText;
        this.images = this.param.images;
    }
}
</script>
<style scoped lang="less">
.inline {
    font-size: 12px;
    display: inline-block;
}
</style>
