<template>
    <yd-popup v-model="param.show" position="right" width="90%">
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">凭证：</span>
                <div slot="left" style="margin:10px">
                    <upload-img :param="imageParam" :imageArray="files" @postUrl="getImgUrl"></upload-img>
                </div>
            </yd-cell-item>
            <yd-cell-item>
                <yd-button slot="right" type="hollow" style="margin:.1rem" @click.native="param.show = false">取消</yd-button>
                <yd-button slot="right" type="primary" style="margin:.1rem" @click.native="confirm">确定</yd-button>
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
                images: []
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
            this.formData.images = this.files;
            let url = http.urlCommon + http.apiUrl.most;
            let body = {
                biz_module: 'payStagesFundService',
                biz_method: 'proceedsConfirm',
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


    },
    created() {

    }
}
</script>
<style>
</style>
