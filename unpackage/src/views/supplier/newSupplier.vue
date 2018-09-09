<template>
	<yd-layout>
		<yd-navbar slot="navbar" :title="title">
			<yd-icon name="shangyiyehoutuifanhui" slot="left" size='.5rem' @click.native="goBack" custom></yd-icon>
		</yd-navbar>
		<div class="notice">
			<h4>提示</h4>
			此处可进行快速新增供应商完成报价<br/>但是需要在生成采购订单时完善供应商信息，请知悉
		</div>
		<yd-cell-group>
			<yd-cell-item>
				<span slot="left">供应商名称：</span>
				<yd-input slot="right" v-model="supplierName"  placeholder="请输入供应商名称(必填)"></yd-input>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">联系电话：</span>
				<yd-input slot="right" type="number" pattern="[0-9]*"  v-model="phone" placeholder="电话(必填)"></yd-input>
			</yd-cell-item>
			
		</yd-cell-group>
		<!-- <edit-sup :param="supInfo"></edit-sup> -->
		
		
		<yd-button size="large" type="hollow" @click.native="newSupplier()">保存</yd-button>
	</yd-layout>
</template>

<script>
	import * as store from '../../common/localStore';
	import validation from '../../validation/validation.js'
	import http from '../../libs/httpService.js'
	
	import editSup from '../../components/supplier/editSup'
	
	export default {
		data() {
			return {
				title: '新建供应商',
				phone:'',
				supplierName:'',
				
			}
		},

		computed: {

		},
		components: {
			editSup,
			
		},
		beforeDestroy() {

		},
		methods: {
			newSupplier(){
			 let body = {
		        biz_method: "fastAddSupplier",
		        biz_module: "erpSupplierService",
		        biz_param: {
		         name:this.supplierName,
		         mainPhone:this.phone,
		        }
		      };
		      http.commonPost(http.urlCommon + http.apiUrl.most,body).then((res)=>{
		        console.log(res,'supplier----------------------')

		        this.$router.push({name:'offerzonedetail',query: { id: store.get('currentIntentionId'),type:7 },
		        	params:{phone:res.biz_result.mainPhone,id:res.biz_result.id,name:res.biz_result.name,typeStatus:1}})
		      })
			},
			goBack() {
				let _self = this;
				window.history.go(-1);
				console.log("----------------返回-----------------");
			},
		},
		created() {
		}

	}
</script>

<style lang="less" scoped>
.notice{
	color:red;
	text-align:center;
	margin:30px ;
}
</style>