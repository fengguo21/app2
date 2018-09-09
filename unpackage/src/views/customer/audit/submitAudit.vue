<template>
   <yd-layout>
        <yd-navbar slot="navbar" title="客户认证">
            <router-link to="main/client?id=0" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <u-audit v-if="auditType=='user'"></u-audit>
        <c-audit v-if="auditType=='company'"></c-audit>
        <yd-tabbar slot="tabbar">
            <yd-tabbar-item title="个人认证" type="a" :active="auditType=='user'" @click.native="change('user')">
               <i class="icon iconfont icon-yonghu" slot="icon"></i>
            </yd-tabbar-item>
            <yd-tabbar-item title="企业认证"  type="a" :active="auditType=='company'"  @click.native="change('company')">
                <i class="icon iconfont icon-jiaosequnti"  slot="icon"></i>
            </yd-tabbar-item>
        </yd-tabbar>

    </yd-layout>
</template>
<script>
import cAudit from "./cAudit.vue"; //企业认证组件
import uAudit from "./uAudit.vue"; //客户认证组件
export default {
  data() {
    return {
      auditType: "user",

      customerId: ""
    };
  },
  components: {
    cAudit,
    uAudit
  },
  methods: {
    change(value) {
        console.log("dddddddddddddddddd",value);
        this.auditType = value;
    },
    submit() {
      console.log(this.customerId);
    }
  },
  created() {
    this.customerId = this.$route.query.id;
    this.submit();
  }
};
</script>
<style lang="less" scoped>

</style>


