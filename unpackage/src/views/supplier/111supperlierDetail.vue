<template>
	<yd-layout>
		<yd-navbar slot="navbar" :title="title">
			<yd-icon name="shangyiyehoutuifanhui" slot="left" size='.5rem' @click.native="goBack" custom></yd-icon>
		</yd-navbar>
		<yd-popup v-model="popup.showMenu" position="right">
			<yd-button type="danger" style="margin: 20px 0 0 30px;" @click.native="addNew('/editContact')">新建联系人</yd-button>
			<yd-button type="hollow" style="margin: 20px 0 0 30px;" @click.native="goto(/editSupplier/)">编辑供应商</yd-button>
			<yd-button type="danger" style="margin: 20px 0 0 30px;" @click.native="editCont(1)">设置主联系人</yd-button>
			<yd-button type="hollow" style="margin: 20px 0 0 30px;" @click.native="editCont(2)">选择编辑联系人</yd-button>
			
			<yd-button type="hollow" style="margin: 20px 0 0 30px;" @click.native="loadDetailSplit(0)">信息编辑记录</yd-button>
			<yd-button type="hollow" style="margin: 20px 0 0 30px;" @click.native="loadDetailSplit(1)">信息划转记录</yd-button>
		</yd-popup>
		<div class="titleBar">
			<div class="title">
				供应商信息
			</div>
		</div>
		<yd-cell-group>
			<yd-cell-item>
				<span slot="left">供应商名称：</span>
				<span slot="right">{{supInfo.name}}</span>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">供应商类型：</span>
				<span slot="right">{{supInfo.type | supplierType}}</span>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">客户规模：</span>
				<span slot="right">{{supInfo.scale | scale }}</span>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">有无自有仓库：</span>
				<span slot="right">{{supInfo.ownStock == 0 ? '无':'是'}}</span>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">供应商性质：</span>
				<span slot="right">{{supInfo.nature | nature}}</span>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">地址：</span>
				<span slot="right">{{supInfo.countryName +" "+ supInfo.provinceName +" "+  supInfo.cityName + " " + supInfo.districtName}}</span>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">详细地址：</span>
				<span slot="right">{{supInfo.address}}</span>
			</yd-cell-item>
		</yd-cell-group>
		<div class="titleBar">
			<div class="title">
				主要联系人
			</div>
		</div>
		<yd-cell-group v-for="(item,index) in allContact" v-if="item.main == 1">
			<yd-cell-item>
				<span slot="left">姓名：</span>
				<span slot="left">{{item.name}}</span>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">职位：</span>
				<span slot="left">{{item.position}}</span>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">手机：</span>
				<span slot="left">{{item.phone}}</span>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">电话：</span>
				<span slot="left">{{item.tel}}</span>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">微信：</span>
				<span slot="left">{{item.wechart}}</span>
			</yd-cell-item>
			<yd-cell-item>
				<yd-cell-item>
					<span slot="left">QQ：</span>
					<span slot="left">{{item.qq}}</span>
				</yd-cell-item>
				<span slot="left">邮箱：</span>
				<span slot="left">{{item.email}}</span>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">Facebook：</span>
				<span slot="left">{{item.facebook}}</span>
			</yd-cell-item>
		</yd-cell-group>
		<div class="titleBar">
			<div class="title">
				全部联系人
			</div>
		</div>
		<yd-accordion>
			<yd-accordion-item :title="item.name" v-for="(item,index) in allContact">

				<div style="padding: .24rem;">
					<p>姓名：{{item.name}}</p>
					<p>职位：{{item.position}}</p>
					<p>手机号：{{item.phone}}</p>
					<p>电话：{{item.tel}}</p>
					<p>邮箱：{{item.email}}</p>
				</div>
			</yd-accordion-item>
		</yd-accordion>

		<div class="titleBar">
			<div class="title">
				主营品种
			</div>
		</div>
		<yd-cell-group>
			<div class="mainVarieties">
				<div class="addVarieties" v-for="(item,index) in supInfo.bizScope">{{item}}</div>
			</div>
		</yd-cell-group>
		<yd-tabbar slot="tabbar">
			<div class="bottom">
				<div class="button" @click="supplierType(supInfo.id)">{{supInfo.supplierType == 0 ? '转为为优质供应商':'移出优质供应商'}}</div>
				<div class="button" @click="popup.showMenu = true">操作</div>

			</div>
		</yd-tabbar>

		<yd-popup v-model="operation.show" position="center" width="90%">
			<operating-data :param="operation"></operating-data>
		</yd-popup>

		<yd-popup v-model="changeContact.showContact" position="center" width="90%">
			<div class="contain">
				<yd-radio-group v-model="changeContact.radio">
					<yd-radio :val='index' v-for="(item,index) in allContact" :disabled="item.main == 1" v-if="changeContact.type == 1">{{item.name}}</yd-radio>
					<yd-radio :val='index' v-for="(item,index) in allContact" v-if="changeContact.type == 2">{{item.name}}</yd-radio>
				</yd-radio-group>
			</div>
			<div class="comButton">
				<div @click="updateMainContact(changeContact.radio)" v-if="changeContact.type == 1">确定</div>
				<div @click="updateContact(changeContact.radio)" v-if="changeContact.type == 2">确定</div>
				<div @click="changeContact.showContact = false">取消</div>
			</div>
		</yd-popup>
	</yd-layout>
</template>

<script>
	import operatingData from './operatingData.vue'
	import http from '../../libs/httpService.js'
	export default {
		data() {
			return {
				popup: {
					showMenu: false,
				},
				operation: {
					show: false,
					contain: '',
					type:'',
				},
				title: '供应商详情',
				supInfo: '',
				changeContact: {
					showContact: false,
					radio: 1,
					type: false,
					status: '',
				},
				showMenu: false,
				allContact: '',
				editContact: '',
				contactList: '',
			}
		},
		components: {
			operatingData
		},
		methods: {
			addNew(link) {
				let _self = this;
				let url = link + '?id=' + this.supInfo.id + "&type=add"
				_self.$router.push(url);
				_self.popup.showMenu = false;
			},
			goto(link) {
				this.$router.push(link + this.supInfo.id);
			},
			//返回
			goBack() {
				let _self = this;
				window.history.go(-1);
				console.log("----------------返回-----------------");
			},
			//修改主要联系人
			editCont(item) {
				let _self = this;
				_self.changeContact.type = item;
				_self.changeContact.showContact = true;
			},
			//编辑联系人
			updateContact(item) {
				let _self = this;
				_self.changeContact.showContact = false;
				_self.changeContact.status = 'edit';
				//				_self.$router.push('/editContact/' + _self.supInfo.id + "/" + item);
				let url = '/editContact?id=' + this.supInfo.id + "&type=" + item
				_self.$router.push(url);

			},
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
				body.time = Date.parse(new Date()) + parseInt(http.difTime);
				body.sign = http.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				http.commonPost(url, body).then((res) => {
					_self.operation.contain = res.biz_result.list;
					_self.operation.type = type;
					console.log(_self.operation.type)
					console.log(_self.operation.contain)
					_self.popup.showMenu = false;
					_self.operation.show = true;
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
					_self.supInfo = res.biz_result.bizCustomer;
					_self.contactList = res.biz_result.contactList[0];
					_self.editContact = _self.contactList;
					_self.allContact = res.biz_result.contactList;
					let scope = _self.supInfo.bizScope
					scope = scope.replace(/\s+/g, ' ')
					_self.supInfo.bizScope = scope.split(' ')
				}).catch((err) => {});
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
						supplierType: _self.supInfo.supplierType == 0 ? '1' : '0'
					}
				};
				body.time = Date.parse(new Date()) + parseInt(http.difTime);
				body.sign = http.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				http.commonPost(url, body).then((res) => {
					_self.popup.showMenu = false;
					_self.loadDetail();
				}).catch((err) => {});
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
						id: _self.allContact[item].id,
						customerId: _self.allContact[item].customerId,
					}
				};
				body.time = Date.parse(new Date()) + parseInt(http.difTime);
				body.sign = http.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				http.commonPost(url, body, true).then((res) => {
					_self.popup.showMenu = false;
					_self.$dialog.toast({
						mes: res.msg
					});
					_self.loadDetail();
				}).catch((err) => {
					_self.showMenu = false;
				});
			}
		},
		created() {
			this.loadDetail();
			console.log(this.$route.query.id)
		}

	}
</script>

<style lang="less" scoped>
	.titleBar {
		.title {
			margin-top: 10px;
			line-height: 40px;
			color: #666;
			font-size: 20px;
			padding: 0 10px;
		}
	}
	
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
		border-top: 1px solid rgba(230, 230, 230, .4);
		&>div {
			padding: 10px 0;
			text-align: center;
			flex: 1;
			background-color: gray
		}
	}
	
	.mainVarieties {
		background-color: #fff;
		.addVarieties {
			display: inline-block;
			margin: 10px 10px;
			padding: 5px;
			border: 1px solid rgba(230, 230, 230, .5);
			span {
				margin-left: 5px;
			}
		}
	}
	
	.yd-cell-right {
		span {
			display: inline-block;
			width: 100%;
			text-align: left;
		}
	}
</style>