<template>
    <yd-popup v-model="param.show" position="right" width="90%">
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">支付流水号：</span>
                <yd-input slot="right" v-model="formData.prNo" placeholder="请输入"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">备注：</span>
                <yd-textarea slot="right" v-model="formData.description" maxlength="100"></yd-textarea>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">凭证：</span>
                <div slot="left" style="margin:10px">
                    <upload-img :param="imageParam" :imageArray="files" @postUrl="getImgUrl"></upload-img>
                </div>
            </yd-cell-item>
            <yd-cell-item>
                <yd-button slot="right" type="hollow" style="margin:.1rem" @click.native="param.show = false">取消</yd-button>
                <yd-button slot="right" type="primary" style="margin:.1rem" @click.native="pass">通过</yd-button>
                <yd-button slot="right" type="warning" style="margin:.1rem" @click.native="reject">不通过</yd-button>
            </yd-cell-item>
        </yd-cell-group>
    </yd-popup>
</template>
<script>
import http from '../../../../libs/httpService.js'
import uploadImg from "../../../../common/upload/uploadImg.vue"
export default {
    props: ["param"],
    data() {
        return {
            formData: {
                id: this.param.id,
                prNo: "",
                validate: "",
                description: "",
                images: ""
            },
            imageParam: {
                keyName: 'yaocai'
            },
            files: [],
        }
    },
    components: {
        uploadImg
    },
    methods: {
        getImgUrl(url) {
            this.files.push(url);
        },
        confirm() {
            this.formData.images = this.files.join(",");
            let url = http.urlCommon + http.apiUrl.most;
            let body = {
                biz_module: 'erpOrderService',
                biz_method: 'validateByOrderStages',
                biz_param: this.formData
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
        pass() {
            this.formData.validate = 2;
            this.confirm();

        },
        reject() {
            this.formData.validate = 3;
            this.confirm();
        }

    },
    created() {

    }
}
</script>
<style>
</style>
