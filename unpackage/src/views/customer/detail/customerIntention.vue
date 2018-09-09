<template>
  <div>
      <intention-list :param="param" :mark="mark"></intention-list>
  </div>
</template>
<script>
import intentionList from "../../intention/intentionList.vue";
export default {
  data() {
    return {
      param: {
        module: "erpIntentionService",
        method: "queryAllIntentionList",
        type: "0",
        customerId:this.$route.query.id
      },
        mark:"customer"
    };
  },
  components:{
      intentionList
  }
};
</script>
<style lang="less" scoped>

</style>


