<template>
	<yd-layout>
		<yd-navbar slot="navbar" :title="title">
			<yd-icon name="shangyiyehoutuifanhui" slot="left" size='.5rem' @click.native="goBack" custom></yd-icon>
		</yd-navbar>
	</yd-layout>
</template>

<script>
	export default {
		data() {
			return {
				title: '新建供应商',
				msg: {
					name: ''
				}
			}
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
			goBack() {
				let _self = this;
				window.history.go(-1);
				console.log("----------------返回-----------------");
			},
		},

	}
</script>

<style lang="less">
	
</style>