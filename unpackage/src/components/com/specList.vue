<!-- 
/**
 * 
 * @authors DEAN hxj (xxxxxxx@delibal)
 * @date    2018-02-07 14:22:01
 * @version $Id$
 */
 -->
   <template>
    <div>
        <yd-list theme="1" slot="list">
             <div class="unitItem" v-for="(item, key) in list" @click="choose(item)">
                 {{item.name}}
             </div> 
            </yd-list>
    </div>
      

</template>
<script>
    import http from '../../libs/httpService.js'
    export default {
        data() {
            return {
              list:[]
            }
        },
        props:['param'],
        computed: {
           
        },
        components: {
         
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {
           loadList() {
                let url = http.urlCommon + http.apiUrl.most;
                let body = {
                    biz_module: 'breedService',
                    biz_method: 'queryBreedSpecList',
                    biz_param: {
                        breedId:this.param
                    }
                };
                http.commonPost(url, body).then((res) => {
                    console.log("洒家扩大三大",res)
                    this.list=res.biz_result.list;
                }).catch((err) => {});
            },
           choose(val){
            this.$emit('spec-Back',val);
           }
        },
        created() {
            this.loadList();
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