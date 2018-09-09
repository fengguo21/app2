<template>
	<yd-layout>
		<yd-navbar slot="navbar" :title="title">
			<yd-icon name="shangyiyehoutuifanhui" slot="left" size='.5rem' @click.native="goBack" custom></yd-icon>
		</yd-navbar>
		<edit-sup :param="supInfo"></edit-sup>
		<editContact :param="contactList"></editContact>
		<main-var :param="supInfo"></main-var>
		<yd-button size="large" type="hollow" @click.native="valiSave()">保存</yd-button>
	</yd-layout>
</template>

<script>
	import validation from '../../validation/validation.js'
	import http from '../../libs/httpService.js'
	import editContact from '../../components/supplier/editContact'
	import editSup from '../../components/supplier/editSup'
	import mainVar from '../../components/supplier/mainVar.vue'
	export default {
		data() {
			return {
				title: '新建供应商',
				msg: {
					name: ''
				},
				supInfo: {
					name: '',
					type: '',
					scale: '',
					ownStock: '',
					nature: '',
					countryName: '',
					country: '',
					provinceName: '',
					province: '',
					cityName: '',
					city: '',
					districtName: '',
					district: '',
					address:'',
					bizScope:[],
				},
				contactList: {
					name: '',
					position: '',
					phone: '',
					tel: '',
					wechart: '',
					qq: '',
					email: '',
					facebook: '',
				},
			}
		},

		computed: {

		},
		components: {
			editSup,
			mainVar,
			editContact
		},
		beforeDestroy() {

		},
		methods: {
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

				let checkCName = validation.checkNull(_self.contactList.name, '请输入联系人名称');
				checkArr.push(checkCName);
				let checkCPosition = validation.checkNull(_self.contactList.position, '请填写联系人职位');
				checkArr.push(checkCPosition);
				let checkCPhone = validation.checkPhone(_self.contactList.phone, '请填写联系人电话');
				checkArr.push(checkCPhone);
				
				
				let checkbizScope = validation.checkNull(_self.supInfo.bizScope, '请输入供应商名称');
				checkArr.push(checkbizScope);

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
					biz_method: 'addSupplier',
					biz_param: {
						address: this.supInfo.address,
						bizScope: this.supInfo.bizScope.join(' '),
						city: this.supInfo.city,
						cityName: this.supInfo.cityName,
						contacts: {
							name: this.contactList.name,
							main: 1,
							facebook: this.contactList.facebook,
							email: this.contactList.email,
							qq: this.contactList.wechart,
							phone: this.contactList.phone,
							position: this.contactList.position,
							tel: this.contactList.tel,
							wechart: this.contactList.wechart,
						},
						country: this.supInfo.country,
						countryName: this.supInfo.countryName,
						district: this.supInfo.district,
						districtName: this.supInfo.districtName,
						name: this.supInfo.name,
						nature: this.supInfo.nature,
						ownStock: this.supInfo.ownStock,
						province: this.supInfo.province,
						provinceName: this.supInfo.provinceName,
						type: this.supInfo.type,
						supplier:1,
						scale: this.contactList.scale,

					}
				};
				console.log(body)
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
		}

	}
</script>

<style lang="less" scoped>

</style>