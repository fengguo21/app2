<template>
	<yd-layout>
		<yd-navbar slot="navbar" :title="title">
			<yd-icon name="shangyiyehoutuifanhui" slot="left" size='.5rem' @click.native="goBack" custom></yd-icon>
		</yd-navbar>
		<yd-accordion>
			<yd-accordion-item title="求购管理业务员A操作教程">
				<video width="352"  controls autobuffer>
					<source src="http://erp.yaocaimaimai.net/local/video/a.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'></source>
				</video>
			</yd-accordion-item>
			<yd-accordion-item title="资源管理采购主管操作教程">
				<video width="352" controls autobuffer>
					<source src="http://erp.yaocaimaimai.net/local/video/bmg.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'></source>
				</video>
			</yd-accordion-item>
			<yd-accordion-item title="资源管理业务员B操作教程">
				<video width="352" controls autobuffer>
					<source src="http://erp.yaocaimaimai.net/local/video/b.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'></source>
				</video>
			</yd-accordion-item>
			<yd-accordion-item title="报价自动分配与样品添加教程">
				<video width="352" controls autobuffer>
					<source src="http://erp.yaocaimaimai.net/local/video/sample_add20171031.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'></source>
				</video>
			</yd-accordion-item>
			<yd-accordion-item title="求购与报价优化20171115">
				<video width="352" controls autobuffer>
					<source src="http://erp.yaocaimaimai.net/local/video/offer20171115.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'></source>
				</video>
			</yd-accordion-item>
			<yd-accordion-item title="订单补充合同20171115">
				<video width="352" controls autobuffer>
					<source src="http://erp.yaocaimaimai.net/local/video/order20171115.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'></source>
				</video>
			</yd-accordion-item>
			<yd-accordion-item title="订单发货流程更新20171221">
				<video width="352" controls autobuffer>
					<source src="http://erp.yaocaimaimai.net/local/video/order20171221.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'></source>
				</video>
			</yd-accordion-item>
			<yd-accordion-item title="客户供应商更新20171221">
				<video width="352" controls autobuffer>
					<source src="http://erp.yaocaimaimai.net/local/video/customer20171221.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'></source>
				</video>
			</yd-accordion-item>
			<yd-accordion-item title="订单开票流程指引20170108">
				<video width="352" controls autobuffer>
					<source src="http://erp.yaocaimaimai.net/local/video/order20180108.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'></source>
				</video>
			</yd-accordion-item>
		</yd-accordion>

	</yd-layout>
</template>

<script>
	export default {
		data() {
			return {
				title:'视频教程'
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
		created() {}

	}
</script>

<style lang="less">

</style>