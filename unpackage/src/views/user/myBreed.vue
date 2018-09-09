<template>
    <yd-layout>
      <yd-popup v-model="showMenu" position="right" width="70%" v-if="showMenu">
			  <addVarieties :showChoose='showChoose' @main-var="mainVar"></addVarieties>
		  </yd-popup>
      <yd-navbar slot="navbar" :title="title">
        <yd-icon name="shangyiyehoutuifanhui" slot="left" size='.5rem' @click.native="goBack" custom></yd-icon>
	  	</yd-navbar>
    <div>
        <yd-cell-group>
            <main-biz-scope :bizScope="goodAtField"></main-biz-scope>
        </yd-cell-group>
    </div>
   
    <yd-tabbar slot="tabbar"  class="tabbar" >
        <div class="bottom" v-if="unchanged">
            <p @click="addFunc">新增 </p>
        </div>
    </yd-tabbar>

  </yd-layout>
</template>
<script>
import mainBizScope from "../customer/detail/mainBizScope.vue";
import uploadImg from "../../common/upload/uploadImg.vue";
import addVarieties from "../../views/slideBar/addVarieties.vue";
import {mapGetters,mapActions} from "vuex";
export default {
  data() {
    return {
      showMenu: false,
      showChoose: "",
      photoList: [],
      multiple: false,
      unchanged: true,
      title: "擅长领域",
      breedList: [],
      employee: {
        name: "",
        photo: "",
        gender: ""
      },
      imageUrl: require("../../res/images/head.png")
    };
  },
  computed: {
  	...mapGetters(["goodAtField"]),
  },
  mounted() {},
  components: {
    mainBizScope,
    uploadImg,
    addVarieties
  },
  methods: {
  	...mapActions(["addEmployProduct"]),
    addFunc() {
      this.showChoose = "bizScope";
      this.showMenu = true;
    },
    goBack() {
      let _self = this;
      window.history.go(-1);
    },
    //擅长领域（品种）
    mainVar(item) {
      //tab跳转
      let _self = this;
      let same = true;
      for (let i of this.goodAtField) {
        if (i == item.name) {
          same = false;
        }
      }
      if (same) {
        this.$store.state.user.goodAtField.push(item.name);
        _self.breedList.push(item.id); //新增擅长品种
        console.log("我是擅长领域--", _self.goodAtField, item, this.breedList);
        this.addProduct();
      } else {
        this.$dialog.toast({
          mes: `${item.name}已经是你的主营品种`
        });
      }
      this.showMenu = false;
    },
    addProduct() {
      let param = {
          employee: window.localStorage.employeeId,
          breedIds: this.breedList //TODO
      };
      this.addEmployProduct(param)
      	  .then(res => {
      	  })
      	  .catch(err =>{
      	  	
      	  });
    },
  },
  created() {
  }
  //更新用户详情
};
</script>
<style lang="less" scoped>
.imageBox {
  background-color: #eee;
  text-align: center;
  .user-icon {
    width: 2rem;
    height: 2rem;
    // margin-top: 0.5rem;
    // margin-bottom: 0.5rem;
    // margin-left: 2.5rem;
    // margin-right: 0.5rem;
    margin: 0.2rem;
    border-radius: 50%;
    overflow: hidden;
  }
}
.bottom {
  width: 100%;
  display: flex;
  p {
    flex: 1;
    text-align: center;
    font-size: 14px;
    line-height: 40px;
    color: #333;
  }
}
.tabbar {
  padding: 0;
  height: 50px;
}
</style>


