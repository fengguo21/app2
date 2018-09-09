<template>
    <yd-popup v-model="param.show" position="right" width="90%">
        <div style="padding:10px;box-sizing:border;">
            <yd-cell-group>
                <yd-cell-item arrow type="label">
                    <span slot="left">物流公司：</span>
                    <select slot="right" v-model="logistics.company">
                        <option v-for="express in expressList" :value="express.id + ',' + express.name +','+express.code">{{express.name}}</option>
                    </select>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">物流单号：</span>
                    <input slot="right" type="text" v-model="logistics.logisticsNo">
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">物流费用：</span>
                    <input slot="right" type="number" v-model="logistics.freight">
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">备注：</span>
                    <yd-textarea slot="right" maxlength="100" v-model="logistics.description"></yd-textarea>
                </yd-cell-item>
            </yd-cell-group>
            <span>条目信息：</span>
            <yd-list>
                <div class="box" v-for="item, key in list">
                    <p style="position:absolute;right:0;" @click="del(key)">
                        <yd-icon name="cuowuguanbiquxiao" slot="right" size='.5rem' style="margin-right:.2rem" @click.native="refresh" custom></yd-icon>
                    </p>
                    <p><span>发票号：</span>
                        <input type="text" class="form-control" style="display:inline-block;width:50%" v-model="item.number">
                    </p>
                    <br>
                    <p>
                        <span>凭证：</span>
                        <span @click="current = key">
                            <upload-img :param="item.imageParam" :imageArray="item.images" :multiple="false" @postUrl="getImgUrl"></upload-img>
                        </span>
                    </p>
                </div>
            </yd-list>
            <yd-button slot="right" type="primary" size="large" @click.native="add">添加发票条目</yd-button>
            <div style="float:right;margin:10px 0">
                <yd-button slot="left" type="hollow" style="margin-right:10px;" @click.native="param.show=false">取消</yd-button>
                <yd-button slot="right" type="primary" @click.native="confirm">确定</yd-button>
            </div>
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
            logistics: {
                company: "",
                logisticsNo: "",
                freight: 0,
                description: ""
            },
            expressList: [],
            current: 0,
            list: [{
                number: "",
                url: "",
                imageParam: {
                    keyName: 'yaocai'
                },
                images: []
            }]

        }
    },
    components: {
        uploadImg
    },
    methods: {
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
        getImgUrl(url) {
            this.list[this.current].url = url;
            this.list[this.current].images.push(url);
        },
        add() {
            this.list.push({
                number: "",
                url: "",
                imageParam: {
                    keyName: 'yaocai'
                },
                images: []
            });
        },
        del(index) {
            this.list.splice(index, 1);
        },
        formatBody() {
            let body = {};
            let errMsg = "";
            let list = this.list;
            let logs = this.logistics;
            if (!this.logistics.company) {
                errMsg += "请选择物流公司！<br>";
            }
            if (!this.logistics.logisticsNo) {
                errMsg += "请填写物流单号！<br>";
            }
            if (list.length == 0) {
                errMsg += "请至少上传一条凭证信息！<br>";
            } else {
                for (let i = 0; i < list.length; i++) {
                    if (!list[i].url || !list[i].number) {
                        errMsg += "请完善条目信息！<br>";
                        break;
                    }
                }
            }
            if (errMsg) {
                this.$dialog.toast({
                    mes: errMsg,
                    timeout: 1500

                });
                return false;
            }
            let logistics = logs.company.split(",");
            body.invoiceRequestId = this.param.invoiceRequestId;
            body.lcompanyId = logistics[0];
            body.lcompanyName = logistics[1];
            body.logisticsNo = logs.logisticsNo;
            body.freight = logs.freight;
            body.description = logs.description;
            body.isSubmit = 1; //0表示保存开票信息，1表示保存并审核通过
            body.details = [];
            for (let i = 0; i < list.length; i++) {
                body.details.push({
                    no: list[i].number,
                    img: list[i].url
                });
            }
            console.log(body);
            return body;

        },
        confirm() {
            let url = http.urlCommon + http.apiUrl.most;
            let bizParam = this.formatBody();
            if (!bizParam) {
                return;
            }
            let body = {
                biz_module: 'erpOrderInvoiceService',
                biz_method: 'saveInvoiceRecord',
                biz_param: bizParam
            };
            http.commonPost(url, body).then((res) => {
                let result = res.biz_result;
                this.$dialog.toast({
                    mes: 'success',
                    timeout: 1500,
                    icon: 'success'
                });
                this.param.show = false;
                this.$emit("detail");

            }).catch((err) => {});
        }
    },
    created() {
        this.getExpressList();
    }
}
</script>
<style scoped lang="less">
.box {
    position: relative;
    margin: 15px;
    background-color: #fff;
    padding: 10px;
    border: 1px solid black;
    border-radius: 10px;
}
</style>
