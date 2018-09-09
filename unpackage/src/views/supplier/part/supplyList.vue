<template>
	<div>
		<center-content :showMore="showMore" :showSearch="true" :loading="loading" @query="submitHandler" @refresh="refresh">
			<!-- 搜索 -->
			<search slot="more" :param="keyWord" @query="submitHandler"></search>
			<com-search slot="search" @more="showMore=!showMore" @query="submitHandler"></com-search>
			<div slot="content">
				<yd-infinitescroll :callback="loadList" :loading="loading" ref="orderInfinitescroll">
					<yd-list theme="1" slot="list">
						<div id="choosable-List">
							<div class="box" v-for="item in list">
								<yd-cell-group title="">
									<div class="supplyBox">
										<yd-cell-item type="checkbox">
											<div slot="left" class="listBox" @click.stop="goDetail(item)">
												<div class="text">
													<span class="title">供应商ID:</span>
													<span>{{item.id}}</span>
												</div>
												<div class="text">
													<span class="title">供应商名称:</span>
													<span>{{item.name }}</span>
												</div>
												<div class="text">
													<span class="title">供应商类型:</span>
													<span>{{item.type | supplierType }}</span>
												</div>
												<div class="text">
													<span class="title">联系人:</span>
													<span>{{item.mainContact}}</span>
												</div>
												<div class="text">
													<span class="title">手机号:</span>
													<span>{{item.mainPhone}}</span>
												</div>
												<div class="text">
													<span class="title">主营品种:</span>
													<span>{{item.bizScope}}</span>
												</div>
												<div class="text">
													<span class="title">认证状态:</span>
													<span class="renzheng">
														<span :class="item.cAudit==3?'false':item.cAudit==2?'succee':item.cAudit==1?'underWay':'none'"><i>企</i>{{item.cAudit | approve}}</span>
														<span :class="item.uAudit==3?'false':item.uAudit==2?'succee':item.uAudit==1?'underWay':'none'"><i>个</i>{{item.uAudit | approve}}</span>
													</span>
												</div>
											</div>
											<input slot="right" type="checkbox" :value="item.id" v-model="param.operateIds" />
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
	import search from "./tools/search.vue";
	import searchTransfer from "./tools/searchTransfer.vue";
	import centerContent from "../../../components/centerContent.vue";
	import comSearch from "../../../components/com/comSearch.vue";
	import filtrate from '../../slideBar/filtrate'
	import http from '../../../libs/httpService.js'
	import util from '../../../libs/util.js'
	import bus from "../../../libs/bus.js";
	export default {
		data() {
			return {
				loading: false,
				keyWord: {
					type: this.$route.query.id,
					searchStatus: false,
					id: '',
					name: '',
					phone: '',
					employeeName:'',
					ctimeStart:'',
					ctimeEnd:'',
				},
				showMore: false,
				showMenu: false,
				pn: 1,
				pSize: 15,
				list: [],

			}
		},
		components: {
			filtrate,
			centerContent,
			search,
			comSearch,
			searchTransfer,
		},
		props: {
			param: {},
		},
		methods: {

			openMenus() {
				this.showMenu = true;
			},
			submitHandler(value) {
				let _self = this;
				_self.keyWord.searchStatus = true;
				if(value) {
					_self.keyWord.name = value;
				}
				console.log(_self.keyWord.name)
				_self.pn = 1;
				_self.list = [];
				_self.$refs.orderInfinitescroll.$emit("ydui.infinitescroll.reInit");
				console.log(_self.keyWord)
				_self.loadList();

			},
			menuSelect(currentMenu) { //tab跳转
				this.showMenu = false;
				this.pn = 1;
				this.list = [];
				this.loadList();

			},
			goDetail(item) {
				let _self = this;
				console.log(item)
				let id = item.id;
				let type = _self.$route.query.id;
				let ctype = item.cAudit;
				let utype = item.uAudit
				let url = '/supperlierDetail?id=' + id + '&type=' + type+ '&ctype=' + ctype+ '&utype=' + utype;
				_self.$router.push(url);

			},
			goBack() {
				let _self = this;
				window.history.go(-1);
				console.log("----------------返回-----------------");
			},
			initDate() {
				this.pn = 1;
				this.list = [];
				this.keyWord.searchStatus = false;
				this.keyWord.id = '';
				this.keyWord.name = '';
				this.keyWord.phone = '';
				this.param.operateIds = [];
				this.loadList();
			},
			refresh() {
				this.submitHandler();
			},
			loadList() {
				let url = http.urlCommon + http.apiUrl.most;
				let body = {
					biz_module: 'erpSupplierService',
					biz_method: 'querySupplierList',
					biz_param: {
						pn: this.pn,
						pSize: this.pSize,
						id:this.keyWord.searchStatus ? this.keyWord.id : '',
						employeeName:this.keyWord.searchStatus ? this.keyWord.employeeName : '',
						supplierType: this.$route.query.id == 4 ? '1' : '',
						customerPool: this.$route.query.id == 8 ? '1' : '0',
						name: this.keyWord.searchStatus ? this.keyWord.name : '',
						mainPhone: this.keyWord.searchStatus ? this.keyWord.phone : '',
						employeeId: this.$route.query.id == 6 ? localStorage.getItem('employeeId') : '',
						orgId: this.$route.query.id == 6 || this.$route.query.id == 7 ? localStorage.getItem('orgid') : '',
						blacklist: 0,
						ctimeStart:this.keyWord.searchStatus ? this.keyWord.ctimeStart : '',
						ctimeEnd:this.keyWord.searchStatus ? this.keyWord.ctimeEnd : '',
					}
				};
				http.commonPost(url, body).then((res) => {
					const _list = res.biz_result.list;
					this.list = [...this.list, ..._list];
					if(_list.length < this.pSize) {
						/* 所有数据加载完毕 */
						this.$refs.orderInfinitescroll.$emit('ydui.infinitescroll.loadedDone');
						return;
					}
					/* 单次请求数据完毕 */
					this.$refs.orderInfinitescroll.$emit('ydui.infinitescroll.finishLoad');

					this.pn++;
				}).catch((err) => {});
			},
		},
		watch: {},
		created() {
			let _self = this;
			_self.loadList();
			bus.$on("reloadSupply", function() {
				_self.initDate();
			});
		}
	}
</script>
<style lang="less" scoped>
	.yd-cell {
		position: absolute;
		.supplyBox {
			background-color: #fff;
			border-radius: 15px;
			.listBox {
				width: 100%;
				.text {
					display: flex;
					line-height: 30px;
					font-size: 12px;
					display: flex;
					.zheng_box {
						margin-left: 4px;
						i {
							color: #f00;
							outline: 1px solid #f00;
							margin-right: 4px;
						}
					}
					.title {
						margin-right: 10px;
					}
					.renzheng {
						span {
							border: 1px solid #F88F19;
							padding: 0 5px;
							color: #F88F19;
							i {
								margin-right: 5px;
								color: #F88F19;
							}
							&.false {
								border: 1px solid #f00;
								color: #f00;
								i{
									color: #f00;
								}
							}
							&.succee {
								border: 1px solid #32C862;
								color: #32C862;
								i{
									color: #32C862;
								}
							}
							&.none {
								border: 1px solid grey;
								color: grey;
								i{
									color: grey;
								}
							}
						}
					}
				}
			}
		}
	}
	
	#choosable-List {
		padding-top: 15px;
		.box {
			margin: 0 15px 0 15px;
		}
	}
</style>