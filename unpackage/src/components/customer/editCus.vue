<template>
	<div>
		<yd-popup v-model="showMenu" position="right" width="70%">
			<addVarieties :param="param"  :showChoose='showChoose' @main-var="mainVar"></addVarieties>
		</yd-popup>
		<div class="titleBar">
			<div class="title">
				客户信息
			</div>
		</div>
		<yd-cell-group>
			<yd-cell-item>
				<span slot="left">客户名称：</span>
        <!--鉴于此组件disabled 不好用，所以出此下策-->
				<yd-input v-if="!isAdd"disabled slot="right" v-model="param.name" ></yd-input>
				<yd-input v-if="isAdd" slot="right" v-model="param.name" placeholder="请输入客户名称(必填)"></yd-input>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">客户类型：</span>
				<span slot="right" @click="typeFunc">{{param.type | customerType}}</span>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">客户规模：</span>
				<span slot="right" @click="scaleFunc">{{param.scale | scale}}</span>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">客户性质：</span>
				<span slot="right" @click="natureFunc">{{param.nature | nature}}</span>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">地址：</span>
				<span slot="right" @click.stop="showAddress = true" v-if="param.provinceName">{{param.countryName +" "+param.provinceName +" "+param.cityName +" "+param.districtName}}</span>
				<input class="diy_input" slot="left" @click.stop="showAddress = true" placeholder="请选择客户地址" readonly v-else />
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">详细地址：</span>
				<yd-input slot="right" v-model="param.address"></yd-input>
			</yd-cell-item>
		</yd-cell-group>
		<yd-cityselect v-model="showAddress" :callback="selectAddress" :items="district"></yd-cityselect>
	</div>
</template>
<script>
import addVarieties from "../../views/slideBar/addVarieties.vue";
import validation from "../../validation/validation.js";
import http from "../../libs/httpService.js";
import District from "../../views/commonPlugin/address.json";
export default {
  data() {
    return {
      district: District[0].c,
      title:
        this.$route.fullPath.split("/")[2] == "add" ? "新建客户" : "编辑客户",
      isAdd: this.$route.fullPath.split("/")[2] == "add",
      showMenu: false,
      showAddress: false,
      showChoose: ""
    };
  },
  props: {
    param: ""
  },
  // computed: {
  //   isAdd(){
  //     return this.$route.fullPath.split("/")[2] === "add";
  //   }
  // },
  components: {
    addVarieties
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    selectAddress(ret) {
      console.log("122222222222222222222", ret);
      this.param.provinceName = ret.itemName1;
      this.param.cityName = ret.itemName2;
      this.param.districtName = ret.itemName3;
      this.param.province = ret.itemValue1;
      this.param.city = ret.itemValue2;
      this.param.district = ret.itemValue3;
    },

    natureFunc(value) {
      this.showChoose = "nature";
      this.param.nature = value.nature;
      this.showMenu = true;
    },
    scaleFunc(value) {
      this.showChoose = "scale";
      this.param.scale = value.scale;
      this.showMenu = true;
    },
    typeFunc(value) {
      this.showChoose = "customerType";
      this.showMenu = true;
    },
    del(item) {
      for (var i = 0; i < this.supInfo.bizScope.length; i++) {
        if (this.supInfo.bizScope[i] == item) {
          this.supInfo.bizScope.splice(i, 1);
        }
      }
    },

    addFunc() {
      this.showChoose = "bizScope";
      this.showMenu = true;
    },
    mainVar(item) {
      //tab跳转
      let _self = this;
      if (this.showChoose == "customerType") {
        _self.param.type = Number(item.value);
        console.log(_self.param.type);
      } else if (this.showChoose == "scale") {
        _self.param.scale = Number(item.value);
        console.log(_self.param.scale);
      } else if (this.showChoose == "nature") {
        _self.param.nature = Number(item.value);
        console.log(_self.param.scale);
      }
      console.log("tab跳转——————————", item, this.param);
      this.showMenu = false;
    },
    goBack() {
      let _self = this;
      window.history.go(-1);
    }
  },
  created() {
    // this.isAdd = this.$route.fullPath.split("/")[2] === "add";
    //			console.log(this.supInfo.bizScope)
  }
};
</script>
<style lang="less" scoped>
.titleBar {
  .title {
    margin-top: 10px;
    line-height: 40px;
    color: #666;
    font-size: 20px;
    padding: 0 10px;
    span {
      color: #f00;
      line-height: 20px;
      font-size: 12px;
      margin-left: 10px;
    }
  }
}



.diy_input {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  height: 1rem;
  border: none;
  font-size: 0.3rem;
  background: transparent;
  color: #555;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  text-align: left;
}

.yd-cell-right {
  span {
    display: inline-block;
    width: 100%;
    text-align: left;
  }
}
</style>
