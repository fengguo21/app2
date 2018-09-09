<template>
	<yd-layout>
		<div slot='top'>
			<yd-search v-model="keyWord.name" slot="left" style="width: 88%;display: inline-block;" :on-submit="submitHandler" placeholder='请输入供应商名称'></yd-search>
			<yd-icon name="liebiaoshitucaidan" slot="right" size='.5rem' style="display: inline-block;" @click.native="openMenus" custom></yd-icon>
		</div>
		<div>

		</div>
		<yd-popup v-model="showMenu" position="right" width="70%">
			<filtrate :param="keyWord" @menu-select="menuSelect"></filtrate>
		</yd-popup>
		<yd-backtop></yd-backtop>
		<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
			<yd-list theme="1" slot="list">
				<div class="supplierBox" v-for="item, key in list" :key="key" @click="goDetail(item.id)">
					<p><span>供应商名称:</span> <span>{{item.name}}</span></p>
					<p><span>供应商类型:</span> <span>{{item.type | supplierType }}</span></p>
					<p><span>联系人:</span> <span>{{item.mainContact}}</span></p>
					<p><span>手机号:</span> <span>{{item.mainPhone}}</span></p>
					<p><span>主营品种:</span> <span>{{item.bizScope}}</span></p>
				</div>
			</yd-list>
			<span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>
			<img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />
		</yd-infinitescroll>
	</yd-layout>
</template>
<script>
	import filtrate from '../slideBar/filtrate'
	import http from '../../libs/httpService.js'
	export default {
		data() {
			return {
				supplierType: '',
				keyWord: {
					type: this.$route.fullPath.split('/')[2],
					searchStatus: false,
					id: '',
					name: '',
					phone: '',
				},
				showMenu: false,
				pn: 1,
				pSize: 15,
				list: [],
			}
		},
		components: {
			filtrate
		},
		methods: {
			openMenus() {
				this.showMenu = true;
			},
			submitHandler(value) {
				this.pn = 1;
				this.list = [];
				this.loadList();
			},
			menuSelect(currentMenu) { //tab跳转
				this.showMenu = false;
				this.pn = 1;
				this.list = [];
				this.loadList();

			},
			goDetail(id) {
				console.log(id)
				this.$router.push('/supperlierDetail/' + id);
			},
			goBack() {
				let _self = this;
				window.history.go(-1);
				console.log("----------------返回-----------------");
			},
			initDate() {
				this.pn = 1;
				this.list = [];
				this.keyWord.searchStatus = false;
				this.keyWord.id = '';
				this.keyWord.name = '';
				this.keyWord.phone = '';
				this.loadList();
			},
			loadList() {
				let url = http.urlCommon + http.apiUrl.most;
				let body = {
					biz_module: 'erpSupplierService',
					biz_method: 'querySupplierList',
					biz_param: {
						pn: this.pn,
						pSize: this.pSize,
						supplierType: this.$route.fullPath.split('/')[2] == 'quality' ? '1' : '',
						customerPool: 0,
						name: this.keyWord.searchStatus ? this.keyWord.name : '',
						mainPhone: this.keyWord.searchStatus ? this.keyWord.phone : '',
						employeeId: this.$route.fullPath.split('/')[2] == 'mine' ? this.supplierType.id : '',
						orgId: this.$route.fullPath.split('/')[2] == 'mine' || this.$route.fullPath.split('/')[2] == 'org' ? this.supplierType.orgid : '',
						blacklist:0,
					}
				};
				http.commonPost(url, body).then((res) => {
					const _list = res.biz_result.list;
					this.list = [...this.list, ..._list];
					if(_list.length < this.pSize) {
						/* 所有数据加载完毕 */
						this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
						return;
					}
					/* 单次请求数据完毕 */
					this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');

					this.pn++;
				}).catch((err) => {});
			},
		},
		watch: {},
		created() {
			let _self = this;
			_self.supplierType = JSON.parse(localStorage.getItem('employeeId'))
			_self.loadList();
			console.log(this.$route)
		}
	}
</script>
<style lang="less" scoped>
	.supplierBox {
		margin: 15px;
		background-color: #fff;
		padding: 10px;
		border-radius: 15px;
		p {
			line-height: 30px;
			font-size: 12px;
			display: flex;
			span:nth-child(1) {
				display: inline-block;
				width: 30%;
			}
			span:nth-child(2) {
				display: inline-block;
				width: 70%;
			}
		}
	}
	
	.yd-div {
		line-height: 50px;
	}
</style>