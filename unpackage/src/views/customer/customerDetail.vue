<template>
	<div>
   <details-layout :showMore="true" :funcs="funcs" :moreFun="moreFun" :title="title">
      <yd-scrolltab>
				<yd-scrolltab-panel label="基本信息" icon="demo-icons-category1" active>
					<!-- <main-detail :param="dataInfo.supInfo"></main-detail> -->
         <main-detail :customerInfo="customerInfo"></main-detail>
				</yd-scrolltab-panel>

				<yd-scrolltab-panel label="主联系人" icon="demo-icons-category2">
					<main-contact :allContacts="allContact"></main-contact>
				</yd-scrolltab-panel>

				<yd-scrolltab-panel label="全部联系人" icon="demo-icons-category3">
					<all-contact :allContacts="allContact"></all-contact>
				</yd-scrolltab-panel>

				<yd-scrolltab-panel label="主营品种" icon="demo-icons-category4">
					<main-biz-scope :bizScope="customerInfo.bizScope"></main-biz-scope>
				</yd-scrolltab-panel>
				<yd-scrolltab-panel label="客户订单" icon="demo-icons-category5">
          <yd-accordion>
            <yd-accordion-item title="订单列表" >
              <customer-order style="background-color: #eeeeee;"></customer-order>
            </yd-accordion-item>
          </yd-accordion>
				</yd-scrolltab-panel>
				<yd-scrolltab-panel label="客户求购" icon="demo-icons-category6">
          <yd-accordion>
            <yd-accordion-item title="求购列表">
                <!-- <main-biz-scope :bizScope="customerInfo.bizScope"></main-biz-scope> -->
                <customer-intention style="background-color:#eeeeee;"></customer-intention>
              </yd-accordion-item>
          </yd-accordion>
				</yd-scrolltab-panel>
			</yd-scrolltab>
    </details-layout>
    <!-- <div class="titleBar">
			<div class="title">
				全部联系人
				<yd-button type="hollow" @click.native="editCont(1)">设置主联系人</yd-button>
				<yd-button type="hollow" @click.native="editCont(2)">选择编辑联系人</yd-button>
			</div>
		</div> -->
   </details-layout>
		<yd-popup v-model="changeContact.showContact" position="center" width="90%">
			<div class="contain">
				<yd-radio-group v-model="changeContact.id">
					<yd-radio :val='item.id' v-for="(item,index) in allContact" :disabled="item.main == 1" v-if="changeContact.type == 1">{{item.name}}</yd-radio>
					<yd-radio :val='item.id' v-for="(item,index) in allContact" v-if="changeContact.type == 2">{{item.name}}</yd-radio>
				</yd-radio-group>
			</div>
			<div class="comButton">
				<div @click="updateMainContact(changeContact.id)" v-if="changeContact.type == 1">确定</div>
				<div @click="updateContact(changeContact.id)" v-if="changeContact.type == 2">确定</div>
				<div @click="changeContact.showContact = false">取消</div>
			</div>
		</yd-popup>
	</div>
</template>

<script>
import http from "../../libs/httpService.js";
import detailsLayout from "../../components/detailsLayout.vue";
import mainDetail from "./detail/mainDetail.vue";
import mainContact from "./detail/mainContact.vue";
import allContact from "./detail/allContact.vue";
import mainBizScope from "./detail/mainBizScope.vue";
import customerOrder from "./detail/customerOrder.vue";
import customerIntention from "./detail/customerIntention.vue";
export default {
  data() {
    return {
      loading: false,
      title: "客户详情",
      customerInfo: {},
      changeContact: {
        showContact: false,
        radio: 1,
        type: false,
        status: "",
        id: ""
      },
      showMenu: false,
      allContact: {},
      funcs: [
        {
          label: "移出黑名单",
          callback: () => {
            this.transferBlackList(this.customerInfo.id);
          },
          icon: ""
        },
        {
          label: "编辑客户",
          limit: this.$route.query.type == 0 || this.$route.query.type == 1,
          callback: () => {
            this.goto("/editCustomer");
          },
          icon: ""
        },
        {
          label: "新建联系人",
          limit: this.$route.query.type == 0 || this.$route.query.type == 1,
          callback: () => {
            this.addNew("/editContact");
          },
          icon: ""
        }
      ],
      moreFun: [
        {
          label: "设置主联系人",
          limit: this.$route.query.type == 0 || this.$route.query.type == 1,
          callback: () => {
            this.editCont(1);
          }
        },

        {
          label: "编辑联系人",
          limit: this.$route.query.type == 0 || this.$route.query.type == 1,
          callback: () => {
            this.editCont(2);
          }
        },
        {
          label: "客户认证",
          limit: this.$route.query.type == 0,
          callback: () => {
            this.customerAudit();
          }
        },
        {
          label: "企业认证审批",
          limit:
            this.$route.query.type == 1 && this.$route.query.ctype == 1
              ? true
              : false,
          callback: () => {
            this.auditCustomer("/auditSupply", 1);
          },
          icon: ""
        },
        {
          label: "个人认证审批",
          limit:
            this.$route.query.type == 1 && this.$route.query.utype == 1
              ? true
              : false,
          callback: () => {
            this.auditCustomer("/auditSupply", 0);
          },
          icon: ""
        }
      ]
    };
  },
  components: {
    detailsLayout,
    mainDetail,
    mainContact,
    allContact,
    mainBizScope,
    customerOrder,
    customerIntention
  },
  props: {},
  methods: {
    customerAudit() {
      this.$router.push(
        "/renzhengSupply?id=" +
          this.customerInfo.id +
          "&utype=" +
          this.customerInfo.uAudit +
          "&ctype=" +
          this.customerInfo.cAudit
      );
    },
    //求购
    cusBegBuy() {
      this.$router.push("/customerIntentionList?id=" + this.customerInfo.id);
    },
    // 客户订单
    cusOrder() {
      this.$router.push("/customerOrderList?id=" + this.customerInfo.id);
    },
    //新建联系人
    addNew(link) {
      this.$router.push(link + "?id=" + this.customerInfo.id + "&type=add");
    },
    goto(link) {
      this.$router.push(link + "?id=" + this.customerInfo.id);
    },
    //返回
    goBack() {
      let _self = this;
      window.history.go(-1);
      console.log("----------------返回-----------------");
    },
    //修改主要联系人
    editCont(item) {
      this.changeContact.type = item;
      this.changeContact.showContact = true;
    },
    //编辑联系人
    updateContact(item) {
      this.changeContact.showContact = false;
      this.changeContact.status = "edit";
      this.$router.push("/editContact?id=" + item + "&type=edit");
    },
    //下载数据
    loadDetail() {
      let url = http.addSID(http.urlCommon + http.apiUrl.most);
      let body = {
        biz_module: "erpCustomerService",
        biz_method: "queryCustomerInfo",
        biz_param: {
          id: this.$route.query.id
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
          this.customerInfo = res.biz_result;
          this.allContact = res.biz_result.contactList;
          let scope = this.customerInfo.bizScope;
            // console.log("我是detail",this.customerInfo,scope);
          scope = scope.replace(/\s+/g, " ");
          this.customerInfo.bizScope = scope.split(" ");
          this.funcs[0].label =
            this.customerInfo.blacklist == 0 ? "加入黑名单" : "移出黑名单";
        })
        .catch(err => {});
    },

    //黑名单操作
    transferBlackList(value) {
      let url = http.addSID(http.urlCommon + http.apiUrl.most);
      let body = {
        biz_module: "erpCustomerService",
        biz_method: "batchTransferBlackList",
        biz_param: {
          customerIds: [value],
          blacklist: this.customerInfo.blacklist == "0" ? "1" : "0"
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
          this.loadDetail();
          this.blacklist = this.customerInfo.blacklist;
        })
        .catch(err => {});
    },
    //设置主要联系人
    updateMainContact(item) {
      this.changeContact.showContact = false;
      let url = http.addSID(http.urlCommon + http.apiUrl.most);
      let body = {
        biz_module: "erpCustomerContactService",
        biz_method: "updateMainContact",
        biz_param: {
          id: item,
          customerId: this.customerInfo.id
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
          this.$dialog.toast({
            mes: res.msg
          });
          this.loadDetail();
        })
        .catch(err => {});
    },
    auditCustomer(link, type) {
      let _self = this;
      let url = link + "?id=" + this.$route.query.id + "&type=" + type;
      _self.$router.push(url);
    }
  },
  created() {
    this.loadDetail();
    console.log("2211111111111111111111", this.$route.query);
    // this.blacklist = this.customerInfo.blacklist;
  }
};
</script>

<style lang="less" scoped>
.titleBar {
  .title {
    margin-top: 10px;
    line-height: 40px;
    color: #666;
    font-size: 20px;
    padding: 0 10px;
  }
}

.bottom {
  width: 100%;
  display: flex;
  text-align: center;
  color: #666;
  line-height: 0.8rem;
  .button {
    flex: 1;
  }
}

.contain {
  margin: 20px 0;
  text-align: center;
}

.comButton {
  display: flex;
  border-top: 1px solid rgba(230, 230, 230, 0.4);
  & > div {
    padding: 10px 0;
    text-align: center;
    flex: 1;
    background-color: gray;
  }
}


.others {
  padding: 10px;
}
.yd-cell-right {
  span {
    display: inline-block;
    width: 100%;
    text-align: left;
  }
}
</style>