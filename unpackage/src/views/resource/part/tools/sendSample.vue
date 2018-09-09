<!-- /**
 *  寄样
 * @authors DEAN hxj (xxxxxxx@delibal)
 * @date    2018-03-27 15:11:20
 * @version $Id$
 */

 -->
 <template>
    <div class="offerZoneDetail">
     <yd-popup v-model="showPop" position="right" width="65%">
            <express-List @chosen="chooseBack" v-if="showPop"></express-List>
     </yd-popup>
        <yd-layout>
        <yd-navbar slot="navbar" :title="title">
            <yd-icon name="shangyiyehoutuifanhui" slot="left" size='.5rem' @click.native="goBack" custom></yd-icon>
        </yd-navbar>

      <div id="contentBox" style="background:#fff;overflow:auto;padding-bottom:7vh;">
         
             <div class="wrapBox" ><span class="Label">样品名称：</span><span style="display:inline-block;" class="in">{{sampleDetail.items[0].breedName}}</span></div>
             <div class="wrapBox" ><span class="Label">样品数量：</span><span style="display:inline-block;" class="in">{{sampleDetail.items[0].number}}/{{sampleDetail.items[0].unit | unit}}</span></div>
             <div class="wrapBox" ><span class="Label">样品规格：</span><span style="display:inline-block;" class="in">{{sampleDetail.items[0].spec}}</span></div>
             <div class="wrapBox" ><span class="Label">申请时间：</span><span style="display:inline-block;" class="in">{{sampleDetail.items[0].ctime | subTime}}</span></div>
             <div class="wrapBox" ><span class="Label">收货人名：</span><span style="display:inline-block;" class="in">{{sampleDetail.consignee}}</span></div>
             <div class="wrapBox" ><span class="Label">收货电话：</span><span style="display:inline-block;" class="in">{{sampleDetail.consigneePhone}}</span></div>
             <div class="wrapBox" ><span class="Label">收货地址：</span><span style="display:inline-block;" class="in">{{address}}</span></div>
             <div class="wrapBox" ><span class="Label">详细地址：</span><span style="display:inline-block;" class="in">{{sampleDetail.address}}</span></div>
             <!--....................................-->
              <input-val  type="time"  :param.sync="logistics.deliveryTime" label="发货时间" placeholder="请选择发货时间" ></input-val>
              <div class="wrapBox"><span class="Label">物流公司：</span><input class="in" type="text" placeholder="请选择物流公司" readonly="" @click="showPop= true" v-model="express"/></div>
              <div ><input-val  type="name"  :param.sync="logistics.logisticsVoucher" label="物流单号" placeholder="请输入物流单号" ></input-val></div>
              <div ><input-val  type="number"  :param.sync="logistics.freight" label="物流费用" placeholder="请输入物流费用" ></input-val></div>
              <div >
                <span class="Label" style="display:block;text-align:left;padding:.2rem 0;text-indent:0.3rem;">快递单图片</span>
                <div style="padding-left:.3rem;"> 
               <upload-image :multiple="multiple" :imageArray="logistics.imageArray" @postUrl="getImgUrl" :showCamera="show1"></upload-image>
               </div>
              </div>
                    
      
            </div> 
              
       </yd-layout>
       <yd-button style="position:absolute;bottom:0;margin-top:0;" size="large" type="primary" @click.native="sureSend()">提交</yd-button>
    </div>
</template>

<script>
    import inputVal from '../../../../components/com/inputType'
    import uploadImage from "../../../../common/upload/uploadImage.vue";
    import expressList from '../../../../components/com/expressList'
    import detailsLayout from "../../../../components/detailsLayout.vue"
    import http from '../../../../libs/httpService.js'
    export default {
        data() {
            return {
              show1:false,
              multiple:true,
               showPop:false,
               title:'寄样信息',
               funcs:[],
               moreFun:[],
               duedate:'',
               sampleDetail:{},
               address:'',
               express:'',
               logistics:{
                logisticsMode:0,  
                freight:'', 
                logisticsCompany:'',    
                logisticsCompanyName:'',   
                logisticsCompanyCode:'',   
                logisticsVoucher:'' ,   
                logisticDescription:'', 
                deliveryTime:'',
                imageArray:[],
                express:[]

              },
              items:{}
            }
        },
        props:['param'],
        computed: {
   
        },
        components: {
           detailsLayout,
           inputVal,
           expressList,
           uploadImage
        },
        beforeDestroy() {

        },
        methods: {
        toastSuccess(msg) {
              this.$dialog.toast({
                  mes: msg,
                  timeout: 1000,
                  icon: 'success'
              });
          },
          openUpload() {
            this.show1 = true;
          },
          getImgUrl(url) {
            this.logistics.imageArray.push(url);
            this.multiple = this.logistics.imageArray.length == 5 ? false : true;
          },
          sureSend(){
            if(this.logistics.deliveryTime==''){
                this.$dialog.toast({ mes: '请选择发货时间'});
            }else if(this.logistics.logisticsCompany==''){
                this.$dialog.toast({ mes: '请选择快递公司'});
            }else if(this.logistics.logisticsVoucher==''){
                this.$dialog.toast({ mes: '请填写快递单号'});
            }else if(this.logistics.freight==''){
                this.$dialog.toast({ mes: '请填写快递费用'});
            }else if(this.logistics.imageArray.length<=0){
                this.$dialog.toast({ mes: '请上传快递单照片'});
            }else{
            this.logistics.deliveryTime=Date.parse(new Date(this.logistics.deliveryTime));
             this.items.forEach(function(item){
                    item.requestItemId=item.id;
              })
             this.sendHttp();
            }
          },
          sendHttp:function(param){
                let _self = this;
                let url = http.addSID(http.urlCommon + http.apiUrl.most);
                let body = {
                    biz_module: 'erpSampleSendService',
                    biz_method: 'saveSampleSend',
                    biz_param: {
                        logistics:this.logistics,
                        items:this.items
                    }
                }
                 http.commonPost(url, body).then((res) => {
                     this.$dialog.toast({ mes: res.msg});
                     this.goBack();
                }).catch((err) => {}); 
           }, 
          sampleHttp:function(param){
                let _self = this;
                let url = http.addSID(http.urlCommon + http.apiUrl.most);
                let body = {
                    biz_module: 'erpSampleRequestService',
                    biz_method: 'findRequestByOfferId',
                    biz_param: {
                       offerId : this.$route.query.id 
                    }
                }
                 http.commonPost(url, body).then((res) => {
                    _self.sampleDetail=res.biz_result;
                    _self.items=res.biz_result.items;
                    this.logistics.consignee=res.biz_result.customer;
                    this.logistics.consigneeName=res.biz_result.consignee;
                    this.logistics.consigneePhone=res.biz_result.consigneePhone;
                    this.logistics.consigneeAddress=res.biz_result.address;
                    this.logistics.consigneeCountry=res.biz_result.country;
                    this.logistics.consigneeProvince=res.biz_result.province;
                    this.logistics.consigneeCity=res.biz_result.city;
                    this.logistics.consigneeDistrict=res.biz_result.district;
                    _self.address=res.biz_result.countryName+res.biz_result.provinceName+res.biz_result.cityName+res.biz_result.districtName;
                }).catch((err) => {}); 
           }, 
           chooseBack(item){
              this.express=item.name;
              this.showPop=false;
              this.logistics.logisticsCompany=item.id;   
             this.logistics.logisticsCompanyName=item.name;    
             this.logistics.logisticsCompanyCode=item.code; 
           } ,
            goBack() { //后退功能
                let _self = this;
                window.history.go(-1);
                this.raido3='';
            },
        },
        created() {
            let box=document.getElementById("contentBox")
            console.log("阿萨德不开机萨科技不断",box);
            this.sampleHttp();
        }

    }
</script>

<style lang="less">
</style>