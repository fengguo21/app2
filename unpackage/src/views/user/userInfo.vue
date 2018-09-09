<template>
	<yd-layout>
		<yd-navbar slot="navbar" :title="title">
			<yd-icon name="shangyiyehoutuifanhui" slot="left" size='.5rem' @click.native="goBack" custom></yd-icon>
		</yd-navbar>
		<div>
			<yd-lightbox class="imageBox">
				<yd-lightbox-img class="user-icon" :src="employeeInfo.photo?employeeInfo.photo:imageUrl" v-if="unchanged"></yd-lightbox-img>
				<div v-else style="padding:0.5rem">
					<p style="margin:0.1rem">请上传需要更换的头像：</p>
					<upload-img :multiple="multiple" :imageArray="photoList" @postUrl="getImgUrl"></upload-img>
				</div>
			</yd-lightbox>
			<yd-cell-group>
				<yd-cell-item>
					<span slot="left">姓名：</span>
					<!-- <span slot="right">{{employeeInfo.name}}</span> -->
					<yd-input slot="right" v-model="employeeInfo.name" disabled></yd-input>
				</yd-cell-item>
				<yd-cell-item type="label">
					<span slot="left">性别：</span>
					<select slot="right" v-model="employeeInfo.gender" :disabled="unchanged">
						<option value="">请选择性别</option>
						<option value="1">男</option>
						<option value="0">女</option>
					</select>
				</yd-cell-item>
			</yd-cell-group>
			<yd-cell-group>
				<yd-cell-item>
					<span slot="left">手机号：</span>
					<yd-input slot="right" type="number" v-model="employeeInfo.mobile" :disabled="unchanged"></yd-input>
				</yd-cell-item>
				<yd-cell-item>
					<span slot="left">座机号：</span>
					<yd-input slot="right" type="number" v-model="employeeInfo.extno" :disabled="unchanged"></yd-input>
				</yd-cell-item>
			</yd-cell-group>
			<yd-cell-group>
				<yd-cell-item>
					<span slot="left">QQ：</span>
					<yd-input slot="right" type="number" v-model="employeeInfo.qq" :disabled="unchanged"></yd-input>
				</yd-cell-item>
				<yd-cell-item>
					<span slot="left">邮箱：</span>
					<yd-input slot="right" type="text" v-model="employeeInfo.email" :disabled="unchanged"></yd-input>
				</yd-cell-item>
			</yd-cell-group>

		</div>
		<yd-tabbar slot="tabbar" class="tabbar">
			<div class="bottom" v-if="unchanged">
				<p @click="edit">编辑 </p>
			</div>
			<div class="bottom" v-else>
				<p @click="abort" style="boder-right:1px solid #ccc">返回 </p>
				<p @click="submitFunc">提交修改 </p>
			</div>
		</yd-tabbar>

	</yd-layout>
</template>
<script>
	import uploadImg from "../../common/upload/uploadImg.vue";
	import { mapGetters, mapActions } from "vuex";
	export default {
		data() {
			return {
				userDetail: "",
				showMenu: false,
				showChoose: "",
				photoList: [],
				multiple: false,
				unchanged: true,
				title: "个人信息",
				imageUrl: require("../../res/images/head.png")
			};
		},
		computed: {
			...mapGetters(["employeeInfo"]),
		},
		mounted() {},
		components: {
			uploadImg
		},
		methods: {
			...mapActions(["updateEmployeeInfo"]),
			getImgUrl(url) {
				this.photoList.push(url);
				// this.multiple = false;
			},
			goBack() {
				let _self = this;
				window.history.go(-1);
			},
			edit() {
				console.log("dddddddddeeeeeee", this);
				this.$dialog.confirm({
					title: "确认编辑",
					mes: "确定要编辑个人信息吗？",
					opts: [{
							txt: "取消",
							color: false,
							callback: () => {
								// this.$dialog.toast({ mes: "你点了取消", timeout: 1000 });
							}
						},
						{
							txt: "确定",
							color: true,
							callback: () => {
								this.unchanged = false;
								this.title = "编辑个人信息";
								this.photoList = [];
								this.photoList.push(this.employeeInfo.photo);
							}
						}
					]
				});
				// this.photoList = [];
				// this.multiple = false;
			},
			submitFunc() {
				this.$dialog.confirm({
					title: "确认提交",
					mes: "确定要提交更改吗？",
					opts: [{
							txt: "取消",
							color: false,
							callback: () => {
								// this.$dialog.toast({ mes: "你点了取消", timeout: 1000 });
							}
						},
						{
							txt: "确定",
							color: true,
							callback: () => {
								// this.unchanged = false;
								// this.$dialog.toast({ mes: "可以编辑了！", timeout: 1000 });
								this.unchanged = true;
								console.log(this.employeeInfo);
								this.submitEdit(); //提交按钮
								console.log("我是头像++++", this.photoList);
							}
						}
					]
				});
				console.log("22222222222222", this);
			},
			submitEdit() {
				let param = {
					id: window.localStorage.employeeId,
					gender: this.employeeInfo.gender,
					mobile: this.employeeInfo.mobile,
					extno: this.employeeInfo.extno,
					qq: this.employeeInfo.qq,
					email: this.employeeInfo.email,
					photo: this.photoList ? this.photoList[0] : ""
				};
				this.updateEmployeeInfo(param)
					.then(res => {

					})
					.catch(err => {

					});
			},

			abort() {
				this.unchanged = true;
				console.log("OOOOOOOOOOOOOOOO", this);
			}
		},

		//更新用户详情

		created() {}
	};
</script>
<style lang="less" scoped>
	.imageBox {
		background-color: #eee;
		text-align: center;
		.user-icon {
			width: 2rem;
			height: 2rem;
			// margin-top: 0.5rem;
			// margin-bottom: 0.5rem;
			// margin-left: 2.5rem;
			// margin-right: 0.5rem;
			margin: 0.2rem;
			border-radius: 50%;
			overflow: hidden;
		}
	}
	
	.imgClass {}
	
	.bottom {
		width: 100%;
		display: flex;
		p {
			flex: 1;
			text-align: center;
			font-size: 14px;
			line-height: 40px;
			color: #333;
		}
	}
	
	.tabbar {
		padding: 0;
		height: 50px;
	}
</style>