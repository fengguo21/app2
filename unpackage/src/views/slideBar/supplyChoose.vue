<!-- /**
 * 
 * @authors DEAN hxj (xxxxxxx@delibal)
 * @date    2018-02-05 17:31:25
 * @version $Id$
 */
 -->
<template>
	<div style="background:#e6e6e6;position:relative;">
		<div class="listTitle">列表</div>
		<yd-search v-model="search" placeholder="输入名称搜索"></yd-search>
		<yd-search v-model="phone" placeholder="输入电话搜索"></yd-search>
		<div style="overflow:auto;" ref="scrollBox">
			<yd-infinitescroll :callback="loadMore" :distance="100" ref="customerInfinitescroll">
				<yd-list theme="1" slot="list">
					<div id="choosable-List">
						<yd-cell-group v-for="item in searchData" title="" @click.native="supplyChoose(item)">
							<yd-cell-item type="radio">
								<span slot="left" class="listBox">
                           		<p><span>名称:</span> <span :class="item.employeeId == myId?'':'other'">{{item.name}}</span></p>
								<p><span>ID:</span> <span>{{item.id}}</span></p>
								<p><span>手机:</span> <span>{{item.mainPhone}}</span></p>
								</span>
							</yd-cell-item>
						</yd-cell-group>
					</div>
				</yd-list>
				<span slot="doneTip">
					<span v-if='this.searchData.length'>没有更多了</span>
					<span v-else>您好，你所搜索的供应商不存在，请您快速新建供应商</span>
					
				</span>
				<img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />
			</yd-infinitescroll>
		</div>
	</div>
</template>
<script>
	import http from "../../libs/httpService.js";
	import util from "../../libs/util.js";
	import * as store from '../../common/localStore';
	export default {
		props: ["param", "mark"],
		data() {
			return {
				myId:store.get('employeeId'),
				search: '',
				phone:'',
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
				operateIds: []
			};
		},
		components: {},
		computed: {
			searchData: function() {
				var search = this.search;
				var phone = this.phone;
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
			let boxHeight = document.body.clientHeight - 85 + 'px';
			this.$refs.scrollBox.style.height = boxHeight;
		},
		methods: {
			supplyChoose(item){
				this.$emit("supply", item);
			},
			dataInit() {
				this.pageParam.pn = 0;
				this.list = [];
				this.loadList();
			},
			loadMore(){
				
				this.loadList()
			},
			loadList(isReset) {
				this.loading = true;
				var emId = localStorage.getItem('employeeId');
				let url = http.urlCommon + http.apiUrl.most;
				let body = {
					biz_module: "erpSupplierService",
					biz_method: "queryCustomerBList",
					biz_param: {
						pn: this.pageParam.pn,
						pSize: this.pageParam.pSize,
						employeeId: localStorage.getItem('employeeId'),
						name: this.search,
						phone:this.phone,
					}
				};
				if(this.search || this.phone){
					body.biz_param.employeeId = null
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
			search(val) {
				this.dataInit();
			},
			phone(val){
				this.dataInit();
			}
		},
		created() {
			this.loadList();
		}
	};
</script>
<style lang="less" scoped>
.other{
	color:red;
}
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
</style>