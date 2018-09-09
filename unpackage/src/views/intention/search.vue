<template>
    <div>
     <div v-if="showPop">
         <yd-popup v-model="showPop" position="right" width="80%">
           <add-Breed showChoose ="bizScope" @main-var="chosenBack"></add-Breed>
         </yd-popup>
     </div>
    <input-val  type="tel"  :param.sync="param.customerId" label="客户ID" placeholder="请输入客户ID" validate="0"></input-val>
    <input-val  type="tel"  :param.sync="param.customerName" label="客户名" placeholder="请输入客户名称" validate="0"></input-val>
    <input-val  type="tel"  :param.sync="param.id" label="求购ID" placeholder="请输入求购ID" validate="0"></input-val>
    <input-val  type="tel"  :param.sync="param.customerPhone" label="手机号" placeholder="请输入客户手机号"  validate="0"></input-val> 
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
