<template>
    <yd-list theme="4">
        <div v-for="item, key in list" class="listLi">
            <p><span>品种：</span>{{item.orderDesc}}</p>
            <p><span>差额：</span>{{item.adjusted}}</p>
            <p><span>补充合同文本：</span>{{item.contractText}}</p>
            <p><span>审核说明：</span>{{item.description}}</p>
            <p><span>审核状态：</span>{{item.taskKey | orderTask(item.handlerName)}}</p>
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
