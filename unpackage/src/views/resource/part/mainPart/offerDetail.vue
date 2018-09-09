<template>
	<div class="supplierDetail">
		<detailsLayout :showMore="true" :funcs="funcs" :moreFun="moreFun" :title="title">
			<yd-scrolltab>
				<yd-scrolltab-panel label="求购信息" icon="demo-icons-category1" active>
					<div style="min-height: 85vh;"><intention-info :param='info.intention' :image='info.intentionFiles'></intention-info></div>
				</yd-scrolltab-panel>
				<yd-scrolltab-panel label="报价信息" icon="demo-icons-category2" >
					<div style="min-height: 85vh;"><offer-info :param='info.offer' :image='info.offerFiles'></offer-info></intention-info></div>
					
				</yd-scrolltab-panel>
			</yd-scrolltab>
		</detailsLayout>
	</div>
</template>

<script>
	import detailsLayout from "../../../../components/detailsLayout.vue"
	import intentionInfo from "../detailPart/intentionInfo.vue"
	import offerInfo from "../detailPart/offerInfo.vue"
	import http from '../../../../libs/httpService.js'
	export default {
		data() {
			return {
				title: '报价详情',
				info:{
					offer:'',//报价信息
					intentionFiles:'',//求购i文件
					intention:'',//求购信息
					offerFiles:'',//报价文件
					sample:[],
				},
				funcs: [],
				moreFun: []
				
			}
		},
		computed: {

		},
		components: {
			detailsLayout,
			intentionInfo,
			offerInfo
		},
		mounted() {

		},
		beforeDestroy() {

		},
		methods: {
			loadInfo(){
				let _self = this;
				let url = http.addSID(http.urlCommon + http.apiUrl.most);
				let body = {
					biz_module: 'erpIntentionOfferService',
					biz_method: 'findOfferById',
					biz_param: {
						id: _self.$route.query.id,
					}
				};
				http.commonPost(url, body).then((res) => {
					let result = res.biz_result
					_self.info.offer = result.offer;
					_self.info.intentionFiles = result.intentionFiles;
					_self.info.intention = result.intention;
					_self.info.offerFiles = result.offerFiles;
					_self.info.sample = result.sample;
				}).catch((err) => {});
			}
		},
		created(){
			this.loadInfo()
		}

	}
</script>

<style lang="less">
	
</style>