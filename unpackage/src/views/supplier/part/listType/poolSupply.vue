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
					title: '划转',
					callback: _this.chooseTransfer,
					icon: ''

				}]); //触发事件

			})
		},
		beforeDestroy() {
			//清空操作列表
			bus.$emit('more-operation', []);

		},
		methods: {
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
		},

	}
</script>

<style lang="less">

</style>