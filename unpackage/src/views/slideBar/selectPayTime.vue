<template>
    <yd-layout>
        <yd-navbar slot="navbar" title="选择">
        </yd-navbar>
        <yd-cell-group>
            <yd-cell-item v-for="item in list" @click.native="menuSelect(item)">
                <span slot="left">{{item.value}}</span>
            </yd-cell-item>
        </yd-cell-group>
    </yd-layout>
</template>
<script>
import http from '../../libs/httpService.js'
export default {
    data() {
            return {
                list: [{
                    key: 0,
                    value: "下单后"
                }, {
                    key: 20,
                    value: "合同签订后"
                }, {
                    key: 50,
                    value: "发货后"
                }, {
                    key: 60,
                    value: "确认收货后"
                }, {
                    key: 70,
                    value: "交验合格后"
                }, ]

            }
        },
        props: {


        },
        methods: {

            menuSelect(item) {
                this.$emit("selectPayTime", item);
            },

        },
        watch: {

        },
        created() {


        }
}
</script>
<style lang="less" type="text/css">
.yd-flexview {
    height: 100vh;
}

.listLi {
    margin-left: 10px;
    line-height: 30px;
    border-bottom: 1px solid rgba(230, 230, 230, .5);
}
</style>
