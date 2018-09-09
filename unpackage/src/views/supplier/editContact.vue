<template>
	<yd-layout>
		<yd-navbar slot="navbar" :title="title">
			<yd-icon name="shangyiyehoutuifanhui" slot="left" size='.5rem' @click.native="goBack" custom></yd-icon>
		</yd-navbar>
		<editContact :param="contactList"></editContact>
		<yd-button size="large" type="hollow" v-if="this.$route.path == '/editContact'" @click.native="save(1)">保存</yd-button>
		<yd-button size="large" type="hollow" v-if="this.$route.path == '/editContact'" @click.native="save(0)">取消</yd-button>

	</yd-layout>
</template>

<script>
	import editContact from '../../components/supplier/editContact.vue'
	import validation from '../../validation/validation.js'
	import http from '../../libs/httpService.js'
	export default {
		data() {
			return {
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
				title: this.$route.query.type == 'add' ? '新建联系人' : '编辑联系人',
				msg: {
					name: ''
				}
			}
		},
		components: {
			editContact
		},
		methods: {
			//下载数据
			loadDetail() {
				let _self = this;
				let url = http.addSID(http.urlCommon + http.apiUrl.most);
				let body = {
					biz_module: 'erpCustomerContactService',
					biz_method: 'queryContactInfo',
					biz_param: {
						id: _self.$route.query.id,
					}
				};
				body.time = Date.parse(new Date()) + parseInt(http.difTime);
				body.sign = http.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				http.commonPost(url, body).then((res) => {
					_self.contactList = res.biz_result;
				}).catch((err) => {});
			},
			save(item) {
				let _self = this;
				if(item !== 0) {
					var checkArr = [];
					let checkName = validation.checkNull(_self.contactList.name, '请输入联系人名称');
					checkArr.push(checkName);
					let checkPosition = validation.checkNull(_self.contactList.position, '请填写联系人职位');
					checkArr.push(checkPosition);
					let checkPhone = validation.checkPhone(_self.contactList.phone, '请填写联系人电话');
					checkArr.push(checkPhone);
					for(var i = 0; i < checkArr.length; i++) {
						if(checkArr[i]) {
							this.$dialog.toast({
								mes: checkArr[i],
								timeout: 800
							});
							return;
						}
					}
					_self.addContact()
				} else {
					window.history.go(-1);
				}

			},
			addContact() {
				let url = http.addSID(http.urlCommon + http.apiUrl.most);
				let body = {
					biz_module: 'erpCustomerContactService',
					biz_method: 'updateContact',
					biz_param: {
						customerId: this.contactList.customerId,
						email: this.contactList.email,
						facebook: this.contactList.facebook,
						id: this.contactList.id,
						name: this.contactList.name,
						phone: this.contactList.phone,
						position: this.contactList.position,
						qq: this.contactList.qq,
						tel: this.contactList.tel,
						wechart: this.contactList.wechart,
						main: this.contactList.main,
					}
				};
				if(this.$route.query.type == 'add') {
					body.biz_module = 'erpCustomerContactService';
					body.biz_method = 'addContact';
					body.biz_param.main = 1;

				}
				body.time = Date.parse(new Date()) + parseInt(http.difTime);
				body.sign = http.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				http.commonPost(url, body).then(res => {
					window.history.go(-1);
					this.$dialog.toast({
						mes: res.msg
					});
					// this.loadDetail();
				}).catch(err => {
					console.log(JSON.stringify(err))
					this.$dialog.toast({
						mes: err.msg
					});
				});
			},
			goBack() {
				let _self = this;
				window.history.go(-1);
				console.log("----------------返回-----------------");
			},
		},
		created() {
			if(this.$route.query.type !== 'add') {
				this.loadDetail()
			}

		}

	}
</script>

<style lang="less" scoped>

</style>