<!-- /**
 * 包装方式
 * @authors DEAN hxj (xxxxxxx@delibal)
 * @date    2018-02-27 16:58:46
 * @version $Id$
 */

 -->
   <template>
    <div>
        <yd-list theme="1" slot="list">
              <div class="unitItem" v-for="(item, index) in list" ref="unitBox" @click="choose(index)">
                  {{item}}
              </div> 
            </yd-list>
    </div>
      

</template>
<script>
    import http from '../../libs/httpService.js'
    export default {
        data() {
            return {
              list:['真空包装','瓦楞纸箱','编织袋','积压包','其他']
            }
        },
        props:{
         
        },
        computed: {
           
        },
        components: {
         
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {
           choose(index) {
              let val=this.list[index];
              this.back(val); 
            },
           back(val){
            this.$emit('pack-Back',val);
           }
        },
        created() {
            
        }

    }
</script>

<style lang="less" scoped>
   .unitItem{
     height:40px;
     font-size:0.3rem;
     line-height:40px;
     text-align:center;
     color:#666;
     border-bottom:1px solid #e6e6e6;
   }
    
</style>