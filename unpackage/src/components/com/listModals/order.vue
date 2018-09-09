<template>
    <yd-list theme="1" slot="list">
        <div class="listBox" v-for="item in list" :key="item.id" @click="goDetail(item.id)">
            <p><span>品种:</span> <span>{{item.goodsDesc}}</span></p>
            <p><span>客户名称:</span> <span>{{item.customerName}}</span></p>
            <p><span>客户手机:</span> <span>{{item.customerPhone}}</span></p>
            <p><span>订单状态:</span> <span>{{item.orderStatus | orderstatus}}</span></p>
            <p><span>成交时间:</span> <span>{{item.tradeTime}}</span></p>
        </div>
    </yd-list>
    <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>
    <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />
</template>
<script>
import http from "../../../libs/httpService.js";
import util from "../../../libs/util.js";
export default {
  props: { param: {}, mark: "", list: {} },
  methods: {
    goDetail(id) {
      this.$router.push("/orderDetail/" + id + "_" + this.param.flag);
    },
    loadList(isReset) {
      this.loading = true;
      let url = http.urlCommon + http.apiUrl.most;
      let body = {
        biz_module: "erpOrderService",
        biz_method: this.param.method,
        biz_param: {
          pn: this.pageParam.pn,
          pSize: this.pageParam.pSize
        }
      };

      body.biz_param = util.mergeObj(this.pageParam, this.queryParam);
      if (this.mark == "customer") {
        body.biz_param.customer = this.param.customer;
      }
      http
        .commonPost(url, body)
        .then(res => {
          this.loading = false;
          const _total = res.biz_result.total;
          const _list = res.biz_result.list;
          this.list = [...this.list, ..._list];
          if (
            this.list.length >= _total ||
            _list.length < this.pageParam.pSize
          ) {
            /* 所有数据加载完毕 */
            this.$refs.orderInfinitescroll.$emit(
              "ydui.infinitescroll.loadedDone"
            );
            return;
          }
          /* 单次请求数据完毕 */
          this.$refs.orderInfinitescroll.$emit(
            "ydui.infinitescroll.finishLoad"
          );
          this.pageParam.pn++;
        })
        .catch(err => {
          this.loading = false;
        });
    }
  },
  created() {
    this.loadList();
  }
};
</script>
<style lang="less" scoped>
.listBox {
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

