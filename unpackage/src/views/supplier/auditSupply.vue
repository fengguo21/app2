<template>
	<yd-layout>
		<yd-navbar slot="navbar" :title="title">
			<yd-icon name="shangyiyehoutuifanhui" slot="left" size='.5rem' @click.native="goBack" custom></yd-icon>
		</yd-navbar>
		<audit-person  :param="infor"></audit-person>
		<!--<audit-company v-if="this.$route.query.type == 1" :param="infor"></audit-company>-->
		<yd-tabbar slot="tabbar">
			<div class="bottom">
				<div class="button" @click="goBack()">取消</div>
				<div class="button" @click="openConfrim(1)">通过</div>
				<div class="button" @click="openConfrim(0)">不通过</div>
			</div>
		</yd-tabbar>
	</yd-layout>
</template>

<script>
	import auditPerson from '../commonPlugin/audit/auditPerson.vue'
	import auditCompany from '../commonPlugin/audit/auditCompany.vue'
	import http from '../../libs/httpService.js'
	export default {
		data() {
			return {
				title: this.$route.query.type == 1 ? '企业认证审核' : '个人认证审核',
				infor: {
					name: '',
					infors:'',
					listImage: [],
					explain: '',
				},
			}
		},
		components: {
			auditPerson,
			auditCompany,
		},
		methods: {
			openConfrim(res) {
				let _self = this;
				if(!_self.infor.explain) {
					_self.$dialog.toast({
						mes: '请填写审核说明!',
						timeout: 1000
					});
				} else {
					_self.$dialog.confirm({
						title: '审核',
						mes: '请确认您的操作' ,
						opts: () => {
							_self.remarkSubmit();
							_self.additSubmit(res);
							
						}
					});
				}

			},
			remarkSubmit(){
				let _self = this;
				let url = http.addSID(http.urlCommon + http.apiUrl.most);
				let body = {
					biz_module: 'erpCustomerRemarkService',
					biz_method: 'addCustomerRemark',
					biz_param: {
						customerId: _self.$route.query.id,
						bizType: _self.$route.query.type,
						remark: this.infor.explain,
					}
				};
				http.commonPost(url, body).then((res) => {
					
				}).catch((err) => {});
			},
			additSubmit(res) {
				let _self = this;
				let url = http.addSID(http.urlCommon + http.apiUrl.most);
				let body = {
					biz_module: 'erpCustomerAuditService',
					biz_method: 'checkAudit',
					biz_param: {
						customerId: _self.$route.query.id,
						type: _self.$route.query.type,
						pass: res,
					}
				};
				http.commonPost(url, body).then((res) => {
					if(res.code == "1c01") {
						_self.$dialog.toast({
							mes: res.msg
						});
						window.history.go(-1);
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
	.bottom {
		width: 100%;
		display: flex;
		text-align: center;
		color: #666;
		line-height: .8rem;
		.button {
			flex: 1;
		}
	}
</style>