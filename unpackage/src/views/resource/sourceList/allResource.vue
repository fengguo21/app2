<!-- /**
 * 全部资源
 * @authors DEAN hxj (xxxxxxx@delibal)
 * @date    2018-02-27 10:56:00
 * @version $Id$
 */

 -->
  <template>
  <resource-List :param="param"></resource-List>
</template>
<script>
import resourceList from "../resourceList.vue";
import http from '../../../libs/httpService.js'
import util from '../../../libs/util.js'
import bus from "../../../libs/bus.js";
export default {
  data() {
    return {
      param: {
        module: "erpIntentionService",
        method: "queryAllIntentionList",
        type: "1"

      }
    };
  },
  components: {
    resourceList
  },
  mounted() {
      this.$nextTick(function() {
        let _this = this;
        // 设置页面右上角更多操作功能项
        bus.$emit('more-operation', []); //触发事件

      })
    },
  methods:{
    addNewPurchase(){
      let url="/addPurchase";
      this.$router.push(url);
    }
  }
};
</script>
<style lang="less">

</style>