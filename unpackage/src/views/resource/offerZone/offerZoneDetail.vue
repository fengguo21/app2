<template>
	<div class="offerZoneDetail">
		<detailsLayout :showMore="true" :funcs="funcs" :moreFun="moreFun" :title="title" @shares="share">
			<div class="tab">
				<block v-if='typeStatus == 0'>
					<yd-tab :callback="tabCallback">
						<yd-tab-panel label="求购信息" tabkey="0" active></yd-tab-panel>
						<yd-tab-panel label="报价填写" tabkey="1" ></yd-tab-panel>
					</yd-tab>
				</block>
				<block v-if='typeStatus == 1'>
					<yd-tab :callback="tabCallback">
						<yd-tab-panel label="求购信息" tabkey="0" ></yd-tab-panel>
						<yd-tab-panel label="报价填写" tabkey="1" active></yd-tab-panel>
					</yd-tab>
				</block>
				

				<intention-info :param='info.intention' :image='info.intentionFiles' v-if="!typeStatus"></intention-info>
				<offerMake :param='info.offer' :intention='info.intention' v-if="typeStatus"></offerMake>
			</div>
		</detailsLayout>
	</div>
</template>

<script>
	import intentionInfo from "../part/detailPart/intentionInfo.vue"
	import detailsLayout from "../../../components/detailsLayout.vue"
	import offerMake from "./part/offerMake.vue"
	import inputVal from '../../../components/com/inputType'
	import http from '../../../libs/httpService.js'
	import share from '../../../libs/share.js'
	export default {
		data() {
			return {
				title: '求购报价',
				typeStatus: 0, //判断显示求购还是报价
				info: {
					offer: {
						newSupplier:false,
						machine:0,//是否可加工
						spplyName:'',//供应商名称
						customerId: '',
						duedate: '',
						goodsPosition: '',
						imageArray: [],
						incidentals: '',
						incidentalsDesc: '',
						intentionId: '',
						machinableMode: '',
						number: '',
						paymentDay: '',
						price: '',
						priceDescription: '',
						productId: '',
						quality: '',
						returnGoods: '',
						unit: '',
					}, //报价信息
					intentionFiles: [], //求购i文件
					intention: '', //求购信息
					offerFiles: '', //报价文件
					sample: [],
				},
				funcs: [],
				moreFun: [],
				shareData:{
					shares: {},
					sharecontent:'',//内容
					sharehref:'',// 链接
					sharehrefTitle:'',//标题
					sharehrefDes:'',// 描述
					thumbs:['http://ohfmt3i6o.bkt.clouddn.com/logo.png'],
				}
			}
		},
		computed: {

		},
		components: {
			intentionInfo,
			detailsLayout,
			offerMake
		},
		mounted() {

		},
		beforeDestroy() {

		},
		methods: {
			share(){
				let _self = this;
				_self.shareData.sharehrefTitle = "【紧急求购】" + _self.info.intention.breedName + "-上【药材买卖网】你报价我就要了！";
				_self.shareData.sharehref= http.shareUrl + '/htm5/#/needDetails/' + this.$route.query.id;
				_self.shareData.sharehrefDes= _self.info.intention.breedName + ',规格:' + _self.info.intention.spec + ',需要' + _self.info.intention.number  + '要求：' + _self.info.intention.quality + '。--买卖药材就上药材买卖网！';
				share.judgeH5(this.shareData)
			},
			tabCallback(label, key) {
				let _self = this;
				if(key !== _self.typeStatus) {
					_self.typeStatus = Number(key);
				}
			},
			loadData() {
				let _self = this;
				let url = http.urlCommon + http.apiUrl.most;
				let body = {
					biz_method: "queryIntentionById",
					biz_module: "erpIntentionService",
					biz_param: {
						id: _self.$route.query.id,
					}
				};
				http.commonPost(url, body).then((res) => {
					res.biz_result.intention.extendsDesc = res.biz_result.extendsDesc
					_self.info.intention = res.biz_result.intention;
					console.log(_self.info.intention,'==========================================')
					let imgArr = res.biz_result.intention.pics;
					for(let i = 0; i < imgArr.length; i++) {
						_self.info.intentionFiles.push(imgArr[i].path)
					}
				}).catch((err) => {});
			},
			
		},
		created() {
			this.typeStatus = 0
			console.log(this.$route.params,'===================================')
			if(this.$route.params.typeStatus == 1){
				// this.tabCallback(1)
				this.typeStatus = 1
				this.info.offer.newSupplier = true
				this.info.offer.spplyName = this.$route.params.name
				this.info.offer.customerId = this.$route.params.id
			}
			
			
			let _self = this;
			_self.loadData();
		}

	}
</script>

<style lang="less">
	.offerZoneDetail{
		/*background-color: #fff;*/
	}
</style>