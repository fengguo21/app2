<template>
    <yd-list theme="4">
        <div v-for="item, key in list" class="listLi">
            <span>类型：{{item.type | afterSalesType}}</span>
            <p><span>品种：</span>{{item.orderDesc}}</p>
            <p><span>收货人：</span>{{item.consigneeName}}</p>
            <p><span>发货人：</span>{{item.shipperName}}</p>
            <p><span>备注：</span>{{item.comment}}</p>
            <p><span>说明：</span>{{item.description}}</p>
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
                biz_module: 'erpAfterSalesService',
                biz_method: 'getList',
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
