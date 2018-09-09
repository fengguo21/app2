<template>
	<div class="transfer">
		<yd-search slot="top" :result="result" fullpage v-model="name" :item-click="itemClickHandler" :on-submit="submitHandler"></yd-search>
		<div class="list" >
			<div class="item" v-for="(item,index) in param.person" @click="itemClickHandler(item)">{{item.name}}</div>
		</div>
	</div>
</template>

<script>
	import http from '../../libs/httpService.js'
	import bus from "../../libs/bus.js";
	export default {
		data() {
			return {
				name: '',
				list: [],
				result: [],
				choose:{
					employeeId:'',
					orgId:''
				}
			}
		},
		props:{
			param:'',
			operateIds:'',
		},
		watch: {
			name(val) {
				this.result = this.loadTransfer(val);
			}
		},
		methods: {
			itemClickHandler(item) {
				this.param.huazhuan = false;
				if (typeof(item) == 'string') {
					for (let i of this.list) {
						if(i.name == item){
							item = i;
							this.transfer(item)
						}
					}
				} else{
					this.transfer(item);
				}
			},
			transfer(item){
				let _self = this;
				let url = http.urlCommon + http.apiUrl.most;
				let body = {
					biz_module: 'erpCustomerService',
					biz_method: 'batchCustomerTransferEmployee',
					biz_param: {
						customerIds:this.operateIds ,
						employeeId: item.id,
						orgId: item.orgid,
					}
				};
				http.commonPost(url, body).then((res) => {
					this.$dialog.toast({mes: res.msg});
					if(res.code == "1c01"){
							bus.$emit("reloadSupply");
					}
				}).catch((err) => {});
			},
			submitHandler(value) {
				
			},

			loadTransfer() {
				let _self = this;
				let url = http.urlCommon + http.apiUrl.most;
				let body = {
					biz_module: 'employService',
					biz_method: 'queryEmployeeList',
					biz_param: {
						orgId: localStorage.getItem('orgid'),
						mobile: '',
						name: this.name,
						leave: 1,
					}
				};
				http.commonPost(url, body).then((res) => {
					this.result = new Array();
					this.list = res.biz_result.list;
					let resu = this.list
					for(var i = 0; i < resu.length; i++) {
						this.result.push(resu[i].name)
					}
				}).catch((err) => {});
			},
		},
		created() {}

	}
</script>

<style lang="less" scoped>
	.transfer {
		.list {
			.item {
				line-height: 30px;
				padding: 0 10px;
				font-size: 16px;
				border-bottom: 1px solid #e6e6e6;
			}
		}
	}
</style>