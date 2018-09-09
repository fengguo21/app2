<template>
    <center-content :showMore="showMore" :showSearch="true" :loading="loading" @query="submitHandler" @refresh="refresh">
        <!-- 搜索 -->
        <search slot="more" :param="queryParam" @query="submitHandler"></search>
        <com-search slot="search" @more="showMore=!showMore" @query="submitHandler"></com-search>
        <div slot="content">
            <yd-infinitescroll :distance="100" ref="orderInfinitescroll" :callback="loadList">
                <yd-list theme="1" slot="list">
                    <div class="box" v-for="item in list" :key="item.id" @click="goDetail(item.id)">
                        <p><span>客户名:</span> <span>{{item.customerName}}</span></p>
                        <p><span>联系方式:</span> <span>{{item.customerPhone}}</span></p>
                        <p><span>品种:</span> <span>{{item.orderDesc}}</span></p>
                        <p><span>差额:</span> <span>{{item.adjusted}}</span></p>
                        <p><span>审核状态:</span> <span>{{item.validate | contractValidate}}</span></p>
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
    props: ["param"],
    data() {
        return {
            showMore: false,
            loading: false,
            queryParam: {
                customerName: "",
                orderDesc: ""
            },
            pageParam: {
                pn: 1,
                pSize: 5,
            },
            searchValue: '',
            list: []
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
            this.list = [];
            this.$refs.orderInfinitescroll.$emit('ydui.infinitescroll.reInit');
            this.loadList();
        },
        goDetail(id) {
            this.$router.push('/contractDetail/' + id + "_" + this.param.flag);
        },
        refresh() {
            util.resetObject(this.queryParam);
            this.submitHandler();
        },

        loadList(isReset) {
            this.loading = true;
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
                this.loading = false;
                const _total = res.biz_result.total;
                const _list = res.biz_result.list;
                this.list = [...this.list, ..._list];
                if (this.list.length >= _total || _list.length < this.pageParam.pSize) {
                    /* 所有数据加载完毕 */
                    this.$refs.orderInfinitescroll.$emit('ydui.infinitescroll.loadedDone');
                    return;
                }
                /* 单次请求数据完毕 */
                this.$refs.orderInfinitescroll.$emit('ydui.infinitescroll.finishLoad');
                this.pageParam.pn++;
            }).catch((err) => {
                this.loading = false;
            });
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
