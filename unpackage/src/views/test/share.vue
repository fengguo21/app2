<template>
	<detailsLayout :showMore="true" title="分享">
		<div class="button" @click="share()">分享链接</div>
	</detailsLayout>
</template>
<script>
	import centerContent from "../../components/centerContent.vue"
	import detailsLayout from "../../components/detailsLayout.vue"
	import share from "../../libs/share.js"
	export default {
		data() {
			return {
				shareData:{
					shares: {},
					sharecontent:'报价11111111111111111',
					sharehref:'http://192.168.1.118/#' + this.$route.path,
					sharehrefTitle:'报价',
					sharehrefDes:'描述---------------',
					picture:['http://test.image.yaocaimaimai.com/18737134310android2018_03_08_17_34_0566891jpg?imageslim']
				}
			}
		},
		components: {
			centerContent,
			detailsLayout,
		},
		methods: {
			share(){
				share.judgeH5(this.shareData)
			}
		},
		created(){
			console.log(location.href)
		}
		
	}
</script>
<style lang="less" scoped>
	.button {
		text-align: center;
	}
</style>