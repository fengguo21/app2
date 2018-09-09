<template>
    <yd-accordion accordion>
        <yd-accordion-item v-for="item in list" :title="item.orderDesc">
            <div style="padding: .24rem;">
                <p>
                    类型：{{item.type | afterSalesType}}
                </p>
                <p>品种：{{item.orderDesc}}</p>
                <p>收货人：{{item.consigneeName}}</p>
                <p>发货人：{{item.shipperName}}</p>
                <p>备注：{{item.comment}}</p>
                <p>说明：{{item.description}}</p>
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
