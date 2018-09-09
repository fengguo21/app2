<template>
	<yd-layout>
		<yd-navbar slot="navbar" :title="title">
			<yd-icon name="shangyiyehoutuifanhui" slot="left" size='.5rem' @click.native="goBack" custom></yd-icon>
		</yd-navbar>
		<edit-sup :param="supInfo"></edit-sup>
		<main-var :param="supInfo"></main-var>
		<yd-button size="large" type="hollow" @click.native="valiSave()">保存</yd-button>
	</yd-layout>
</template>

<script>
	import validation from '../../validation/validation.js'
	import http from '../../libs/httpService.js'
	import editSup from '../../components/supplier/editSup'
	import mainVar from '../../components/supplier/mainVar'
	export default {
		data() {
			return {
				title: '编辑供应商',
				msg: {
					name: ''
				},
				supInfo: '',
			}
		},

		computed: {

		},
		components: {
			editSup,
			mainVar
		},
		beforeDestroy() {

		},
		methods: {

			loadDetail() {
				let url = http.addSID(http.urlCommon + http.apiUrl.most);
				let body = {
					biz_module: 'erpSupplierService',
					biz_method: 'querySupplierInfo',
					biz_param: {
						id: this.$route.query.id,
					}
				};
				body.time = Date.parse(new Date()) + parseInt(http.difTime);
				body.sign = http.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				http.commonPost(url, body).then((res) => {
					this.supInfo = res.biz_result.bizCustomer;
					this.contactList = res.biz_result.contactList[0];
					let scope = this.supInfo.bizScope
					if(scope) {
						scope = scope.replace(/\s+/g, ' ')
						this.supInfo.bizScope = scope.split(' ')
					}else{
						this.supInfo.bizScope = [];
					}

				}).catch((err) => {});
			},
			valiSave() {
				let _self = this;
				var checkArr = [];
				let checkName = validation.checkNull(_self.supInfo.name, '请输入供应商名称');
				checkArr.push(checkName);
				let checkType = validation.checkNull(_self.supInfo.type, '请选择供应商类型');
				checkArr.push(checkType);
				let checkScale = validation.checkNull(_self.supInfo.scale, '请选择供应商规模');
				checkArr.push(checkScale);
				let checkOwnStock = validation.checkNull(_self.supInfo.ownStock, '请选择是否有自有仓库');
				checkArr.push(checkOwnStock);
				let checkNature = validation.checkNull(_self.supInfo.nature, '请选择供应商性质');
				checkArr.push(checkNature);
				let checkprovince = validation.checkNull(_self.supInfo.provinceName, '请选择供应商地址');
				checkArr.push(checkprovince);
				let checkAddress = validation.checkNull(_self.supInfo.address, '请选择供应商详细地址');
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
					biz_module: 'erpSupplierService',
					biz_method: 'updateSupplierInfo',
					biz_param: {
						address: this.supInfo.address,
						bizScope: this.supInfo.bizScope.join(' '),
						city: this.supInfo.city,
						cityName: this.supInfo.cityName,
						country: this.supInfo.country,
						district: this.supInfo.district,
						facebook: this.contactList.facebook,
						id: this.supInfo.id,
						mainContact: this.supInfo.mainContact,
						mainEmail: this.supInfo.mainEmail,
						mainPhone: this.supInfo.mainPhone,
						name: this.supInfo.name,
						nature: this.supInfo.nature,
						ownStock: this.supInfo.ownStock,
						province: this.supInfo.province,
						qq: this.contactList.wechart,
						scale: this.contactList.scale,
						tel: this.contactList.tel,
						type: this.supInfo.type,
						wechart: this.contactList.wechart,
					}
				};
				console.log("333333333333333333333333333", body)
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

<style lang="less" scoped>

</style>