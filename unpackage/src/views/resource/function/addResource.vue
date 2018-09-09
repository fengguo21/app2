<!-- /**
 * 新增资源
 * @authors DEAN hxj (xxxxxxx@delibal)
 * @date    2018-02-27 14:20:52
 * @version $Id$
 */
 -->
  <template>
 <yd-layout>
        <yd-navbar slot="navbar" :title="title">
            <yd-icon name="shangyiyehoutuifanhui" slot="left" size='.5rem' @click.native="goBack" custom></yd-icon>
        </yd-navbar>
        <div class="tabDiv">
        <p>
            <span v-for="(item,index) in spanList" :class="{'active':ind === index}" @click="changeSourceType(index)">{{item}}</span>
        </p>
        </div>
        <!-- 客户信息 -->
        <client-Info :param="clientParam" :mark="1"></client-Info>
         <!-- 品种信息 -->
         <div class="titleBar">
            <div class="title">
                资源品种信息
                 <yd-button v-if="showBtn" size="small" shape="circle" type="primary" @click.native="Breed()">添加品种</yd-button>
                  <yd-button type="primary" v-if="breedList.length>0" @click.native="Edit(item)">编辑</yd-button>
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
                <p>资源药材图片：
                <yd-lightbox>
                    <yd-lightbox-img v-for="img in item.files" :src="img" style="width:40px;height:40px;margin:0 0.1rem;"></yd-lightbox-img> 
                </yd-lightbox>
                </p>
                <p v-if="ind==2">进口资质图片：
                <yd-lightbox>
                    <yd-lightbox-img v-for="img in item.importPic" :src="img" style="width:40px;height:40px;margin:0 0.1rem;"></yd-lightbox-img> 
                </yd-lightbox>
                </p>
                <p v-if="ind==2">检测报告图片：
                <yd-lightbox>
                    <yd-lightbox-img v-for="img in item.testPic" :src="img" style="width:40px;height:40px;margin:0 0.1rem;"></yd-lightbox-img> 
                </yd-lightbox>
                </p>
                </span>
                <span slot="right" class="listBox">
                 
                </span>

            </yd-cell-item>
        </yd-cell-group>
        </div>
       <!-- 添加品种组件 -->

         <yd-popup v-model="showBreed" position="right" width="70%">
            <breed-Info :param="breedList" v-if="showBreed" :mark="ind" @breed-Back="breedBack"></breed-Info>
        </yd-popup>
         <!-- 其他信息 -->
        <div class="titleBar">
            <div class="title">
                其他信息
            </div>
        </div>
         <div class="wrapBox" style="padding:10px 0;"><span class="Label">预付比例：</span><input class="in" type="text" placeholder="请选择比例" readonly="" @click="showPercent= true" v-model="clientParam.percent"/></div>
         <div class="wrapBox" style="padding:10px 0;" v-if="ind!=2"><span class="Label">是否有样品：</span><input class="in" type="text" placeholder="是否有样品" readonly="" @click="showSample= true" v-model="clientParam.sample"/></div>

        <yd-popup v-model="showPercent" position="right" width="25%" >
            <ul v-for="(item,index) in percentList" style="padding:5px 0;text-align:center;">
            <li class="listClass" @click="chosePercent(index,item)">{{item.label}}</li>
            </ul>
        </yd-popup>
        <yd-popup v-model="showSample" position="bottom" height="11.5%" >
            <ul v-for="(item,index) in sampleList" style="padding:5px 0;text-align:center;">
            <li class="listClass" @click="choseSample(index,item)">{{item}}</li>
            </ul>
        </yd-popup>
        <!-- 样品填写 -->
        <div v-if="isSample">
          <div style="background:#fff;"><input-val  type="number"  :param.sync="sampleParam.number" label="样品数量" placeholder="请输入品种数量" validate="1"></input-val></div>
           <div class="wrapBox" style="padding:10px 0;"><span class="Label">样品单位：</span><input class="in" type="text" placeholder="   请选择单位" readonly="" @click="showUnit= true" v-model="sampleParam.unitName"/></div>
           <div style="background:#fff;"><input-val  type="price"  :param.sync="sampleParam.price" label="样品总价" placeholder="请输入品种价格" validate="1"></input-val></div>
        </div>
        <!--  -->
        <div v-if="showUnit">
         <yd-popup v-model="showUnit" position="right" width="50%">
           <unit-List @unit-Back="unitBack"></unit-List>
         </yd-popup>
        </div>
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
                <div style="height: 50px;line-height: 45px;">{{item}}</div>
            </yd-checklist-item>
        </yd-checklist>
        </div>
       
      <yd-tabbar slot="tabbar">
        <yd-button size="large" type="primary" style="margin-top:0" @click.native="add()">确定</yd-button>
       </yd-tabbar>
    </yd-layout>
</template>
<script>
import unitList from '../../../components/com/unitList'
import inputVal from '../../../components/com/inputType'
import uploadImage from "../../../common/upload/uploadImage.vue";
import clientInfo from '../../intention/function/modals/clientInfo'
import breedInfo from '../../intention/function/modals/breedInfo'
import http from "../../../libs/httpService.js";
export default {
  data() {
    return {
        radio3:'验收合格后，立即付款',
        title:'新建资源',
        clientParam:{
            customerId:'',
            customerName:'',
            customerType:'',
            customerPhone:'',
            address:'',
            location:[],
            type:1,
            detail_add:'',
            sample:'',
            percent:'',
            sampling:'',
            preSell:this.ind==2?1:0 ,
            inType :3
        },////
        ind:0,//tab样式控制
        showBreed:false,//控制添加品种
        showPercent:false,//比例
        showSample: false,//样品
        showUnit:'' ,//品种单位
        showBtn:true,
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
        spanList:['普通供应','低价资源','预售资源'],
        percentList:[{value:'0',label:'0'},{value:'0.1',label:'10%'},{value:'0.2',label:'20%'},{value:'0.3',label:'30%'},{value:'0.4',label:'40%'},{value:'0.5',label:'50%'},{value:'0.6',label:'60%'},{value:'0.7',label:'70%'},{value:'0.8',label:'80%'},{value:'0.9',label:'90%'},{value:'1',label:'100%'}],
        sampleList:['否','是'],
        isSample:false,
        sampleParam:{
          number:'',
          price:'',
          unit:'',
          unitName:''
        }
     
    };
  },
  components: {
    clientInfo,
    breedInfo,
    inputVal,
    unitList,
    uploadImage
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
    chosePercent:function(index,item){
      this.clientParam.advance=item.value;
      this.clientParam.percent=item.label;
      this.showPercent=false;
        console.log("爱神的箭阿贾克斯不得不0",index)
    },
    choseSample:function(index,item){
      this.clientParam.sample=item;
      this.clientParam.sampling=index;
      console.log("asdasdassad撒多",this.clientParam.sample)
      this.showSample=false;
      if(index==1){
        this.isSample=true;
      }else{
        this.isSample=false;
        console.log("爱神的箭阿贾克斯不得不0",index)
      }
    },
    unitBack(val){
      this.showUnit=false;
      this.sampleParam.unit=val.id;
      this.sampleParam.unitName=val.name;
     },
    changeSourceType(index){
        this.ind = index ;
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
    toastSuccess(msg) {
        this.$dialog.toast({
            mes: msg,
            timeout: 1500,
            icon: 'success'
        });
    },
    Breed(){
      if(this.breedList.length<=0){
         this.showBreed=true;
      }else{
        this.toastError('只能添加一条品种信息！')
      }
    },
    breedBack(val){
        this.showBreed=false;
        this.breedList=[];
        this.breedList.push(val);
        this.showBtn=false;
        console.log("爱神的箭萨比",this.breedList)
    },
    Edit:function(item){
      console.log("被卡死的板卡上看几遍")
       this.showBreed=true;
    },
    goBack() { //后退功能
        let _self = this;
        window.history.go(-1);
        this.raido3='';
    },
    add(){
       console.log("爱神的箭阿斯加德",this.clientParam.sampling);
       if(this.clientParam.customerName==''){
          this.toastError('请先选择客户！')
       }else if(this.clientParam.duedate==''){
          this.toastError('请选择过期时间！')
       }else if(this.clientParam.location==[]){
          this.toastError('请选择交货地！')
       }else if(this.clientParam.detail_add==''){
          this.toastError('请填写详细地址！')
       }else if(this.breedList.length==0){
          this.toastError('请先添加品种！')
       }else if(this.clientParam.percent==''){
          this.toastError('请先选择预付比例！')
       }else if(this.clientParam.sample==''&& this.ind!=2){
          this.toastError('请先选择是否有样品！')
       }else if(this.ind!=2&&this.clientParam.sampling==1&&(this.sampleParam.price==''||this.sampleParam.unit==''||this.sampleParam.number=='')){
          this.toastError('请完善样品信息！')
        }
       else if(this.radio3.indexOf('定金')!='-1'&&this.percent==''){
          this.toastError('请填写定金百分比！')
       }else if(this.radio3.indexOf('天内')!='-1'&&this.payday==''){
          this.toastError('请填写账期天数！')
       }else if(this.radio3==''){
          this.toastError('请填写付款方式！')
       }else{
        if(typeof(this.clientParam.location)=='string'){
          [this.clientParam.province,this.clientParam.city,this.clientParam.district]=this.clientParam.location.split(' ');
        }else if(typeof(this.clientParam.location)=='object'){
          [this.clientParam.province,this.clientParam.city,this.clientParam.district]=this.clientParam.location;
        }
          this.clientParam.address=this.clientParam.detail_add;
          this.clientParam.paymentWay =this.payway;
          this.clientParam.comment = this.comment.join(',');
          this.clientParam=Object.assign({},this.clientParam,this.breedList[0]);
          if(this.ind!=2&&this.clientParam.sampling==1){
            this.clientParam.sampleAmount=this.sampleParam.price;
            this.clientParam.sampleUnit=this.sampleParam.unit;
            this.clientParam.sampleNumber=this.sampleParam.number;
          }
          delete this.clientParam.location ;
          delete this.clientParam.detail_add ;
          delete this.clientParam.sample ;
          console.log("八岁的巴萨",this.clientParam);
         this.Http(this.clientParam);
       }
    },
    Http:function(item){ 
     let url = http.urlCommon + http.apiUrl.most;
     let body = {
                biz_module: 'erpIntentionService',
                biz_method: 'addIntention',
                biz_param: {
                   
                }
            }
            body.biz_param={...item};
             http
                .commonPost(url, body)
                .then(res => {
                    this.loading = false;
                    this.toastSuccess(res.msg);
                    this.goBack();
                })
                .catch(err => {
                    this.loading = false;
                });
    },
  },
  watch:{
    radio3:function(newv){
          
    }
  },
  created(){


  },
  mounted(){
  
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
  padding:14px 0;
  width:100%;
  font-size:0.26rem;
  color:#333;
  background:#fff;
  padding-left:0.2rem;
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
.tabDiv{
    width:100%;
    height:1rem;
    background:#fff;
    p{
    width:60%;
    height:100%;
    margin:0 auto;
    display:flex;
    line-height:1rem;
    color:#666;
    font-size:0.28rem;
    border-bottom:1px solid #ccc;
     span{
       display:inline-block;
       flex:1;
       text-align:center;  
     }  
   
    }
}
.active{
    border-bottom:2px solid #04BE02;
    color:#04BE02;
    
}
.listClass{
  border-bottom:1px solid #e6e6e6;
  padding:5px 0;
  font-size:15px;
}
</style>