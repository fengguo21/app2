<template>
	<div class="intention">
		<yd-cell-group>
			<div class="wrapBox"><span class="Label">供应商:</span><span class="in">{{param.offerCustomerName}}</span></div>
			<div class="wrapBox"><span class="Label">价格:</span><span class="in">{{param.price}}元/斤</span></div>
			<div class="wrapBox"><span class="Label">可供数量:</span><span class="in">{{param.number}}</span></div>
			<div class="wrapBox"><span class="Label">运费:</span><span class="in">{{param.incidentals}}</span></div>
			<div class="wrapBox"><span class="Label">账期:</span><span class="in">预付{{param.advance * 100}}%-余款{{param.paymentDay }}天</span></div>
			<div class="wrapBox"><span class="Label">货物所在地:</span><span class="in">{{param.goodsPosition}}</span></div>
			<div class="wrapBox"><span class="Label">报价有效期:</span><span class="in">{{param.utime}}</span></div>
			<div class="wrapBox"><span class="Label">供应商可否提供加工:</span><span class="in">{{param.machinableMode?'提供加工':'不提供加工'}}</span></div>
			<div class="wrapBox"><span class="Label">加工方式:</span><span class="in">{{param.machinableMode}}</span></div>
			<div class="wrapBox"><span class="Label">是否包交包退:</span><span class="in">{{param.returnGoods?'是':'否'}}</span></div>
			<div class="wrapBox"><span class="Label">退货运费说明:</span><span class="in">{{param.incidentalsDesc}}</span></div>
			<div class="wrapBox"><span class="Label">报价备注:</span><span class="in">{{param.priceDescription}}</span></div>

			<div class="imgBox">
				<span class="Label">药材图片:</span>
				<yd-lightbox :num="image.length">
					<yd-lightbox-img v-for="item in image" :src="item" :original="item.original"></yd-lightbox-img>
				</yd-lightbox>
			</div>
		</yd-cell-group>
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		},
		props: {
			param: '',
			image: '',
		},
		components: {

		},
		beforeDestroy() {

		},
		methods: {},

	}
</script>

<style lang="less" scoped>
	
	.imgBox {
		line-height: 46px;
		img {
			width: 45%;
			margin-right: 5px;
		}
	}
</style>