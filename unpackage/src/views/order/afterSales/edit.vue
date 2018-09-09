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
import http from '../../../libs/httpService.js'
import mathUtil from '../../../libs/mathUtil.js'
import uploadImg from '../../../common/upload/uploadImg.vue'
export default {
    props: ["param"],
    data() {
        return {
            comment: "",
            images: [],
            imageParam: {
                keyName: 'yaocai'
            },
            itemList: [],
            deleteList: [] //原先存在，修改时被删除的条目

        }
    },
    computed: {

    },
    components: {
        uploadImg
    },
    methods: {
        //初始化
        init() {
            let list = this.param.itemList;
            let images = this.param.images;
            this.itemList = [];
            this.images = [];
            for (let i = 0; i < list.length; i++) {
                let item = list[i];
                this.itemList.push({
                    id: item.id,
                    goodsId: item.goodsId,
                    breedName: item.breedName,
                    type: item.type,
                    number: item.number,
                    price: item.price,
                    unit: item.unit,
                    status: 1
                });
            }
            for (let j = 0; j < images.length; j++) {
                this.images.push(images[j].path);
            }
            this.comment = this.param.comment;

        },
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
            let item = this.itemList[index];
            if (item.id) { //如果删除的数据的id属性存在，则将status置为0并保存到deleteList中
                this.deleteList.push({
                    goodsId: item.goodsId,
                    id: item.id,
                    number: item.number,
                    status: 0,
                    type: item.type
                });
            }
            this.itemList.splice(index, 1);
        },
        //格式化提交的参数
        formatParam() {
            let errMsg = "";
            let obj = {
                id: this.param.id,
                orderId: this.param.orderId,
                images: this.images.join(","),
                comment: this.comment,
                itemList: []
            };
            let list = [];
            if (this.itemList.length == 0) {
                errMsg += "至少一个条目！<br>";
            } else {
                for (let i = 0; i < this.itemList.length; i++) {
                    let item = this.itemList[i];
                    if (!item.goodsId) {
                        errMsg += "请选择品种！<br>";
                        break;
                    }
                    let temp = {
                        goodsId: item.goodsId,
                        number: item.number,
                        type: item.type,
                        status: 1
                    }
                    if (item.id) {
                        temp.id = item.id;
                    }
                    list.push(temp);
                }
            }

            for (let j = 0; j < this.deleteList.length; j++) {
                list.push(this.deleteList[j]);
            }
            obj.itemList = list;
            if (errMsg) {
                this.$dialog.toast({
                    mes: errMsg,
                    timeout: 2500

                });
                return false;
            }
            return obj;
        },
        confirm() {
            let url = http.urlCommon + http.apiUrl.most;
            let bizParam = this.formatParam();
            if (!bizParam) {
                return;
            }
            let body = {
                biz_module: 'erpAfterSalesService',
                biz_method: 'update',
                biz_param: bizParam
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
        this.init();
    }
}
</script>
<style scoped lang="less">
.inline {
    font-size: 12px;
    display: inline-block;
}
</style>
