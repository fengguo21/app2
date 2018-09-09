<template>
	<div class="list">
		<p v-for="(item ,index) in dataList" @click="chooseYtk(item)">{{item.text}}</p>
	</div>
</template>

<script>
	import http from '../../../../libs/httpService.js'
	import bus from "../../../../libs/bus.js";
	export default {
		data() {
			return {
				dataList:[     
					{ value: '5', text: '药店' },
				    { value: '6', text: '医院' },
				    { value: '14', text: '诊所' },
				    { value: '4', text: '个体户' },
				    { value: '7', text: '贸易公司' },
				    { value: '11',  text:'药贩子'}, 
				    { value: '12', text: '产地药商' },
				    { value: '13', text: '销地药商' }
			    ]
			}
		},
		props:['param','popup'],
		methods:{
			chooseYtk(item){
				let _self = this;
				let url = http.urlCommon + http.apiUrl.most;
				let body = {
					biz_module: 'erpCustomerService',
					biz_method: 'TransferMedicinePusher',
					biz_param: {
						ids: this.param, 
						classify: 3, 
						type: item.value,
						}
				};
				http.commonPost(url, body).then((res) => {
					this.popup.show = false;
					this.$dialog.toast({mes: res.msg});
					if(res.code == "1c01"){
							bus.$emit("reloadSupply");
					}
				}).catch((err) => {});
			}
		}

	}
</script>

<style lang="less" scoped>
	.list{
		p{
			line-height: 35px;
			font-size: 16px;
			border-bottom: 1px solid #e6e6e6;
			padding: 0 0 0 15px;
		}
	}
</style>