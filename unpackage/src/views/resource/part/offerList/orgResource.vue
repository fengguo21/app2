<template>
	<publicList :param="dataList"></publicList>
</template>

<script>
	import publicList from  '../publicList.vue'
	export default {
		data() {
			return {
				dataList: {
					operateIds: [],
					biz_method:'queryOrgSendOffer',
					biz_module: 'erpIntentionOfferService',
				},
			}
		},
		components: {
			publicList,
		},
		created() {

		}
	}
</script>

<style>

</style>