<!-- /**
 * 新建求购与资源-品种信息页  mark控制输入项1/2 （普通供应·低价资源）/ 预售资源
 * @authors DEAN hxj (xxxxxxx@delibal)
 * @date    2018-02-05 15:55:16
 * @version $Id$
 */ -->
 <template>
   <div>
   <yd-button size="large" type="hollow" style="margin-top:0;color:#666;font-weight:bolder;" >品种信息</yd-button>
   <div style="width:100%;overflow:auto" ref="inputBox">
     <div v-if="showPop">
         <yd-popup v-model="showPop" position="right" width="80%">
           <add-Breed showChoose ="bizScope" @main-var="chosenBack"></add-Breed>
         </yd-popup>
     </div>
      <div v-if="showUnit">
         <yd-popup v-model="showUnit" position="right" width="50%">
           <unit-List @unit-Back="unitBack"></unit-List>
         </yd-popup>
     </div>
      <div v-if="showSpec">
         <yd-popup v-model="showSpec" position="right" width="50%">
           <spec-List :param="breedParam.breedId" @spec-Back="specBack"></spec-List>
         </yd-popup>
     </div>
      <div v-if="showLocation">
         <yd-popup v-model="showLocation" position="right" width="50%">
           <location  @location-Back="locationBack"></location>
         </yd-popup>
     </div>
     <!-- 国家 -->
      <div v-if="showCountry">
         <yd-popup v-model="showCountry" position="right" width="50%">
           <country-List @location-Back="countryBack"></country-List>
         </yd-popup>
     </div>
      <!-- 包装 -->
      <div v-if="showPack">
         <yd-popup v-model="showPack" position="right" width="50%">
           <pack-Way @pack-Back="packBack"></pack-Way>
         </yd-popup>
     </div>
     <!-- 。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。 -->
        <div class="wrapBox"><span class="Label">品种名称：</span><input class="in" type="text" placeholder="   请选择品种" readonly="" @click="showPop= true" v-model="breedParam.breedName"/></div>
        <input-val  type="number"  :param.sync="breedParam.number" label="品种数量" placeholder="请输入品种数量" validate="1"></input-val>
        <!--起订量***新建资源时  -->
        <div><input-val  type="number"  :param.sync="breedParam.moq" label="起订数量" placeholder="请输入起订数量" validate="1"></input-val></div>
        <!--  -->
     <!--    <input-val  type="text"  :param.sync="breedParam.unit" label="品种单位" placeholder="请选择单位" validate="0"></input-val> -->
         <div class="wrapBox"><span class="Label">品种单位：</span><input class="in" type="text" placeholder="   请选择单位" readonly="" @click="showUnit= true" v-model="breedParam.unitName"/></div>
        <input-val  type="price"  :param.sync="breedParam.price" label="中标价格" placeholder="请输入品种价格" validate="1"></input-val>
      <!--   <input-val  type="tel"  :param.sync="breedParam.spec" label="品种规格" placeholder="请输入品种规格" validate="1"></input-val> -->

      <!-- 过期时间 -->
       <div v-if="mark>=0"><input-val  type="time"  :param.sync="breedParam.duedate" label="过期时间" placeholder="请选择过期时间！" validate="1"></input-val></div>
      <!--  -->
      <!-- 资源国 -->
       <div v-if="mark==0 || mark==1" class="wrapBox"><span class="Label">资源国：</span><input class="in" type="text" placeholder="   请选择国家" readonly="" @click="showCountry=true" v-model="breedParam.countryName"/></div>
      <!--  -->
      <!-- 出口国-->
       <div v-if="mark==2" class="wrapBox"><span class="Label">出口国：</span><input class="in" type="text" placeholder="   请选择国家" readonly="" @click="showCountry=true" v-model="breedParam.countryName"/></div>
      <!--  -->
      <!-- 包装 -->
       <div v-if="mark>=0" class="wrapBox"><span class="Label">包装：</span><input class="in" type="text" placeholder="   请选择包装" readonly="" @click="showPack=true" v-model="breedParam.pack"/></div>
      <!--  -->
         <div class="wrapBox"><span class="Label">品种规格：</span><input class="in" type="text" placeholder="   请选择规格" readonly="" @click="choseSpec()" v-model="breedParam.spec"/></div>
          <div class="wrapBox"><span class="Label">品种产地：</span><input class="in" type="text" placeholder="   请选择产地" readonly="" @click="showLocation=true" v-model="breedParam.locationName"/></div>
        <div class="wrapBox"><span class="Label">质量要求：</span><input class="in" type="text" placeholder="   请填写" v-model="breedParam.quality"/></div>

        <div class="Label" style="display:block;text-align:left;padding:10px;padding-left:15px;">药材图片</div>
        <div style="padding:0 0.3rem;">
          <upload-img :multiple="true" :imageArray="breedParam.files" :back="p1" @postUrl="getImgUrl"></upload-img>
        </div>

         <div v-if="mark==2" class="Label" style="display:block;text-align:left;padding:10px;padding-left:15px;">进口资质图片</div>
        <div v-if="mark==2" style="padding:0 0.3rem;">
          <upload-img :multiple="true" :imageArray="breedParam.importPic" :back="p2" @postUrl1="getImport"></upload-img>
        </div>

         <div v-if="mark==2" class="Label" style="display:block;text-align:left;padding:10px;padding-left:15px;">检测报告图片</div>
        <div v-if="mark==2" style="padding:0 0.3rem;">
          <upload-img :multiple="true" :imageArray="breedParam.testPic" :back="p3" @postUrl2="getTest"></upload-img>
        </div>
        
        <div style="position:absolute;bottom:0;width:100%;">
          <yd-button size="large" type="primary" @click.native="save()">保存</yd-button>
        </div>
    </div>
    </div>
      

</template>
<script>
import unitList from '../../../../components/com/unitList'
import specList from '../../../../components/com/specList'
import location from '../../../../components/com/location'
import countryList from '../../../../components/com/countryList'
import uploadImage from "../../../../common/upload/uploadImage.vue";
import packWay from '../../../../components/com/packWay'
import addBreed from  '../../../slideBar/addVarieties'
import inputVal from '../../../../components/com/inputType'
import uploadImg from '../../../../common/upload/uploadImg.vue'
    export default {
        data() {
            return {
               p1:'postUrl',
               p2:'postUrl1',
               p3:'postUrl2',
                showPop:false,
                showUnit:false,
                showSpec:false,
                showLocation:false,
                showCountry:false,
                showPack:false,
              breedParam:{
                breedName:'',
                breedId:'',
                number:'',
                spec:'',
                unit:'',
                unitName:'',
                quality:'',
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
                testPic:[]

              },
              test:this.showControl

            }
        },
        props:{
           param:{
            type:Array,
            default:[]
           },
           mark:{

           }
        },
        computed: {
           
        },
        components: {
          inputVal,
          addBreed,
          unitList,
          specList,
          location,
          uploadImg,
          countryList,
          packWay,
          uploadImage
        },
        mounted(){
          let boxHeight=document.body.clientHeight-110+'px';
           this.$refs.inputBox.style.height=boxHeight;
       },
        beforeDestroy() {

        },
        methods: {
            getImgUrl(url) {
                this.breedParam.files.push(url);
            },
             getImport(url) {
                this.breedParam.importPic.push(url);
            },
             getTest(url) {
                this.breedParam.testPic.push(url);
            },
             toastError(msg) {
                this.$dialog.toast({
                    mes: msg,
                    timeout: 1500,
                    icon: 'error',
                });
            },
            choseSpec(){
             let msg="请先选择品种"
             this.breedParam.breedId?this.showSpec=true : this.toastError(msg);
            },
           chosenBack(val){
            this.showPop=false;
            console.log("撒德哈时间",val)
            this.breedParam.breedName=val.name;
            this.breedParam.breedId=val.id;
           },
           unitBack(val){
            this.showUnit=false;
            this.breedParam.unit=val.id;
            this.breedParam.unitName=val.name;
           },
           specBack(val){
            this.showSpec=false;
            this.breedParam.spec=val.name;
           },
           locationBack(val){
            this.showLocation=false;
            this.breedParam.locationName=val.cname;
            this.breedParam.location=val.id;
           },
           countryBack(val){
            this.showCountry=false;
            this.breedParam.countryName=val.cname;
            this.breedParam.country=val.id;
           },
           packBack(val){
            this.showPack=false;
            this.breedParam.pack=val;
           },
           save(){
           console.log("啥都不看见爱上看不见的",this.mark)
              if(this.breedParam.breedName==''){
              let msg="请选择品种";
              this.toastError(msg);
              } else if(this.breedParam.number==''){
                let msg="数量不能为空";
              this.toastError(msg);
              }  else if(this.breedParam.moq==''&&this.mark>=0){
                let msg="起订量不能为空";
              this.toastError(msg);
               }else if(this.breedParam.unit==''){
                let msg="单位不能为空";
              this.toastError(msg);
              } else if(this.breedParam.price==''){
                let msg="价格不能为空";
              this.toastError(msg);
              }  else if(this.breedParam.duedate==''&&this.mark>=0){
                let msg="过期时间不能为空";
              this.toastError(msg);
              }  else if(this.breedParam.country==''&&this.mark>=0){
                let msg="国家不能为空";
              this.toastError(msg);
              } else if(this.breedParam.pack==''&&this.mark>=0){
                let msg="包装不能为空";
              this.toastError(msg);
              } else if(this.breedParam.spec==''){
                let msg="规格不能为空";
              this.toastError(msg);
              }  else if(this.breedParam.location==''){
                let msg="产地不能为空";
              this.toastError(msg);
              }  else if(this.breedParam.quality==''){
                let msg="质量要求不能为空";
              this.toastError(msg);
              } else if(this.breedParam.importPic.length==0&&this.mark==2){
                let msg="进口资质图为必传项";
              this.toastError(msg);
              }else{
              this.$emit('breed-Back',this.breedParam);
              }
           }

        },
        created(){
          console.log("啊实打实",this.param);
           if(this.param.length>0){
            this.breedParam=Object.assign({},this.param[0]);
            console.log("计划v吧是不记得把数据交换",this.breedParam)
            console.log("计划v吧是不记得把数据交换",this.param[0])
           }
        }

    }
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

    
</style>
