<template>
    <yd-layout>
        <yd-navbar slot="navbar" title="选择">
        </yd-navbar>
        <yd-cell-group>
            <yd-cell-item v-for="item in list" @click.native="menuSelect(item)">
                <span slot="left">{{item}}</span>
            </yd-cell-item>
        </yd-cell-group>
    </yd-layout>
</template>
<script>
import http from '../../libs/httpService.js'
export default {
    data() {
            return {
                list: ["首笔款", "预付款", "定金"]
            }
        },
        props: {

        },
        methods: {

            menuSelect(item) {
                this.$emit("selectPayDescription", item);
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
