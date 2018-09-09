<!--
  客户列表
-->
<template>
    <center-content :showMore="showMore" :showSearch="true" :loading="loading" @query="submitHandler" @refresh="refresh">
      <customer-filtrate :param="keyWord"   @query="submitHandler" slot="more"></customer-filtrate>
      <com-search  slot="search" @more="showMore=!showMore" @query="submitHandler"></com-search>
      <!-- <i class="icon iconfont icon-jia" style="margin-left:0.2rem;font-size:0.6rem;opacity:0.6" @click="addCustomer" slot="funcMenu" v-if="funcType=='0'"></i> -->
      <div slot="content">
        <!--新增客户按钮 -->
        <!-- <yd-icon name="jia-xianxingyuankuang" v-if="funcType==0" slot="right" style="right:0.5rem;top:2rem;position:fixed;z-index:9999;color:red;opacity:0.4;" @click.native="addCustomer" custom ></yd-icon> -->
        <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
          <yd-list theme="1" slot="list">
            <div id="choosable-List">
              <yd-cell-group v-for="item,key in list" title="" >
                <!-- <div style="position:absolute;top:5px;right:10px;z-index:1199999;" @click="test()">置顶</div> -->
                <span v-if="funcType!=2">
                  <i v-if="item.sort!=0" class="sortTop icon iconfont icon-cuowuguanbiquxiao-xianxingyuankuang" @click="sortToTop(item.id,'0')">取消置顶</i>
                  <i v-else class="sortReset icon iconfont icon-xiangshangshouqi-xianxingyuankuang" @click="sortToTop(item.id,'1')">置顶</i>
                </span>
                <yd-cell-item type="checkbox" >
                  <span slot="left" class="listBox" @click.stop="goDetail(item)">
                    <p>
                      <span>客&nbsp;&nbsp;户&nbsp;&nbsp;id:</span> 
                      <span>
                        {{item.id}}
                      </span>
                    </p>
                    <p>
                      <span>客户名称:</span> 
                      <span>
                        <!-- <i v-if="item.uAudit==2">个</i><i v-if="item.cAudit==2">企</i> -->
                        {{item.name}}
                      </span>
                    </p>
                    <p><span>客户类型:</span> <span>{{item.type | customerType }}</span></p>
                    <p><span>联&nbsp;&nbsp;系&nbsp;&nbsp;人:</span> <span>{{item.mainContact}}</span></p>
                    <p><span>手&nbsp;&nbsp;机&nbsp;&nbsp;号:</span> <span>{{item.mainPhone}}</span></p>
                    <p><span>主营品种:</span> <span>{{item.bizScope?item.bizScope:"无"}}</span></p>
                    <p><span>认证状态:</span> <span class="renzheng">
														<span :class="item.cAudit==3?'false':item.cAudit==2?'succee':item.cAudit==1?'underWay':'none'"><i>企业</i>{{item.cAudit | approve}}</span>
														<span :class="item.uAudit==3?'false':item.uAudit==2?'succee':item.uAudit==1?'underWay':'none'"><i>个人</i>{{item.uAudit | approve}}</span>
													</span></p>
                  </span>
                  <input  type="checkbox" slot="right" :value="item" v-model="operateIds" />
                    <!-- <i class="icon iconfont icon-huidingbu" slot="center">置顶</i> -->
                </yd-cell-item>
              </yd-cell-group>
            </div>
          </yd-list>
          <span slot="doneTip">
          没有啦，都到底啦~
          </span>
          <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />
        </yd-infinitescroll>
        <yd-backtop></yd-backtop>
        <!-- 划转-->
        <yd-popup v-model="popup.show" position="right" width="60%">
          <search-transfer :param="popup" :operateIds="customerIds"></search-transfer>
        </yd-popup>
        <!-- 黑名单 -->
        <yd-popup v-model="blacklist.show" position="center" width="80%">
            <p style="padding:10px">
               <yd-textarea slot="right" v-model="blacklist.blackComments" placeholder="请输入划转原因!" maxlength="100"></yd-textarea>
            </p>
            <p style="text-align:center;padding:5px">
              <yd-button type="danger" @click.native="blacklist.show=false">取消</yd-button>
              <yd-button type="primary" @click.native="confirmBlacklist">确认</yd-button>
            </p>
        </yd-popup>
      </div>
    </center-content>
</template>
<script>
import customerFiltrate from "../slideBar/customerFiltrate.vue";
import searchTransfer from "../../components/com/searchTransfer.vue";
import centerContent from "../../components/centerContent.vue";
import comSearch from "../../components/com/comSearch.vue";
import http from "../../libs/httpService.js";
import bus from "../../libs/bus.js";

export default {
  data() {
    return {
      loading: false,
      blacklist: {
        blackComments: "",
        show: false
      },
      popup: {
        show: false,
        person: []
      },
      operateIds: [],
      customerIds: [],
      showMore: false,
      keyWord: {
        funcType: this.funcType == "0",
        searchStatus: false,
        id: "",
        name: "",
        phone: "",
        type: "",
        bizScope: "",
        ctimeStart: "",
        ctimeEnd: ""
      },

      showMenu: false,
      pn: 1,
      pSize: 15,
      list: []
    };
  },
  props: {
    funcType: {
      type: String,
      default: "0"
    }
  },
  components: {
    customerFiltrate,
    centerContent,
    comSearch,
    searchTransfer
  },
  methods: {
    //置顶
    sortToTop(id, sortVal) {
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~", id, sortVal);
      let url = http.urlCommon + http.apiUrl.most;
      let body = {
        biz_module: "erpCustomerService",
        biz_method: "customerSortTopOrReset",
        biz_param: {
          id: id,
          sort: sortVal
        }
      };
      http
        .commonPost(url, body)
        .then(res => {
          this.initDate();
        })
        .catch(err => {});
    },
    //提交认证申请
    applyAudit() {
      console.log("1111111111111", this);
      if (this.operateIds.length == 0 || this.operateIds.length > 1) {
        this.$dialog.alert({ mes: "必须且只能选择一个客户呦！" });
      } else {
        this.$router.push(
          "/renzhengSupply?id=" +
            this.operateIds[0].id +
            "&utype=" +
            this.operateIds[0].uAudit +
            "&ctype=" +
            this.operateIds[0].cAudit
        );
      }
    },
    // 新建客户
    addCustomer(event) {
      this.$router.push("/addCustomer/add");
    },
    // 打开菜单
    openMenus() {
      this.showMenu = true;
    },
    // 提交
    submitHandler(value) {
      console.log("8888888888888888",value,this.keyWord)
      this.keyWord.searchStatus = true;

      if (value) {
        this.keyWord.name = value;
      }
      this.pn = 1;
      this.list = [];
      this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.reInit");
      console.log("**************&", this.keyWord);
      this.loadList();
    },
    refresh() {
      this.submitHandler();
    },
    //更多搜索
    // menuSelect(currentMenu) {
    //   //tab跳转
    //   this.showMenu = false;
    //   this.pn = 1;
    //   this.list = [];
    //   this.loadList();
    // },
    // 进入详情
    goDetail(item) {
      console.log("这是进入详情-", this.$route);
      this.$router.push(
        "/customerDetail?id=" +
          item.id +
          "&type=" +
          this.$route.query.id +
          "&ctype=" +
          item.cAudit +
          "&utype=" +
          item.uAudit
      );
    },
    // 返回
    goBack() {
      let _self = this;
      window.history.go(-1);
      console.log("----------------返回-----------------");
    },
    // 初始化日期
    initDate() {
      this.pn = 1;
      this.list = [];
      this.keyWord.searchStatus = false;
      this.keyWord.id = "";
      this.keyWord.name = "";
      this.keyWord.phone = "";
      this.operateIds = [];
      this.customerIds = [];
      this.popup = {
        show: false,
        person: []
      };
      this.loadList();
    },
    loadList() {
      //获取员工数据
      let employeeId = localStorage.getItem("employeeId");
      let orgId = localStorage.getItem("orgid");

      let url = http.urlCommon + http.apiUrl.most;
      let body = {
        biz_module: "erpCustomerService",
        biz_method: "queryCustomerList",
        biz_param: {
          pn: this.pn,
          pSize: this.pSize,
          customerPool: "0",
          supplier: "0",
          id: this.keyWord.searchStatus ? this.keyWord.id : "",
          name: this.keyWord.searchStatus ? this.keyWord.name : "",
          mainPhone: this.keyWord.searchStatus ? this.keyWord.phone : "",
          type: this.keyWord.searchStatus ? this.keyWord.type : "",
          bizScope: this.keyWord.searchStatus ? this.keyWord.bizScope : "",
          ctimeStart: this.keyWord.searchStatus ? this.keyWord.ctimeStart : "",
          ctimeEnd: this.keyWord.searchStatus ? this.keyWord.ctimeEnd : "",
          employeeId: this.funcType == 0 ? employeeId : "",
          orgId: this.funcType == "1" ? orgId : "",
          blacklist: 0
        }
      };
      //外源客户池
      if (this.funcType == "3") {
        body.biz_param.orgId = "-1";
        body.biz_param.employeeId = "-1";
        body.biz_param.supplier = ""; //供应商也在其中
      }
      //黑名单
      if (this.funcType == "4") {
        body.biz_param.blacklist = "1";
        body.biz_param.supplier = "";
      }
      //客户池
      if (this.funcType == "7") {
        body.biz_param.customerPool = "1";
      }
      http
        .commonPost(url, body)
        .then(res => {
          const _list = res.biz_result.list;
          this.list = [...this.list, ..._list];
          this.loading = false;
          if (_list.length < this.pSize) {
            /* 所有数据加载完毕 */
            this.$refs.infinitescrollDemo.$emit(
              "ydui.infinitescroll.loadedDone"
            );
            return;
          }
          /* 单次请求数据完毕 */
          this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.finishLoad");
          this.pn++;
        })
        .catch(err => {});
    },
    // 提取为药推客
    extractYaoTuiKe() {
      console.log("我是提取药推客！");
    },
    // 加入到黑名单
    addToBlackList() {
      if (this.operateIds.length == 0) {
        this.$dialog.alert({ mes: "至少选择一个客户呦！" });
      } else {
        this.blacklist.show = true;
      }
    },
    //确认转到黑名单
    confirmBlacklist() {
      this.transferBlacklist("1");
    },
    // 移出黑名单
    removeFromBlacklist() {
      if (this.operateIds.length == 0) {
        this.$dialog.alert({ mes: "至少选择一个客户呦！" });
      } else {
        this.blacklist.show = true;
        // this.transferBlacklist("0");
      }
    },
    //批量划转黑名单
    transferBlacklist(val) {
      // this.$dialog.confirm({
      //   title: "计入人",
      //   mes: "我有一个小毛驴我从来也不骑！",
      //   opts: () => {
      //     this.$dialog.toast({ mes: "你点了确定", timeout: 1000 });
      //   }
      // });
      let url = http.addSID(http.urlCommon + http.apiUrl.most);
      for (let item of this.operateIds) {
        this.customerIds.push(item.id);
      }
      let body = {
        biz_module: "erpCustomerService",
        biz_method: "batchTransferBlackList",
        biz_param: {
          customerIds: this.customerIds,
          blacklist: val,
          blackComments: val == "1" ? this.blacklist.blackComments : ""
        }
      };

      body.time = Date.parse(new Date()) + parseInt(http.difTime);
      body.sign = http.getSign(
        "biz_module=" +
          body.biz_module +
          "&biz_method=" +
          body.biz_method +
          "&time=" +
          body.time
      );
      http
        .commonPost(url, body)
        .then(res => {
          this.operateIds = [];
          this.customerIds = [];
          this.blacklist.show = false;
          this.initDate();
        })
        .catch(err => {});
      //清空客户id
    },
    // 划转
    chooseTransfer() {
      // console.log(this.operateIds);
      if (this.operateIds.length) {
        this.popup.show = true;
        for (let item of this.operateIds) {
          this.customerIds.push(item.id);
        }
        this.loadTransfer();
      } else {
        this.$dialog.toast({
          mes: "请先选择至少一个客户"
        });
      }
    },
    //选择划转人
    loadTransfer() {
      this.loading = true;
      let url = http.urlCommon + http.apiUrl.most;
      let body = {
        biz_module: "employService",
        biz_method: "queryEmployeeList",
        biz_param: {
          orgId: localStorage.getItem("orgid"),
          mobile: "",
          name: "",
          leave: 1
        }
      };
      http
        .commonPost(url, body)
        .then(res => {
          this.popup.person = res.biz_result.list;
        })
        .catch(err => {});
    },
    // 划转到客户池
    transferToPool() {
      if (this.operateIds.length == 0) {
        this.$dialog.alert({ mes: "请选择一个客户呦！" });
      } else {
        let _self = this;
        for (let item of this.operateIds) {
          this.customerIds.push(item.id);
        }
        let url = http.urlCommon + http.apiUrl.most;
        let body = {
          biz_module: "erpCustomerService",
          biz_method: "customersTransferPool",
          biz_param: {
            ids: this.customerIds
          }
        };
        http
          .commonPost(url, body)
          .then(res => {
            this.initDate();
          })
          .catch(err => {});
      }
    }
  },

  watch: {
    // funcType: function(val) {
    //   this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.reInit");
    //   this.initDate();
    // }
  },
  mounted() {
    this.$nextTick(function() {
      if (this.$route.query.id == 0) {
        let _this = this;
        // 设置页面右上角更多操作功能项
        bus.$emit("more-operation", [
          {
            title: "新建客户",
            callback: _this.addCustomer,
            icon: "jia-xianxingfangkuang"
          },
          {
            title: "认证申请",
            callback: _this.applyAudit,
            icon: "yonghuziliao-xianxing"
          },
          //
          {
            title: "加入黑名单",
            callback: _this.addToBlackList,
            icon: "weichuqin"
          }
        ]); //触发事件
      }
      if (this.$route.query.id == 1 || this.$route.query.id == 2) {
        let _this = this;
        bus.$emit("more-operation", [
          {
            title: "划转",
            callback: _this.chooseTransfer,
            icon: "jia-xianxingfangkuang"
          },
          {
            title: "划转到客户池",
            callback: _this.transferToPool,
            icon: "jia-xianxingfangkuang"
          },
          {
            title: "加入黑名单",
            callback: _this.addToBlackList,
            icon: "weichuqin"
          }
        ]);
      }
      if (this.$route.query.id == 3) {
        let _this = this;
        bus.$emit("more-operation", [
          {
            title: "划转",
            callback: _this.chooseTransfer,
            icon: "jia-xianxingfangkuang"
          },
          {
            title: "提取供应商",
            callback: _this.addCustomer,
            icon: "jia-xianxingfangkuang"
          }
        ]);
      }
      if (this.$route.query.id == 4) {
        let _this = this;
        bus.$emit("more-operation", [
          {
            title: "移出黑名单",
            callback: _this.removeFromBlacklist,
            icon: "jia-xianxingfangkuang"
          }
        ]);
      }

      if (this.$route.query.id == 7) {
        let _this = this;
        bus.$emit("more-operation", [
          {
            title: "划转",
            callback: _this.chooseTransfer,
            icon: "jia-xianxingfangkuang"
          }
        ]);
      }
    });
  },
  beforeDestroy() {
    //清空操作列表
    bus.$emit("more-operation", []);
  },
  created() {
    let _self = this;
    _self.loadList();
    console.log(this.$route);
    bus.$on("reloadCustomer", function() {
      console.log("####woshi reloadSupply", this.operateIds, this.popup);
      _self.initDate();
    });
  }
};
</script>
<style lang="less" scoped>
.listBox {
  width: 100%;

  p {
    line-height: 30px;
    font-size: 12px;
    display: flex;
    // span:nth-child(1) {
    //   display: inline-block;
    // }
    // span:nth-child(2) {
    //   i {
    //     //认证标签
    //     font-weight: bold;
    //     border: 1px solid green;
    //     color: green;
    //     width: 0.1rem;
    //     height: 0.1rem;
    //   }
    //   display: inline-block;
    //   text-indent: 7px;
    // }
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
.sortTop {
  position: absolute;
  top: 0.1rem;
  right: 0.2rem;
  z-index: 1199999;
  font-size: 0.23rem;
  // color: #ef4f4f;
  padding: 0.15rem;
  border-radius: 10px;
  background-color: #f90;
  color: #fff;
}
.sortReset {
  position: absolute;
  top: 5px;
  right: 10px;
  z-index: 1199999;
  font-size: 0.23rem;
  // color: #ef4f4f;
  padding: 0.15rem;
  border-radius: 10px;
  background-color: #04be02;
  color: #fff;
}
#choosable-List {
  padding: 10px;
}
.renzheng {
  span {
    border: 1px solid #f88f19;
    padding: 0 5px;
    color: #f88f19;
    i {
      margin-right: 5px;
      color: #f88f19;
    }
    &.false {
      border: 1px solid #f00;
      color: #f00;
      i {
        color: #f00;
      }
    }
    &.succee {
      border: 1px solid #32c862;
      color: #32c862;
      i {
        color: #32c862;
      }
    }
    &.none {
      border: 1px solid grey;
      color: grey;
      i {
        color: grey;
      }
    }
  }
}
</style>