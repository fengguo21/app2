<template>
    <yd-accordion accordion>
        <yd-accordion-item v-for="item in list" :title="item.breedName">
            <div style="padding: .24rem;">
                <p>
                    采购订单ID：{{item.buyId==""?"未生成采购订单":item.buyId}}
                </p>
                <p>品种：{{item.breedName}}</p>
                <p>数量：{{item.number}}{{item.unit | unit("cn")}}</p>
                <p>采购业务员：{{item.buyEmployeeName}}</p>
            </div>
        </yd-accordion-item>
    </yd-accordion>
</template>
<script>
import http from '../../../../libs/httpService.js'
export default {

    props: ["id"],
    data() {
        return {
            list: []
        }
    },
    components: {

    },
    methods: {
        getList() {
            let url = http.urlCommon + http.apiUrl.most;
            let body = {
                biz_module: 'erpOrderLinkService',
                biz_method: 'queryLinkOrder',
                biz_param: {
                    orderId: this.id

                }
            };
            http.commonPost(url, body).then((res) => {
                this.list = res.biz_result.list;
            }).catch((err) => {});
        }

    },
    created() {
        this.getList();
    }
}
</script>
<style>
</style>
