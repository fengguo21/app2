<template>
	<div class="container">
		<div class="boxDate">
			<p class="title">{{param.type==0 ? '信息编辑记录' :'信息划转记录'}}</p>
			<div class="contain">
				<div v-for="(item,index) in param.contain">
					<div class="list">
						<div class="left"><i :class="index ==0?'active':''"></i><b :class="index ==0?'active':''"></b></div>
						<div class="right">
							<p>时间：{{item.ctime}}</p>
							<p v-if="param.type == 0">{{item.operationDesc}}</p>
							<p v-if="param.type == 1">{{item.beforeEmployeeName}} --> {{item.employeeName}} </p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import http from '../../libs/httpService.js'
	export default {
		data() {
			return {
				title: '操作记录',
				msg: {
					name: ''
				}
			}
		},
		props: {
			param: {

			},
		},
		computed: {

		},
		components: {

		},
		mounted() {

		},
		beforeDestroy() {

		},
		methods: {
			goBack() {
				let _self = this;
				window.history.go(-1);
				console.log("----------------返回-----------------");
			},

		},
		created() {
			console.log(this.param)
		}

	}
</script>

<style lang="less" scoped>
	.container {
		.boxDate {
			padding: 10px;
			.title {
				text-align: center;
				padding-bottom: 10px;
			}
			.contain {
				padding: 10px 0;
				border-top: 1px solid #e6e6e6;
				max-height: 90vh;
				overflow: auto;
				.list {
					display: flex;
					position: relative;
					.left {
						height: inherit;
						margin-right: 10px;
						i {
							display: inline-block;
							width: 10px;
							height: 10px;
							border: 1px solid lightgreen;
							border-radius: 50px;
							position: absolute;
							background-color: #fff;
						}
						b {
							display: inline-block;
							height: 100%;
							border-left: 1px solid lightgreen;
							width: 1px;
							margin-left: 5px;
						}
						.active {
							border: 1px solid #e6e6e6;
						}
					}
					.right {
						padding: 0 10px 10px;
					}
				}
			}
		}
	}
</style>