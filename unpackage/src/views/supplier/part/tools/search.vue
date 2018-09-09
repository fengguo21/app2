<template>
	<div>
		<input-val type="tel" :param.sync="param.id" label="供应商ID" placeholder="请输入供应商ID" validate="0"></input-val>
		<input-val type="tel" :param.sync="param.name" label="供应商名" placeholder="请输入供应商名称" validate="0"></input-val>
		<input-val type="tel" :param.sync="param.phone" label="手机号" placeholder="请输入供应商手机号" validate="0"></input-val>
		<input-val type="tel" :param.sync="param.employeeName" label="业务员" placeholder="请输入业务员姓名" validate="0"></input-val>
		<input-val type="time" :param.sync="param.startTime" label="开始时间"></input-val>
		<input-val type="time" :param.sync="param.endTime" label="结束时间"></input-val>
	</div>
</template>
<script>
	import inputVal from '../../../../components/com/inputType'
	export default {
		props: ["param"],
		data() {
			return {

			}
		},
		components: {
			inputVal
		},
		methods: {},
		created() {
			/*this.inputWidth= this.$refs['score'] */

		}
	}
</script>
<style>

</style>

<!--<template>
    <div>
        <yd-cell-group>
				<div class="list ">
						<span>供应商ID：</span>
						<input type="number" placeholder="请输入ID" v-model="param.id" />
				</div>
				<div class="list ">
						<span>供应商名称：</span>
						<input type="text" placeholder="请输入供应商名称" v-model="param.name" />
				</div>
				<div class="list ">
						<span>手机号：</span>
						<input type="number" placeholder="请输入选择手机号" v-model="param.phone" />
				</div>
			</yd-cell-group>
    </div>
</template>
<script>
export default {
    props: ["param"],

}
</script>
<style lang="less" scoped>
	.list{
		display:flex ;
		padding: 0 15px;
		line-height: 40px;
		span{
			flex: 1;
		}
		input{
			text-align: right;
			flex: 1;
			border: 0;
			outline: none;
		}
	}
	
</style>-->