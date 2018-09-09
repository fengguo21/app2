<template>
	<div class="audit">
		dsfsdfsd
		<!--<div class="title">{{param.type == 1 ? '审核供应商认证' : '审核个人认证'}}</div>
		<audit-person v-if="param.type == 1" :param="param"></audit-person>
		<audit-company v-if="param.type == 2" :param="param"></audit-company>-->
	</div>
</template>

<script>
	import auditPerson from '../../../commonPlugin/audit/auditPerson.vue'
	import auditCompany from '../../../commonPlugin/audit/auditCompany.vue'
	export default {
		data() {
			return {
			}
		},
		props:['param'],
		components:{
			auditPerson,
			auditCompany,
		},
		created(){
			
		}

	}
</script>

<style lang="less" scoped>
	.audit{
		.title{
			line-height: 50px;
			font-size: 22px;
			text-align: center;
			border-bottom: 1px solid #e6e6e6;
		}
	}
</style>