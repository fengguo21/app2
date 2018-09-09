<template>
  <div class="offerList" v-bind:class="{'activePage':state}">
    <div class="tab" v-if="state">
    <yd-tab :callback="tabCallback">
      <yd-tab-panel :label="item.label" :tabkey="item.tabkey" v-for="(item,index) in tab" :active="item.active"></yd-tab-panel>
    </yd-tab>
    </div>
	<center-content :showMore="showMore" :showSearch="true"  :loading="loading" @query="submitHandler" @refresh="refresh"  @clear="clearParam">
		<search slot="more" :param="keyWord" @query="submitHandler"></search>
		<com-search slot="search" @more="showMore=!showMore" @query="submitHandler"></com-search>
		<div slot="content">
    <sample-Received :param="receivedParam" v-if="receivedParam.show" @confrim-back="confrimedBack"></sample-Received>
		<!-- .................待寄样标签....................... -->
		<!--   <div class="tab" v-if="state">
      <yd-tab :callback="tabCallback">
        <yd-tab-panel :label="item.label" :tabkey="item.tabkey" v-for="(item,index) in tab" :active="item.active"></yd-tab-panel>
      </yd-tab>
    </div> -->
		<!-- .................内容..................... -->
			<yd-popup v-model="show1" position="center" width="90%">
					<p style="padding:.2rem 0 ;text-align:center;font-size:.3rem;border-bottom:1p
					 solid #eee">
					价格确认      
					</p>
					<div style="padding-top:.3rem;text-align:center;">
						<yd-radio-group v-model="radio5">
							<yd-radio val="151">改变</yd-radio>
							<yd-radio val="160">不变</yd-radio>
						</yd-radio-group>
					</div>
					<p style="padding:.1rem 0;color:#666;height:1rem;" v-if="radio5=='151'">
						<yd-cell-item>
							<yd-input slot="right" placeholder="请输入当前价格" v-model="price" ></yd-input>
						</yd-cell-item> 
					</p>
					<p style="padding:.1rem 0;color:#666;height:1rem;" v-if="radio5=='160'">
					</p>
					<p class="unable-p">
						<yd-button  type="warning" class="unable-btn" style="margin-right:.2rem;" @click.native="show1=false;">取消</yd-button>
						<yd-button  type="primary" class="unable-btn" style="margin-left:.1rem;" @click.native="confirmPrice()">确定</yd-button>
					</p>
			</yd-popup> 
      <!-- ..............无法复用。。。。。。。。 -->
      <yd-popup v-model="show2" position="center" width="90%">
          <p style="padding:.2rem 0 ;text-align:center;font-size:.3rem;border-bottom:1p
           solid #eee">
          确定无法复用？      
          </p>
          <p style="padding:.1rem 0;color:#666;height:2.5rem;">
            <yd-cell-item>
              <yd-textarea slot="right" placeholder="请输入原因" v-model="reason" style="border:1px solid #ccc;padding:.2rem;" maxlength="100"></yd-textarea>
            </yd-cell-item> 
          </p>
          <p class="unable-p">
            <yd-button  type="warning" class="unable-btn" style="margin-right:.2rem;" @click.native="show2=false;">取消</yd-button>
            <yd-button  type="primary" class="unable-btn" style="margin-left:.1rem;" @click.native="unRepeat()">确定</yd-button>
          </p>
      </yd-popup> 
        <!-- ................................................. -->
			<yd-infinitescroll :callback="loadList" :loading="loading" ref="orderInfinitescroll">
				<yd-list theme="1" slot="list">
					<div id="choosable-List">
						<div class="box" v-for="item in publicList"> 
							<yd-cell-group title="">
								<div class="publicBox">
									<yd-cell-item type="checkbox">

										<div slot="left" class="listBox" @click.prevent="goDetail(item)">

											<div class="text">
												<span class="title">报价ID:</span>
												<span>{{item.id}}</span>
											</div>
											<div class="text">
												<span class="title">品种:</span>
												<span>{{item.breedName}}</span>
											</div>
											<div class="text">
												<span class="title">供应商ID:</span>
												<span>{{item.offerCustomer}}</span>
											</div>
											<div class="text">
												<span class="title">供应商信息:</span>
												<span style="display:inline-block;white-space:normal;">{{item.offerCustomerName }}</span>
											</div>
											<div class="text">
												<span class="title">报价业务员:</span>
												<span>{{item.offerEmployeeName }}</span>
											</div>
											<div class="text">
												<span class="title">处理状态:</span>
												<span style="color:#09BB07;">{{item.state | newOfferAccept }}</span>
											</div>
											<div class="text">
												<span class="title">操作指引:</span>
												<span style="color:#EA6512;display:inline-block;white-space:normal;">{{item.stateDescription }}</span>
											</div>
											<div class="text">
												<span class="title">来源:</span>
												<span v-if="item.offerCustomerSupplierType==0">{{item.source | sourceStatus }} / {{item.clients | indentSource }}</span>
												<span v-if="item.offerCustomerSupplierType==1">优质供应商  / {{item.clients | fromStatus }}</span>
											</div>
										</div>
                   <!--  <span> -->
                        <p  slot="right" style="width:19vw;position:absolute;top:0;right:0;font-size:0.1rem;">
                          <yd-button v-if="item.state==120&&pageId==4" @click.native="send(item.id)" type="primary">寄样</yd-button>
                          <yd-button @click.native="sendable(item.id)" v-if="item.state==110&&pageId==4" type="warning">可寄样</yd-button>
                          <yd-button @click.native="cantSend(item.id)" v-if="(item.state==110 || item.state==120)&&pageId==4" type="danger">无法寄样</yd-button>
                          <yd-button @click.native="received(item.id)" v-if="item.state==116&&pageId==4" type="primary">确认收样</yd-button>
                          <yd-button v-if="item.state==150&&pageId==4" type="primary" @click.native="priceConfirm(item.id)">确认价格</yd-button>
                          <yd-button v-if="item.state==30&&pageId==4" type="primary" @click.native="reusedConfirm(item.id)">复用确认</yd-button>
                          <yd-button v-if="item.state==30&&pageId==4" type="warning" @click.native="unReused(item.id)">无法复用</yd-button>
                        </p>
                  <!--   </span> -->
									
									</yd-cell-item>
								</div>

							</yd-cell-group>
						</div>
					</div>
				</yd-list>
				<span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>
				<img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />
			</yd-infinitescroll>
			<yd-backtop></yd-backtop>
		</div>
	</center-content>
  </div>
</template>

<script>
import sampleReceived from './tools/sampleReceived'
import centerContent from "../../../components/centerContent.vue";
import search from "./tools/search.vue";
import comSearch from "../../../components/com/comSearch.vue";
import http from "../../../libs/httpService.js";
import util from "../../../libs/util.js";
import bus from "../../../libs/bus.js";
import {mapGetters,mapActions} from "vuex";
export default {
  data() {
    return {
      pageId:'',
      show1: false,
      show2:false,
      reason:'',
      loading: false,
      price: "",
      radio5: "160",
      keyWord: {
        offerCustomer: "",
        state:'',
        employeeName: "",
        ctimeStart: "",
        ctimeEnd: "",
        buyEmployee: "",
        breedName:'',
        breedId:'',
        offerEmployee:'',
        offerEmployeeName:''
      },
      tab: [
        {
          label: "待寄样",
          active: true,
          tabkey: 0
        },
        {
          label: "待确认价格",
          active: false,
          tabkey: 1
        }
      ],
      showMore: false,
      showMenu: false,
      pn: 1,
      pSize: 15,
      offerId: "",
      state: this.$route.query.state,
      receivedParam:{
        show:false
      }
    };
  },
  props: {
    param: {}
  },
  components: {
    centerContent,
    search,
    comSearch,
    sampleReceived
  },
  computed:{
  	...mapGetters(["publicList"]),
  },
  methods: {
  	...mapActions(["queryPublicList","updateOffer","requestPriceConfirm","thereSamples","offerUnable"]),
    received(id){
       this.receivedParam.show=true;
       this.receivedParam.id=id;
    },
    unReused(id){
        this.show2=true;
        this.offerId=id;
    },
    unRepeat(){
        if(this.reason==''){
            this.$dialog.toast({
              mes: '请先填写原因！'
            });
        }else{
          let param = {
          	id:this.offerId,
          	stateDescription:this.reason,
          	state:11  
          };
          this.updateOffer(param)
          		.then(res=>{
          			if (res.code == "1c01") {
			            this.$dialog.toast({
			              mes: res.msg
			            });
				          this.show2 = false;
				          this.refresh();
				        } else {
				          this.$dialog.toast({
				            mes: res.msg
				          });
				        }
          		})
          		.catch(err=>{});
        }
    },
    confrimedBack(){
       this.refresh();
    },
    tabCallback(label, key) {
      let _self = this;
      if (key !== _self.typeStatus) {
        _self.typeStatus = Number(key);
        console.log(key === 0);
        if (key === 0) {
          console.log(key);
          this.state = "1";
        } else if (key === 1) {
          console.log(key);
          this.state = "2";
        } else {
          this.state = "";
        }
        _self.initData();
        _self.submitHandler();
      }
    },
    clearParam(){
        this.initData();
        this.loadList();
    },
    initData(key) {
        for(var i in this.keyWord){
            if(this.keyWord[i]  instanceof Object){
               for(var j in this.keyWord[i]){
                 this.keyWord[i][j]=''; 
               }
            }else{
               this.keyWord[i]="";
            }
        }
       this.keyWord.type = this.$route.query.id;
     
    },
    clearKey() {
      alert("空间不是的可能发");
      this.keyWord = {};
      this.submitHandler();
    },
    priceConfirm(id) {
      this.offerId = id;
      this.show1 = true;
    },
    confirmPrice() {
      console.log("阿萨德国际撒娇打滚挥洒",this.price)
      if (this.radio5 == "151" && this.price == "") {
        this.$dialog.toast({ mes: "请填写当前价格" });
      } else if (this.radio5 == "151" && this.price < 0) {
        this.$dialog.toast({ mes: "当前价格不能小于0" });
      }else{

      	this.priceHttp();
      }
    },
    priceHttp: function(param) {
      let _self = this;
      let biz_param ={
      	offerId: this.offerId,
        state: this .radio5
      }
      if (this.price != "" && this.price !== 0) {
        biz_param.currentPrice = this.price;
	  	}
      this.requestPriceConfirm(biz_param)
      		.then(res=>{
      			_self.toastSuccess(res.msg);
          	this.show1 = false;
          	this.price='';
          	_self.offerId = "";
          	_self.refresh();
      		})
      		.catch(err=>{
      			
      		});
    },
    send(id) {
      let url = "/sendSample?id=" + id;
      this.$router.push(url);
    },
    reusedConfirm(id){
      let url = "/reused?id=" + id;
      this.$router.push(url);
    },
    toastSuccess(msg) {
      this.$dialog.toast({
        mes: msg,
        timeout: 1000,
        icon: "success"
      });
    },
    sendable(id) {
      this.offerId = id;
      this.$dialog.confirm({
        title: "确认可以寄样吗？",
        opts: [
          {
            txt: "取消",
            color: false,
            callback: () => {}
          },
          {
            txt: "确定",
            color: true,
            callback: () => {
              this.sendableHttp();
            }
          }
        ]
      });
    },
    sendableHttp: function(param) {
      let _self = this;
      let biz_param={
      	offerId: this.offerId
      }
      this.thereSamples(biz_param)
      		.then(res=>{
      			_self.toastSuccess(res.msg);
          	_self.offerId = "";
          	_self.refresh();
      		})
      		.catch(err=>{})
    },
    cantSend(id) {
      this.offerId = id;
      this.$dialog.confirm({
        title: "确认无法寄样吗？",
        mes: " ",
        opts: [
          {
            txt: "取消",
            color: false,
            callback: () => {}
          },
          {
            txt: "确定",
            color: true,
            callback: () => {
              this.sureUnable();
            }
          }
        ]
      });
    },
    sureUnable() {
      let _self = this;
      let param={
      	offerId: this.offerId
      };
      this.offerUnable(param)
      		.then(res=>{
      			_self.toastSuccess(res.msg);
          	_self.offerId = "";
          	_self.refresh();
      		})
      		.catch(err=>{});
    },
    unabledtoSend() {
      this.show1 = false;
      this.cause = "";
    },
    refresh() {
      this.submitHandler();
    },
    submitHandler(value) {
      let _self = this;
      _self.keyWord.searchStatus = true;
      if (value) {
        _self.keyWord.name = value;
      }
      _self.pn = 1;
      this.$store.state.resource.publicList=[];
      _self.$refs.orderInfinitescroll.$emit("ydui.infinitescroll.reInit");
      console.log(_self.keyWord);
      _self.loadList();
    },
    goDetail(item) {
      let _self = this;
      console.log(item);
      let id = item.id;
      let type = _self.$route.query.id;
      let url = "/offerDetail?id=" + id + "&type=" + type;
      _self.$router.push(url);
    },
    loadList() {
      let body = {
        biz_module: this.param.biz_module,
        biz_method: this.param.biz_method,
        biz_param: {
          page: this.pn,
          pageSize: this.pSize,
				}
			};
			body.biz_param=Object.assign(this.keyWord,body.biz_param);
			if(this.state==="1"){
				body.biz_param.state = 110;
			}else if(this.state==="2"){
				body.biz_param.state = 150;
      }
      console.log("#################",body);
      this.queryPublicList(body)
      		.then((res) => {
      			const _list=res.biz_result.list;
      			if(_list.length < this.pSize) {
      				this.$refs.orderInfinitescroll.$emit('ydui.infinitescroll.loadedDone');
      				return;
      			}
      			this.$refs.orderInfinitescroll.$emit('ydui.infinitescroll.finishLoad');
      			this.pn++;
      		})
      		.catch(err=>{});
    }
  },
  watch: {
	  //监视路由state的变化，以进行重新加载
    "$route.query.state": function(newV, oldV) {
      this.tabCallback();
    }
  },
  created() {
    let _self = this;
    this.pageId=this.$route.query.id;
    let onSelect = Number(_self.$route.query.state);
      console.log(onSelect);
    if (onSelect) {
      for (let i = 0; i < _self.tab.length; i++) {
        _self.tab[i].active = false;
      }
      _self.typeStatus = onSelect - 1;
      console.log(onSelect);
      if (onSelect === 1) {
        console.log(onSelect);
        this.state = "1";
      } else if (onSelect === 2) {
        console.log(onSelect);
        this.state = "2";
      } else {
        this.state = "";
      }
      _self.tab[onSelect - 1].active = true;
    }
    _self.loadList();
    bus.$on("reloadSupply", function() {
      _self.initDate();
    });
  }
};
</script>

<style lang="less" scoped>
	 @import '../../../styles/publicList.css';
	 .yd-btn{
	 	font-size:0.2rem;
	 	padding:0 0.1rem;
	 	margin-top:0.1rem;
	 }
	 .unable-btn{
	 	width:20%;
	 	display:inline-block;
	 	margin-top:0;
	 }
	 .unable-p{
	 	text-align:right;
	 	padding:.2rem 0;
	 	padding-right:.4rem;
	 }
   .offerList {
    .tab {
      background-color: #EDEDF2;
      padding: 3px 0;
      width: 100%;
      line-height: 30px;
      position: fixed;
      top: 100px;
      z-index: 1000;
      text-align: center;
    }
  }
  .activePage{
    padding-top:40px;
  }

</style>