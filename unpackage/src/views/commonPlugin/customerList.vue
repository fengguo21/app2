<template>
    <yd-cell-group>
        <yd-cell-item v-for="item in list" @click.native="selected(item)">
            <div slot="left">
                <p>姓名：{{item.name}}</p>
                <p>手机：{{item.mainPhone}}</p>
            </div>
        </yd-cell-item>
    </yd-cell-group>
    <!-- <yd-list theme="4">
        <yd-list-item v-for="item, key in list" :key="key">
            <span slot="img" style="width:0px"></span>
            <span slot="title">{{item.title}}</span>
            <yd-list-other slot="other">
                <div>
                    <span>{{item.name}}</span>
                    <span>{{item.mainPhone}}</span>
                </div>
            </yd-list-other>
        </yd-list-item>
    </yd-list> -->
</template>
<script>
import http from '../../libs/httpService.js'
import stringUtil from '../../libs/stringUtil.js'
export default {
    props: ["param"],
    data() {
        return {
            list: []
        }
    },
    computed: {

    },
    components: {

    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {

        loadCustomerList() {
            let url = http.urlCommon + http.apiUrl.most;
            let body = {
                biz_module: 'erpCustomerService',
                biz_method: 'queryCustomerList',
                biz_param: {
                    employeeId: localStorage.employeeId
                }
            };
            http.commonPost(url, body).then((res) => {

                this.list = res.biz_result.list;
            }).catch((err) => {});
        },
        selected(item) {
            this.param.show = false;
            this.$emit("customer", item);
        }

    },
    created() {
        this.loadCustomerList();
    }

}
</script>
<style>
</style>
