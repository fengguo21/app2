<!-- /**
 * 物流公司列表
 * @authors DEAN hxj (xxxxxxx@delibal)
 * @date    2018-03-28 13:54:09
 * @version $Id$
 */

 -->
<template>
    <div>
        <yd-list theme="1" slot="list">
              <div class="unitItem" v-for="(item, key) in list" ref="unitBox" @click="choose(item)">
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
           loadList() {
                let url = http.urlCommon + http.apiUrl.most;
                let body = {
                    biz_module: 'logisticsService',
                    biz_method: 'queryExpressList',
                    biz_param: {
                        
                    }
                };
                http.commonPost(url, body).then((res) => {
                    console.log("洒家扩大三大",res)
                    this.list=res.biz_result.list;
                }).catch((err) => {});
            },
           choose(val){
            this.$emit('chosen',val);
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