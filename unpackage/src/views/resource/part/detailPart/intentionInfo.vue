<template>
	<div class="intention">
		<yd-cell-group>
			<div class="title">{{param.breedName}}</div>
			<div class="wrapBox"><span class="Label">求购数量:</span><span class="in">{{param.number}}{{param.unit | unit }}</span></div>
			<div class="wrapBox"><span class="Label">规格要求:</span><span class="in">{{param.spec}}</span></div>
			<div class="wrapBox"><span class="Label">产地要求:</span><span class="in">{{param.location | province}}</span></div>
			<div class="wrapBox"><span class="Label">质量要求:</span><span class="in">{{param.quality}}</span></div>
			<div class="wrapBox"><span class="Label">客户类型:</span><span class="in">{{param.inType | allType }}</span></div>
			<div class="wrapBox"><span class="Label">交货城市:</span><span class="in">{{param.extendsDesc.countryName}} / {{param.extendsDesc.locationName}} /  {{param.extendsDesc.cityName}} / {{param.extendsDesc.districtName}}</span></div>
			<div class="wrapBox"><span class="Label">备注信息:</span><span class="in">{{param.description}}</span></div>
			<div class="imgBox">
				<span class="Label">求购样照:</span>
				<yd-lightbox class="box" :num="image.length">
					<yd-lightbox-img v-for="item in image" :src="item" :original="item.original"></yd-lightbox-img>
				</yd-lightbox>
			</div>
		</yd-cell-group>
	</div>
</template>

<script>
	export default {
		props: {
			param: '',
			image: '',
		},

	}
</script>

<style lang="less" scoped>
	.title {
		font-size: 26px;
		line-height: 60px;
		color: #FF4949;
		padding-left: 15px;
		border-bottom: 1px solid #ccc;
	}
	
	.Label {
		vertical-align: top;
		line-height: 30px;
	}
	
	.in {
		display: inherit;
	}
	
	.imgBox {
		.box {
			padding:0 10px 10px;
			img {
				width: 25%;
				margin-right: 5px;
			}
		}
	}
</style>