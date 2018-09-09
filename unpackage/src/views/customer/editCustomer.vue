<template>
	<yd-layout>
		<yd-navbar slot="navbar" :title="title">
			<yd-icon name="shangyiyehoutuifanhui" slot="left" size='.5rem' @click.native="goBack" custom></yd-icon>
		</yd-navbar>
		<edit-cus :param="cusInfo"></edit-cus>
		<main-var :param="cusInfo"></main-var>
		<yd-button size="large" type="hollow" @click.native="valiSave()">保存</yd-button>
	</yd-layout>
</template>

<script>
	import validation from '../../validation/validation.js'
	import http from '../../libs/httpService.js'
	import editCus from '../../components/customer/editCus.vue'
	import mainVar from '../../components/supplier/mainVar.vue'
	export default {
		data() {
			return {
				title: '编辑客户',
				msg: {
					name: ''
				},
				cusInfo: '',
			}
		},

		computed: {

		},
		components: {
			editCus,
			mainVar
		},
		beforeDestroy() {

		},
		methods: {

			loadDetail() {
				let url = http.addSID(http.urlCommon + http.apiUrl.most);
				let body = {
					biz_module: 'erpCustomerService',
					biz_method: 'queryCustomerInfo',
					biz_param: {
						id: this.$route.query.id,
					}
				};
				body.time = Date.parse(new Date()) + parseInt(http.difTime);
				body.sign = http.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				http.commonPost(url, body).then((res) => {
					this.cusInfo = res.biz_result;
					this.contactList = res.biz_result.contactList[0];
					let scope = this.cusInfo.bizScope
					scope = scope.replace(/\s+/g, ' ')
					this.cusInfo.bizScope = scope.split(' ')
					console.log(this.contactList)
					console.log(this.cusInfo)

				}).catch((err) => {});
			},
			valiSave() {
				let _self = this;
				var checkArr = [];
				let checkName = validation.checkNull(_self.cusInfo.name, '请输入客户名称');
				checkArr.push(checkName);
				let checkType = validation.checkNull(_self.cusInfo.type, '请选择客户类型');
				checkArr.push(checkType);
				let checkScale = validation.checkNull(_self.cusInfo.scale, '请选择客户规模');
				checkArr.push(checkScale);
				let checkOwnStock = validation.checkNull(_self.cusInfo.ownStock, '请选择是否有自有仓库');
				checkArr.push(checkOwnStock);
				let checkNature = validation.checkNull(_self.cusInfo.nature, '请选择客户性质');
				checkArr.push(checkNature);
				let checkprovince = validation.checkNull(_self.cusInfo.provinceName, '请选择客户地址');
				checkArr.push(checkprovince);
				let checkAddress = validation.checkNull(_self.cusInfo.address, '请选择客户详细地址');
				checkArr.push(checkAddress);

				for(var i = 0; i < checkArr.length; i++) {
					if(checkArr[i]) {
						this.$dialog.toast({
							mes: checkArr[i],
							timeout: 800
						});
						return;
					}
				}
				this.submit()

			},

			submit() {
				let url = http.addSID(http.urlCommon + http.apiUrl.most);
				let body = {
					biz_module: 'erpCustomerService',
					biz_method: 'updateCustomerInfo',
					biz_param: {
						address: this.cusInfo.address,
						bizScope: this.cusInfo.bizScope.join(' '),
						country: this.cusInfo.country,
						scale: this.cusInfo.scale,
						city: this.cusInfo.city,
						district:this.cusInfo.district,
						facebook: this.contactList ?this.contactList.facebook:"",
						id: this.cusInfo.id,
						mainContact: this.cusInfo.mainContact,
						mainEmail: this.cusInfo.mainEmail,
						mainPhone: this.cusInfo.mainPhone,
						name: this.cusInfo.name,
						nature: this.cusInfo.nature,
						ownStock: this.cusInfo.ownStock,
						province: this.cusInfo.province,
						qq: this.contactList?this.contactList.wechart:"",
						tel: this.contactList?this.contactList.tel:"",
						type: this.cusInfo.type,
						wechart: this.contactList?this.contactList.wechart:"",
					}
				};
				console.log("EEEEEEEEEEEEEEEEEEE",body)
				body.time = Date.parse(new Date()) + parseInt(http.difTime);
				body.sign = http.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				http.commonPost(url, body).then((res) => {
					if(res.code == '1c01') {
						this.$dialog.toast({
							mes: res.msg
						});
						this.goBack()
					} else {
						this.$dialog.toast({
							mes: res.msg
						});
					}
				}).catch((err) => {});
			},
			goBack() {
				let _self = this;
				window.history.go(-1);
				console.log("----------------返回-----------------");
			},
		},
		created() {
			this.loadDetail()
		}

	}
</script>

<style lang="less">

</style>