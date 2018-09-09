<template>
	<div>
		<div v-if="$route.query.id !=7">
			<input-val type="tel" :param.sync="param.offerCustomer" label="供应商ID" placeholder="请输入供应商ID" validate="0"></input-val>
			<div class="wrapBox"><span class="Label">品种名称：</span><input class="in" type="text" placeholder="请选择品种" readonly="" @click="showPop= true" :param.sync="param.breedName" v-model="param.breedName" /></div>
			<div v-if="pageId>4" class="wrapBox"><span class="Label">业务员：</span><input class="in" type="text" placeholder=" 请选择业务员" readonly="" @click="showEm= true" :param.sync="param.offerEmployee" v-model="param.offerEmployeeName" /></div>
		<!-- 	<input-val type="tel" :param.sync="param.phone" label="手机号" placeholder="请输入供应商手机号" validate="0"></input-val>
			<input-val type="tel" :param.sync="param.employeeName" label="业务员" placeholder="请输入业务员姓名" validate="0"></input-val> -->
			<input-val type="time" :param.sync="param.startTime" label="开始时间"></input-val>
			<input-val type="time" :param.sync="param.endTime" label="结束时间"></input-val>
			<search-button :buttonParam.sync="buttonParam" :param.sync="param.state" :multile="false" :title="title"></search-button>
		</div>
		<div v-if="$route.query.id ==7">
			<div class="wrapBox"><span class="Label">品种名称：</span><input class="in" type="text" placeholder="请选择品种" v-model="param.breedId.name" readonly="" @click="addFunc()" /></div>
			<input-val type="time" :param.sync="param.startTime" label="开始时间"></input-val>
			<input-val type="time" :param.sync="param.endTime" label="结束时间"></input-val>
			<yd-tab :callback="starCallback">
				<yd-tab-panel label="全部" tabkey="" active></yd-tab-panel>
				<yd-tab-panel label="已加星" tabkey="1"></yd-tab-panel>
				<yd-tab-panel label="未加星" tabkey="0"></yd-tab-panel>
			</yd-tab>
			<yd-tab :callback="userCallback">
				<yd-tab-panel label="全部" tabkey="" active></yd-tab-panel>
				<yd-tab-panel label="新增用户" tabkey="0"></yd-tab-panel>
				<yd-tab-panel label="复购用户" tabkey="1"></yd-tab-panel>
			</yd-tab>
		</div>
		<yd-popup v-model="showMenu" position="right" width="80%">
           <add-Breed showChoose ="bizScope" @main-var="mainVar"></add-Breed>
         </yd-popup>
         <yd-popup v-model="showPop" position="right" width="80%">
           <add-Breed showChoose ="bizScope" @main-var="chosenBack"></add-Breed>
         </yd-popup>
         <yd-popup v-model="showEm" position="right" width="80%">
           <employee-List  @main-var="employeeBack"></employee-List>
         </yd-popup>
	</div>
</template>
<script>
	import searchButton from  "../../../../components/com/searchButton.vue"
	import employeeList from  "../../../../components/com/employeeList.vue"
	import inputVal from '../../../../components/com/inputType.vue'
	import addBreed from "../../../../views/slideBar/addVarieties.vue";
	export default {
		props: ["param"],
		data() {
			return {
				pageId:'',
				showEm:false,
				showPop:false,
				showMenu: false,
				showChoose: "",
				title:'报价状态',
				buttonParam:[
					{
						value:"10",
						name:"待处理",
						checked:false,
					},
					{
						value:"100",
						name:"已采用",
						checked:false,
					},
					{
						value:"11",
						name:"未采用",
						checked:false,
					},
					{
						value:"20",
						name:"待采用",
						checked:false,
					},
					{
						value:"120",
						name:"寄样中",
						checked:false,
					},
					{
						value:"130",
						name:"已寄样",
						checked:false,
					},
					{
						value:"110",
						name:"待寄样",
						checked:false,
					},
					{
						value:"111",
						name:"无法寄样",
						checked:false,
					},
					{
						value:"151",
						name:"价格改变",
						checked:false,
					},
					{
						value:"160",
						name:"价格不变",
						checked:false,
					},
				]
			}
		},
		components: {
			inputVal,
			addBreed,
    		searchButton,
    		employeeList			
		},
		methods: {
			offerCallback(tabkey, key) {
				let _self = this;
				_self.param.isMyOffer = key;
			},
			chosenBack(val){
	            this.showPop=false;
	            console.log("撒德哈时间",val)
	            this.param.breedName=val.name;
	            this.param.breedId=val.id;
           },
           employeeBack(val){
           	this.showEm=false;
               this.param.offerEmployee=val.id;
               this.param.offerEmployeeName=val.name;
           },
			starCallback(tabkey, key) {
				let _self = this;
				_self.param.purchaseLevel = key;
			},
			userCallback(tabkey, key) {
				let _self = this;
				_self.param.rebuy = key;
			},
			addFunc() {
				this.showChoose = "bizScope";
				this.showMenu = true;
			},
			mainVar(item) {
				let _self = this;
				console.log(item)
				_self.param.breedId =  item;
				this.showMenu = false;
			},
		},
		watch: {
			param: {
		      handler: (curVal, oldVal) => {
		        console.log(curVal, oldVal);
		      },
		      // 深度观察
		      deep: true
		    },
		},
		created() {
			let _self = this;
			this.pageId=this.$route.query.id;
			console.log("我是search————————————————————————————",this.$route.query.id)
		}
	}
</script>
<style>

</style>