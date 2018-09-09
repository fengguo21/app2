<!-- /**
 * 资源搜索
 * @authors DEAN hxj (xxxxxxx@delibal)
 * @date    2018-02-27 10:57:57
 * @version $Id$
 */

 -->
 <template>
    <div>
     <div v-if="showPop">
         <yd-popup v-model="showPop" position="right" width="80%">
           <add-Breed showChoose ="bizScope" @main-var="chosenBack"></add-Breed>
         </yd-popup>
     </div>
    <input-val  type="tel"  :param.sync="param.customerId" label="供应商ID" placeholder="请输入供应商ID" validate="0"></input-val>
    <input-val  type="tel"  :param.sync="param.customerName" label="供应商名" placeholder="请输入供应商名称" validate="0"></input-val>
    <input-val  type="tel"  :param.sync="param.id" label="资源ID" placeholder="请输入资源ID" validate="0"></input-val>
    <input-val  type="tel"  :param.sync="param.customerPhone" label="手机号" placeholder="请输入供应商手机号"  validate="0"></input-val> 
     <div class="wrapBox"><span class="Label">品种名称：</span><input class="in" type="text" placeholder="   请选择品种" readonly="" @click="showPop= true" v-model="param.breedName"/></div>
    <input-val  type="time"  :param.sync="param.startTime" label="开始时间" ></input-val> 
    <input-val  type="time"  :param.sync="param.endTime" label="结束时间" ></input-val>
    </div>
</template>
<script>
import inputVal from '../../components/com/inputType'
import addBreed from  '../slideBar/addVarieties'
export default {
    props: ["param"],
    data() {
        return {
           showPop:false
        }
    },
    components: {
        inputVal,
        addBreed
    },
    methods: {
        chosenBack(val){
            this.showPop=false;
            console.log("撒德哈时间",val)
            this.param.breedName=val.name;
            this.param.breedId=val.id;
           },
    },
    created() {
      /*this.inputWidth= this.$refs['score'] */  
     
    }
}
</script>
<style>
</style>
