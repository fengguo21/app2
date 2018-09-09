<!--
  * @authors DEAN hxj (xxxxxxx@delibal)
 * @date    2018-02-05 15:50:38
 * @version $Id$ -->
 <template>    
    <div>
     <yd-popup v-model="showPop" position="right" width="65%">
            <customer-List @chosen="chosenBack" v-if="showPop"></customer-List>
        </yd-popup>
      <div class="titleBar">
            <div class="title">
                客户信息
            </div>
        </div>
        <div style="background:#fff;">
     <!--    <input-val  type="name"  :param.sync="param.customerName" label="客户名称" placeholder="" validate="0" :only="true" @enter-done="showPop= true"></input-val>
       <input-val  type="number"  :value="param.customerType" label="客户类型" placeholder="" validate="0" :only="true"></input-val>
       <input-val  type="phone"  :value="param.customerphone" label="客户电话" placeholder="" validate="0" :only="true"></input-val> -->
        <div class="wrapBox"><span class="Label">客户名称：</span><input class="in" type="text" placeholder="请选择客户" readonly="" @click="showPop= true" v-model="param.customerName"/></div>
        <div class="wrapBox" v-if="mark==0"><span class="Label">客户类型：</span><span style="display:inline-block;" class="in">{{param.customerType | supplierType}}</span></div>
        <div class="wrapBox" v-if="mark==0"><span class="Label">客户电话：</span><input class="in" placeholder="客户电话" type="text" readonly="" v-model="param.customerPhone"/></div>
        <input-val  v-if="mark==0" type="time"  :param.sync="param.duedate" label="过期时间" placeholder="请输入客户ID" ></input-val>

         <div class="wrapBox" v-if="!showAdd&&mark==0"><span class="Label">交货地：</span><input class="in" placeholder="交货地" type="text" readonly="" v-model="address" @click="showLocation()"/></div>
        <div v-if="showAdd&mark==0"><input-val  type="address"  :param.sync="param.address" label="交货地" placeholder="" ></input-val></div>
        
         <div class="wrapBox" v-if="!showAdd&mark==1"><span class="Label">货物所在地：</span><input class="in" placeholder="请选择货物所在地" type="text" readonly="" v-model="address" @click="showLocation()"/></div>
         <div v-if="showAdd&mark==1"><input-val  type="address"  :param.sync="param.location" label="货物所在地" placeholder="" ></input-val></div>
           
         <div v-if="mark==1"><input-val  type="name"  :param.sync="param.detail_add" label="详细地址" placeholder="请输入详细地址" ></input-val></div>
        </div>
    </div>
</template>
<script>
import inputVal from '../../../../components/com/inputType'
import customerList from '../../../../components/com/myCustomerList'
    export default {
        data() {
            return {
            showPop:false,
            address:'',
            showAdd:false
            }
        },
        props:{
           param:{
            type:Object,
            default:{}
           } ,
           mark:{
            default:''
           }
        },
        computed: {

        },
        components: {
          inputVal,
          customerList
        },
        mounted() {
  
        },
        beforeDestroy() {

        },
        methods: {
            chosenBack:function(val){
                console.log("骄傲啥时间打",val)
                this.showPop=false;
                this.param.customerName=val[0].name;
                this.param.customerType=val[0].type;
                this.param.customerPhone=val[0].mainPhone;
                this.param.customerId=val[0].id;
                if(val[0].bizCustomerAddress[0].province&&val[0].bizCustomerAddress[0].province!=''){
                    this.param.location[0]=val[0].bizCustomerAddress[0].province;
                    this.param.location[1]=val[0].bizCustomerAddress[0].city;
                    this.param.location[2]=val[0].bizCustomerAddress[0].district;
                    this.address=val[0].bizCustomerAddress[0].mainProvinceName+'/'+val[0].bizCustomerAddress[0].mainCityName+'/'+val[0].bizCustomerAddress[0].mainDistrictName;
                }
                console.log("阿萨德不会撒谎不断",this.param.location)
            },
            showLocation:function(){
                this.showAdd=true;
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