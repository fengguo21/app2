<!-- /**
 * 新建求购
 * @authors DEAN hxj (xxxxxxx@delibal)
 * @date    2018-02-05 11:34:09
 * @version $Id$
 */
 -->
<template>
 <yd-layout>
        <yd-navbar slot="navbar" :title="title">
            <yd-icon name="shangyiyehoutuifanhui" slot="left" size='.5rem' @click.native="goBack" custom></yd-icon>
        </yd-navbar>
        <!-- 客户信息 -->
        <client-Info :param="clientParam" :mark="0"></client-Info>
         <!-- 品种信息 -->
         <div class="titleBar">
            <div class="title">
                求购品种信息 <yd-button size="small" shape="circle" type="primary" @click.native="Breed()">添加品种</yd-button>
            </div>
        </div>
       <!--  <div style="height:40px;background:#fff;line-height:40px;">快去添加求购品种吧~</div> -->
        <!-- 品种列表 -->
        <div id="choosable-List">
         <yd-cell-group v-for="item in breedList" style="padding:5px 0;">
            <yd-cell-item type="checkbox">
                <span slot="left" class="listBox">
                <p><span>求购品种:</span> <span>{{item.breedName}}</span></p>
                <p><span>求购数量:</span> <span>{{item.number}} {{item.unitName}}</span></p>
                <p><span>求购价格:</span> <span>{{item.price}} 元/ {{item.unitName}}</span></p>
                <p><span>规格产地:</span> <span>{{item.spec}} / {{item.locationName}}</span></p>
                <p><span>质量要求:</span> <span>{{item.quality}}</span></p>
                <p>
                <yd-lightbox>
                    <yd-lightbox-img v-for="img in item.files" :src="img" style="width:40px;height:40px;margin:0 0.1rem;"></yd-lightbox-img> 
                </yd-lightbox>
                </p>
                </span>
            </yd-cell-item>
        </yd-cell-group>
        </div>
       <!-- 添加品种组件 -->
         <yd-popup v-model="showBreed" position="right" width="70%">
            <breed-Info :param="breedList" v-if="showBreed" @breed-Back="breedBack"></breed-Info>
        </yd-popup>
        <!-- 付款方式 -->
        <div class="titleBar">
            <div class="title">
                付款方式
            </div>
        </div>
        <yd-radio-group v-model="radio3">
                <div class="wrapBox"><yd-radio :val="one"><span style="padding-left:0.15rem;">合同签订后,</span></yd-radio>
                                     预付<input class="numInput" v-model="percent">%定金</div>
                <div class="wrapBox"><yd-radio :val="two"><span style="padding-left:0.15rem;">验收合格后，立即付款</span></yd-radio></div>
                <div class="wrapBox"><yd-radio :val="three"><span style="padding-left:0.15rem;">验收合格后,</span></yd-radio>
                                     <input class="numInput" v-model="payday">天内付款</div>
                <div class="wrapBox"><yd-radio  :val="four"><span style="padding-left:0.15rem;">其他</span></yd-radio>
                <input style="width:44%;border:0;border-bottom:1px solid #ccc;text-indent:7px;" v-model="other"></div>
        </yd-radio-group>
        <!-- 求购备注 -->
        <div class="titleBar">
            <div class="title">
                求购备注
            </div>
        </div>
        <div style="font-size:0.27rem;color:#777777;">
        <yd-checklist v-model="comment" >
            <yd-checklist-item  v-for="(item,index) in qualityData" v-bind:val='item'>
                <div style="height: 50px;line-height: 50px;">{{item}}</div>
            </yd-checklist-item>
        </yd-checklist>
        </div>
       
      <yd-tabbar slot="tabbar">
        <yd-button size="large" type="primary" style="margin-top:0" @click.native="add()">确定</yd-button>
       </yd-tabbar>
    </yd-layout>
</template>
<script>
import clientInfo from './modals/clientInfo'
import breedInfo from './modals/breedInfo'
import http from "../../../libs/httpService.js";
import {mapGetters,mapActions} from "vuex";
export default {
  data() {
    return {
        radio3:'验收合格后，立即付款',
        title:'新建求购',
        clientParam:{
            customerId:'',
            customerName:'',
            customerType:'',
            customerPhone:'',
            duedate:'',
            address:[],
            type:1
        },////
        showBreed:false,//控制添加品种
        breedList:[],
        valPer:0,
        valDay:0,
        valOther:0,
        payway:'验收合格后，立即付款',
        percent:'',
        payday:'',
        other:'',
        comment: ['现款无账期'],
        qualityData: ['时间紧', '价格合适立即合作', '现款无账期', '常年需求，可建立稳固渠道'],
        breedList:[]
     
    };
  },
  components: {
    clientInfo,
    breedInfo
  },
   computed: { //改变输入框的值时，payType需要重新选中后值才会变化，所以当输入框发生改变的时候，直接赋值给payType，再返回这个值，使其选中
        one: function() {
            this.payday='';
            this.payway = '合同签订后，预付' + this.percent + '%定金';
            //this.judge = this.bookMoney
            //console.log(this.judge)
            console.log("啥都不叫撒都不健康",this.percent);
            if(this.percent){this.valper=1};
            return '合同签订后，预付' + this.percent + '%定金';
        },
        two: function() {
            this.payway="验收合格后，立即付款";
            //this.judge = '1'
            return '验收合格后，立即付款';
        },
        three: function() {
            this.percent='';
            this.payway = '验收合格后,' + this.payday + '天内付款';
            //this.judge = this.payDay
             console.log("啥都不叫撒都不健康",this.payday);
             if(this.payday){this.valDay=1};
            return '验收合格后,' + this.payday + '天内付款';
        },
        four: function() {
            this.payway = this.other;
            if(this.other){this.valOther=1};
            return this.other;
        }
    },
  methods:{
  	...mapActions(["addIndent"]),
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
    toastSuccess(msg) {
        this.$dialog.toast({
            mes: msg,
            timeout: 1500,
            icon: 'success'
        });
    },
    Breed(){
         this.showBreed=true;
    },
    breedBack(val){
        this.showBreed=false;
        this.breedList.push(val);
        console.log("爱神的箭萨比",this.breedList)
    },
    goBack() { //后退功能
        let _self = this;
        window.history.go(-1);
        this.raido3='';
    },
    add(){
       console.log("爱神的箭阿斯加德",this.clientParam);
       if(this.clientParam.customerName==''){
          this.toastError('请先选择客户！')
       }else if(this.clientParam.duedate==''){
          this.toastError('请选择过期时间！')
       }else if(this.clientParam.address==[]){
          this.toastError('请选择交货地！')
       }else if(this.breedList.length==0){
          this.toastError('请先添加品种！')
       }else if(this.radio3.indexOf('定金')!='-1'&&this.percent==''){
          this.toastError('请填写定金百分比！')
       }else if(this.radio3.indexOf('天内')!='-1'&&this.payday==''){
          this.toastError('请填写账期天数！')
       }else if(this.radio3==''){
          this.toastError('请填写付款方式！')
       }else{
          [this.clientParam.province,this.clientParam.city,this.clientParam.district]=this.clientParam.address;
          this.clientParam.paymentWay =this.payway;
          this.clientParam.comment = this.comment.join(',');
          this.clientParam.intentionList=[...this.breedList];
          console.log("鸡八岁的巴萨",this.clientParam);
          this.Http(this.clientParam);
       }
    },
    Http:function(item){ 
    	let param={
    		...item,
    	}
    	this.addIndent(param)
    		.then(res=>{
    			this.loading = false;
                this.toastSuccess(res.msg);
                this.goBack();
    		})
    		.catch(err => {
    			this.loading = false;
    		})
    },
  },
  watch:{
    radio3:function(newv){
          
    }
  }
};
</script>
<style lang="less" scoped>
 .titleBar {
        .title {
            margin-top: 10px;
            line-height: 0.5rem;
            color: #666;
            font-weight:bolder;
            font-size: 0.32rem;
            padding: 0 10px;
            span {
                color: #f00;
                line-height: 0.25rem;
                font-size:0.25rem;
                margin-left: 10px;
            }
        }
    }
.wrapBox{
  display:inline-block;
  padding-top:14px;
  width:100%;
  font-size:0.26rem;
  color:#333;
  background:#fff;
  padding-left:0.2rem;
  padding-bottom:14px;
  border-bottom:1px solid #ccc;
}
.numInput{
  width:50px;
  border:0;
  border-bottom:1px solid #ccc;
  text-indent:7px;  
}
.yd-cell-box{
    margin-bottom:0;
}
.listBox {
    width:100%;
    p { 
        line-height: 0.6rem;
        font-size: 0.26rem;
        display: flex;
        pading:3px 0;
        span:nth-child(1) {
            display: inline-block;
            width:20%;
            text-align:right;
        }
        span:nth-child(2) {
            display: inline-block;
            text-indent:15px;
        }
  } 
  }  
.yd-tabbar{
    padding:0;
}
</style>