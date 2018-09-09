<!-- Created by Weiun on 2017/1/17.-->
<template>
    <centerContent :showSearch="true" :moreShow="false">
      <yd-tab slot="search" :callback="tabCallback">
          <yd-tab-panel label="审核" tabkey="audit">
            <audit-message ></audit-message>
          </yd-tab-panel>
          <yd-tab-panel label="报价" tabkey="offer"></yd-tab-panel>
          <yd-tab-panel label="订单" tabkey="order"></yd-tab-panel>
          <yd-tab-panel label="物流" tabkey="logis"></yd-tab-panel>
          <yd-tab-panel label="系统" tabkey="sys"></yd-tab-panel>
      </yd-tab>
      <div slot="content" style="margin:0.1rem"> 
      </div>
      <div slot="more">消息更多查询条件</div>
    </centerContent>
</template>
<script>
import centerContent from "../../components/centerContent.vue";
import auditMessage from "../../components/message/auditMessage.vue";
import { mapGetters } from "vuex";
import bus from '../../libs/bus'
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["layout"])
  },
  components: {
    centerContent,
    auditMessage
  },
  mounted: function() {
    this.$nextTick(function() {
      // 设置列表功能
      bus.$emit("more-operation",[
        {key:'add',title:'添加',icon:'add',callback:()=>{
          console.log("添加功能执行-------------------")
        }},
        {key:'del',title:'删除',icon:'del',callback:()=>{
          console.log("删除功能执行-------------------")
        }},
      ]);
    });
  },
  beforeDestroy() {
    // 重置列表功能项
    bus.$emit("more-operation",[]);
  },
  methods: {
    tabCallback(label,key) {
      console.log("-------------Tab--------------" + key);
    }
  }
};
</script>
<style scoped>
/*@import '../styles/common.css';*/
</style>