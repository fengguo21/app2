<template>
	<div class="renzhengPerson">
		<div  v-if="this.$route.query.ctype == 0 || emptyStatus">
			<yd-cell-item v-for="item in info">
				<span slot="left">{{item.text}}</span>
				<input slot="right" :type="item.type" v-model="item.value" :placeholder="item.placeholder">
			</yd-cell-item>
			<div class="renzhengImg">
				<div class="boxcheck">
					<p v-for="(item ,index) in checkboxEmpty" :class="{active:item.active}" @click="choosebox(index)">{{item.text}}</p>
				</div>
				<div class="photoList" v-if="checkboxEmpty[0].active">
					<div class="img_list" v-for="(item ,index) in photos" @click="indexs=index">
						<p>{{item.photo.title}}</p>
						<upload-img :multiple="item.multiple" :imageArray="item.photo.path" @postUrl="getImgUrl"></upload-img>
					</div>
				</div>
				<div class="photoList" v-if="checkboxEmpty[1].active">
					<div class="img_list" v-for="(item ,index) in triangle" @click="indexs=index">
						<p>{{item.photo.title}}</p>
						<upload-img :multiple="item.multiple" :imageArray="item.photo.path" @postUrl="getImgUrl1"></upload-img>
					</div>
				</div>

			</div>
			<yd-button size="large" type="danger" @click.native="checkValidation()">提交</yd-button>
		</div>
		<div v-if="this.$route.query.ctype == 1">
			<p>您已经提交企业认证，系统正在审核中...</p>
		</div>
		<div v-if="this.$route.query.ctype == 2">
			<p>您已经通过企业认证！</p>
		</div>
		<div v-if="this.$route.query.ctype == 3 && !emptyStatus">
			<p>您的企业认证没有通过审核，请重新提交审核！</p>
		</div>
	</div>
</template>

<script>
	import http from '../../../libs/httpService.js'
	import uploadImg from '../../../common/upload/uploadImg.vue'
	export default {
		data() {
			return {
				info: [{
					text: '企业名称：',
					value: '',
					type: 'text',
					placeholder: '请输入企业名称',
				}, {
					text: '营业执照：',
					value: '',
					type: 'number',
					placeholder: '请输入企业营业执照编号',
				}],
				indexs: 0, //当前中的序列
				emptyStatus:false,
				checkboxEmpty: [{
					active: true,
					text: '传统认证'
				}, {
					active: false,
					text: '三证合一'
				}],
				photos: [{
					photo: {
						category: "3",
						path: [],
						title: "工商营业执照",
					},
					multiple: true,

				}, {
					photo: {
						category: "4",
						path: [],
						title: "组织机构代码证",
					},
					multiple: true,
				}, {
					photo: {
						category: "5",
						path: [],
						title: "税务登记证",
					},
					multiple: true,
				}, {
					photo: {
						category: "6",
						path: [],
						title: "银行开户许可证",
					},
					multiple: true,
				}, {
					photo: {
						category: "7",
						path: [],
						title: "GMP资格证书",
					},
					multiple: true,
				}, {
					photo: {
						category: "8",
						path: [],
						title: "GSP资格证书",
					},
					multiple: true,
				}, {
					photo: {
						category: "13",
						path: [],
						title: "生产许可证",
					},
					multiple: true,
				}],
				triangle: [{
					photo: {
						category: "9",
						path: [],
						title: "三证合一",
					},
					multiple: true,

				}, {
					photo: {
						category: "10",
						path: [],
						title: "银行开户许可证",
					},
					multiple: true,

				}, {
					photo: {
						category: "11",
						path: [],
						title: "GMP资格证书",
					},
					multiple: true,
				}, {
					photo: {
						category: "12",
						path: [],
						title: "GSP资格证书",
					},
					multiple: true,
				}, {
					photo: {
						category: "14",
						path: [],
						title: "生产许可证",
					},
					multiple: true,
				}],
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
			getImgUrl1(url) {
				this.triangle[this.indexs].photo.path.push(url);
				this.triangle[this.indexs].multiple = false;
			},
			checkValidation() {
				let _self = this;
				let type = _self.checkboxEmpty[0].active ? [].concat(JSON.parse(JSON.stringify(this.photos))) : [].concat(JSON.parse(JSON.stringify(this.triangle)));
				let PhotoLists = [];
				for(let i of _self.info) {
					if(i.value == '') {
						_self.$dialog.toast({
							mes: i.placeholder
						});
						return false;
					}
				};
				for(let i of type) {
					console.log(i.photo.path.length)
					if(i.photo.path.length == 0) {
						_self.$dialog.toast({
							mes: '请提交' + i.photo.title
						});
						return false;
					}
				};
				for(let j = 0; j < type.length; j++) {
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
						type: 1,
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
				}).catch((err) => {});
			},
			choosebox(index) {
				for(let i of this.checkboxEmpty) {
					i.active = false
				}
				this.checkboxEmpty[index].active = true;
			},
		},
		watch: {

		},
		mounted() {

		},
		created() {}
	}
</script>

<style lang="less" scoped>
	.renzhengImg {
		padding-top: 20px;
		border-top: 1px solid #eee;
		.boxcheck {
			width: 100%;
			display: flex;
			p {
				flex: 1;
				text-align: center;
				line-height: 35px;
				color: #999;
				&.active {
					color: #f00;
				}
			}
		}
		.photoList {
			margin: 20px 0 0;
			.img_list {
				width: 33%;
				display: inline-block;
				margin-bottom: 10px;
			}
		}
		.img_list {
			text-align: center;
			width: 33%;
			p {
				margin: 0 0 10px 0;
			}
		}
	}
</style>