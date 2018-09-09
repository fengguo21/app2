<template>
	<div>
		<yd-popup v-model="showMenu" position="right" width="70%">
			<addVarieties :param="param" :showChoose='showChoose' @main-var="mainVar"></addVarieties>
		</yd-popup>
		<div class="titleBar">
			<div class="title">
				供应商信息
			</div>
		</div>
		<yd-cell-group>
			<yd-cell-item>
				<span slot="left">供应商名称：</span>
				<yd-input slot="right" v-model="param.name" placeholder="请输入供应商名称(必填)"></yd-input>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">供应商类型：</span>
				<span slot="right" @click="typeFunc">{{param.type | supplierType}}</span>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">供应商规模：</span>
				<span slot="right" @click="scaleFunc">{{param.scale | scale}}</span>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">有无自有仓库：</span>
				<span slot="left">
					<yd-radio-group v-model="param.ownStock">
				        <yd-radio val="0">无</yd-radio>
				        <yd-radio val="1">有</yd-radio>
				   </yd-radio-group>
				</span>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">供应商性质：</span>
				<span slot="right" @click="natureFunc">{{param.nature | nature}}</span>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">地址：</span>
				<span slot="right" @click.stop="showAddress = true" v-if="param.provinceName">{{param.countryName +" "+param.provinceName +" "+param.cityName +" "+param.districtName}}</span>
				<input class="diy_input" slot="left" @click.stop="showAddress = true" placeholder="请选择供应商地址" readonly v-else />
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">详细地址：</span>
				<yd-input slot="right" v-model="param.address"></yd-input>
			</yd-cell-item>
		</yd-cell-group>
		<yd-cityselect v-model="showAddress" :callback="selectAddress" :items="district"></yd-cityselect>
	</div>
</template>

<script>
	import addVarieties from '../../views/slideBar/addVarieties'
	import validation from '../../validation/validation.js'
	import http from '../../libs/httpService.js'
	import District from '../../views/commonPlugin/address.json';
	export default {
		data() {
			return {
				district: District[0].c,
				title: this.$route.fullPath.split('/')[2] == 'add' ? '新建供应商' : '编辑供应商',
				showMenu: false,
				showAddress: false,
				showChoose: '',

			}
		},
		props:{
			param:''
		},
		computed: {

		},
		components: {
			addVarieties
		},
		mounted() {

		},
		beforeDestroy() {

		},
		methods: {
			selectAddress(ret) {
				console.log(ret);
				this.param.provinceName = ret.itemName1;
				this.param.cityName = ret.itemName2;
				this.param.districtName = ret.itemName3;
				this.param.province = ret.itemValue1;
				this.param.city = ret.itemValue2;
				this.param.districtName = ret.itemName3;
				this.param.district = ret.itemValue3;
			},
			
			natureFunc() {
				this.showChoose = 'nature';
				this.showMenu = true;
			},
			scaleFunc() {
				this.showChoose = 'scale';
				this.showMenu = true;
			},
			typeFunc() {
				this.showChoose = 'supplierType';
				this.showMenu = true;
			},
			del(item) {
				for(var i = 0; i < this.supInfo.bizScope.length; i++) {
					if(this.supInfo.bizScope[i] == item) {
						this.supInfo.bizScope.splice(i, 1)
					}
				}
			},
			
			addFunc() {
				this.showChoose = 'bizScope';
				this.showMenu = true;
			},
			mainVar(item) { //tab跳转
				let _self = this;
				if(this.showChoose == 'supplierType') {
					_self.param.type = Number(item.value);
					console.log(_self.param.type)
				} else if(this.showChoose == 'scale') {
					_self.param.scale = Number(item.value);
					console.log(_self.param.scale)
				}
				 else if(this.showChoose == 'nature') {
					_self.param.nature = Number(item.value);
					console.log(_self.param.scale)
				}
				this.showMenu = false;
			},
			goBack() {
				let _self = this;
				window.history.go(-1);
			},
		},
		created() {
			
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
			span {
				color: #f00;
				line-height: 20px;
				font-size: 12px;
				margin-left: 10px;
			}
		}
	}
	
	.mainVarieties {
		background-color: #fff;
		.addVarieties {
			display: inline-block;
			margin: 10px 10px;
			padding: 5px;
			border: 1px solid rgba(230, 230, 230, .5);
			i {
				font-size: 10px;
				margin: 5px;
			}
		}
	}
	
	.diy_input {
		-webkit-box-flex: 1;
		-ms-flex: 1;
		flex: 1;
		height: 1rem;
		border: none;
		font-size: .3rem;
		background: transparent;
		color: #555;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: start;
		-ms-flex-pack: start;
		justify-content: flex-start;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		text-align: left;
	}
	
	.yd-cell-right {
		span {
			display: inline-block;
			width: 100%;
			text-align: left;
		}
	}
</style>