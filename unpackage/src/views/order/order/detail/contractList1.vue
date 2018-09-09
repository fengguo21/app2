<template>
    <yd-accordion accordion>
        <yd-accordion-item v-for="item in list" :title="item.orderDesc">
            <div style="padding: .24rem;">
                <p>
                    品种：{{item.orderDesc}}
                </p>
                <p>差额：{{item.adjusted}}</p>
                <p>补充合同文本：{{item.contractText}}</p>
                <p>审核说明：{{item.description}}</p>
                <p>审核状态：{{item.taskKey | orderTask(item.handlerName)}}</p>
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
                biz_module: 'erpSupplementaryContractService',
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
