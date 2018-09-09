<template>
    <yd-list theme="4">
        <div v-for="item, key in list" class="listLi">
            <span>采购订单ID：{{item.buyId==""?"未生成采购订单":item.buyId}}</span>
            <p><span>品种：</span>{{item.breedName}}</p>
            <p><span>数量：</span>{{item.number}}{{item.unit | unit("cn")}}</p>
            <p><span>采购业务员：</span>{{item.buyEmployeeName}}</p>
        </div>
    </yd-list>
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
