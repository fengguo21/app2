<template>
	<div>
		<div class="titleBar">
			<div class="title">
				联系人
			</div>
		</div>
		<yd-cell-group>
			<yd-cell-item>
				<span slot="left">姓名：</span>
				<input class="text_input" slot="right" v-model="param.name" placeholder="请输入联系人姓名(必填)"></input>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">职位：</span>
				<input class="text_input" slot="right"  v-model="param.position"  placeholder="请输入联系人职位(必填)"></input>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">手机号：</span>
				<input class="text_input" slot="right" v-model="param.phone" placeholder="请输入联系人手机号"></input>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">电话：</span>
				<yd-input class="text_input" slot="right" v-model="param.tel" placeholder="请输入联系人电话"></yd-input>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">微信：</span>
				<yd-input slot="right" v-model="param.wechart" placeholder="请输入联系人微信"></yd-input>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">QQ：</span>
				<yd-input slot="right" v-model="param.qq" placeholder="请输入联系人QQ"></yd-input>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">邮箱：</span>
				<yd-input slot="right" v-model="param.email" placeholder="请输入联系人邮箱"></yd-input>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">Facebook：</span>
				<yd-input slot="right" v-model="param.facebook" placeholder="请输入联系人Facebook"></yd-input>
			</yd-cell-item>
		</yd-cell-group>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		props: {
			param: '',
		},
		components: {

		},
		methods: {
			
		},
		created() {
		},

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
	
	.text_input {
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
</style>