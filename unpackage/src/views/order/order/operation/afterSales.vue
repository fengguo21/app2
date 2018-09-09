<template>
    <yd-popup v-model="param.show" position="right" width="80%">
        <div class="box" v-for="item,key in itemList">
            <p><span>品种:</span>
                <span>
                    <select v-model="item.goodsId" class="form-control" style="height:33px" @change="setItemList(key,item.goodsId)">
                        <option :value="goods.id" v-for="goods in param.goodsList">{{goods.breedName}}</option>
                    </select>
                </span>
            </p>
            <p><span>类型:</span>
                <span>
                    <select v-model="item.type" class="form-control" style="height:33px">
                        <option :value="0">换货</option>
                        <option :value="1">退货</option>
                    </select>
                </span>
            </p>
            <p><span>数量:</span> <span><input type="number" v-model="item.number" class="form-control" style="height:33px;display:inline-block">{{item.unit | unit("cn")}}</span></p>
            <p><span>价格:</span> <span>{{item.price}}元/{{item.unit | unit("cn")}}</span></p>
            <p><span><yd-button type="primary" @click.native="deleteItem(key)">删除</yd-button></span> <span></span></p>
        </div>
        <yd-button type="primary" size="large" @click.native="addItem">+</yd-button>
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">上传图片：</span>
                <div slot="left" style="padding: .24rem 0;white-space:normal">
                    <upload-img :param="imageParam" :imageArray="images" @postUrl="getImgUrl"></upload-img>
                </div>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">备注：</span>
                <yd-textarea slot="right" v-model="comment" maxlength="100"></yd-textarea>
            </yd-cell-item>
        </yd-cell-group>
        <div style="float:right;margin-right:10px">
            <yd-button type="hollow" @click.native="param.show = false">取消</yd-button>
            <yd-button type="primary" @click.native="confirm">确认</yd-button>
        </div>
    </yd-popup>
</template>
<script>
import http from '../../../../libs/httpService.js'
import mathUtil from '../../../../libs/mathUtil.js'
import uploadImg from '../../../../common/upload/uploadImg.vue'
export default {
    props: ["param"],
    data() {
        return {
            comment: "",
            images: [],
            imageParam: {
                keyName: 'yaocai'
            },
            itemList: []

        }
    },
    computed: {

    },
    components: {
        uploadImg
    },
    methods: {
        getImgUrl(url) {
            this.images.push(url);
        },
        setItemList(index, goodsId) {
            let goodsList = this.param.goodsList;
            let item = this.itemList[index];
            for (let i = 0; i < goodsList.length; i++) {
                if (goodsId == goodsList[i].id) {
                    item.breedName = goodsList[i].breedName;
                    item.price = goodsList[i].price;
                    item.unit = goodsList[i].unit;
                }
            }
        },
        addItem() {
            this.itemList.push({
                goodsId: "",
                breedName: "",
                type: 0,
                number: 0,
                price: "",
                unit: ""
            });
        },
        deleteItem(index) {
            this.itemList.splice(index, 1);
        },
        confirm() {
            let url = http.urlCommon + http.apiUrl.most;
            let list = [];
            for (let i = 0; i < this.itemList.length; i++) {
                let item = this.itemList[i];
                list.push({
                    goodsId: item.goodsId,
                    number: item.number,
                    type: item.type,
                    status: 1
                });
            }
            let body = {
                biz_module: 'orderFlowService',
                biz_method: 'orderAfterSalesRequest',
                biz_param: {
                    orderId: this.param.orderId,
                    images: this.images.join(","),
                    comment: this.comment,
                    itemList: list,
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
        if (this.param.goodsList.length == 1) {
            let goods = this.param.goodsList[0];
            this.itemList.push({
                goodsId: goods.id,
                breedName: goods.breedName,
                type: 0,
                number: 0,
                price: goods.price,
                unit: goods.unit
            });
        }
    }
}
</script>
<style scoped lang="less">
.inline {
    font-size: 12px;
    display: inline-block;
}
</style>
