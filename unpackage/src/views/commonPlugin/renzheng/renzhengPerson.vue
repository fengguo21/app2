<template>
	<div class="renzhengPerson">
		<div v-if="this.$route.query.utype == 0 || personStatus">
			<yd-cell-item v-for="item in info">
				<span slot="left">{{item.text}}</span>
				<input slot="right" :type="item.type" v-model="item.value" :placeholder="item.placeholder">
			</yd-cell-item>
			<div class="renzhengImg">
				<div class="photoList">
					<div class="img_list" v-for="(item ,index) in photos" @click="indexs=index">
						<p>{{item.photo.title}}</p>
						<upload-img :multiple="item.multiple" :imageArray="item.photo.path" @postUrl="getImgUrl"></upload-img>
					</div>
				</div>
			</div>
			<yd-button size="large" type="danger" @click.native="checkValidation()">提交</yd-button>
		</div>
		<div v-if="this.$route.query.utype == 1">
			<p>您已经提交个人认证，系统正在审核中...</p>
		</div>
		<div v-if="this.$route.query.utype == 2">
			<p>您已经通过个人认证！</p>
		</div>
		<div v-if="this.$route.query.utype == 3 && !personStatus">
			<p>您的个人认证没有通过审核，请重新提交审核！</p>
		</div>
	</div>
</template>

<script>
	import http from '../../../libs/httpService.js'
	import uploadImg from '../../../common/upload/uploadImg.vue'
	export default {
		data() {
			return {
				//				330381197603154176
				info: [{
					text: '真实姓名：',
					value: '',
					type: 'text',
					placeholder: '请输入真实姓名',
				}, {
					text: '身份证号：',
					value: '',
					type: 'number',
					placeholder: '请输入身份证号',
				}],
				indexs: 0,//当前选中图片
				personStatus :false,
				photos: [{
					photo: {
						category: "1",
						path: [],
						title: "身份证正面照",
					},
					multiple: true,
				}, {
					photo: {
						category: "2",
						path: [],
						title: "身份证反面照",
					},
					multiple: true,
				}, {
					photo: {
						category: "0",
						path: [],
						title: "手持身份证正面照",
					},
					multiple: true,
				}]
			}
		},
		props: {},
		computed: {},
		components: {
			uploadImg
		},
		methods: {
			getImgUrl(url) {
				this.photos[this.indexs].photo.path.push(url);
				this.photos[this.indexs].multiple = false;
			},
			checkValidation() {
				let _self = this;
				let type = [].concat(JSON.parse(JSON.stringify(_self.photos)));
				let PhotoLists = [];
				for(let i of _self.info) {
					if(i.value == '') {
						_self.$dialog.toast({
							mes: i.placeholder
						});
						return false;
					}
				};
				let pattern = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
				if(!pattern.test(_self.info[1].value)) {
					_self.$dialog.toast({
						mes: '身份证号格式错误'
					});
					return false;
				}
				for(let i of type) {
					console.log(i.photo.path.length)
					if(i.photo.path.length == 0) {
						_self.$dialog.toast({
							mes: '请提交' + i.photo.title
						});
						return false;
					}
				};
				for(let j = 0 ; j< type.length;j++) {
					PhotoLists.push(type[j].photo);
					PhotoLists[j].path = PhotoLists[j].path[0]
				}
				_self.submit(PhotoLists)
			},
			submit(PhotoLists) {
				let _self = this;
				let url = http.addSID(http.urlCommon + http.apiUrl.most);
				let body = {
					biz_module: 'erpCustomerAuditService',
					biz_method: 'submitAudit',
					biz_param: {
						auditImage: PhotoLists,
						id: this.$route.query.id,
						name: this.info[0].value,
						number: this.info[1].value,
						type: 0,
					}
				};
				body.time = Date.parse(new Date()) + parseInt(http.difTime);
				body.sign = http.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				http.commonPost(url, body).then((res) => {
					if(res.code == "1c01") {
						_self.$dialog.toast({
							mes: res.msg
						});
						window.history.go(-1);
					}
				}).catch((err) => {
					_self.$dialog.toast({
						mes: err.msg
					});
				});
			}
		},
		created() {
			if(this.$route.query.utype == 3){
				 this.$dialog.confirm({
                    title: '审核结果',
                    mes: '您提交的认证个人没有通过审核，是否需要重新认证？',
                    opts: () => {
                        this.personStatus = true;
                    }
                });
			}
		}
	}
</script>

<style lang="less" scoped>
	.renzhengImg {
		padding-top: 20px;
		border-top: 1px solid #eee;
		.photoList {
			margin: 20px 0 0;
			.img_list {
				text-align: center;
				width: 33%;
				display: inline-block;
				margin-bottom: 10px;
			}
			p {
				margin-bottom: 10px;
			}
		}
	}
</style>