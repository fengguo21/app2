<template>
	<div>
		<supply-list :param="dataList"></supply-list>
		<yd-popup v-model="popup.huazhuan" position="right" width="90%">
			<search-transfer :param="popup" :operateIds="dataList.operateIds"></search-transfer>
		</yd-popup>
	</div>
</template>

<script>
	import searchTransfer from "../tools/searchTransfer.vue";
	import supplyList from '../supplyList.vue'
	import http from '../../../../libs/httpService.js'
	import util from '../../../../libs/util.js'
	import bus from "../../../../libs/bus.js";
	export default {
		data() {
			return {
				dataList: {
					operateIds: [],
				},
				popup: {
					huazhuan: false,
					person: [],
				},
			}
		},
		components: {
			supplyList,
			searchTransfer
		},
		mounted() {
			this.$nextTick(function() {
				let _this = this;
				// 设置页面右上角更多操作功能项
				bus.$emit('more-operation', [{
					title: '新建供应商',
					callback: _this.addNewSupply,
					icon: ''

				}, {
					title: '划转',
					callback: _this.chooseTransfer,
					icon: ''

				}, {
					title: '划转供应商池',
					callback: _this.chooseTransferPool,
					icon: ''

				}]); //触发事件

			})
		},
		beforeDestroy() {
			//清空操作列表
			bus.$emit('more-operation', []);

		},
		methods: {
			addNewSupply() { //新建供应商
				let _self = this;
				let url = '/addSupplier/add'
				_self.$router.push(url);
			},
			chooseTransfer() {
				console.log(this.dataList.operateIds)
				if(this.dataList.operateIds.length) {
					this.popup.huazhuan = true;
					this.loadTransfer();
				} else {
					this.$dialog.toast({
						mes: "请先选择至少一个供应商"
					});
				}
			},
			//选择划转人
			loadTransfer() {
				this.loading = true;
				let url = http.urlCommon + http.apiUrl.most;
				let body = {
					biz_module: 'employService',
					biz_method: 'queryEmployeeList',
					biz_param: {
						orgId: localStorage.getItem('orgid'),
						mobile: '',
						name: '',
						leave: 1,
					}
				};
				http.commonPost(url, body).then((res) => {
					this.popup.person = res.biz_result.list
				}).catch((err) => {});
			},
			chooseTransferPool() {
				if(this.dataList.operateIds.length) {
					this.$dialog.confirm({
						title: '划转进供应商池',
						mes: '你确定要划转进划转进供应商池？',
						opts: () => {
							this.customersTransferPool()
						}
					});
				} else {
					this.$dialog.toast({
						mes: "请先选择至少一个供应商"
					});
				}
			},

			customersTransferPool() {
				let url = http.urlCommon + http.apiUrl.most;
				let body = {
					biz_module: 'erpCustomerService',
					biz_method: 'customersTransferPool',
					biz_param: {
						ids: this.dataList.operateIds,
					}
				};
				http.commonPost(url, body).then((res) => {
					this.$dialog.toast({
						mes: res.msg
					});
					if(res.code == "1c01") {
						bus.$emit("reloadSupply");
					}
				}).catch((err) => {});
			},
		},

	}
</script>

<style lang="less">

</style>