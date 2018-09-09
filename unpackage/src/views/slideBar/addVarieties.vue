<template>
	<yd-layout>
		<yd-navbar slot="navbar" title="选择">

		</yd-navbar>
		<yd-backtop></yd-backtop>
		<!--规模-->
		<div class="listLi" v-for="(item, key) in scale" @click="menuSelect(item)" v-if="showChoose == 'scale'">
			{{item.name}}
		</div>
		<!--性质-->
		<div class="listLi" v-for="(item, key) in nature" @click="menuSelect(item)" v-if="showChoose == 'nature'">
			{{item.name}}
		</div>
		<!--类型-->
		<div class="listLi" v-for="(item, key) in customerType" @click="menuSelect(item)" v-if="showChoose == 'customerType'">
			{{item.name}}
		</div>
		<div class="listLi" v-for="(item, key) in supplierType" @click="menuSelect(item)" v-if="showChoose == 'supplierType'">
			{{item.name}}
		</div>
		<!--主营-->
		<yd-search v-model="search" v-if="showChoose == 'bizScope'"></yd-search>
		<div v-if="search">
			<div class="listLi" v-for="(item, key) in erpBreedList" @click="menuSelect(item)">
				{{item.name}}
			</div>
		</div>
		<div style="overflow:auto;" ref="scrollBox" v-if="!search">
			<yd-infinitescroll style="width: 86%;" :callback="loadList" ref="infinitescrollDemo" v-if="showChoose == 'bizScope'">

				<yd-list theme="1" slot="list">
					<div class="listLi" v-for="(item, key) in erpBreedList" @click="menuSelect(item)">
						{{item.name}}
					</div>
				</yd-list>

				<!-- 数据全部加载完毕显示 -->
				<span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>

				<!-- 加载中提示，不指定，将显示默认加载中图标 -->
				<img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />

			</yd-infinitescroll>
		</div>

	</yd-layout>
</template>
<script>
	import http from "../../libs/httpService.js";
	import * as filters from "../../filters/filters.js";
	import { mapGetters,mapActions} from "vuex";
	export default {
		data() {
			return {
				search: "",
				page: 1,
				pageSize: 20,
				nature: [{
						name: "个人",
						value: "0"
					},
					{
						name: "民企",
						value: "1"
					},
					{
						name: "国企",
						value: "2"
					},
					{
						name: "上市公司",
						value: "3"
					}
				],
				scale: [{
						name: "小型",
						value: "0"
					},
					{
						name: "中性",
						value: "1"
					},
					{
						name: "大型",
						value: "2"
					}
				],
				type: [{
						name: "其他",
						value: "0"
					},
					{
						name: "合作社",
						value: "1"
					},
					{
						name: "药商",
						value: "2"
					},
					{
						name: "药厂",
						value: "3"
					},
					{
						name: "个体户",
						value: "4"
					},
					{
						name: "药店",
						value: "5"
					},
					{
						name: "医院",
						value: "6"
					},
					{
						name: "贸易公司",
						value: "7"
					},
					{
						name: "零售商行",
						value: "8"
					},
					{
						name: "药农",
						value: "9"
					},
					{
						name: "介绍人",
						value: "10"
					},
					{
						name: "药贩子",
						value: "11"
					},
					{
						name: "产地药商",
						value: "12"
					},
					{
						name: "销地药商",
						value: "13"
					},
					{
						name: "诊所",
						value: "14"
					},
					{
						name: "化工厂",
						value: "15"
					},
					{
						name: "化妆品厂",
						value: "16"
					},
					{
						name: "提取物厂",
						value: "17"
					},
					{
						name: "食品厂",
						value: "18"
					},
					{
						name: "实验室",
						value: "19"
					},
					{
						name: "网上电商",
						value: "20"
					},
					{
						name: "中成药生产商",
						value: "21"
					},
					{
						name: "西成药生产商",
						value: "22"
					},
					{
						name: "饮片厂",
						value: "23"
					},
					{
						name: "茶类公司",
						value: "24"
					},
					{
						name: "种植基地",
						value: "25"
					}
				]
			};
		},
		props: {
			param: "",
			showChoose: ""
		},
		computed: {
			...mapGetters(["erpBreedList"]),
			//类型分类
			supplierType() {
				let filtered = this.type.filter(function(element, index, arrry) {
					return filters.supplierType(element.value);
				});
				console.log("我是类型！！！！", filtered);
				return filtered;
			},
			customerType() {
				let filtered = this.type.filter(function(element, index, arrry) {
					return filters.customerType(element.value);
				});
				console.log("我是类型！！！！", filtered);
				return filtered;
			}
		},
		watch: {
			search(curVal, oldVal) {
				if(curVal) {
					this.getResult(curVal)
				}
			},
		},
		methods: {
			...mapActions(["queryErpBreedList"]),
			getResult(val) {
				this.$store.state.user.erpBreedList=[];
				let param = {
					name: val
				};
				this.queryErpBreedList(param)
					.then(res=>{
						
					})
					.catch(err=>{
						
					});
			},
			itemClickHandler(item) {
				let _self = this;
				_self.$emit("main-var", item);
			},
			menuSelect(item) {
				let _self = this;
				_self.$emit("main-var", item);
			},
			loadList() {
				let param = {
					page: this.page,
					pageSize: this.pageSize
				};
				this.queryErpBreedList(param)
					.then(res=>{
						const _list = res.biz_result.list;
						if(_list.length<this.pageSize){
							/* 所有数据加载完毕 */
							this.$refs.infinitescrollDemo.$emit(
								"ydui.infinitescroll.loadedDone"
							);
							return;
						}
						/* 单次请求数据完毕 */
						this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.finishLoad");
						this.page++;
					})
					.catch(err=>{
						
					})
			}
		},
		mounted() {
			let boxHeight = document.body.clientHeight - 100 + "px";
			this.$refs.scrollBox.style.height = boxHeight;
		},
		created() {
			this.loadList();
		}
	};
</script>

<style lang="less" scoped>
	.yd-flexview {
		height: 100vh;
		.listLi {
			margin-left: 10px;
			line-height: 30px;
			border-bottom: 1px solid rgba(230, 230, 230, 0.5);
		}
	}
</style>