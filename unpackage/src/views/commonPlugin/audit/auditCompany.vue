<template>
	<div class="auditPerson">
		<yd-cell-group>
			<yd-cell-item>
				<span slot="left">认证企业：</span>
				<span slot="right">{{param.name}}</span>
			</yd-cell-item>
			<!--<yd-cell-item>
				<span slot="left">身份证号：</span>
				<span slot="right">身份证号</span>
			</yd-cell-item>-->
			<yd-lightbox :num="param.listImage.length">
				<yd-lightbox-img v-for="item, key in param.listImage" :key="key" :src="item.src"></yd-lightbox-img>
			</yd-lightbox>
			<textarea class="textarea"  v-model="param.explain"  placeholder="请填写审核说明!(必填)"></textarea>
		</yd-cell-group>

	</div>
</template>

<script>
	import http from '../../../libs/httpService.js'
	export default {
		data() {
			return {
			}
		},
		props:{
			param:{},
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
						bizType: "company_validate",
						fileType: "image",
					}
				};
				http.commonPost(url, body).then((res) => {
					_self.param.name = res.biz_result.list[0].name.split('实名认证照片')[0];
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
		img{
			width: 31vw;
			margin: 0 1vw ;
		}
		.textarea{
			width: 100%;
			border: 0;
			outline: none;
			border-top: 1px solid #e6e6e6;
			padding: 10px 10px;
		}
	}
</style>