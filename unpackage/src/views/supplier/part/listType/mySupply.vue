<template>
	<div>
		<supply-list :param="dataList"></supply-list>
		<yd-popup v-model="popup.show" position="right" width="50%">
			<ytk :param="dataList.operateIds" :popup="popup"></ytk>
		</yd-popup>
	</div>
</template>

<script>
	import ytk from "../tools/ytk.vue";
	import supplyList from '../supplyList.vue'
	import http from '../../../../libs/httpService.js'
	import util from '../../../../libs/util.js'
	import bus from "../../../../libs/bus.js";
	export default {
		data() {
			return {
				dataList:{
					operateIds:[],
				},
				popup: {
					show: false,
					person: [],
				},
			}
		},
		components: {
				supplyList,
				ytk
		},
		mounted() {
			this.$nextTick(function() {
					let _this = this;
					// 设置页面右上角更多操作功能项
					bus.$emit('more-operation', [{
						title: '新建供应商',
						callback: _this.addNewSupply,
						icon: ''

					},{
						title: '认证申请',
						callback: _this.addNewSupply,
						icon: ''

					},{
						title: '提取为药推客',
						callback: _this.chooseYtk,
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
			chooseYtk(){
				if(this.dataList.operateIds.length) {
					this.popup.show = true;
				} else {
					this.$dialog.toast({
						mes: "请先选择至少一个供应商"
					});
				}
			}
			
		},

	}
</script>

<style lang="less">

</style>