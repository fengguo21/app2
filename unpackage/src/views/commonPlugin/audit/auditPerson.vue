<template>
	<div class="auditPerson">
		<yd-cell-group>
			<yd-cell-item>
				<span slot="left">{{title}}：</span>
				<span slot="right">{{param.name}}</span>
			</yd-cell-item>
			<!--<yd-cell-item>
				<span slot="left">身份证号：</span>
				<span slot="right">身份证号</span>
			</yd-cell-item>-->
			<div class="table" v-for="item, key in param.listImage">
				<yd-lightbox :num="num">
					<yd-lightbox-img :key="key" :src="item.src"></yd-lightbox-img>
				</yd-lightbox>
				<p >{{param.infors[key].category | categoryEnter}}</p>
				<p>{{param.infors[key].ctime | timeForm}}</p>
			</div>
			<textarea class="textarea" v-model="param.explain" placeholder="请填写审核说明!(必填)"></textarea>
		</yd-cell-group>

	</div>
</template>

<script>
	import http from '../../../libs/httpService.js'
	export default {
		data() {
			return {
				num:1,
				title: this.$route.query.type == 0 ? "认证个人" : "认证企业",
			}
		},
		props: {
			param: {},
		},
		methods: {
			submit() {
				let _self = this;
				let url = http.addSID(http.urlCommon + http.apiUrl.most);
				let body = {
					biz_module: 'filesService',
					biz_method: 'queryFilesList',
					biz_param: {
						bizId: _self.$route.query.id,
						bizType: _self.$route.query.type == 0 ? "user_validate" : "company_validate",
						fileType: "image",
					}
				};
				http.commonPost(url, body).then((res) => {
					_self.param.name = res.biz_result.list[0].name.split('实名认证照片')[0];
					_self.param.infors = res.biz_result.list;
					for(var i = 0; i < res.biz_result.list.length; i++) {
						var obj = {};
						obj.src = res.biz_result.list[i].path;
						_self.param.listImage.push(obj);
					}
				}).catch((err) => {});
			},
		},
		created() {
			this.submit();
		}

	}
</script>

<style lang="less" scoped>
	.auditPerson {
		img {
			width: 32vw;
			margin: 0 0 0 1vw;
		}
		.table{
			display: inline-block;
			padding: 10px 0;
			p{
				text-align: center;
			}
		}
		.textarea {
			width: 100%;
			border: 0;
			outline: none;
			border-top: 1px solid #e6e6e6;
			padding: 10px 10px;
		}
	}
</style>