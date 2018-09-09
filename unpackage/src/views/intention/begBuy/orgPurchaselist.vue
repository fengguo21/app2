<!-- /**
 * 部门求购
 * @authors DEAN hxj (xxxxxxx@delibal)
 * @date    2018-02-05 10:18:13
 * @version $Id$
 */ -->
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
        method: "queryOrgIntentionList",
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

