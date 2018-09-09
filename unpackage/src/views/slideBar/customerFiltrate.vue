<template>
	<div>
     <div v-if="loadBreed">
       <yd-popup v-model="showMenu" position="right" width="70%" >
		  	<add-varieties :param="param"  :showChoose='showChoose' @main-var="mainVar" ></add-varieties>
	  	</yd-popup>
     </div>
    <input-val type="name" :param.sync="param.id" label="客户ID" placeholder="请输入客户ID" validate="0"></input-val>
		<input-val type="name" :param.sync="param.name" label="客户名称" placeholder="请输入客户名称" validate="0"></input-val>
		<input-val type="phone" :param.sync="param.phone" label="手机号" placeholder="请输入客户手机号" validate="0"></input-val>
		<!-- <input-val type="name" :param.sync="param.type" label="客户类型" placeholder="请输入客户类型" validate="0"  @click.native="typeFunc"></input-val> -->
    <div class="wrapBox"><span class="Label">客户类型：</span><input class="in" type="text" placeholder="请选择客户类型" readonly="" @click="typeFunc" v-model="typeName"/></div>
    <div class="wrapBox"><span class="Label">品种：</span><input class="in" type="text" placeholder="请选择品种" readonly="" @click="selectBreed" v-model="param.bizScope"/></div>
		<!-- <input-val type="name" :param.sync="param.bizScope" label="品种" placeholder="请输入品种" validate="0" @click.native="selectBreed"></input-val> -->
		<input-val type="time" :param.sync="param.startTime" label="开始时间"></input-val>
		<input-val type="time" :param.sync="param.endTime" label="结束时间"></input-val>
	</div> 
</template>
<script>
import * as filters from "../../filters/filters.js";
import inputVal from "../../components/com/inputType.vue";
import addVarieties from "../slideBar/addVarieties.vue";
// import { bizTypeOptions } from "../../common/searchData.js";
//获取当前时间

export default {
  props: ["param"],
  data() {
    return {
      loadBreed:false,
      showMenu: false,
      showChoose: "",
      breedShow: false,
      radio2: 2,
      ctypeList: [],
      labelName: {
        type: ""
      }
      // searchParam: bizTypeOptions
    };
  },

  computed: {},
  computed: {
    typeName() {
      return filters.customerType(this.param.type ? this.param.type : -1);
    }
  },
  methods: {
    //选择品种
    mainVar(value) {
      console.log("233333333345666", value);
      //tab跳转
      let _self = this;
      if (this.showChoose == "customerType") {
        _self.labelName.type = value.name;
        _self.param.type = Number(value.value);
        console.log("typeeeeeeeeeeeee", _self.param.type);
      } else if (this.showChoose == "bizScope") {
        console.log("bizScopeeeeeeeeeee", this.param);
        _self.param.bizScope = value.name;
      }
      console.log("tab跳转——————————", value, this.param);

      this.showMenu = false;
    },
    typeFunc(value) {
      this.loadBreed=true,
      this.showChoose = "customerType";
      this.showMenu = true;
    },
    // 选择品种弹出
    selectBreed(value) {
      // this.param.bizScope = value.name;
      // this.$refs.varieties.loadList();//调用子组件addVarities的方法
      // console.log("11119999999999999999999",);
      this.loadBreed=true,
      
      this.showChoose = "bizScope";
      this.showMenu = true;
      // this.showChoose = true;
      console.log("1111111111111", value);
    }
  },
  created() {
    // this.param.ctimeEnd = currentDateShort();
  },
  components: {
    addVarieties,
    inputVal
  }
};
</script>

<style lang="less"  scoped>
.yd-cell-left {
  width: 30px;
}
</style>