<template>
    <center-content :showMore="false" :loading="loading" @query="submitHandler" @refresh="refresh">
        <search slot="more" :param="queryParam" @query="submitHandler"></search>
        <div slot="content">
            <div slot="search">
                <yd-button-group>
                    <button class="yd-btn" :class="{'yd-btn-primary':queryParam.type==0,'yd-btn-hollow':queryParam.type!=0}" @click="selectType(0)">待处理</button>
                    <button class="yd-btn" :class="{'yd-btn-primary':queryParam.type==1,'yd-btn-hollow':queryParam.type!=1}" @click="selectType(1)">已处理</button>
                </yd-button-group>
            </div>
            <yd-infinitescroll :distance="100" ref="orderInfinitescroll" :callback="loadList">
                <yd-list theme="1" slot="list">
                    <div class="box" v-for="item in list" :key="item.id">
                        <p><span>创建时间:</span> <span>{{item.date}}</span></p>
                        <p><span>业务类型:</span> <span>{{item.bizType | bizType}}</span></p>
                        <p><span>任务阶段:</span> <span>{{item.taskKey | taskKey}}</span></p>
                        <p><span>任务描述:</span> <span>{{item.taskDesc}}</span></p>
                        <p>
                            <yd-button type="primary" @click.native="showRecord(item)">审核记录</yd-button>
                            <yd-button type="danger" @click.native="showDetail(item.bizId,item.bizType)">详情</yd-button>
                            <!-- 订单审核 -->
                            <span v-if="item.bizType=='order_validate'&&queryParam.type==0">
                                <yd-button type="primary" v-if="item.taskKey!='employee_handle'" @click.native="commonHandle(item)">审核</yd-button>
                                <yd-button type="primary" v-else @click.native="reapplyValidate(item)">重新申请</yd-button>
                            </span>
                            <!-- 补充合同 -->
                            <span v-if="item.bizType=='order_supplementary_contract'&&queryParam.type==0">
                                <yd-button type="primary" v-if="item.taskKey=='supplementary_contract_governor_validate'" @click.native="commonHandle(item)">补充合同审核</yd-button>
                                <a v-if="item.taskKey=='supplementary_contract_employee_handle'" @click="showAudit(item)">重新申请</a>
                            </span>
                            <!-- 售后 -->
                            <div v-if="item.bizType=='order_after_sales'&&queryParam.type==0">
                                <!-- 售后审核 -->
                                <a v-if="item.taskKey=='after_sales_governor_validate'" @click="afterSalesAudit(item)">售后审核</a>
                                <!-- 售后收货 -->
                                <a v-if="item.taskKey=='after_sales_receipt'" @click="afterSalesReceive(item)">确认收货</a>
                                <!-- 售后发货 -->
                                <a v-if="item.taskKey=='after_sales_resend'" @click="afterSalesSend(item)">重新发货</a>
                                <!-- 售后重新申请 -->
                                <a v-if="item.taskKey=='after_sales_employee_handle'" @click="afterSalesReapply(item)">重新申请</a>
                            </div>
                            <!-- 订单取消 -->
                            <div v-if="item.bizType=='order_cancel'&&queryParam.type==0">
                                <a v-if="item.taskKey=='order_cancel_governor_validate'" @click="cancelOrderByFlow(item)">审核</a>
                                <a v-if="item.taskKey=='order_cancel_reapply'" @click="cancelOrderReapply(item)">重新申请</a>
                                <a v-if="item.taskKey=='order_cancel_receipt'" @click="cancelOrderReceipt(item)">收货</a>
                            </div>
                        </p>
                    </div>
                </yd-list>
                <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>
                <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />
            </yd-infinitescroll>
            <record v-if="recordParam.show" :param="recordParam"></record>
            <common-operation v-if="commonParam.show" :param="commonParam" @query="submitHandler"></common-operation>
            <yd-backtop></yd-backtop>
        </div>
    </center-content>
</template>
<script>
import search from './search.vue'
import centerContent from "../../../components/centerContent.vue"
import record from "../order/operation/record.vue"
import commonOperation from "./commonOperation.vue"
import http from '../../../libs/httpService.js'
import util from '../../../libs/util.js'
export default {
    props: ["flag"],
    data() {
        return {
            queryParam: {
                customerName: "",
                orderDesc: "",
                type: 0, //0/1 待处理/已处理
            },
            pageParam: {
                pn: 1,
                pSize: 5,
            },
            list: [],
            recordParam: {
                show: false,
                bizType: "",
                bizId: "",

            },
            commonParam: {
                show: false,
                taskId: "",
                passname: "", //对应的按钮显示的汉字，默认"通过"，对应result=1
                rejectname: "", //对应的按钮显示的汉字，默认"不通过"，对应result=0
            },
            auditValidateParam: {
                show: false,
                taskId: "",

            }

        }
    },
    components: {
        search,
        centerContent,
        record,
        commonOperation
    },
    methods: {
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
        selectType(type) {
            this.queryParam.type = type;
            this.submitHandler();
        },
        showRecord(item) {
            this.recordParam.bizType = item.bizType;
            this.recordParam.bizId = item.bizId;
            this.recordParam.show = true;
        },
        showDetail(id, type) {
            if (type == "order_validate") {
                this.$router.push('/orderDetail/' + id + "_2");
            }
            if (type == "order_supplementary_contract") {
                this.$router.push('/contractDetail/' + id + "_2");
            }
            if (type == "order_after_sales") {
                this.$router.push('/afterSaleDetail/' + id + "_2");
            }
        },
        commonHandle(item) {
            this.commonParam.taskId = item.taskId;
            this.commonParam.show = true;
        },
        reapplyValidate(item) {
            this.commonParam.taskId = item.taskId;
            this.commonParam.passname = "取消订单";
            this.commonParam.rejectname = "重新申请";
            this.commonParam.show = true;
        },
        loadList(isReset) {
            let url = http.urlCommon + http.apiUrl.most;
            let body = {
                biz_module: 'flowService',
                biz_method: 'todoTasks',
                biz_param: {
                    pn: this.pageParam.pn,
                    pSize: this.pageParam.pSize,
                }
            };
            if (this.queryParam.type == 1) {
                body.biz_method = "doneTasks";
            }
            body.biz_param = util.mergeObj(this.pageParam, this.queryParam);
            http.commonPost(url, body).then((res) => {

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

.selected {
    background-color: red;
}
</style>
