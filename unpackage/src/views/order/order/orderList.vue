<template>
    <center-content :showMore="showMore" :showSearch="true" :loading="loading" @query="submitHandler" @refresh="refresh">
        <!-- 搜索 -->
        <search slot="more" :param="queryParam" @query="submitHandler"></search>
        <com-search slot="search" @more="showMore=!showMore" @query="submitHandler"></com-search>
        <div slot="content">
            <!-- <yd-infinitescroll :callback="loadList" :distance="100" ref="orderInfinitescroll">
                <yd-list theme="1" slot="list">
                   <div class="supplierBox" v-for="item in list" :key="item.id" @click="goDetail(item.id)">
                       <p><span>品种:</span> <span>{{item.goodsDesc}}</span></p>
                       <p><span>客户名称:</span> <span>{{item.customerName}}</span></p>
                       <p><span>客户手机:</span> <span>{{item.customerPhone}}</span></p>
                       <p><span>订单状态:</span> <span>{{item.orderStatus | orderstatus}}</span></p>
                       <p><span>成交时间:</span> <span>{{item.tradeTime}}</span></p>
                   </div>
               </yd-list>
                <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>
                <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />
            </yd-infinitescroll> -->
            <list :param="param" :queryParam="queryParam"></list>
            <yd-backtop></yd-backtop>
        </div>
    </center-content>
</template>
<script>
import search from "./search.vue";
import centerContent from "../../../components/centerContent.vue"
import comSearch from "../../../components/com/comSearch.vue"
import list from "./list.vue"
import http from "../../../libs/httpService.js"
import util from "../../../libs/util.js"
import bus from "../../../libs/bus.js"
export default {
    //0代表我的订单，1代表部门订单，2代表全部订单
    props: ["param"],
    data() {
        return {
            loading: false,
            showMore: false,
            queryParam: {
                customer: "",
                customerName: "",
                id: ""
            },
            pageParam: {
                pn: 1,
                pSize: 5
            },
            showMenu: false,
            list: []
        };
    },
    components: {
        search,
        centerContent,
        comSearch,
        list
    },
    methods: {
        submitHandler(value) {
            if (!!value && !this.queryParam.customerName) {
                this.queryParam.customerName = value;
            }
            bus.$emit("get-list", this.queryParam);
        },
        refresh() {
            util.resetObject(this.queryParam);
            this.submitHandler();
        },

    },
    created() {

    }
};
</script>
<style lang="less" scoped>
.supplierBox {
    margin: 15px;
    background-color: #fff;
    padding: 10px;
    border-radius: 15px;
    p {
        line-height: 30px;
        font-size: 12px;
        display: flex;
        span:nth-child(1) {
            display: inline-block;
            width: 30%;
        }
        span:nth-child(2) {
            display: inline-block;
            width: 70%;
        }
    }
}
</style>
