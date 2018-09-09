<template>
  <intention-list :param="param"></intention-list>
</template>
<script>
import intentionList from "../intentionList.vue";
export default {
  data() {
    return {
      param: {
        module: "erpIntentionService",
        method: "queryMyIntentionList",
        type: "0"

      }
    };
  },
  components: {
    intentionList
  }
};
</script>
<style lang="less">

</style>


