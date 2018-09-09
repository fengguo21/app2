<template>
    <center-content :showMore="showMore"  :showSearch="!mark" :loading="loading" @query="submitHandler" @refresh="refresh">
        <!-- 搜索 -->
        <search  slot="more" :param="queryParam" @query="submitHandler"></search>
        <com-search  slot="search" @more="showMore=!showMore" @query="submitHandler"></com-search>
        <div slot="content">
            <yd-infinitescroll :callback="loadList" :distance="100" ref="purchaseInfinitescroll">
                <yd-list theme="1" slot="list">
                      <div id="choosable-List">
                        <yd-cell-group v-for="item in intentionList" title="">
                            <yd-cell-item type="checkbox">
                                <span slot="left" class="listBox" @click.stop="goDetail(item.id)">
                                <p><span>求购ID:</span> <span style="white-space: normal;word-break:break-all;">{{item.id}}</span></p>
                                <p><span>客户ID:</span> <span>{{item.customerId}}</span></p>
                                <p><span>客户名称:</span> <span>{{item.customerName}}</span></p>
                                <p><span>客户手机:</span> <span>{{item.customerPhone}}</span></p>
                                <p><span>品种数量:</span> <span>{{item.number}}{{item.unit | unit('cn')}}{{item.breedName}}</span></p>
                                <p><span>求购价格:</span> <span>{{item.price}}元 / {{item.unit | unit('cn')}}</span></p>
                                <p><span>求购规格:</span> <span>{{item.spec}}</span></p>
                                </span>
                                <input slot="right" type="checkbox" :value="item.id" v-model="operateIds" />
                            </yd-cell-item>
                        </yd-cell-group>
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
import search from "./search.vue";
import comSearch from "../../components/com/comSearch.vue";
import centerContent from "../../components/centerContent.vue";
import http from "../../libs/httpService.js";
import util from "../../libs/util.js";
import {mapGetters,mapActions} from "vuex";
export default {
  props: ["param", "mark"],
  data() {
    return {
      loading: false,
      queryParam: {
        customerName: "",
        id: "",
        customerId: "",
        customerPhone: "",
        startTime: "",
        endTime: ""
      },
      pageParam: {
        pn: 1,
        pSize: 10
      },
      showMore: false,
      showMenu: false,
      operateIds: []
    };
  },
  components: {
    search,
    comSearch,
    centerContent
  },
  computed:{
  	...mapGetters(["intentionList"]),
  },
  methods: {
  	...mapActions(["queryIntentionList"]),
    openMenus() {
      this.showMenu = true;
    },
    submitHandler(value) {
      if (!!value && !this.queryParam.customerName) {
        this.queryParam.customerName = value;
      }
      this.pageParam.pn = 1;
      this.$store.state.intention.intentionList=[];
      this.showMenu = false;
      this.$refs.purchaseInfinitescroll.$emit("ydui.infinitescroll.reInit");
      this.loadList();
    },
    menuSelect(currentMenu) {
      //tab跳转
      console.log("筛选");
    },
    goDetail(id) {
      this.$router.push("/orderDetail/" + id + "_" + this.param.flag);
    },
    goBack() {
      let _self = this;
      window.history.go(-1);
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
          type: this.param.type
        }
      };
      this.queryParam.type = this.param.type;
      body.biz_param = util.mergeObj(this.pageParam, this.queryParam);
      if (this.mark == "customer") {
        body.biz_param.customerId = this.param.customerId;
      }
      this.queryIntentionList(body)
      	  .then(res=>{
      	  	  this.loading = false;
	          const _total = res.biz_result.total;
	          const _list = res.biz_result.list;
	          if (
	            _self.intentionList.length >= _total ||
	            _list.length < this.pageParam.pSize
	          ) {
	            /* 所有数据加载完毕 */
	            this.$refs.purchaseInfinitescroll.$emit(
	              "ydui.infinitescroll.loadedDone"
	            );
	            return;
	          }
	          /* 单次请求数据完毕 */
	          this.$refs.purchaseInfinitescroll.$emit(
	            "ydui.infinitescroll.finishLoad"
	          );
	          this.pageParam.pn++;
      	  })
      	  .catch(err=>{
      	  	this.loading = false;
      	  })
    }
  },
  created() {
    this.loadList();
  }
};
</script>
<style lang="less" scoped>
#choosable-List {
  padding: 10px;
  .listBox {
    width: 100%;
    // padding: 10px;
    p {
      line-height: 0.6rem;
      font-size: 0.23rem;
      display: flex;
      span:nth-child(1) {
        display: inline-block;
        width: 27%;
        text-align: right;
      }
      span:nth-child(2) {
        display: inline-block;
        text-indent: 18px;
      }
    }
  }
}
.yd-cell .yd-cell-item {
  border-radius: 15px;
}
.yd-cell-box {
  padding: 10px 0;
  background-color: #fff;
  border-radius: 15px;
}
.yd-popup-content{
    position:absolute;
    top:20%;
}

</style>