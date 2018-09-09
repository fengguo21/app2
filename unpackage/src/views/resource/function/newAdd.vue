<!-- /**
 * 资源新建
 * @authors DEAN hxj (xxxxxxx@delibal)
 * @date    2018-04-08 10:09:15
 * @version $Id$
 */

 -->
  <template>
 <yd-layout>
        <yd-navbar slot="navbar" :title="title">
            <yd-icon name="shangyiyehoutuifanhui" slot="left" size='.5rem' @click.native="goBack" custom></yd-icon>
        </yd-navbar>
        <div style="background:#fff;padding:10px 0;text-align:center;font-size:14px;color:#FA6705;">
            报价太麻烦？资源入库，让A自己选去吧！
        </div>
        <!-- 。。。。。。一些列弹出框 。。。。。。-->
        <yd-popup v-model="showPop" position="right" width="60%">
            <customer-List @chosen="supplierBack" v-if="showPop" :mark="1"></customer-List>
        </yd-popup>
         <yd-popup v-model="showBreed" position="right" width="60%">
           <add-Breed showChoose ="bizScope" @main-var="breedBack"></add-Breed>
         </yd-popup>
           <yd-popup v-model="showUnit" position="right" width="50%">
           <unit-List @unit-Back="unitBack"></unit-List>
         </yd-popup>
         <yd-popup v-model="showLocation" position="right" width="50%">
           <location  @location-Back="locationBack"></location>
         </yd-popup>
         <div v-if="showSpec">
         <yd-popup v-model="showSpec" position="right" width="50%">
           <spec-List :param="breedParam.breedId" @spec-Back="specBack"></spec-List>
         </yd-popup>
         </div>
         <!-- 。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。 -->
         <!-- 录入成功后弹出框 -->
        <div v-if="showSuccess">

            <yd-popup v-model="showSuccess" position="center" :close-on-masker="false" width="85%" height="60%">

               <div class="popTitle">继续添加?</div>
               <div style="display:flex;width:100%;flex-direction:column;padding:.28rem;padding-top:0;padding-bottom:.35rem;">
                <yd-button size="small" v-for="(item,index) in successBtn" :bgcolor="!item.checked?'#ededed':'#04BE02'" :color="!item.checked?'#666':'#fff'" class="groupbtn" @click.native="chooseFun(index)">{{item.text}}</yd-button>
               </div>
            </yd-popup>
        </div>
         <!-- ................ -->
        <!-- 供应商信息 -->
      <!--    <div class="wrapBox"><span class="Label">供应商：</span>
         <div @click="showPop= true" class="in" style="display:inline-block;" >{{clientParam.supplier}}</div>
         </div>
 -->
          <yd-cell-item class="labelBox">
            <span slot="left" class="Label">供应商：</span>
            <span slot="right"> 
            <div slot="left" @click="showPop= true"  style="display:inline-block;width:100%;height:.6rem;text-align:left;line-height:.6rem;" >{{clientParam.supplier}}</div>
            </span>
        </yd-cell-item>
         <!-- 品种信息 -->
        <yd-cell-item class="labelBox">
            <span slot="left" class="Label">品种名称:</span>
            <input slot="left" class="in" type="text" placeholder="请选择品种" v-model="breedParam.breedName" readonly="" @click="showBreed= true" />
        </yd-cell-item>
        <yd-cell-item class="labelBox">
            <span slot="left" class="Label">实际库存:</span>
            <input slot="left" class="in" type="number" placeholder="请输入库存数量" v-model="breedParam.number" /> 
          <!--   <input-val  slot="left" :border="false" type="number"  :param.sync="breedParam.number"  placeholder="请输入品种数量" validate="1"></input-val> -->
            <span slot="right"> 
               <select class="in" v-model="breedParam.unit" style="border:1px solid #ccc;line-height:.5rem;">
                    <option value='' disabled selected style='display:none;'>选择单位</option>
                    <option v-for="(item,index) in unitList" v-bind:value="item.id">{{item.name}}</option>
                </select>
            </span>
        </yd-cell-item>
        <yd-cell-item class="labelBox">
            <span slot="left" class="Label">市场价格:</span>
            <input slot="left" class="in" type="number" placeholder="请输入市场价格" v-model="breedParam.price" />
            <span slot="right"> 
              <span v-if="breedParam.unit!=''">元/{{breedParam.unit | unit}}</span>
            </span>
        </yd-cell-item>
        <yd-cell-item class="labelBox">
            <span slot="left" class="Label">来源:</span>
            <span slot="right"> 
                <select class="in" v-model="breedParam.breedSource" style="border:1px solid #ccc;line-height:.5rem;">
                     <option value='' disabled selected style='display:none;'>选择来源</option>
                     <option  v-for="(item,index) in sourceList" v-bind:value="item.value" >{{item.text}}</option>
                </select>
            </span>
        </yd-cell-item>
        <yd-cell-item class="labelBox">
            <span slot="left" class="Label">产地:</span>
            <span slot="right"> 
            <input slot="left" class="in" type="text" placeholder="请选择产地" v-model="breedParam.locationName" readonly="" @click="showLocation= true" />
            </span>
        </yd-cell-item>
        <yd-cell-item class="labelBox">
            <span slot="left" class="Label">规格:</span>
            <span slot="right"> 
                <input slot="left" class="in" type="text" placeholder="请选择规格" v-model="breedParam.spec" readonly="" @click="choseSpec()" />
            </span>
        </yd-cell-item>
         <yd-cell-item class="labelBox">
            <span slot="left" class="Label">质量控制:</span>
          <!--   <input slot="left" class="in" type="numner" placeholder="请输入质量控制" /> -->
            <yd-textarea slot="right" maxlength="30" v-model="clientParam.mainStandard" placeholder="请输入质量控制"></yd-textarea>
        </yd-cell-item>
         <yd-cell-item class="labelBox">
            <span slot="left" class="Label">质量标准:</span>
             <span slot="right"> 
                <select class="in" style="border:1px solid #ccc;line-height:.5rem;" v-model="breedParam.quality">
                     <option v-for="(item,index) in qualityList" v-bind:value="item">{{item}}</option>
                </select>
            </span>
        </yd-cell-item>
        <yd-cell-item class="labelBox">
            <input-val slot="left" type="time" :border='false' :param.sync="duedate" label="过期时间" placeholder="请选择报价有效期"></input-val>
        </yd-cell-item>
         <yd-cell-item class="labelBox">
            <span slot="left" class="Label">样品:</span>
            <span slot="right"> 
                <select class="in" style="border:1px solid #ccc;line-height:.5rem;" v-model="clientParam.sampling">
                     <option v-for="(item,index) in sampleList" v-bind:value="item.value">{{item.text}}</option>
                </select>
            </span>
        </yd-cell-item>
        <!-- 样品填写 -->
        <div v-if="isSample">
         <yd-cell-item class="labelBox">
            <span slot="left" class="Label">一份样品数量:</span>
            <input slot="left" class="in" type="number" placeholder="请输入样品数量" v-model="sampleParam.sampleNumber" />
            <span slot="right"> 
                <select class="in" v-model="sampleParam.sampleUnit" style="border:1px solid #ccc;line-height:.5rem;">
                    <option value='' disabled selected style='display:none;'>选择单位</option>
                    <option v-for="(item,index) in unitList" v-bind:value="item.id">{{item.name}}</option>
                </select>
            </span>
        </yd-cell-item>
        <yd-cell-item class="labelBox">
            <span slot="left" class="Label">一份样品价格:</span>
            <input slot="left" class="in" type="number" placeholder="请输入样品价格" v-model="sampleParam.sampleAmount" />
            <span slot="right"> 
                <span v-if="sampleParam.sampleUnit!=''">元</span>
            </span>
        </yd-cell-item>
        </div>
        <!--  -->
         <yd-cell-item class="labelBox">
            <span slot="left" class="Label">备注:</span>
            <!-- <input slot="right" class="in" type="numner" placeholder="请输入备注信息" v-model="clientParam.description" /> -->
            <yd-textarea slot="right" maxlength="30" v-model="clientParam.description" placeholder="请输入备注信息"></yd-textarea>
        </yd-cell-item>
        <!-- 图片 -->
       <div class="wrapBox" style="border:0;">
       <span class="Label" style="display:block;padding-left:10px;padding-bottom:7px;">药材图片:</span>
         <upload-image :multiple="multiple" :imageArray="clientParam.imageArray" @postUrl="getImgUrl" :showCamera="show1"></upload-image>
       </div>
        <!-- 付款方式 -->
      
        <!-- 求购备注 -->
       
       
      <yd-tabbar slot="tabbar">
       <div style="display:flex;flex-direction:row;width:100%;">
        <yd-button size="large" type="warning" style="margin-top:0;flex:1;border-radius:0;" :readonly="hold" @click.native="clearAll()">清空</yd-button>
        <yd-button size="large" type="primary" style="margin-top:0;flex:4;border-radius:0;" :readonly="hold" @click.native="add()">确定</yd-button>
       </div>
      </yd-tabbar>
    </yd-layout>
</template>
<script>
import util from '../../../libs/util'
import inputVal from '../../../components/com/inputType'
import customerList from '../../../components/com/myCustomerList'
import addBreed from  '../../slideBar/addVarieties'
import unitListWidget from '../../../components/com/unitList'
import specList from '../../../components/com/specList'
import location from '../../../components/com/location'
import uploadImage from "../../../common/upload/uploadImage.vue";
import clientInfo from '../../intention/function/modals/clientInfo'
import breedInfo from '../../intention/function/modals/breedInfo'
import http from "../../../libs/httpService.js";
import {mapGetters,mapActions} from "vuex"
export default {
  data() {
     let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 2;
    let date = now.getDate();
    if (month == 13) {
      month = 1;
      year = year + 1;
    }
    if (month < 10) {
      month = "0" + month;
    }
    if (date < 10) {
      date = "0" + date;
    }
    return {
        hold:false , //提交成功后禁用确定与置空
        show1: false,
        showPop:false,
        showBreed:false,
        isSample:false,
        showUnit:false,
        showSpec:false,
        showLocation:false,
        showSuccess:false,
        multiple:false,
        title:'资源录入',
        list:[],
        duedate: year + "-" + month + "-" + date + " 00:00",
        clientParam:{
            description:'',
            mainStandard:'',
            customerId:'',
            customerName:'',
            customerType:'',
            customerPhone:'',
            breedName:'',
            breedId:'',
            address:'',
            location:[],
            type:1,
            number:'',
            source:'',
            detail_add:'',
            sample:'0',
            percent:'',
            sampling:'0',
            preSell:this.ind==2?1:0 ,
            inType :3,
            imageArray:[],
            supplier:'请选择供应商'
        },
         breedParam:{
                breedName:'',
                breedId:'',
                number:'',
                spec:'',
                unit:'',
                unitName:'',
                quality:'符合药典标准',
                price:'',
                location:'',
                locationName:'',
                files:[],
                moq:'',
                duedate:'',
                country:'',
                countryName:'',
                pack:'',
                importPic:[], //必传
                testPic:[],
                breedSource:''

              },
        sampleParam:{
            sampleNumber:'',
            unitName:'',
            sampleAmount:'',
            sampleUnit:''
        },
        sampleList:[{value:'0',text:'不提供'},{value:'1',text:'提供'}],
        sourceList:[{value:'1',text:'野生'},{value:'2',text:'种植'}],
        qualityList:['符合药典标准','不符合药典标准'],
        successBtn:[{text:'全新的供应商与品种',checked:false},{text:'其他供应商',checked:false},{text:'其他品种',checked:false},{text:'其他产地',checked:false},{text:'其他规格',checked:false},{text:'不添加了',checked:false}],
     
    };
  },
  components: {
    clientInfo,
    breedInfo,
    inputVal,
    unitListWidget,
    uploadImage,
    customerList,
    addBreed,
    location,
    specList
  },
   computed: { //改变输入框的值时，payType需要重新选中后值才会变化，所以当输入框发生改变的时候，直接赋值给payType，再返回这个值，使其选中
		...mapGetters(["unitList"]),
    },
  methods:{
  	...mapActions(["queryUnitList","addIntention"]),
    openUpload() {
      this.show1 = true;
    },
     getImgUrl(url) {
      this.clientParam.imageArray.push(url);
      this.multiple = this.clientParam.imageArray.length == 5 ? false : true;
    },
    choseSpec(){
     let msg="请先选择品种"
     this.breedParam.breedId?this.showSpec=true : this.toastError(msg);
    },
    unitBack(val){
      this.showUnit=false;
      this.sampleParam.sampleUnit=val.id;
      this.sampleParam.unitName=val.name;
     },
     locationBack(val){
        this.showLocation=false;
        this.breedParam.locationName=val.cname;
        this.breedParam.location=val.id;
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
    supplierBack(val){
        console.log("撒加上快递就爱上你",val)
        this.showPop=false;
        this.clientParam.customerId=val[0].id;
        this.clientParam.supplier=val[0].name+'/'+val[0].mainContact+'/'+val[0].mainPhone;
    },
    breedBack(val){
        this.showBreed=false;
        this.breedParam.breedName=val.name;
        this.breedParam.breedId=val.id;
        console.log("爱神的箭萨比",val)
    },
    specBack(val){
        this.showSpec=false;
        this.breedParam.spec=val.name;
    },
    goBack() { //后退功能
        let _self = this;
        window.history.go(-1);
        this.raido3='';
    },
    clearAll(){
    util.init(this.clientParam);
    util.init(this.breedParam);
    util.init(this.sampleParam);
    this.clientParam.sampling=0;
    this.breedParam.quality='符合药典标准';
    },
    chooseFun(index){
         this.showSuccess=false;
         if(index==0){
            this.hold=false;
            util.init(this.clientParam);
            util.init(this.breedParam);
            util.init(this.sampleParam);
            this.clientParam.sampling=0;
            this.breedParam.quality='符合药典标准';
         }else if(index==1){
            this.hold=false;
            this.clientParam.customerId='';
            this.clientParam.supplier='';
         }else if(index==2){
            this.hold=false;
            this.breedParam.breedName='';
            this.breedParam.breedId='';
            this.breedParam.price='';
            this.breedParam.number='';
            this.breedParam.unit='';
         }else if(index==3){
            this.hold=false;
            this.breedParam.location='';
            this.breedParam.locationName='';
            this.breedParam.price='';
            this.breedParam.number='';
            this.breedParam.unit='';
         }else if(index==4){
            this.hold=false;
            this.breedParam.spec='';
            this.breedParam.price='';
            this.breedParam.number='';
            this.breedParam.unit='';
         }else if(index==5){
            this.goBack();
         }
    },
    add(){
        let timestamp1 = Date.parse( new Date());
        let timestamp2 = Date.parse( new Date(this.duedate));
        if(this.clientParam.customerId==''){
          this.toastError('请先选择供应商！')
        }else if(this.breedParam.breedId==''){
          this.toastError('请先添加品种！')
        }else if(this.breedParam.number==''){
          this.toastError('请填写品种数量！')
        }else if(this.breedParam.unit==''){
          this.toastError('请先选择品种单位！')
        }else if(this.breedParam.price==''){
          this.toastError('请先填写品种价格！')
        }else if(this.breedParam.breedSource==''){
          this.toastError('请先选择品种来源！')
        }else if(this.breedParam.location==''){
          this.toastError('请先选择品种产地！')
        }else if(this.breedParam.spec==''){
          this.toastError('请先选择品种规格！')
        }else if(this.clientParam.mainStandard==''){
          this.toastError('请先填写质量控制！')
        }else if(this.breedParam.quality==''){
          this.toastError('请先选择质量标准！')
        }else if(timestamp1>timestamp2){
          this.toastError('过期时间不能早于当前时间！')
        }else if(this.clientParam.sampling===''){
          this.toastError('请先选择是否有样品！')
        }else if(this.clientParam.sampling==1&&(this.sampleParam.sapmleAmount==''||this.sampleParam.sampleUnit==''||this.sampleParam.sampleNumber=='')){
          this.toastError('请完善样品信息！')
        }else if(this.clientParam.description==''){
          this.toastError('请先填写备注信息！')
        }else if(this.clientParam.imageArray.length==0){
          this.toastError('请先上传资源图片！')
        }else{
        /*。。。。。。。。默认。。。。。。。。*/
          this.clientParam.advance=0;
        /*。。。。。。。。。。。。。。。。。。*/
        if(this.breedParam.number<0||this.breedParam.price<0){
           this.toastError('品种的数量或价格不能小于0！')
        }
        if(this.clientParam.sampling==1&&(this.sampleParam.sampleNumber<0||this.sampleParam.sampleAmount<0)){
           this.toastError('样品的数量或价格不能小于0！')
        }
       /* util.inputVal('number',this.breedParam.number);
        util.inputVal('price',this.breedParam.price);
        util.inputVal('number',this.sampleParam.sampleNumber);
        util.inputVal('price',this.sampleParam.sampleAmount);*/
        /*.....................................*/
        this.clientParam=Object.assign({},this.clientParam,this.breedParam);
        this.clientParam=Object.assign({},this.clientParam,this.sampleParam);
        this.clientParam.duedate=this.duedate;
        this.clientParam.type=1;
        this.clientParam.inType=3;
          console.log("八岁的巴萨",this.clientParam);

         this.Http(this.clientParam);
       }
    },
    Http:function(item){ 
    	let param = {
    		...item
    	};
    	this.addIntention(param)
    		.then(res=>{
    			this.loading = false;
                this.toastSuccess(res.msg);
                this.showSuccess=true;
                this.hold=true;
    		})
    		.catch(err=>{
    			this.loading = false;
    		})
    },
    loadList() {
        this.queryUnitList()
        	.then((res)=>{
        		
        	})
        	.catch((err)=>{});
    },
  },
  watch:{
    "clientParam.sampling": {
      handler (curVal, oldVal) {
         if(curVal==1){
            this.isSample=true;
          }else{
            this.isSample=false;
            this.sampleParam.sampleUnit='';
            this.sampleParam.sampleAmount='';
            this.sampleParam.sampleNumber='';
          }
      },
      // 深度观察
      deep: true
    },
  },
  created(){
   this.loadList();

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
.yd-cell-item:not(:last-child):after{
    border:0;
}
.groupbtn{
    margin-top:0;
    flex:1;
    border-radius:0;
    margin-top:.34rem;
    height:.6rem;
    font-size:.27rem;
    color:#444;
    border-radius:7px;
}
.popTitle{
    font-size:.32rem;
    font-weight:bold;
    background:#fff;
    color:#666;
    text-align:center;
    height:.7rem;
    line-height:.7rem;
    border-bottom:1px solid #ccc;
}
</style>