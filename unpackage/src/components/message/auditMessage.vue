<template>
     <div  slot="content" class=content >
          <record v-if="recordParam.show" :param="recordParam"></record>
            <div > 
               <div id="choosable-List">
                <yd-cell-group v-for="item, key in list" title="">
                  <!-- <div class="auditRecord">
                    <span class="auditButton" @click="auditRecord(item,'0')">审核记录</span>
                  </div> -->
                  <yd-cell-item type="checkbox" >
                      <span slot="left" class="listBox" @click.stop="goDetail(item)">
                        <p>
                          {{item.taskDesc}}
                        </p>
                        <p>
                          <span>{{item.date}}</span>
                        </p>
                      </span>
                  </yd-cell-item>
                </yd-cell-group>
                <div v-if="list.length==0" class="tips">
                  暂时还没有通知啊~
                </div>
              </div>
            </div>
         <yd-backtop></yd-backtop>
    </div>
 <!-- </center-content> -->
</template>

<script>
import record from "../../views/order/order/operation/record.vue";
import centerContent from "../../components/centerContent.vue";
import http from "../../libs/httpService.js";
import bus from "../../libs/bus.js";
export default {
  data() {
    return {
      list: [],
      loading: false,
      pn: 1,
      pSize: 4,
      recordParam: {
        show: false
      }
    };
  },
  components: {
    centerContent,
    record
  },
  methods: {
    auditRecord(item) {
      this.recordParam.bizType = item.bizType;
      this.recordParam.bizId = item.bizId;
      this.recordParam.show = true;
      console.log("@@@@@@@@@@@@@@", this.recordParam);
    },
    loadList() {
      let url = http.urlCommon + http.apiUrl.most;
      let body = {
        biz_module: "flowService",
        biz_method: "selectTODOTasks",
        biz_param: {
          // pn: this.pn,
          // pSize: this.pSize
        }
      };
      http
        .commonPost(url, body)
        .then(res => {
          const _list = res.biz_result.list;
          console.log("12435786435", _list);
          this.list = [...this.list, ..._list];
          this.loading = false;
          //   if (_list.length < this.pSize) {
          //     /* 所有数据加载完毕 */
          //     this.$refs.infinitescrollDemo.$emit(
          //       "ydui.infinitescroll.loadedDone"
          //     );
          //     return;
          //   }
          //   /* 单次请求数据完毕 */
          //   this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.finishLoad");
          //   this.pn++;
          console.log("3##############", this.list);
        })
        .catch(err => {});
    },
    goDetail(item) {
      let bizType = item.bizType;
      let bizId = item.bizId;
      if (bizType == "order_supplementary_contract") {
        this.$router.push("/contractDetail/" + bizId + "_1");
      } else if (bizType == "order_invoice_process") {
        this.$router.push("/invoiceDetail/" + bizId + "_1");
      } else if (bizType == "order_after_sales") {
        this.$router.push("/afterSaleDetail/" + bizId + "_1");
      } else {
        // this.$router.push("/afterSaleDetail/" + bizId + "_1");
        this.$dialog.toast({mes: '暂时未提供此功能的详情！', timeout: 1000});
        console.log("点击了订单发货！");
      }
      console.log(item);
    }
  },
  created() {
    let _self = this;
    _self.loadList();
    // console.log(this.$route);
    // bus.$on("reloadCustomer", function() {
    //   console.log("####woshi reloadSupply", this.operateIds, this.popup);
    //   _self.initDate();
    // });
  }
};
</script>

<style lang="less" scoped>
.content {
  background-color: #eee;
  height: 75vh;
  overflow: scroll;
  .auditRecord {
    position: absolute;
    bottom: 0.3vh;
    right: 4vw;
    display: inline-block;
    z-index: 1199999;
    font-size: 0.23rem;
    // color: #ef4f4f;
    border-radius: 10px;
    color: #fff;

    .auditButton {
      width: 1.2rem;
      padding: 0.1rem;
      border-radius: 0.1rem;
      background-color: #5cb85c;
      display: inline-block;
      color: #ffffff;
    }
  }
  .listBox {
    width: 100%;
    p {
      line-height: 30px;
      font-size: 12px;
      display: flex;
      padding: 0.1rem;
    }
    p:nth-child(1) {
      width: 6.5rem;
      font-size: 0.3rem;
      white-space: normal;
    }
  }
}
#choosable-List {
  padding: 10px;
}
.yd-cell .yd-cell-item {
  border-radius: 15px;
}
.yd-cell-box {
  padding: 10px 0;
  background-color: #fff;
  border-radius: 15px;
}
.tips{
margin: 10px;
text-align: center;
font-size: 0.3rem;
}
</style>