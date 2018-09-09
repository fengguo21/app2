<template>
	<div class="offerList">
		<div class="tab">
			<yd-tab :callback="tabCallback">
				<yd-tab-panel :label="item.label" :tabkey="item.tabkey" v-for="(item,index) in tab" :active="item.active"></yd-tab-panel>
			</yd-tab>
		</div>
		<center-content :showMore="showMore" :showSearch="true" :loading="loading" @query="submitHandler" @refresh="refresh" @clear="clearParam">
			<search  slot="more" :param.sync="keyWord" @query="submitHandler" ></search>
			<com-search slot="search" @more="showMore=!showMore" @query="submitHandler" :placeholders="text"></com-search>
			<div slot="content">
				<yd-infinitescroll :callback="loadList" :loading="loading" ref="orderInfinitescroll">
					<yd-list theme="1" slot="list">
						<div id="choosable-List">
							<div class="box" v-for="item in offerZoneOfferList">
								<yd-cell-group title="">
									<div class="publicBox">
										<div slot="left" class="listBox">
											<div class="text">
												<span class="title">品种:</span>
												<span>{{item.breedName}}</span>
											</div>
											<div class="text">
												<span class="title">数量:</span>
												<span>{{item.number}}{{item.unit | unit}}</span>
											</div>
											<div class="text">
												<span class="title">客户类型:</span>
												<span>{{item.indentTypeName}}</span>
											</div>
											<div class="text">
												<span class="title">客户所在省:</span>
												<span>{{item.provinceName }}</span>
											</div>
											<div class="text">
												<span class="title">报价人数:</span>
												<span>{{item.offerNumber }}人</span>
											</div>
											<div class="text">
												<span class="title">报价剩余时间:</span>
												<span>{{item.overTime }}</span>
											</div>
											<div class="text">
												<span class="title">我的报价:</span>
												<span>{{item.myOfferTotalToIndent}}次</span>
											</div>
											<div class="text">
												<span class="title">求购星级:</span>
												<span>{{item.purchaseLevel }}级</span>
											</div>
										</div>
										<div class="button">
											<ul class="item">
												<!--<li v-if="typeStatus<2" @click="deleteOffer(item.id)">删除</li>-->
												<li @click="offerDetailFunc(item.id)">报价</li>
												<!--<li>查看PDF</li>-->
											</ul>
										</div>
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
	import centerContent from "../../../components/centerContent.vue"
	import search from "../part/tools/search.vue";
	import comSearch from "../../../components/com/comSearch.vue";
	import http from '../../../libs/httpService.js'
	import util from '../../../libs/util.js'
	import bus from "../../../libs/bus.js";
	import {mapActions,mapGetters} from "vuex";
	export default {
		data() {
			return {
				text:"输入要搜索的品种名",
				operateIds: [],
				loading: false,
				typeStatus: 0, //0是主营，2是全部品种
				keyWord: {
					type: this.$route.query.id,
					searchStatus: false,
					breedId: {
						name:""
					},
					isMyOffer: '',
					purchaseLevel: '',
					rebuy: '',
					startTime: '',
					endTime: '',
				},
				showMore: false,
				showMenu: false,
				pn: 1,
				pSize: 15,
				tab: [{
					label: '主营待报价',
					active: true,
					tabkey: 0,
				}, {
					label: '主营报价区',
					active: false,
					tabkey: 1,
				}, {
					label: '全部待报价',
					active: false,
					tabkey: 2,
				}, {
					label: '全部报价区',
					active: false,
					tabkey: 3,
				}]
			}
		},
		components: {
			centerContent,
			search,
			comSearch
		},
		computed:{
			...mapGetters(["offerZoneOfferList"]),
		},
		methods: {
			...mapActions(["queryOfferList","deleteNotOfferIntention"]),
			tabCallback(label, key) {
				let _self = this;
				if(key !== _self.typeStatus) {
					_self.typeStatus = Number(key);
					_self.initData(_self.typeStatus)
					_self.submitHandler();
				}
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
			},
			refresh() {
				this.submitHandler();
			},
			submitHandler(value) {
				let _self = this;
				_self.pn = 1;
				this.$store.state.resource.offerZoneOfferList=[];
				_self.$refs.orderInfinitescroll.$emit("ydui.infinitescroll.reInit");
				this.keyWord.breedId.name = value;
				console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE",value)
				console.log(_self.keyWord)
				_self.loadList();

			},
			loadList() {
				let _self = this;
				let param={
					mainScope: Number(_self.typeStatus) > 1 ? "全部品种" : "主营品种",
					pSize: _self.pSize,
					pn: _self.pn,
					breedId: _self.keyWord.breedId.id,
					breedName:_self.keyWord.breedId.name,
					isMyOffer: (_self.typeStatus == 0 || _self.typeStatus == 2) ? '0' : '',
					purchaseLevel: _self.keyWord.purchaseLevel,
					rebuy: _self.keyWord.rebuy,
					ctimeStart: _self.keyWord.startTime,
					ctimeEnd: _self.keyWord.endTime,
				}
				console.log("报价区",param);
				this.queryOfferList(param)
					.then(res=>{
						const _list = res.biz_result.list;
						if(_list.length < _self.pSize) {
							/* 所有数据加载完毕 */
							this.$refs.orderInfinitescroll.$emit('ydui.infinitescroll.loadedDone');
							return;
						}
						/* 单次请求数据完毕 */
						this.$refs.orderInfinitescroll.$emit('ydui.infinitescroll.finishLoad');
	
						_self.pn++;
					})
					.catch(err=>{
						
					});
			},
			deleteOffer(id) {
				let _self = this;
				let param={
					intentionId: id,
				}
				this.deleteNotOfferIntention(param)
					.then((res)=>{
						_self.submitHandler();
					})
					.catch((err)=>{});
			},
			offerDetailFunc(id) {
				let _self = this;
				let type = _self.$route.query.id;
				let url = '/offerZoneDetail?id=' + id + '&type=' + type;
				_self.$router.push(url);
			},
			clearParam(){
				console.log("this.clearParam");
				this.initData();
				this.refresh();
				console.log("this.clearParam",this.keyWord);
			}
		},
		created() {
			let _self = this;
			let onSelect = Number(_self.$route.query.select);
			if(onSelect) {
				for(let i = 0; i < _self.tab.length; i++) {
					_self.tab[i].active = false;
				}
				_self.typeStatus = onSelect - 1;
				_self.tab[onSelect - 1].active = true;
			}
			this.$store.state.resource.offerZoneOfferList=[];
//			console.log("offerList created","重新创造了吗？");
			_self.loadList();

			bus.$on("reloadSupply", function() {
				_self.initDate();
			});
		}
	}
</script>

<style lang="less" scoped>
	@import '../../../styles/publicList.css';
	#choosable-List {
		padding-top: 50px;
	}
	
	.offerList {
		position: relative;
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
</style>