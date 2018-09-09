<!-- Created by Weiun on 2017/1/17.-->
<template>
    <div>
        <div class="user-top">
            <img class="user-icon" :src="employeeInfo.photo?employeeInfo.photo:imageUrl" alt=""><!-- 头像 -->
        </div>
        <div class="user-name">
            <span style="font-size:.4rem">{{employeeInfo.name}}</span><span v-if="employeeInfo.ename" style="font-size:.4rem">({{employeeInfo.ename}})</span>
            <br>
            <span style="font-size:.3rem;margin-top:.1rem;margin-bottom:.1rem">
                <yd-icon slot="icon" name="dianhua-xianxingyuankuang" size=".3rem" custom></yd-icon>
                {{employeeInfo.mobile}}
            </span>
        </div>
       
        <yd-cell-group  style="margin-top:.2rem">
          <yd-cell-item  @click.native="showMyBreed">
              <yd-icon slot="icon" name="leidatance" size=".42rem" custom></yd-icon>
              <span slot="left">擅长领域</span>
          </yd-cell-item>
        </yd-cell-group>
        <!-- </yd-cell-group> -->
        <yd-cell-group style="margin-top:.2rem">
            <yd-cell-item @click.native="openInfo">
                <yd-icon slot="icon" name="yonghuziliao" size=".42rem" custom></yd-icon>
                <span slot="left" >个人信息</span>
            </yd-cell-item>
            <yd-cell-item @click.native="changePassword">
                <yd-icon slot="icon" name="jiesuo" size=".42rem" custom></yd-icon>
                <span slot="left">密码修改</span>
            </yd-cell-item>
        </yd-cell-group>
        <yd-cell-group style="margin-top:.2rem">
            <yd-cell-item type="a" @click.native="loginOut">
                <yd-icon slot="icon" name="zhuxiaoguanji" size=".42rem" custom></yd-icon>
                <span slot="left">退出</span>
            </yd-cell-item>
        </yd-cell-group>
    </div>
</template>
<script>
import { mapGetters,mapActions } from "vuex";
import mainBizScope from "../customer/detail/mainBizScope.vue";
import httpService from "../../libs/httpService";
import addVarieties from "../../views/slideBar/addVarieties.vue";
export default {
  data() {
    return {
      showMenu: false,
      showChoose: "",
      imageUrl: require("../../res/images/head.png")
    };
  },
  computed: {
    ...mapGetters(["user","goodAtField","employeeInfo"]),
  },
  components: {
    mainBizScope,
    addVarieties
  },
  mounted: function() {
    this.$nextTick(function() {
      // 代码保证 this. 在 document 中
    });
  },
  methods: {
  	...mapActions(["addEmployProduct","queryEmployProductGroupList","queryEmployeeInfo"]),
    changePassword() {
      this.$router.push("/editPassword");
    },
    showMyBreed() {
      this.$router.push("/myBreed");
      // this.$router.push("/userInfo");
    },
    //新增擅长
    addFunc() {
      this.showChoose = "bizScope";
      this.showMenu = true;
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
        this.addProduct();
      } else {
        this.$dialog.toast({
          mes: `${item.name}已经是你的主营品种`
        });
      }
      this.showMenu = false;
    },
    addProduct() {
      let param ={
      	employee: window.localStorage.employeeId,
      	breedIds: this.breedList //TODO
      };
      this.addEmployProduct(param)
      	  .then(res=>{
      	  	this.loadDetail();
      	  })
      	  .catch(err=>{});
    },
    loadDetail() {
      let param={
      	employee: window.localStorage.employeeId
      };
      this.queryEmployProductGroupList(param)
      	  .then(res=>{
      	  })
      	  .catch(err=>{
      	  	
      	  });
    },
    loadEmployeeDetail() {
      let param = {
        id: window.localStorage.employeeId
      };
      this.queryEmployeeInfo(param)
      	  .then(res=>{
      	  })
      	  .catch(err => {});
    },
    loginOut() {
      console.log("-------------退出----------------");
      window.localStorage.employeeId = "";
      localStorage.name = "";
      localStorage.pass = "";
      this.$router.push("/login");
    },
    //个人详情
    openInfo() {
      this.$router.push("/userInfo");
    }
  },
  created() {
  	console.log("测试返回也执行吗？")
    this.loadDetail();
    this.loadEmployeeDetail();
  },
  beforeDestroy() {}
};
</script>
<style scoped>
/*@import '../styles/common.css';*/

.user-top {
  width: 100%;
  height: 4rem;
  background-image: url("../../res/images/bg_user.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}

.user-icon {
  width: 1rem;
  height: 1rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  margin-left: 1rem;
  margin-right: 0.5rem;
  border-radius: 50%;
  overflow: hidden;
}

.user-name {
  width: 4rem;
  height: 1rem;
  top: 1.5rem;
  margin-left: 2.2rem;
  margin-right: 0.2rem;
  position: absolute;
  color: aliceblue;
}

#h1 {
  size: 0.4rem;
}
</style>
