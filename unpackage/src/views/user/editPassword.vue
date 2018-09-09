<template>
  <yd-layout>
    <yd-navbar slot="navbar" :title="title">
        <yd-icon name="shangyiyehoutuifanhui" slot="left" size='.5rem' @click.native="goBack" custom></yd-icon>
	</yd-navbar>
    <yd-cell-group>
            <yd-cell-item>
                <span slot="left">原密码：</span>
               <yd-input slot="right" type="password" v-model="oldPwd"  ></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left" >新密码：</span>
                <yd-input  slot="right" type="password" v-model="newPwd" ></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left" >确认密码：</span>
                <yd-input slot="right" type="password" v-model="confirmPwd" required></yd-input>
            </yd-cell-item>
        </yd-cell-group>
    <yd-tabbar slot="tabbar"  class="tabbar" >
        <div class="bottom"  >
            <p  @click="submit">确认修改</p>
        </div>
    </yd-tabbar>
  </yd-layout>
</template>
<script>
import validation from "../../validation/validation.js";
import {mapActions,mapGetters} from "vuex";
export default {
  data() {
    return {
      newPwd: "",
      oldPwd: "",
      confirmPwd: "",
      title: "修改密码"
    };
  },
  methods: {
  	...mapActions(["updatePassword"]),
    goBack() {
      window.history.go(-1);
    },
    submit() {
      let _self = this;
      var checkArr = [];
      let checkNewPwd = validation.checkPwd(this.newPwd);
      checkArr.push(checkNewPwd);
      let confirmPwd = validation.checkPwd(this.confirmPwd);
      checkArr.push(confirmPwd);
      for (var i = 0; i < checkArr.length; i++) {
        if (checkArr[i]) {
          this.$dialog.toast({
            mes: checkArr[i],
            timeout: 800
          });
          return;
        }
      }
      if (!(this.confirmPwd == this.newPwd)) {
        this.$dialog.toast({ mes: "新密码与确认密码不相等！", timeout: 500 });
        return;
      }
      let param = {
        id: window.localStorage.employeeId,
        oldPwd: this.oldPwd,
        newPwd: this.newPwd
      };

      this.updatePassword(param)
      		.then(res=>{
      			this.$dialog.toast({ mes: "修改密码成功！", timeout: 500 });
      		})
      		.catch(err=>{});
    }
  }
};
</script>
<style lang="less" scoped>
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


