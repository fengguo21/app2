<template>
	<yd-cell-group>
		<yd-cell-item>
			<span slot="left">供应商名称：</span>
			<span slot="right">{{param.name}}</span>
		</yd-cell-item>
		<yd-cell-item>
			<span slot="left">供应商类型：</span>
			<span slot="right">{{param.type | supplierType}}</span>
		</yd-cell-item>
		<yd-cell-item>
			<span slot="left">客户规模：</span>
			<span slot="right">{{param.scale | scale }}</span>
		</yd-cell-item>
		<yd-cell-item>
			<span slot="left">有无自有仓库：</span>
			<span slot="right">{{param.ownStock == 0 ? '无':'是'}}</span>
		</yd-cell-item>
		<yd-cell-item>
			<span slot="left">供应商性质：</span>
			<span slot="right">{{param.nature | nature}}</span>
		</yd-cell-item>
		<yd-cell-item>
			<span slot="left">地址：</span>
			<span slot="right">{{param.countryName +" "+ param.provinceName +" "+  param.cityName + " " + param.districtName}}</span>
		</yd-cell-item>
		<yd-cell-item>
			<span slot="left">详细地址：</span>
			<span slot="right">{{param.address}}</span>
		</yd-cell-item>
	</yd-cell-group>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		props: {
			param: {}
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
		},

	}
</script>

<style lang="less">

</style>