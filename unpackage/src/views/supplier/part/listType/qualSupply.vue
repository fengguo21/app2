<template>
	<div>
		<supply-list :param="dataList"></supply-list>
	</div>
</template>

<script>
	import supplyList from '../supplyList.vue'
	export default {
		data() {
			return {
				dataList: {
					operateIds: [],
				},
			}
		},
		components: {
			supplyList,
		},
		methods: {
			
		},

	}
</script>

<style lang="less">

</style>