<template>
	<yd-layout>
		<yd-navbar slot="navbar" :title="title">
			<yd-icon name="shangyiyehoutuifanhui" slot="left" size='.5rem' @click.native="goBack" custom></yd-icon>
		</yd-navbar>
		<slot name="person" v-if="checkbox[0].active">asdas</slot>
		<slot name="empty" v-if="checkbox[1].active">dasdsad</slot>
		<yd-tabbar slot="tabbar">
			<div class="bottom">
				<p v-for="(item ,index) in checkbox" :class="{active:item.active}" @click="choosebox(index)">{{item.text}}</p>
			</div>
		</yd-tabbar>
	</yd-layout>
</template>

<script>
	export default {
		data() {
			return {
				checkbox:[{
					active:true,
					text:'个人认证'
				},{
					active:false,
					text:'企业认证'
				}]
			}
		},
		props: {
			title: {
				type: String,
				default: '供应商认证'
			},
		},
		methods: {
			 goBack() {
                let _self = this;
                window.history.go(-1);
            },
			choosebox(index){
				for(let i of this.checkbox){
					i.active = false
				}
				this.checkbox[index].active = true;
			},
		},
		created(){
			
		},
	}
</script>

<style lang="less" scoped>
	.bottom{
		width: 100%;
		display: flex;
		p{
			flex: 1;
			text-align: center;
			line-height: 35px;
			color: #999;
			&.active{
				color: #f00;
			}
		}
	}
</style>