<template>
	<yd-layout>
		<yd-navbar slot="navbar" title="筛选">
			</router-link>-->
		</yd-navbar>

		<div class="keyWord">

			<yd-cell-group>
				<yd-cell-item>
					<span slot="left">供应商ID：</span>
					<yd-input slot="right" v-model="param.id" placeholder="请输入ID"></yd-input>
				</yd-cell-item>
				<yd-cell-item>
					<span slot="left">供应商名称：</span>
					<yd-input slot="right" v-model="param.name" placeholder="请输入供应商名称"></yd-input>
				</yd-cell-item>
				<yd-cell-item>
					<span slot="left">手机号：</span>
					<yd-input slot="right" v-model="param.phone" placeholder="请输入手机号"></yd-input>
				</yd-cell-item>
			</yd-cell-group>
			
			
		</div>

		<yd-tabbar slot="tabbar">
			<div class="comfire" @click="menuSelect()">
				确定
			</div>
		</yd-tabbar>

	</yd-layout>
</template>
<script>
	export default {
		data() {
			return {
				
			}
		},
		props:{
			param:'',
		},
		methods:{
			menuSelect() {
				this.param.searchStatus = true;
				this.$emit("menu-select", 1);
			},
		},
		created(){
			console.log(this.param)
		}
	}
</script>

<style lang="less" scoped>
	.yd-flexview {
		height: 100vh;
		.comfire {
			width: 90%;
			text-align: center;
			line-height: 50px;
		}
	}
	
	.keyWord {
		width: 90%;
	}
</style>