<template>
	<div>
		<yd-popup v-model="showMenu" position="right" width="70%">
			<add-varieties :param="param" :showChoose='showChoose' @main-var="mainVar"></add-varieties>
		</yd-popup>
		<div class="titleBar">
			<div class="title">
				主营品种
			</div>
		</div>
		<yd-cell-group>
			<div class="mainVarieties">
				<div class="addVarieties" v-for="(item,index) in param.bizScope" @click="del(item)">{{item}} <i class="icon iconfont icon-cuowuguanbiquxiao"></i></div>
				<div class="addVarieties" @click="addFunc()">新增主营<i class="icon iconfont icon-jia"></i></div>
			</div>
		</yd-cell-group>
	</div>
</template>

<script>
import addVarieties from "../../views/slideBar/addVarieties.vue";
export default {
  data() {
    return {
      title: "新建供应商",
      showMenu: false,
      showChoose: "",
      msg: {
        name: ""
      }
    };
  },
  components: {
    addVarieties
  },
  props: {
    param: ""
  },
  methods: {
    addFunc() {
      this.showChoose = "bizScope";
      this.showMenu = true;
    },
    del(item) {
      for (var i = 0; i < this.param.bizScope.length; i++) {
        if (this.param.bizScope[i] == item) {
          this.param.bizScope.splice(i, 1);
        }
      }
    },
    mainVar(item) {
      //tab跳转
      let _self = this;
      let same = true;
      for (let i of this.param.bizScope) {
        if (i == item.name) {
          same = false;
        }
      }
      if (same) {
        _self.param.bizScope.push(item.name);
        console.log(_self.param.bizScope);
      } else {
        this.$dialog.toast({
          mes: `${item.name}已经是你的主营品种`
        });
      }
      this.showMenu = false;
    },
    goBack() {
      let _self = this;
      window.history.go(-1);
      console.log("----------------返回-----------------");
    }
  },
  created() {
    console.log(this.param);
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
.mainVarieties {
  background-color: #fff;
  .addVarieties {
    display: inline-block;
    margin: 10px 10px;
    padding: 5px;
    border: 1px solid rgba(230, 230, 230, 0.5);
    i {
      font-size: 10px;
      margin: 5px;
    }
  }
}
</style>