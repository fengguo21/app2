<template>
	<div class="renzhengSupply">
		<renzheng :title="title">
			<renzheng-person slot="person"></renzheng-person>
			<renzheng-empty slot="empty"></renzheng-empty>
		</renzheng>
	</div>
</template>

<script>
	import renzheng from '../commonPlugin/renzheng/renzheng.vue'
	import renzhengPerson from '../commonPlugin/renzheng/renzhengPerson.vue'
	import renzhengEmpty from '../commonPlugin/renzheng/renzhengEmpty.vue'

	export default {
		data() {
			return {
				title: '认证申请'
			}
		},
		components: {
			renzheng,
			renzhengPerson,
			renzhengEmpty
		},

	}
</script>

<style lang="less" scoped>
	.renzhengSupply {
		background-color: #fff;
	}
</style>