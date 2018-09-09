<!-- /**
 * 
 * @authors DEAN hxj (xxxxxxx@delibal)
 * @date    
 * @version $Id$
 */ -->
<!--
border:布尔值 是否需要边框
label:输入框名字 
 type类型：tel:国内固话 phone:手机号 email:邮箱 qq:qq number:数字（数字和小数点(二位小数点)）
           price：价格 name:用户名（中文 字母 数字 下划线） acount :微信等账户名    

           type==time时为时间选择
           
height：自定义宽高  父组件v-bind即可
enter-done:绑定事件 触发父组件的方法(父组件中绑定必须是此事件名 否则失效)
only:是否只读
validate:是否校验
引用此组件的父组件可以使用的属性及使用方法如下：
label
type
:param.sync
:height  
:only
 -->
<template>
	<div>
		<div class="wrapBox" v-bind:class="{'noBorder':!border}">
			<!-- 新建input -->
			<label class="Label" style="">{{labelType.indexOf('static')!=-1?$t(label):label}}：</label>
			<!-- <span style="position:relative;bottom:1ex;">1/2</span> -->
			<input class="in input" required type="type" ref="valInput" value="val" v-model="val" @input="Trim()" @blur="change()" @click="En()" :placeholder="'  '+this.holder" :style="{width:theWidth+'%',height:theHeight+'px'}" v-if="this.type!='time'&&this.type!='address'" />
			<a href="javascript:" @click.stop="clearData()" class="clear" v-if="this.type!='time'&&this.type!='address'"></a>
			<!--type==time 时间选择 -->
			<div style="display:inline-block;width:60%;position:relative;" v-if="this.type=='time'">
				<yd-datetime ref="datetime" style="height: 32px;line-height: 32px;text-align: left ; font-size:0.3rem; color:#777777;" placeholder="请选择时间" :start-year="2015" :init-emit="false" v-model="val"></yd-datetime>
			</div>
			<!-- type="address"地址选择 -->
			<div style="display:inline-block;width:60%;" v-if="this.type=='address'">
				<input type="text" class="in input" @click.stop="showAdd = true" :value="model2" readonly placeholder="请选择收货地址">
				<yd-cityselect v-model="showAdd" ref="cityselectDemo" :callback="result2" :items="district" provance="param[0]" city="param[1]" area="param[2]"></yd-cityselect>
			</div>
		</div>
	</div>
</template>
<script>
	// import District from 'ydui-district/dist/jd_province_city_area_id';
	import District from '../../res/data/cdata';
	export default {
		components: {

		},
		props: {
			param: '',
			type: {
				type: String,
				default: ''
			},
			label: {
				type: String,
				default: ''
			},
			height: {
				type: String,
				default: ''
			},
			width: {
				type: String,
				default: ''
			},
			placeholder: {
				type: String,
				default: ''
			},
			only: {
				default: ''
			},
			validate: {
				default: ''
			},
			border: {
				type: Boolean,
				default: true
			},
		},
		data() {
			return {
				showAdd: false,
				model2: '',
				district: District,
				val: '',
				theWidth: 62,
				theHeight: 32,
				inputType: '',
				holder: this.placeholder,
				msg: '',
				labelType: ''
			}
		},
		computed: {

		},
		methods: {
			result2(ret) {
				this.model2 = ret.itemName1 + ',' + ret.itemName2 + ',' + ret.itemName3;
				this.val = ret.itemValue1 + ',' + ret.itemValue2 + ',' + ret.itemValue3;
			},
			/*    test:function(event){
			       var toggle = event.currentTarget;   
			        toggle.removeAttribute('readonly');
			       if(this.$store.state.purchaseModel.val==0){
			         if(this.param==''){          
			         toggle.setAttribute('readonly','');
			         }
			       }
			    },*/
			clearData: function() {
				this.val = '';
				this.$emit('update:param', this.val);
			},
			En: function() { //触发父组件调用此组件时绑定的 回车键搜索事件，事件名统一为: enter-done
				this.$emit('enter-done', '');
			},
			Trim: function() { //去除前后空白
				this.val = this.val.trim();
			},
			change: function() {
				if(this.validate == 0) {
					this.$emit('update:param', this.val);
				}
				if(this.validate == 1) {
					if(this.type == 'tel') {
						this.vTel(this.val);
					}
					if(this.type == 'phone') {
						this.vPhone(this.val);
					}
					if(this.type == 'email') {
						this.vMail(this.val);
					}
					if(this.type == 'qq') {
						this.vQQ(this.val);
					}
					if(this.type == 'number') {
						this.vNumber(this.val);
					}
					if(this.type == 'name') {
						this.vName(this.val);
					}
					if(this.type == 'price') {
						this.vPrice(this.val);
					}
					if(this.type == 'account') {
						this.vAccount(this.val);
					}
				}
			},
			toastError(msg) {
				this.$dialog.toast({
					mes: msg,
					timeout: 1500,
					icon: 'error',
					/* callback: () => {
					     this.$dialog.alert({mes: '给你一次重来的机会！'});
					 }*/
				});
			},
			vPhone: function(v) { //手机号校验
				if(v != '') {
					if(!(/^1[3456789]\d{9}$/.test(v))) {
						this.msg = "手机号码格式有误，请修改后重试！";
						this.toastError(this.msg);
					} else {
						this.$emit('update:param', v)
					}
				}
			},
			vTel: function(v) { //固话校验
				if(v != '') {
					if(!(/^\d{3}-\d{8}|\d{4}-\d{7}$/.test(v))) {
						this.msg = "固定号码格式有误(格式：区号-号码)，请修改后重试！";
						this.toastError(this.msg);
					} else {
						this.$emit('update:param', v)
					}
				}
			},
			vMail: function(v) { //邮箱校验
				if(v != '') {
					if(!(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(v))) {
						this.msg = "邮箱格式有误，请修改后重试！"
						this.toastError(this.msg);
					} else {
						this.$emit('update:param', v)
					}
				}
			},
			vQQ: function(v) { //qq号校验
				if(v != '') {
					if(!(/^[1-9][0-9]{4,}$/.test(v))) {
						this.msg = "QQ有误，请修改后重试！";
						this.toastError(this.msg);
					} else {
						this.$emit('update:param', v)
					}
				}
			},
			vNumber: function(v) { //数字校验
				if(v != '') {
					if(!(/^[0-9]+(.[0-9]{1,2})?$/.test(v))) {
						this.msg = "数字格式有误，请修改后重试！";
						this.toastError(this.msg);
					} else {
						this.$emit('update:param', v)
					}
				}
			},
			vName: function(v) { //用户名校验
				if(v != '') {
					if(!(/^[\u4E00-\u9FA5\uf900-\ufa2d\w]{2,16}$/.test(v))) {
						this.msg = "输入的内容格式有误(2~16 位)，请修改后重试！";
						this.toastError(this.msg);
					} else {
						this.$emit('update:param', v)
					}
				}
			},
			vAccount: function(v) { //微信等账户名校验---字母数字下划线
				if(v != '') {
					if(!(/^\w+$/.test(v))) {
						this.msg = "账户名格式有误，请修改后重试！";
						this.toastError(this.msg);
					} else {
						this.$emit('update:param', v)
					}
				}
			},
			vPrice: function(v) { //价格校验
				if(v != '') {
					if(!(/^\d*(.\d{0,2})?$/.test(v))) {
						this.msg = "价格格式有误，请修改后重试！";
						this.toastError(this.msg);
					} else {
						this.$emit('update:param', v)
					}
				}
			},
		},
		mounted() {
			if(this.only) {
				this.$refs.valInput.setAttribute('readonly', '');
			}
		},
		watch: {
			val: function(newv, oldv) {
				/*if(this.type == 'time' || this.type == 'address') {*/
					this.$emit('update:param', this.val);
				
			},
			param:function(newv,oldv){
				if(newv==''){
					if(this.type == 'time' || this.type == 'address') {
						this.$refs.datetime.currentValue='';
					}
					this.val='';
			  }
			}
		},
		created() {
			if(this.height != '') {
				this.theHeight = this.height;
			}
			if(this.width != '') {
				this.theWidth = this.width;
			}
			this.labelType = this.label;
			this.val = this.param || '';
		}
	}
</script>
<style scoped>
	.wrapBox {
		display: inline-block;
		padding-top: 10px;
		width: 100%;
		padding-bottom: 5px;
		border-bottom: 1px solid #ccc;
	}
	
	.Label {
		display: inline-block;
		position: relative;
		padding: 0 5px;
		padding-left: 0.25rem;
		color: #838383;
		font-size: 0.28rem;
		font-weight: 700;
		text-align: left;
	}
	
	.in {
		border: none;
		border-radius: 5px;
		text-indent: 5px;
		outline: none;
		height: 0.6rem;
		font-size: 0.27rem;
		caret-color: green;
		color: #777777;
	}
	
	.inPre {
		border: 0;
	}
	
	.ivu-input-icon+.ivu-input {
		padding-right: 15px;
	}
	
	.clear {
		position: absolute;
		right: 10px;
		display: none;
		width: 15px;
		height: 15px;
		margin-top: 10px;
		background: url(../../../static/images/Close.png) no-repeat;
		outline: none;
		background-size: 15px 15px;
	}
	
	.input::-ms-clear {
		display: none;
	}
	
	.input:valid+.clear {
		display: inline-block;
	}
	.noBorder{
		border:none;
	}
</style>