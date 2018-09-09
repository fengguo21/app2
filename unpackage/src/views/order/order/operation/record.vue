<template>
    <yd-popup v-model="param.show" position="center" width="80%" >
        <yd-cell-group  :title="title">
            <div class="recordBody">
                <yd-cell-item v-for="item in list">
                    <p slot="left">{{item.ctimeStr}}</p>
                    <p slot="left" style="white-space:normal">{{item.description}}</p>
                </yd-cell-item>
            </div>
        </yd-cell-group>
    </yd-popup>
</template>
<script>
import http from '../../../../libs/httpService.js'
export default {

    props: ["param"],
    data() {
        return {
            title:"审核记录",
            list: []
        }
    },
    components: {

    },
    methods: {
        getRecord() {
            let url = http.urlCommon + http.apiUrl.most;
            let body = {
                biz_module: 'flowService',
                biz_method: 'queryFlowRecord',
                biz_param: {
                    bizType: this.param.bizType,
                    bizId: this.param.bizId,
                }
            };
            http.commonPost(url, body).then((res) => {
                this.list = res.biz_result.list;
            }).catch((err) => {});
        }

    },
    created() {
        this.getRecord();
    }
}
</script>
<style lang="less" scoped>
.recordBody{
    height: 400px;
    overflow: scroll;

}
</style>

