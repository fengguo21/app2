<!-- /**
 * 
 * @authors DEAN hxj (xxxxxxx@delibal)
 * @date    2018-02-05 17:31:25
 * @version $Id$
 */
 -->
<template>
<!-- 	<div style="background:#e6e6e6;">
	<div class="listTitle">客户列表</div>
	<yd-search v-model="search" placeholder="输入名称搜索"></yd-search>
	<div style="overflow:auto;" ref="scrollBox">
		<yd-infinitescroll :callback="loadList" :distance="100" ref="customerInfinitescroll">
			<yd-list theme="1" slot="list">
				<div id="choosable-List">
					<yd-cell-group v-for="item in searchData" title="">
						<yd-cell-item type="checkbox">
							<span slot="left" class="listBox">
                            <p><span>客户名称:</span> <span>{{item.name}}</span></p>
							<p><span>客户ID:</span> <span>{{item.id}}</span></p>
							<p><span>客户手机:</span> <span>{{item.mainPhone}}</span></p>
							</span>
							<input slot="right" type="checkbox" :value="item" v-model="operateIds" />
						</yd-cell-item>
					</yd-cell-group>
				</div>
			</yd-list>
			<span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>
			<img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />
		</yd-infinitescroll>
	</div>
</div> -->


		<yd-layout>
		<yd-navbar slot="navbar" title="选择">

		</yd-navbar>
		<yd-backtop></yd-backtop>
		  <yd-search v-model="search" placeholder="输入名称搜索"></yd-search>
		<div style="overflow:auto;width:100%;" ref="scrollBox">
			<yd-infinitescroll :callback="loadList" :distance="100" ref="customerInfinitescroll">
				<yd-list theme="1" slot="list" style="background:#EFEFF4;">
					<div id="choosable-List">
						<yd-cell-group v-for="item in searchData" title="">
							<yd-cell-item type="checkbox">
								<span slot="left" class="listBox">
                                <p><span>客户名称:</span> <span>{{item.name}}</span></p>
								<p><span>客户ID:</span> <span>{{item.id}}</span></p>
								<p><span>客户手机:</span> <span>{{item.mainPhone}}</span></p>
								</span>
								<input slot="right" type="checkbox" :value="item" v-model="operateIds" />
							</yd-cell-item>
						</yd-cell-group>
					</div>
				</yd-list>
				<span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>
				<img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />
			</yd-infinitescroll>
		</div>

	</yd-layout>
</template>
<script>
	import http from "../../libs/httpService.js";
	import util from "../../libs/util.js";
	export default {
		props: ["param", "mark"],
		data() {
			return {
				search: '',
				value2: '',
				result: [],
				loading: false,
				pageParam: {
					pn: 1,
					pSize: 10
				},
				showMore: false,
				showMenu: false,
				list: [],
				operateIds: [],
			};
		},
		components: {
		},
		computed: {
			searchData: function() {
				var search = this.search;
				if(search) {
					return this.list.filter(function(list) {
						return Object.keys(list).some(function(key) {
							return String(list[key]).toLowerCase().indexOf(search) > -1
						})
					})
				}

				return this.list;
			}
		},
		mounted() {
			let boxHeight = this.$store.state.user.clientHeight - 100 + 'px';
			this.$refs.scrollBox.style.height = boxHeight;
		},
		methods: {
			dataInit(){
				this.pageParam.pn=0;
				this.list=[];
				this.loadList();
			},
			loadList(isReset) {
				this.loading = true;
				var emId = localStorage.getItem('employeeId');
				console.log("爱上别的解散", emId)
				let url = http.urlCommon + http.apiUrl.most;
				let body = {
					biz_module: 'erpCustomerService',
					biz_method: 'queryCustomerList',
					biz_param: {
						pn: this.pageParam.pn,
						pSize: this.pageParam.pSize,
						employeeId: emId,
						customerPool: 0,
						name:this.search,
					}
				};
				if(this.mark==1){  //供应商
					body.biz_param.supplier=1;
				}else{  //客户
					body.biz_param.supplier=0;
				}
				http.commonPost(url, body).then(res => {
					this.loading = false;
					const _total = res.biz_result.total;
					const _list = res.biz_result.list;
					this.list = [...this.list, ..._list];
					if(
						this.list.length >= _total ||
						_list.length < this.pageParam.pSize
					) {
						/* 所有数据加载完毕 */
						this.$refs.customerInfinitescroll.$emit(
							"ydui.infinitescroll.loadedDone"
						);
						return;
					}
					/* 单次请求数据完毕 */
					this.$refs.customerInfinitescroll.$emit(
						"ydui.infinitescroll.finishLoad"
					);
					this.pageParam.pn++;
				}).catch(err => {
					this.loading = false;
				});
			}
		},
		watch: {
			operateIds: function(newv) {
				immediate: true,
				this.$emit("chosen", newv);
			},
			search(val){
				this.dataInit();
			}
		},
		created() {
			this.loadList();
		}
	};
</script>
<style lang="less" scoped>
	.listBox {
		width: 100%;
		p {
			line-height: 0.6rem;
			font-size: 0.23rem;
			display: flex;
			pading: 3px 0;
			span:nth-child(1) {
				display: inline-block;
				width: 30%;
				text-align: right;
			}
			span:nth-child(2) {
				display: inline-block;
				text-indent: 15px;
				white-space: normal
			}
		}
	}
	
	.yd-cell .yd-cell-item {
		border-radius: 15px;
		padding: 0;
	}
	
	.yd-cell-box {
		padding: 10px 0;
		border-radius: 15px;
		background: #fff;
		margin-bottom: 10px;
	}
	
	.yd-search-input {
		padding-left: 0;
	}
	
	.listTitle {
		height: 35px;
		line-height: 35px;
		text-align: center;
		font-size: 15px;
		font-weight: bolder;
		color: #666;
		border-bottom: 1px solid #e6e6e6;
	}
		.yd-flexview {
		height: 100vh;
		.listLi {
			margin-left: 10px;
			line-height: 30px;
			border-bottom: 1px solid rgba(230, 230, 230, 0.5);
		}
	}
</style>