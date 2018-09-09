<template>
    <center-content :showMore="showMore" :showSearch="true" :loading="loading" @query="submitHandler" @refresh="refresh">
        <search slot="more" :param="queryParam" @query="submitHandler"></search>
        <com-search slot="search" @more="showMore=!showMore" @query="submitHandler"></com-search>
        <div slot="content">
            <yd-infinitescroll :distance="100" ref="orderInfinitescroll">
                <yd-list theme="1" slot="list">
                    <div class="box" v-for="item in invoiceList" :key="item.id" @click="goDetail(item.id)">
                        <p><span>开票性质:</span> <span>{{item.invoiceType | invoiceType}}</span></p>
                        <p><span>开票公司:</span> <span>{{item.invoiceCompany}}</span></p>
                        <p><span>购货单位:</span> <span>{{item.customerName}}</span></p>
                        <p><span>开票状态:</span> <span>{{item.dataStatus | invoiceStatus}}</span></p>
                        <p><span>开票时间:</span> <span>{{item.invoiceDate}}</span></p>
                    </div>
                </yd-list>
                <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>
                <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />
            </yd-infinitescroll>
            <yd-backtop></yd-backtop>
        </div>
    </center-content>
</template>
<script>
import search from './search.vue'
import comSearch from "../../../components/com/comSearch.vue"
import centerContent from "../../../components/centerContent.vue"
import http from '../../../libs/httpService.js'
import util from '../../../libs/util.js'
export default {
    //0代表我的订单，1代表部门订单，2代表全部订单
    props: ["param"],
    data() {
        return {
            showMore: false,
            queryParam: {
                invoiceCompany: "",
                customerName: ""
            },
            pageParam: {
                pn: 1,
                pSize: 5,
            },
            invoiceList: []
        }
    },
    components: {
        search,
        comSearch,
        centerContent
    },
    methods: {
        submitHandler(value) {
            if (!!value && !this.queryParam.customerName) {
                this.queryParam.customerName = value;
            }
            this.pageParam.pn = 1;
            this.invoiceList = [];
            this.$refs.orderInfinitescroll.$emit('ydui.infinitescroll.reInit');
            this.loadList();

        },
        goDetail(id) {
            this.$router.push('/invoiceDetail/' + id + "_" + this.param.flag);
        },
        refresh() {
            util.resetObject(this.queryParam);
            this.submitHandler();
        },
        loadList() {
            let url = http.urlCommon + http.apiUrl.most;
            let body = {
                biz_module: this.param.module,
                biz_method: this.param.method,
                biz_param: {
                    pn: this.pageParam.pn,
                    pSize: this.pageParam.pSize,
                }
            };

            body.biz_param = util.mergeObj(this.pageParam, this.queryParam);
            http.commonPost(url, body).then((res) => {

                const _total = res.biz_result.total;
                const _list = res.biz_result.list;
                this.invoiceList = [...this.invoiceList, ..._list];

                if (this.invoiceList.length >= _total || _list.length < this.pageParam.pSize) {
                    /* 所有数据加载完毕 */
                    this.$refs.orderInfinitescroll.$emit('ydui.infinitescroll.loadedDone');
                    return;
                }
                /* 单次请求数据完毕 */
                this.$refs.orderInfinitescroll.$emit('ydui.infinitescroll.finishLoad');
                this.pageParam.pn++;
            }).catch((err) => {});
        }
    },
    created() {
        this.loadList();

    }
}
</script>
<style lang="less" scoped>
.box {
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
