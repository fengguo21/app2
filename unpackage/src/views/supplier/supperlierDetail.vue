<template>
	<div class="supplierDetail">
		<detailsLayout :showMore="true" :funcs="funcs" :moreFun="moreFun" :title="title">
			<yd-scrolltab>
				<yd-scrolltab-panel label="基本信息" icon="demo-icons-category1" active>
					<main-detail :param="dataInfo.supInfo"></main-detail>
				</yd-scrolltab-panel>

				<yd-scrolltab-panel label="主联系人" icon="demo-icons-category2">
					<mainContact :param="dataInfo.allContact"></mainContact>
				</yd-scrolltab-panel>

				<yd-scrolltab-panel label="全部联系人" icon="demo-icons-category3">
					<all-contact :param="dataInfo.allContact"></all-contact>
				</yd-scrolltab-panel>

				<yd-scrolltab-panel label="主营品种" icon="demo-icons-category4">
					<mainType :param="dataInfo.supInfo"></mainType>
				</yd-scrolltab-panel>
				<yd-scrolltab-panel label="客户订单" icon="demo-icons-category5">
					<yd-accordion>
						<yd-accordion-item title="订单列表">
							<customer-order style="background-color: #eeeeee;"></customer-order>
						</yd-accordion-item>
					</yd-accordion>
				</yd-scrolltab-panel>
				<yd-scrolltab-panel label="客户求购" icon="demo-icons-category6">
					<yd-accordion>
						<yd-accordion-item title="求购列表">
							<!-- <main-biz-scope :bizScope="customerInfo.bizScope"></main-biz-scope> -->
							<customer-intention style="background-color:#eeeeee;"></customer-intention>
						</yd-accordion-item>
					</yd-accordion>
				</yd-scrolltab-panel>
			</yd-scrolltab>
		</detailsLayout>
		<yd-popup v-model="changeContact.showContact" position="center" width="80%">
			<div class="contain">
				<yd-radio-group v-model="changeContact.radio">
					<yd-radio :val='index' v-for="(item,index) in dataInfo.allContact" :disabled="item.main == 1" v-if="changeContact.type == 1">{{item.name}}</yd-radio>
					<yd-radio :val='index' v-for="(item,index) in dataInfo.allContact" v-if="changeContact.type == 2">{{item.name}}</yd-radio>
				</yd-radio-group>
			</div>
			<div class="comButton">
				<div class="button" @click="updateMainContact(changeContact.radio)" v-if="changeContact.type == 1">确定</div>
				<div class="button" @click="updateContact(changeContact.radio)" v-if="changeContact.type == 2">确定</div>
				<div class="button" @click="changeContact.showContact = false">取消</div>
			</div>
		</yd-popup>
		<yd-popup v-model="operation.show" position="center" width="90%">
			<operating-data :param="operation"></operating-data>
		</yd-popup>
		
	</div>
</template>

<script>
	import centerContent from "../../components/centerContent.vue"
	import detailsLayout from "../../components/detailsLayout.vue"
	import mainBizScope from "../customer/detail/mainBizScope.vue";
	import customerOrder from "../customer/detail/customerOrder.vue"
	import customerIntention from "../customer/detail/customerIntention.vue";
	import operatingData from './operatingData.vue'
	import http from '../../libs/httpService.js'
	import mainDetail from './part/detail/mainDetail.vue'
	import mainContact from './part/detail/mainContact.vue'
	import allContact from './part/detail/allContact.vue'
	import mainType from './part/detail/mainType.vue'

	export default {
		data() {
			return {
				dataInfo: {
					supInfo: {},
					allContact: {},
				},
				operation: {
					show: false,
					contain: '',
					type:'',
				},
				title: '供应商详情',
				limit: true,
				changeContact: {
					showContact: false,
					radio: 1,
					type: false,
					status: '',
				},
				funcs: [{
					label: '转为优质供应商',
					limit: true,
					callback: () => {
						this.supplierType()
					},
					icon: ""
				}, {
					label: "编辑供应商",
					limit: true,
					callback: () => {
						this.editSupply()
					},
					icon: ""
				}],
				moreFun: [{
					label: "信息编辑记录",
					limit: true,
					callback: () => {
						this.loadDetailSplit(0)
					},
					icon: ""
				},{
					label: "信息划转记录",
					limit: true,
					callback: () => {
						this.loadDetailSplit(1)
					},
					icon: ""
				},{
					label: "修改主要联系人",
					limit: true,
					callback: () => {
						this.editCont(1)
					},
					icon: ""
				}, {
					label: "编辑联系人",
					limit: true,
					callback: () => {
						this.editCont(2)
					},
					icon: ""
				}, {
					label: "新建联系人",
					limit: true,
					callback: () => {
						this.updateContact()
					},
					icon: ""
				}, {
					label: '供应商认证',
					limit: this.$route.query.type == 6 ? true : false,
					callback: () => {
						this.renzheng('/renzhengSupply')
					},
					icon: ""
				}, {
					label: '企业认证审批',
					limit: this.$route.query.type == 7 && this.$route.query.ctype == 1 ? true : false,
					callback: () => {
						this.auditSupply('/auditSupply', 1)
					},
					icon: ""
				}, {
					label: '个人认证审批',
					limit: this.$route.query.type == 7 && this.$route.query.utype == 1  ? true : false,
					callback: () => {
						this.auditSupply('/auditSupply', 0)
					},
					icon: ""
				}]
			}
		},
		computed: {

		},
		components: {
			customerIntention,
			mainBizScope,
			customerOrder,
			operatingData,
			centerContent,
			detailsLayout,
			mainDetail,
			mainContact,
			allContact,
			mainType,
		},
		mounted() {

		},
		beforeDestroy() {

		},
		methods: {
			loadDetailSplit(type) {
				let _self = this;
				let url = http.addSID(http.urlCommon + http.apiUrl.most);
				let body = {
					biz_module: 'erpCustomerService',
					biz_method: 'queryCustomerTransfer',
					biz_param: {
						customer: Number(_self.$route.query.id),
					}
				};
				if(type == 0) {
					body.biz_module = 'erpCustomerService';
					body.biz_method = 'queryCustomerTracking';
					body.biz_param = {};
					body.biz_param.id = _self.$route.query.id;
				}
				http.commonPost(url, body).then((res) => {
					console.log(res)
					_self.operation.contain = res.biz_result.list;
					_self.operation.type = type;
					_self.operation.show = true;
				}).catch((err) => {});
			},
			editSupply() {
				this.$router.push('/editSupplier?id=' + this.dataInfo.supInfo.id);
			},
			//修改主要联系人选择
			editCont(item) {
				let _self = this;
				_self.changeContact.type = item;
				_self.changeContact.showContact = true;
			},
			//设置主要联系人
			updateMainContact(item) {
				let _self = this;
				this.changeContact.showContact = false
				let url = http.addSID(http.urlCommon + http.apiUrl.most);
				let body = {
					biz_module: 'erpCustomerContactService',
					biz_method: 'updateMainContact',
					biz_param: {
						id: _self.dataInfo.allContact[item].id,
						customerId: _self.dataInfo.allContact[item].customerId,
					}
				};
				console.log(body)
				body.time = Date.parse(new Date()) + parseInt(http.difTime);
				body.sign = http.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				http.commonPost(url, body).then((res) => {
					_self.$dialog.toast({
						mes: res.msg
					});
					_self.loadDetail();

				}).catch((err) => {});
			},
			//新建/编辑联系人
			updateContact(item) {
				let _self = this;
				_self.changeContact.showContact = false;
				let id = typeof(item) == 'number' ? _self.dataInfo.allContact[item].id : 0;
				let type = typeof(item) == 'number' ? 'edit' : 'add';
				let url = '/editContact?id=' + id + "&type=" + type;
				_self.$router.push(url);
			},
			//新建联系人
			renzheng(link, type) {
				let _self = this;
				let cAudit = _self.dataInfo.supInfo.cAudit;
				let uAudit = _self.dataInfo.supInfo.uAudit;
				let url = link + '?id=' + this.dataInfo.supInfo.id + "&ctype=" + cAudit + "&utype=" + uAudit;
				_self.$router.push(url);
			},
			auditSupply(link,type) {
				let _self = this;
				let cAudit = _self.dataInfo.supInfo.cAudit;
				let uAudit = _self.dataInfo.supInfo.uAudit;
				let url = link + '?id=' + this.dataInfo.supInfo.id + '&type=' +type   ;
				_self.$router.push(url);
			},
			//设为优质供应商
			supplierType() {
				let _self = this;
				let url = http.addSID(http.urlCommon + http.apiUrl.most);
				let body = {
					biz_module: 'erpCustomerService',
					biz_method: 'extracBetterSupplier',
					biz_param: {
						id: _self.$route.query.id,
						supplierType: _self.dataInfo.supInfo.supplierType == 0 ? '1' : '0'
					}
				};
				body.time = Date.parse(new Date()) + parseInt(http.difTime);
				body.sign = http.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				http.commonPost(url, body).then((res) => {
					this.loadDetail()
				}).catch((err) => {});
			},
			//下载数据
			loadDetail() {
				let _self = this;
				let url = http.addSID(http.urlCommon + http.apiUrl.most);
				let body = {
					biz_module: 'erpSupplierService',
					biz_method: 'querySupplierInfo',
					biz_param: {
						id: _self.$route.query.id,
					}
				};
				body.time = Date.parse(new Date()) + parseInt(http.difTime);
				body.sign = http.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				http.commonPost(url, body).then((res) => {
					_self.dataInfo.supInfo = res.biz_result.bizCustomer;
					_self.dataInfo.allContact = res.biz_result.contactList;
					_self.funcs[0].label = _self.dataInfo.supInfo.supplierType == 0 ? '转为优质供应商' : '移出优质供应商';
					let scope = _self.dataInfo.supInfo.bizScope;
					if(scope){
						scope = scope.replace(/\s/g,' ')
						_self.dataInfo.supInfo.bizScope = scope.split(' ')
					}
				}).catch((err) => {});
			},
		},
		created() {
			let _self = this;
			_self.loadDetail();
		}

	}
</script>

<style lang="less" scoped>
	.supplierDetail {
		.background {
			background-color: #000 !important;
		}
		.contain {
			padding: 20px 20px;
			background-color: #f3f3f3;
			text-align: left;
			&>div {
				text-align: left;
				.yd-radio {
					margin: 0 0 10px;
					display: inline-block;
					width: 49%;
				}
			}
		}
		.comButton {
			display: flex;
			.button {
				text-align: center;
				background-color: #FF4949;
				flex: 1;
				line-height: 45px;
				&:last-child {
					background-color: #CCCCCC;
				}
			}
		}
		.yd-scrolltab-item {
			padding: 0;
		}
	}
</style>