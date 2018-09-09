<template>
	<div class="background">
		<yd-accordion>
			<yd-accordion-item :title="item.name" v-for="(item,index) in param">
				<div style="padding: .24rem;">
					<p>姓名：{{item.name}}</p>
					<p>职位：{{item.position}}</p>
					<p>手机号：{{item.phone}}</p>
					<p>电话：{{item.tel}}</p>
					<p>邮箱：{{item.email}}</p>
				</div>
			</yd-accordion-item>
		</yd-accordion>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		props: {
			param: '',
		},

	}
</script>

<style lang="less">

</style>