<!-- 登录页面 -->
<template>
    <yd-flexbox direction="vertical">
        <yd-flexbox-item height="2" style="text-align: center;vertical-align:middle;">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <img src="./../res/icons/logo_192px.png" class="logo">
        </yd-flexbox-item>
        <yd-flexbox-item id="loginBox">
            <yd-cell-group style="padding:.5rem">
                <yd-cell-item>
                    <yd-icon slot="icon" name="morentouxiang" size=".5rem" color="#FF685D" class="iconMargin" custom></yd-icon>
                    <!-- <input slot="right" required v-model="param.no" type="text" max="20" ref="name" placeholder="请输入用户名"> -->
                    <yd-input slot="right"   v-model="param.no"  placeholder="请输入用户名"></yd-input>
                </yd-cell-item>
                <yd-cell-item>
                    <yd-icon slot="icon" name="suoding" size=".5rem" color="#FF685D" class="iconMargin" custom></yd-icon>
                    <yd-input slot="right" type="password" v-model="param.password" placeholder="请输入密码"></yd-input>
                </yd-cell-item>
                <yd-button size="large" type="primary" style="margin-top:.5rem" @click.native="submit">登录</yd-button>
            </yd-cell-group>
        </yd-flexbox-item>
        <yd-flexbox-item></yd-flexbox-item>
    </yd-flexbox>
</template>
<script>
import Vue from "vue";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      loading: false,
      token: "",
      clientId: "",
      param: {
        no: "",
        password: "",
        clientId: "",
        token: "",
        stamp:1,
      }
    };
  },
  components: {},
  methods: {
    ...mapActions(["userLogin"]),
    submit: function() {
      console.log("-----------------登录---------------");
      let plus = Vue.prototype.$plus;
      if (plus) {
        this.clientId = plus.push.getClientInfo().clientid;
        this.token = plus.push.getClientInfo().token;
        this.param.clientId = this.clientId;
        if (plus.os.name === "iOS") {
          this.param.token = this.token;
        }
      }
      let _self = this;
      _self.loading = true;
      _self
        .userLogin(_self.param)
        .then(res => {
          _self.loading = false;
          _self.$router.push("/main/index");
        })
        .catch(err => {
          _self.loading = false;
        });
    },
    focus(){
      console.log("woshi name" ,this.$refs.name);
      if(!this.param.no){
      console.log("我是setBlur");
        this.$refs.name.setFocus();
      }
    }
  },
  mounted(){
    this.focus;
  },
  created(){
    this.$store.state.user.clientHeight= document.body.clientHeight ;
    //自动登录
    let no = window.localStorage.name;
    let pass = window.localStorage.pass;
    let difTime = window.localStorage.difTime;
    console.log("3333333dfsdf333333",difTime);
    console.log("我是自动登录",no,pass,no&&pass);
    // if(){

    // }
    if(no&&pass){
      this.param.no=no;
      this.param.password = pass;
      this.submit();

    }
    console.log("我只是自动登录！！！！！！",this.param);
  }
};
</script>
<style scoped lang="less">
.iconMargin {
  margin-right: 0.2rem;
}

.logo {
  width: 3rem;
}
</style>
