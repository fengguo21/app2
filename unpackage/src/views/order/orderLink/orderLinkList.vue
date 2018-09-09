<template>
    <center-content :showMore="showMore" :showSearch="true" :loading="loading" @query="submitHandler" @refresh="refresh">
        <!-- 搜索 -->
        <search slot="more" :param="queryParam" @query="submitHandler"></search>
        <com-search slot="search" @more="showMore=!showMore" @query="submitHandler"></com-search>
        <div slot="content">
            <yd-infinitescroll :distance="100" ref="orderInfinitescroll" :callback="loadList">
                <yd-list theme="1" slot="list">
                    <div class="box" v-for="item in list" :key="item.id">
                        <p><span><yd-checkbox v-model="item._checked">{{item._checked?"选中":"未选中"}}</yd-checkbox></span> </p>
                        <p><span>销售订单ID:</span> <span>{{item.sellId}}</span></p>
                        <p><span>品种:</span> <span>{{item.breedName}}</span></p>
                        <p><span>数量:</span> <span>{{item.number}}{{item.unit | unit('cn')}}</span></p>
                        <p><span>销售订单业务员:</span> <span>{{item.sellEmployeeName}}</span></p>
                        <p><span>创建时间:</span> <span>{{item.ctime}}</span></p>
                    </div>
                </yd-list>
                <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>
                <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />
            </yd-infinitescroll>
            <yd-backtop></yd-backtop>
            <!-- 生成订单页面（编辑订单页面） -->
            <create-order :param="orderParam" v-if="orderParam.show" @query="submitHandler"></create-order>
        </div>
    </center-content>
</template>
<script>
import Vue from 'vue'
import search from './search.vue'
import comSearch from "../../../components/com/comSearch.vue"
import centerContent from "../../../components/centerContent.vue"
import createOrder from "./createOrder.vue"
import http from '../../../libs/httpService.js'
import util from '../../../libs/util.js'
import bus from "../../../libs/bus.js";
export default {
    props: ["param"],
    data() {
        return {
            showMore: false,
            queryParam: {
                customerName: "",
                orderDesc: ""
            },
            pageParam: {
                pn: 1,
                pSize: 5,
            },
            list: [],
            orderParam: {
                show: false,
                goodsList: []
            }
        }
    },
    components: {
        search,
        comSearch,
        centerContent,
        createOrder
    },
    methods: {
        openMenus() {
            this.showMenu = true;
        },
        submitHandler(value) {
            this.pageParam.pn = 1;
            this.list = [];
            this.$refs.orderInfinitescroll.$emit('ydui.infinitescroll.reInit');
            this.loadList();
        },

        refresh() {
            util.resetObject(this.queryParam);
            this.submitHandler();
        },
        createOrder() {
            this.orderParam.goodsList = [];
            for (let i = 0; i < this.list.length; i++) {
                if (this.list[i]._checked) {
                    let item = this.list[i];
                    this.orderParam.goodsList.push({
                        id: item.id,
                        breedId: item.breedId,
                        breedName: item.breedName,
                        quality: item.quality,
                        location: item.location,
                        spec: item.spec,
                        number: item.number,
                        price: 0,
                        unit: item.unit,
                    });
                }
            }
            if (this.orderParam.goodsList.length == 0) {
                this.$dialog.toast({
                    mes: '请至少选择一个条目',
                    timeout: 1500,
                    icon: 'error'
                });
            } else {
                this.orderParam.show = true;
            }

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
                for (let i = 0; i < _list.length; i++) {
                    Vue.set(_list[i], "_checked", false);
                }
                this.list = [...this.list, ..._list];

                if (this.list.length >= _total || _list.length < this.pageParam.pSize) {
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
    mounted() {

        this.$nextTick(function() {
            if (this.param.flag == 0) {
                let _this = this;
                // 设置页面右上角更多操作功能项
                bus.$emit('more-operation', [{
                    title: '生成订单',
                    callback: _this.createOrder,
                    icon: 'jia-xianxingfangkuang'

                }]); //触发事件

            }

        })
    },
    beforeDestroy() {
        //清空操作列表
        bus.$emit('more-operation', []);

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
